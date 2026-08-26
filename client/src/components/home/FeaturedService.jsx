import { SectionHeader } from '../ui/SectionTypography';
import { TouchIcon, TemplateIcon, ShareIcon, PropIcon, AttendantIcon } from '../icons/Icons';

const features = [
  { icon: TouchIcon, text: 'Touch-screen photo booth kiosk' },
  { icon: TemplateIcon, text: 'Custom photo-strip template' },
  { icon: ShareIcon, text: 'Instant digital sharing via SMS & email' },
  { icon: PropIcon, text: 'Fun prop box' },
  { icon: AttendantIcon, text: 'Professional on-site attendant' },
];

export default function FeaturedService() {
  return (
    <section className="section-padding bg-warmIvory overflow-hidden">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="min-w-0">
            <SectionHeader
              align="left"
              eyebrow="Featured Service"
              title="Luxury Photo Booth Rental"
              className="mb-8"
            />
            <p className="section-lead mb-8">
              Our signature experience combines cutting-edge technology with timeless elegance.
              Every detail is curated to deliver photos your guests will treasure forever.
            </p>
            <ul className="space-y-4">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 sm:gap-4 group min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full border border-antiqueGold/30 flex items-center justify-center text-antiqueGold group-hover:bg-antiqueGold/10 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-charcoal min-w-0">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden pb-8 sm:pb-0 min-w-0">
            <div className="absolute inset-2 sm:-inset-4 border border-antiqueGold/20 rounded-lg pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
              alt="Luxury photo booth setup at elegant event"
              className="rounded-lg w-full h-[280px] sm:h-[360px] md:h-[400px] object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 sm:-bottom-6 sm:-left-6 bg-charcoal text-warmIvory p-3 sm:p-4 rounded border border-antiqueGold/30">
              <p className="font-script text-xl sm:text-2xl text-antiqueGold font-semibold">Strike & Pose</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
