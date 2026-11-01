export function ConfirmModal({ isOpen, onClose, onConfirm }: any) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[2px] px-6">
      <h3 className="text-xl font-black text-black">Are you sure?</h3>
      <div className="mt-5 flex items-center gap-3">
        <button onClick={onClose} className="h-11 min-w-[105px] rounded-xl bg-[#c5cbcf] text-sm font-bold cursor-pointer">Cancel</button>
        <button onClick={onConfirm} className="h-11 min-w-[125px] rounded-xl bg-[#f5b335] text-sm font-bold cursor-pointer">Clear cart</button>
      </div>
    </div>
  );
}