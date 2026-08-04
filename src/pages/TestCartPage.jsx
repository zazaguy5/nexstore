import { useState, useEffect } from "react";
import { productCard } from '../components/home/productCard.jsx';
import { getCart } from "../utils/apiServices.js";
import { LoadingComponent } from '../components/loading';

export function CartPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') ?? 'null');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getCart(userId);
        setData(result.data ?? result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId !== 'null') {
      fetchProduct();
    }
  }, []);

  if (loading) return LoadingComponent();
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>

  return (
    <div className="w-full h-full p-4">
      <p className="text-black text-xl font-bold">รายการสินค้าในตะกร้า</p>
      {data.length != 0 ?
        data.map((cart) => productCard(cart.name, cart.price * cart.quantity, cart.quantity, null)) :
        <p className="pt-4">ไม่มีสินค้าในตะกร้า</p>
      }
    </div>
  );
}