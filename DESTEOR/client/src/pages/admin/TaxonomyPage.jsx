import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { deleteAdminTaxonomy, getAdminTaxonomies, saveAdminTaxonomy } from '@/services/admin.service';

function TaxonomyPage({ type, title }) {
  const [items, setItems] = useState([]); const [record, setRecord] = useState(null); const [error, setError] = useState('');
  const load = useCallback(() => getAdminTaxonomies(type).then(setItems).catch((err) => setError(err.message)), [type]);
  useEffect(() => { load(); }, [load]);
  const submit = async (event) => { event.preventDefault(); try { await saveAdminTaxonomy(type, record); setRecord(null); load(); } catch (err) { setError(err.message); } };
  const remove = async (id) => { if (!window.confirm(`Delete this ${type.slice(0, -1)}?`)) return; try { await deleteAdminTaxonomy(type, id); load(); } catch (err) { setError(err.message); } };
  return <><div className="mb-8 flex items-end justify-between"><div><p className="font-body text-sm uppercase tracking-[.2em] text-champagne-gold">Admin management</p><h1 className="font-heading text-3xl">{title}</h1></div><Button onClick={() => setRecord({ name: '', slug: '', description: '', image: '' })}>Add {type.slice(0, -1)}</Button></div>{error && <p className="mb-4 text-sm text-red-700">{error}</p>}<div className="overflow-x-auto border border-matte-black/10 bg-white"><table className="w-full text-left font-body text-sm"><thead className="bg-matte-black text-ivory-white"><tr><th className="p-4">Name</th><th className="p-4">Slug</th><th className="p-4">Products</th><th className="p-4">Actions</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} className="border-t"><td className="p-4">{item.name}</td><td className="p-4">{item.slug}</td><td className="p-4">{item._count?.products ?? 0}</td><td className="p-4"><button className="mr-3 text-champagne-gold" onClick={() => setRecord(item)}>Edit</button><button className="text-red-700" onClick={() => remove(item.id)}>Delete</button></td></tr>)}</tbody></table></div><Modal isOpen={Boolean(record)} onClose={() => setRecord(null)} title={`${record?.id ? 'Edit' : 'Add'} ${type.slice(0, -1)}`}><form className="space-y-4" onSubmit={submit}>{['name', 'slug', 'description', 'image'].map((field) => <label key={field} className="block text-sm capitalize">{field}{field === 'image' ? ' (optional)' : ''}<input required={field !== 'image'} value={record?.[field] || ''} onChange={(event) => setRecord({ ...record, [field]: event.target.value })} className="mt-1 w-full border border-matte-black/20 px-3 py-2" /></label>)}<Button type="submit">Save</Button></form></Modal></>;
}
export default TaxonomyPage;
