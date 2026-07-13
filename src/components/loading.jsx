export function LoadingComponent() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-[#042C53] rounded-full animate-spin"></div>
    </div>
  );
}