import { useState, useEffect } from 'react';

export function CartCount() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') ?? 'null');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/products/carts/count/${userId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status ${response.status}`);
        }

        const result = await response.json();
        setData(result.data ?? result);
      } catch (error) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <>
      {data.map((d) => <p className="font-bold text-base">{d.count != 0? d.count : '' }</p>)}
    </>
  );
}