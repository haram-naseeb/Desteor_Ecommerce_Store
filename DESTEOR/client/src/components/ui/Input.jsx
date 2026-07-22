import { forwardRef } from 'react';

/**
 * Input
 *
 * Presentation-only text input. Uses forwardRef so it can be registered
 * directly with React Hook Form (Sprint 2+) via `{...register('field')}`
 * without any wrapper gymnastics.
 */
const Input = forwardRef(function Input(
  { label, id, error, type = 'text', className = '', hideLabel = false, ...rest },
  ref
) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && !hideLabel && (
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
        aria-label={hideLabel ? label : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          w-full rounded-xl border bg-ivory-white/95 px-4 py-3 font-body text-sm
          text-matte-black shadow-sm placeholder:text-matte-black/35
          focus:outline-none focus:ring-4 focus:ring-champagne-gold/12
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-red-400' : 'border-matte-black/15'}
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
