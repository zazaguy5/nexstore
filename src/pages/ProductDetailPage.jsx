import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function ProductDetailPage() {
  const { id } = useParams();
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') ?? 'null');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // จำนวนที่เลือกในตะกร้า
  const [amount, setAmount] = useState(0);
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

  const pAmount = data[0].quantity;

  return (
    <div className="p-4">
      <div className="text-lg font-medium">{data[0].name}</div>
      <p className="text-base">ราคา: {data[0].price} บาท</p>
      <p className="text-base pb-10">จำนวนในคลัง: {pAmount} ชิ้น</p>
      <div className="flex items-center">
        <button onClick={() => {
            if (amount > 0) {
              setAmount(amount - 1);
            }
          }} className="p-2 ml-4 mb-8 bg-red-500 rounded text-white cursor-pointer hover:bg-red-600"><img src="/images/minus.png" className="w-[15px] h-[15px] bg-white-800" /></button>
        <p className="text-base ml-4 mb-8">{amount}</p>
        <button onClick={() => {
            if (amount < pAmount) {
              setAmount(amount + 1);
            }
          }} className="p-2 ml-4 mb-8 bg-green-500 rounded text-white cursor-pointer hover:bg-green-600"><img src="/images/add.png" className="w-[15px] h-[15px] bg-white-800" /></button>
      </div>
      <button className="px-8 py-1 bg-blue-600 hover:bg-blue-700 rounded text-lg text-white cursor-pointer" onClick={() => {}}>เพิ่มลงตะกร้า</button>
    </div>
  );
}