import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import Modal from '@/components/ui/Modal';
import {
  deleteAdminProduct,
  deleteAdminUpload,
  getAdminProducts,
  getAdminTaxonomies,
  saveAdminProduct,
  uploadAdminImages,
} from '@/services/admin.service';
import { formatPrice as formatCurrency } from '@/utils/format';

const emptyProduct = {
  name: '',
  slug: '',
  description: '',
  price: 0,
  stock: 0,
  featured: false,
  categoryId: '',
  collectionId: '',
  images: [],
  specifications: [],
};
const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

function Products() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [record, setRecord] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const load = useCallback(
    (value = '') =>
      getAdminProducts({ search: value })
        .then(setData)
        .catch((err) => setError(err.message)),
    []
  );
  useEffect(() => {
    load();
    getAdminTaxonomies('categories')
      .then(setCategories)
      .catch((err) => setError(err.message));
    getAdminTaxonomies('collections')
      .then(setCollections)
      .catch((err) => setError(err.message));
  }, [load]);

  const uploadFiles = async (files) => {
    const selected = [...files];
    const remaining = 8 - (record?.images.length || 0);
    if (!selected.length) return;
    if (selected.length > remaining) {
      setError(
        `You can upload up to eight images per product. ${remaining} slot(s) remain.`
      );
      return;
    }
    if (
      selected.some(
        (file) => !acceptedImageTypes.includes(file.type) || file.size > 5 * 1024 * 1024
      )
    ) {
      setError('Images must be JPEG, PNG, or WebP files no larger than 5 MB.');
      return;
    }
    setError('');
    setUploading(true);
    try {
      const images = await uploadAdminImages(selected);
      setRecord((current) => ({ ...current, images: [...current.images, ...images] }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (image) => {
    if (image.publicId) {
      try {
        await deleteAdminUpload(image.publicId);
      } catch (err) {
        setError(err.message);
        return;
      }
    }
    setRecord((current) => ({
      ...current,
      images: current.images.filter((item) => item !== image),
    }));
  };

  const closeModal = async () => {
    const pendingImages = record?.images.filter((image) => image.publicId) || [];
    if (pendingImages.length)
      await Promise.all(
        pendingImages.map((image) =>
          deleteAdminUpload(image.publicId).catch(() => undefined)
        )
      );
    setRecord(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!record.images.length) {
      setError('Upload at least one product image.');
      return;
    }
    try {
      await saveAdminProduct(record);
      setRecord(null);
      load(search);
    } catch (err) {
      setError(err.message);
    }
  };
  const remove = async (id) => {
    if (
      !window.confirm(
        'Delete this product? Its hosted images will also be permanently deleted.'
      )
    )
      return;
    try {
      await deleteAdminProduct(id);
      load(search);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!data) return <Loader />;
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-body text-sm uppercase tracking-[.2em] text-champagne-gold">
            Catalogue
          </p>
          <h1 className="font-heading text-3xl">Products</h1>
        </div>
        <Button
          onClick={() => setRecord({ ...emptyProduct, images: [], specifications: [] })}
        >
          Add product
        </Button>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && load(search)}
          placeholder="Search products"
          className="border border-matte-black/20 px-3 py-2"
        />
        <Button size="sm" onClick={() => load(search)}>
          Search
        </Button>
      </div>
      {error && <p className="mb-4 text-red-700">{error}</p>}
      <div className="overflow-x-auto border border-matte-black/10 bg-white">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-matte-black text-ivory-white">
            <tr>
              {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map(
                (heading) => (
                  <th key={heading} className="p-4">
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data.products.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.category.name}</td>
                <td className="p-4">{formatCurrency(item.price)}</td>
                <td className="p-4">{item.stock}</td>
                <td className="p-4">{item.featured ? 'Yes' : 'No'}</td>
                <td className="p-4">
                  <button
                    className="mr-3 text-champagne-gold"
                    onClick={() =>
                      setRecord({
                        ...item,
                        images: [...item.images],
                        specifications: [...item.specifications],
                      })
                    }
                  >
                    Edit
                  </button>
                  <button className="text-red-700" onClick={() => remove(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={Boolean(record)}
        onClose={closeModal}
        title={`${record?.id ? 'Edit' : 'Add'} product`}
      >
        <form onSubmit={submit} className="max-h-[70vh] space-y-3 overflow-y-auto pr-2">
          {['name', 'slug', 'description'].map((field) => (
            <input
              key={field}
              required
              value={record?.[field] || ''}
              placeholder={field}
              onChange={(event) => setRecord({ ...record, [field]: event.target.value })}
              className="w-full border border-matte-black/20 px-3 py-2"
            />
          ))}
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="number"
              min="0"
              value={record?.price ?? 0}
              onChange={(event) =>
                setRecord({ ...record, price: Number(event.target.value) })
              }
              className="border px-3 py-2"
            />
            <input
              required
              type="number"
              min="0"
              value={record?.stock ?? 0}
              onChange={(event) =>
                setRecord({ ...record, stock: Number(event.target.value) })
              }
              className="border px-3 py-2"
            />
          </div>
          <select
            required
            value={record?.categoryId || ''}
            onChange={(event) => setRecord({ ...record, categoryId: event.target.value })}
            className="w-full border px-3 py-2"
          >
            <option value="">Choose category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            required
            value={record?.collectionId || ''}
            onChange={(event) =>
              setRecord({ ...record, collectionId: event.target.value })
            }
            className="w-full border px-3 py-2"
          >
            <option value="">Choose collection</option>
            {collections.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={record?.featured || false}
              onChange={(event) =>
                setRecord({ ...record, featured: event.target.checked })
              }
            />{' '}
            Featured
          </label>
          <section>
            <p className="mb-2 font-body text-sm font-medium">Product images</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(event) => {
                uploadFiles(event.target.files);
                event.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                uploadFiles(event.dataTransfer.files);
              }}
              className="flex w-full flex-col items-center justify-center border border-dashed border-matte-black/30 bg-ivory-white px-5 py-7 font-body text-sm text-matte-black transition hover:border-champagne-gold"
            >
              <span className="font-medium">Choose images</span>
              <span className="mt-1 text-xs text-matte-black/60">
                or drag and drop JPEG, PNG, or WebP files here (max 5 MB each)
              </span>
            </button>
            {uploading && (
              <p className="mt-2 text-sm text-champagne-gold">Uploading images…</p>
            )}
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {record?.images.map((image, index) => (
                <div
                  key={image.id || image.publicId || image.url}
                  className="relative overflow-hidden border border-matte-black/10 bg-white"
                >
                  <img
                    src={image.url}
                    alt={`Product preview ${index + 1}`}
                    className="aspect-square w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    className="absolute right-2 top-2 bg-matte-black px-2 py-1 text-xs text-ivory-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
          <label className="block text-sm">
            Specifications: Label: Value
            <textarea
              value={(record?.specifications || [])
                .map((item) => `${item.label}: ${item.value}`)
                .join('\n')}
              onChange={(event) =>
                setRecord({
                  ...record,
                  specifications: event.target.value
                    .split('\n')
                    .filter(Boolean)
                    .map((line) => {
                      const [label, ...values] = line.split(':');
                      return { label: label.trim(), value: values.join(':').trim() };
                    }),
                })
              }
              className="mt-1 w-full border px-3 py-2"
            />
          </label>
          <Button type="submit" disabled={uploading}>
            {uploading ? 'Uploading…' : 'Save product'}
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default Products;
