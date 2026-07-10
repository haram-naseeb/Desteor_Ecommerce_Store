import { FiMinus, FiPlus } from 'react-icons/fi';

function QuantityStepper({ value, min = 0, max, disabled = false, onChange }) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-grid grid-cols-[40px_48px_40px] border border-matte-black/15 bg-ivory-white">
      <button
        type="button"
        className="grid h-10 place-items-center text-matte-black transition hover:bg-matte-black hover:text-ivory-white disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease quantity"
        disabled={disabled || value <= min}
        onClick={decrease}
      >
        <FiMinus aria-hidden="true" />
      </button>
      <span className="grid h-10 place-items-center border-x border-matte-black/10 text-sm font-semibold text-matte-black">
        {value}
      </span>
      <button
        type="button"
        className="grid h-10 place-items-center text-matte-black transition hover:bg-matte-black hover:text-ivory-white disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase quantity"
        disabled={disabled || value >= max}
        onClick={increase}
      >
        <FiPlus aria-hidden="true" />
      </button>
    </div>
  );
}

export default QuantityStepper;
