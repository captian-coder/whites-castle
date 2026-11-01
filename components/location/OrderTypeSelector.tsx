export function OrderTypeSelector({ orderType, setOrderType }: any) {
  return (
    <div className="mt-2 text-center">
      <h3 className="text-base font-extrabold text-neutral-800">Select your order type</h3>
      <div className="mt-3 flex justify-center gap-3">
        {["Delivery", "Pick-Up"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setOrderType(type)}
            className={`min-w-[120px] rounded-full py-2 px-5 text-sm font-extrabold transition-all cursor-pointer ${
              orderType === type
                ? "bg-[#f5b335] text-neutral-900 shadow-sm ring-2 ring-[#f5b335] ring-offset-1"
                : "border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}