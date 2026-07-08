function AuthFormHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-7 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl text-matte-black">{title}</h1>
      {description && (
        <p className="mt-3 text-sm leading-6 text-matte-black/60">{description}</p>
      )}
    </div>
  );
}

export default AuthFormHeader;
