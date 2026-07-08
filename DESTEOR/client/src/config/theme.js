/**
 * config/theme.js
 *
 * Mirrors the brand tokens defined in tailwind.config.js, for the rare
 * cases where a raw JS value is needed instead of a Tailwind class —
 * e.g. Framer Motion's `animate` prop, which can't consume class strings.
 *
 * Keep this in sync with tailwind.config.js whenever brand tokens change.
 */

export const theme = {
  colors: {
    matteBlack: '#0D0D0D',
    champagneGold: '#C6A15B',
    champagneGoldLight: '#D9C08A',
    ivoryWhite: '#FAF7F2',
  },
  fonts: {
    heading: "'Cinzel', serif",
    body: "'Poppins', sans-serif",
  },
  motion: {
    fast: 0.2,
    base: 0.35,
    slow: 0.6,
    easeOut: [0.16, 1, 0.3, 1],
  },
};

export default theme;
