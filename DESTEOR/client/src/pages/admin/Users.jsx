import { useCallback, useEffect, useState } from 'react';
import { Filter, Search, Trash2 } from 'lucide-react';

import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import {
  deleteAdminUser,
  getAdminUsers,
  updateAdminUserRole,
} from '@/services/admin.service';

const ROLES = ['CUSTOMER', 'ADMIN'];

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-PK', { dateStyle: 'medium' }).format(new Date(date));

function Users() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const load = useCallback((value = '') => {
    setError('');
    return getAdminUsers({ search: value })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateRole = async (id, role) => {
    setError('');
    setUpdatingId(id);
    try {
      await updateAdminUserRole(id, role);
      await load(search);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const remove = async (user) => {
    if (!window.confirm(`Delete ${user.firstName} ${user.lastName}'s account?`)) return;

    setError('');
    setUpdatingId(user.id);
    try {
      await deleteAdminUser(user.id);
      await load(search);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!data && !error) return <Loader label="Loading users" />;

  return (
    <>
      <div className="mb-8">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-champagne-gold">
          Customer management
        </p>
        <h1 className="font-heading text-3xl text-matte-black">Users</h1>
      </div>

      <form
        className="mb-5 flex flex-wrap gap-3 rounded-2xl border border-matte-black/10 bg-white/80 p-4 shadow-subtle"
        onSubmit={(event) => {
          event.preventDefault();
          load(search);
        }}
      >
        <div className="relative min-w-64 flex-1">
          <Search
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-matte-black/35"
            aria-hidden="true"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users"
            className="w-full rounded-xl border border-matte-black/15 bg-ivory-white/95 py-3 pl-4 pr-11 text-sm shadow-sm"
            aria-label="Search users"
          />
        </div>
        <Button size="sm" type="submit">
          <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
          Search
        </Button>
      </form>

      {error && <p className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      {data && (
        <div className="overflow-x-auto rounded-2xl border border-matte-black/10 bg-white/90 shadow-subtle">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-matte-black text-ivory-white">
              <tr>
                {['User', 'Phone', 'Role', 'Orders', 'Joined', 'Actions'].map((heading) => (
                  <th key={heading} className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em]">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-matte-black/8">
              {data.users.map((user) => (
                <tr key={user.id} className="transition hover:bg-champagne-gold/6">
                  <td className="px-5 py-4">
                    <p className="font-medium text-matte-black">{user.firstName} {user.lastName}</p>
                    <p className="mt-1 text-xs text-matte-black/60">{user.email}</p>
                  </td>
                  <td className="px-5 py-4 text-matte-black/70">{user.phone || '—'}</td>
                  <td className="px-5 py-4">
                    <select
                      value={user.role}
                      disabled={updatingId === user.id}
                      onChange={(event) => updateRole(user.id, event.target.value)}
                      className="rounded-lg border border-matte-black/15 bg-white px-3 py-2 text-sm text-matte-black disabled:opacity-50"
                      aria-label={`Role for ${user.firstName} ${user.lastName}`}
                    >
                      {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-matte-black/70">{user._count.orders}</td>
                  <td className="px-5 py-4 text-matte-black/70">{formatDate(user.createdAt)}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={updatingId === user.id}
                      onClick={() => remove(user)}
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!data.users.length && <p className="p-8 text-center text-sm text-matte-black/60">No users found.</p>}
        </div>
      )}
    </>
  );
}

export default Users;
