export function CartFooter({ subtotal, formatAmount, onCheckout, cartEmpty, user }: any) {
  return (
    <div className="border-t border-neutral-100 bg-white p-6 space-y-3">
      <div className="flex justify-between text-sm font-medium text-neutral-600">
        <span>Subtotal</span><span>Rs. {formatAmount(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm font-medium text-neutral-600">
        <span>Delivery Charges</span><span>Rs. 0.00</span>
      </div>
      <div className="border-t border-neutral-100 pt-3 flex justify-between text-base font-extrabold text-neutral-900">
        <span>Grand total</span><span>Rs. {formatAmount(subtotal)}</span>
      </div>
      <button 
        onClick={onCheckout} 
        disabled={cartEmpty} 
        className="mt-3 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f5b335] text-base font-bold text-neutral-900 shadow-sm disabled:opacity-50 cursor-pointer hover:bg-[#eab308]"
      >
        {user ? "Proceed to Checkout" : "Sign In to Checkout"}
      </button>
    </div>
  );
}