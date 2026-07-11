import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiInfo, FiX, FiXCircle } from 'react-icons/fi';

import { ToastContext } from '@/contexts/toast-context';

const ICONS = { success: FiCheckCircle, error: FiXCircle, info: FiInfo };

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts((items) => items.filter((item) => item.id !== id)), []);
  const showToast = useCallback((message, type = 'info') => {
    const id = crypto.randomUUID();
    setToasts((items) => [...items, { id, message, type }]);
    window.setTimeout(() => dismiss(id), 4200);
  }, [dismiss]);
  const value = useMemo(() => ({ dismiss, showToast }), [dismiss, showToast]);

  return <ToastContext.Provider value={value}>{children}<div className="fixed right-4 top-20 z-[70] w-[min(24rem,calc(100vw-2rem))] space-y-3" aria-live="polite"><AnimatePresence>{toasts.map(({ id, message, type }) => { const Icon = ICONS[type] || FiInfo; return <motion.div key={id} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }} className={`flex items-start gap-3 border bg-white p-4 shadow-elevated ${type === 'error' ? 'border-red-200' : 'border-champagne-gold/45'}`} role="status"><Icon className={type === 'error' ? 'mt-0.5 text-red-600' : 'mt-0.5 text-champagne-gold'} aria-hidden="true" /><p className="flex-1 text-sm text-matte-black/80">{message}</p><button type="button" onClick={() => dismiss(id)} aria-label="Dismiss notification" className="text-matte-black/45 hover:text-matte-black"><FiX /></button></motion.div>; })}</AnimatePresence></div></ToastContext.Provider>;
}

export default ToastProvider;
