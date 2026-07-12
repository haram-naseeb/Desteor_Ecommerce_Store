function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-champagne-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl leading-tight text-matte-black md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-matte-black/64 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
