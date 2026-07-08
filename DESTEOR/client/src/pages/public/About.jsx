import PageHero from '@/components/storefront/PageHero';
import SectionHeading from '@/components/storefront/SectionHeading';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

const values = [
  {
    title: 'Intentional Luxury',
    copy: 'We prefer restraint, proportion, and finish over excess. Every piece should earn its place in the look.',
  },
  {
    title: 'Bride First',
    copy: 'Comfort, confidence, and portrait-ready detail guide each design decision.',
  },
  {
    title: 'Responsible Polish',
    copy: 'Artificial jewellery should still feel considered, durable, and carefully presented.',
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About DESTEOR"
        title="Crafted for destiny, designed for the modern bride"
        description="DESTEOR creates premium artificial bridal jewellery with timeless silhouettes, refined gold tones, and a quiet sense of ceremony."
        image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=80"
      />

      <Section tone="light">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Brand Story"
            title="A house built for meaningful adornment"
            description="DESTEOR began with a simple belief: bridal jewellery can feel premium and personal without becoming inaccessible. Our pieces are designed to hold visual presence in photographs, comfort during long events, and grace after the wedding day."
          />
          <div className="border-l border-champagne-gold/50 pl-6 text-lg leading-9 text-matte-black/70">
            We draw from the language of heirloom jewellery while keeping the
            expression minimal, wearable, and original. The result is a
            collection that feels ceremonial without feeling heavy.
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <SectionHeading eyebrow="Mission" title="Make bridal elegance attainable" />
          </div>
          <p className="text-base leading-8 text-matte-black/68 md:col-span-2">
            Our mission is to offer artificial bridal jewellery that feels
            elevated in design, reliable in quality, and effortless to style.
            DESTEOR is for brides who want beauty with clarity: fewer
            distractions, better details, and pieces that support the day
            instead of overwhelming it.
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1300&q=80"
            alt="Gold jewellery detail"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <SectionHeading
              eyebrow="Craftsmanship"
              title="Built through finish, balance, and touch"
              description="Each design is considered through stone placement, weight, closure comfort, and how it frames the face or wrist. The goal is not ornament for ornament's sake, but jewellery that completes a bride's presence."
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-matte-black text-ivory-white">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
            Values
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">What we protect</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="border border-ivory-white/12 p-6">
                <h3 className="text-xl text-ivory-white">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ivory-white/65">
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export default About;
