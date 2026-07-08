import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = forwardRef(function PasswordInput(
  { id, label, error, className = '', ...rest },
  ref
) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-matte-black/80">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type={isVisible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-md border bg-ivory-white px-4 py-2.5 pr-11 text-sm text-matte-black placeholder:text-matte-black/40 focus:outline-none focus:ring-2 focus:ring-champagne-gold ${
            error ? 'border-red-400' : 'border-matte-black/20'
          } ${className}`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setIsVisible((value) => !value)}
          className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-matte-black/55 hover:text-champagne-gold"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
        </button>
      </div>
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-500">
          {Array.isArray(error) ? error.join(' ') : error}
        </span>
      )}
    </div>
  );
});

export default PasswordInput;
