import { useState } from 'react';
import { productCard } from '../components/home/productCard.jsx';

export function HomePage() {
  const [basket, setBasket] = useState(0);
  const [products, setProducts] = useState([
    { title: 'Product 1', price: 100, quantity: 0 },
    { title: 'Product 2', price: 200, quantity: 0 },
    { title: 'Product 3', price: 300, quantity: 0 },
    { title: 'Product 1', price: 100, quantity: 0 },
    { title: 'Product 2', price: 200, quantity: 0 },
    { title: 'Product 3', price: 300, quantity: 0 },
    { title: 'Product 1', price: 100, quantity: 0 },
    { title: 'Product 2', price: 200, quantity: 0 },
    { title: 'Product 3', price: 300, quantity: 0 },
  ]);
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <p className="text-lg font-bold">รายการอาหาร</p>
          <div className="w-[80px] flex items-center cursor-pointer">
            <p className="text-lg mr-2">ทั้งหมด</p>
            <img src="/images/down-arrow.png" className="w-[15px] h-[15px]"/>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-x-10 gap-y-4 pr-2 pl-2">
          { products.map((p, index) => productCard(p.title, p.price, p.quantity, () => setBasket(basket + 1))) }
        </div>

        <p className="text-lg font-bold">รายการในตะกร้า: {basket} ชิ้น</p>
      </div>
    </>
  );
}