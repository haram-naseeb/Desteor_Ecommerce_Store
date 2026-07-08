function FormAlert({ type = 'error', children }) {
  if (!children) return null;

  const tone =
    type === 'success'
      ? 'border-champagne-gold/35 bg-champagne-gold/10 text-matte-black'
      : 'border-red-200 bg-red-50 text-red-700';

  return <div className={`mb-5 border px-4 py-3 text-sm ${tone}`}>{children}</div>;
}

export default FormAlert;
