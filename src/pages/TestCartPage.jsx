import { useEffect, useState } from 'react';

export function CartPage() {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') ?? 'null');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      const controller = new AbortController();

      try {
        const response = await fetch(`http://localhost:3000/products/carts/${userId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status ${response.status}`);
        }

        const result = await response.json();
        const rows = result.data ?? result;
        const cart = rows.reduce((acc, row) => {
          if (!acc.has(row.id)) {
            acc.set(row.id, {
              cart_id: row.id,
              userid: row.userid,
              items: [],
            });
          }

          acc.get(row.id).items.push({
            product_id: row.product_id,
            name: row.name,
            price: row.price,
            quantity: row.quantity,
          });

          return acc;
        }, new Map());

        setData(Array.from(cart.values()));
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error.message);
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
    <div className="w-full h-full p-4">
      <p className="text-black text-lg pb-4">ตะกร้าสินค้า</p>

      {/* รายการสินค้า */}
      {data.map((cart, index) => (
        <div key={cart.cart_id} className="min-h-30 w-full bg-gray-200 rounded p-4 m-2 mb-4">
          <p className="font-bold mb-2">ตะกร้าที่ {index + 1}</p>

          {cart.items.map((p) => (
            <div key={p.product_id} className="min-h-10 w-full rounded p-2 mb-2 flex justify-between items-center">
              <p className='text-gray-800'>{p.name}</p>
              <p className='text-gray-800'>จำนวน {p.quantity} ชิ้น</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}