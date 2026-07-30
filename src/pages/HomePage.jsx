import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productCard } from '../components/home/productCard.jsx';

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} quantity
 * @property {number} price
 */

export function HomePage() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('isLogin') ?? false);
  const [basket, setBasket] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!isLogin) {
    navigate(`/login`);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/products/', {
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
      <p className="text-lg font-bold mb-4">รายการอาหารแนะนำ</p>
      <div className="flex justify-center pl-[20px] pr-[20px] gap-6">
        {data.slice(0, 3).map((p) => productCard(p.name, p.price, p.quantity, () => navigate(`/productDetail/${p.id}`)))}
      </div>

      <div className="flex justify-between mt-4 mb-2">
        <p className="text-lg font-bold">รายการอาหาร</p>
        <div className="w-[80px] flex items-center cursor-pointer">
          <p className="text-lg mr-2">ทั้งหมด</p>
          <img src="/images/down-arrow.png" className="w-[15px] h-[15px]" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-x-10 gap-y-4 p-2">
        {data.map((p) => productCard(p.name, p.price, p.quantity, () => navigate(`/productDetail/${p.id}`)))}
      </div>
    </div>
  );
}