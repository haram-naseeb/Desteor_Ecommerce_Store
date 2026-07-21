import { useCallback, useEffect, useState } from 'react';
import { Edit2, Star, Trash2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { createReview, deleteReview, getReviews, updateReview } from '@/services/review.service';

const EMPTY_FORM = { rating: 5, title: '', comment: '' };

function Stars({ rating, interactive = false, onChange }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(value)}
          className={interactive ? 'cursor-pointer rounded-full p-1 transition hover:bg-champagne-gold/10' : 'cursor-default'}
        >
          <Star className={value <= rating ? 'h-4 w-4 fill-champagne-gold text-champagne-gold' : 'h-4 w-4 text-matte-black/20'} />
        </button>
      ))}
    </div>
  );
}

function ReviewSection({ productId, initialOrderId, onSummary }) {
  const location = useLocation();
  const { currentUser, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [data, setData] = useState({ reviews: [], averageRating: 0, reviewCount: 0 });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const orderId = initialOrderId || location.state?.orderId || '';

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const next = await getReviews(productId);
      setData(next);
      if (typeof onSummary === 'function') {
        onSummary(next);
      }
    } catch (error) {
      showToast(error.message || 'Unable to load reviews.', 'error');
    } finally {
      setLoading(false);
    }
  }, [onSummary, productId, showToast]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (event) => {
    event.preventDefault();
    if (!editingId && !orderId) {
      showToast('Select a delivered order before submitting a review.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const payload = editingId ? form : { ...form, orderId };
      const next = editingId ? await updateReview(editingId, payload) : await createReview(productId, payload);
      setData(next);
      setForm(EMPTY_FORM);
      setEditingId('');
      showToast(editingId ? 'Review updated.' : 'Thank you for your review.', 'success');
    } catch (error) {
      showToast(error.message || 'Unable to save review.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const edit = (review) => {
    setEditingId(review.id);
    setForm({ rating: review.rating, title: review.title, comment: review.comment });
  };

  const remove = async (id) => {
    try {
      setData(await deleteReview(id));
      showToast('Review removed.', 'success');
    } catch (error) {
      showToast(error.message || 'Unable to remove review.', 'error');
    }
  };

  const userName = (review) => `${review.user?.firstName || ''} ${review.user?.lastName || ''}`.trim() || 'DESTEOR customer';

  return (
    <section className="border-t border-matte-black/10 pt-16 md:pt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne-gold">Customer notes</p>
          <h2 className="mt-2 text-3xl text-matte-black">Reviews</h2>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-matte-black/10 bg-white/80 px-4 py-2 shadow-sm">
          <Stars rating={Math.round(data.averageRating)} />
          <span className="text-sm text-matte-black/60">
            {data.averageRating.toFixed(1)} · {data.reviewCount} reviews
          </span>
        </div>
      </div>

      {isAuthenticated ? (
        orderId || editingId ? (
          <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl border border-matte-black/10 bg-white/90 p-6 shadow-subtle">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold text-matte-black">{editingId ? 'Edit your review' : 'Share your experience'}</p>
              <Stars rating={form.rating} interactive onChange={(rating) => setForm((value) => ({ ...value, rating }))} />
            </div>
            <Input
              required
              maxLength="120"
              value={form.title}
              onChange={(event) => setForm((value) => ({ ...value, title: event.target.value }))}
              placeholder="Review title"
            />
            <textarea
              required
              minLength="10"
              maxLength="2000"
              value={form.comment}
              onChange={(event) => setForm((value) => ({ ...value, comment: event.target.value }))}
              placeholder="Tell us what you loved"
              rows="4"
              className="rounded-xl border border-matte-black/15 bg-ivory-white/95 px-4 py-3 text-sm shadow-sm focus:ring-4 focus:ring-champagne-gold/12"
            />
            <div className="flex gap-3">
              <Button type="submit" variant="secondary" disabled={submitting}>
                {submitting ? 'Saving...' : editingId ? 'Update review' : 'Submit review'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setEditingId('');
                    setForm(EMPTY_FORM);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl border border-matte-black/10 bg-white/90 p-5 text-sm text-matte-black/65 shadow-subtle">
            Reviews are available only after an item is delivered. Navigate to your delivered order and leave feedback from there.
          </div>
        )
      ) : (
        <div className="mt-8 rounded-2xl border border-matte-black/10 bg-white/90 p-5 text-sm text-matte-black/65 shadow-subtle">
          {orderId ? (
            <>
              You must be signed in to leave a review.
              {' '}
              <Link className="font-semibold text-champagne-gold" to={ROUTES.LOGIN}>
                Sign in
              </Link>
              {' '}to share your feedback.
            </>
          ) : (
            <>
              Reviews are available only after an item is delivered. Navigate to your delivered order and leave feedback from there.
            </>
          )}
        </div>
      )}

      <div className="mt-10 space-y-5">
        {loading ? (
          <Loader label="Loading reviews" />
        ) : data.reviews.length ? (
          data.reviews.map((review) => (
            <article key={review.id} className="rounded-2xl border border-matte-black/10 bg-white/85 p-5 shadow-subtle">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <Stars rating={review.rating} />
                    <span className="text-sm font-semibold text-matte-black">{review.title}</span>
                  </div>
                  <p className="mt-2 text-sm text-matte-black/60">
                    {userName(review)} · {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {currentUser?.id === review.userId && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => edit(review)}
                      className="rounded-xl p-2 text-matte-black/50 transition hover:bg-champagne-gold/10 hover:text-champagne-gold"
                      aria-label="Edit review"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(review.id)}
                      className="rounded-xl p-2 text-matte-black/50 transition hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete review"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm leading-7 text-matte-black/70">{review.comment}</p>
            </article>
          ))
        ) : (
          <EmptyState title="No reviews yet" description="Be the first to share your experience with this piece." />
        )}
      </div>
    </section>
  );
}

export default ReviewSection;