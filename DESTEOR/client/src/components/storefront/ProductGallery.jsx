import { useEffect, useMemo, useState } from 'react';

function ProductGallery({ product }) {
  const fallbackImage =
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80';
  const images = useMemo(
    () => (product.images?.length ? product.images : [fallbackImage]),
    [product.images]
  );
  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    setActiveImage(images[0]);
  }, [images, product.id]);

  return (
    <div className="grid gap-4">
      <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-matte-black/10 bg-matte-black/5 shadow-elevated">
        <img
          src={activeImage}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`aspect-square overflow-hidden border ${
              activeImage === image
                ? 'border-champagne-gold shadow-elevated'
                : 'border-matte-black/10 hover:border-champagne-gold/40 hover:shadow-md'
            }`}
            aria-label={`View ${product.name} image`}
          >
            <img src={image} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
