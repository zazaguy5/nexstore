import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function ProductDetailPage() {
  const { id } = useParams();
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') ?? 'null');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //console.log(`userId: ${userId}`);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
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

  if (loading) return <p>กำลังโหลด....</p>;
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>

  return (
    <div className="p-4">
      <div className="text-lg font-medium">{data[0].name}</div>
      <p className="text-base">ราคา: {data[0].price} บาท</p>
      <p className="text-base pb-10">จำนวนในคลัง: {data[0].quantity} ชิ้น</p>
      <p className="text-base pb-4">จำนวนในตะกร้า: {data[0].quantity} ชิ้น</p>
      <buttonc className="px-8 py-1 bg-blue-600 hover:bg-blue-700 rounded text-lg text-white cursor-pointer" onclick={() => {}}>เพิ่มลงตะกร้า</buttonc>
    </div>
  );
}