import { useState, useEffect } from "react";
import { productCard } from '../components/home/productCard.jsx';
import { getCart } from "../utils/apiServices.js";
import { LoadingComponent } from '../components/loading';

export function CartPage() {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') ?? 'null');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getCart(userId);
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
    };

    if (userId !== 'null') {
      fetchProduct();
    }
  }, []);

  if (loading) return LoadingComponent();
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>

  return (
    <div className="w-full h-full p-4">
      <p className="text-black text-xl font-bold pb-4">รายการสินค้าในตะกร้า</p>

      {/* รายการสินค้า */}
      {data.length !== 0 ? data.map((cart, index) => {
        const cartTotal = cart.items.reduce((sum, p) => sum + p.price * p.quantity, 0);

        return (
          <div key={cart.cart_id} className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
              <p className="font-bold text-gray-800 text-lg">ตะกร้า {index + 1}</p>
              <span className="text-xs text-gray-400">{cart.items.length} รายการ</span>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {cart.items.map((p) => (
                <div
                  key={p.product_id}
                  className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col">
                    <p className="text-gray-800 font-medium">{p.name}</p>
                    <p className="text-gray-500 text-sm">
                      {p.price.toLocaleString()} บาท × {p.quantity} ชิ้น
                    </p>
                  </div>
                  <p className="text-gray-800 font-semibold whitespace-nowrap ml-3">
                    {(p.price * p.quantity).toLocaleString()} บาท
                  </p>
                </div>
              ))}
            </div>

            {/* Footer: Total */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
              <p className="text-gray-600 font-medium">ยอดรวม</p>
              <p className="text-lg font-bold text-blue-500">{cartTotal.toLocaleString()} บาท</p>
            </div>
          </div>
        );
      }) : (
        <p className="text-gray-400 text-center py-8">ไม่มีสินค้าในตะกร้า</p>
      )}
    </div>
  );
}