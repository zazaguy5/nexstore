export function productCard(title, price, quantity, onClick) {
  return (
    <div className="w-full bg-gray-100 p-4 rounded shadow cursor-pointer" onClick={onClick}>
      <img src="/images/example.jpg" alt={title} className="w-full h-[120px] object-contain" />
      <div className="text-lg font-medium">{title}</div>
      <p className="text-base">ราคา: {price} บาท</p>
      <p className="text-base">จำนวน: {quantity} ชิ้น</p>
    </div>
  );
}