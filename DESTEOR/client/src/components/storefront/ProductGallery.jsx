import { useState } from 'react';

function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);

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
        {product.images.map((image) => (
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
