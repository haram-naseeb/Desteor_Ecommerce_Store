import { forwardRef } from 'react';

/**
 * Input
 *
 * Presentation-only text input. Uses forwardRef so it can be registered
 * directly with React Hook Form (Sprint 2+) via `{...register('field')}`
 * without any wrapper gymnastics.
 */
const Input = forwardRef(function Input(
  { label, id, error, type = 'text', className = '', ...rest },
  ref
) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="font-body text-sm font-medium text-matte-black/80"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          w-full rounded-md border bg-ivory-white px-4 py-2.5 font-body text-sm
          text-matte-black placeholder:text-matte-black/40
          focus:outline-none focus:ring-2 focus:ring-champagne-gold
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-red-400' : 'border-matte-black/20'}
          ${className}
        `}
        {...rest}
      />
      {error && (
        <span id={`${id}-error`} className="font-body text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
});

export default Input;
