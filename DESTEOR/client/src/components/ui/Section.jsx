/**
 * Section
 *
 * Consistent vertical rhythm wrapper for distinct blocks of a page
 * (e.g. a hero, a featured-products row). Pairs with Container, which
 * handles horizontal width — Section handles vertical spacing and
 * optional background tone.
 */
const TONE_CLASSES = {
  light: 'bg-ivory-white',
  dark: 'bg-matte-black text-ivory-white',
  transparent: 'bg-transparent',
};

function Section({ children, tone = 'transparent', className = '' }) {
  return (
    <section className={`py-16 md:py-24 ${TONE_CLASSES[tone]} ${className}`}>
      {children}
    </section>
  );
}

export default Section;
