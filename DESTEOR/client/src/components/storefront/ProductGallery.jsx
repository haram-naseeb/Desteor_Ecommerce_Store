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
      <div className="aspect-[4/5] overflow-hidden bg-matte-black/5">
        <img
          src={activeImage}
          alt={product.name}
          className="h-full w-full object-cover"
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
                ? 'border-champagne-gold'
                : 'border-matte-black/10 hover:border-matte-black/30'
            }`}
            aria-label={`View ${product.name} image`}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
