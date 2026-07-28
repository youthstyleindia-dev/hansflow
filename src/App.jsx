import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  X,
  Mail,
  ChevronRight,
  BadgeCheck,
  Building2,
  PartyPopper,
  PlaneTakeoff,
  HeartHandshake,
  Route,
  Sparkles,
  BadgeIndianRupee,
} from 'lucide-react';

const navItems = ['Home', 'Fleet', 'Services', 'Corporate', 'Pricing', 'About', 'Contact'];

const fleet = [
  {
    name: 'Mercedes-Benz S-Class',
    seats: '5 Seats',
    bags: '3 Bags',
    price: '₹4,500',
    image: '/assets/images/car_mercedes.jpg',
  },
  {
    name: 'BMW 5 Series',
    seats: '5 Seats',
    bags: '3 Bags',
    price: '₹3,200',
    image: '/assets/images/car_bmw.jpg',
  },
  {
    name: 'Audi Q7',
    seats: '7 Seats',
    bags: '4 Bags',
    price: '₹4,000',
    image: '/assets/images/car_audi.jpg',
  },
  {
    name: 'Tesla Model S',
    seats: '5 Seats',
    bags: '3 Bags',
    price: '₹5,000',
    image: '/assets/images/car_tesla.jpg',
  },
];

const serviceCards = [
  { icon: PlaneTakeoff, title: 'Airport Transfers', desc: 'On-time pickup and drop with dedicated chauffeur support.' },
  { icon: Building2, title: 'Corporate Travel', desc: 'Executive rides for meetings, events, and client visits.' },
  { icon: HeartHandshake, title: 'Wedding Chauffeur', desc: 'Premium transport for family, guests, and bridal entries.' },
  { icon: PartyPopper, title: 'Events & Occasions', desc: 'Luxury car service for celebrations, launches, and VIPs.' },
  { icon: Route, title: 'Outstation Trips', desc: 'Intercity travel with comfort, safety, and flexibility.' },
  { icon: Clock3, title: 'Hourly Rentals', desc: 'Book by the hour for shopping, city tours, and errands.' },
];

const stats = [
  { value: '5,000+', label: 'Happy Clients' },
  { value: '200+', label: 'Premium Vehicles' },
  { value: '15+', label: 'Cities Covered' },
  { value: '4.9★', label: 'Customer Rating' },
];

const testimonials = [
  {
    quote: 'Hansflow handles all our executive airport transfers and client visits across Mumbai. Impeccable professional service.',
    name: 'Rajiv Anand',
    role: 'VP Operations, HDFC Corporate',
  },
  {
    quote: 'Our hotel guests rely on Hansflow for airport transfers. The vehicles are spotless, chauffeurs are courteous.',
    name: 'Priya Sharma',
    role: 'Director of Hospitality, Taj Hotels',
  },
  {
    quote: 'For our MICE conferences we needed 20+ premium vehicles. Hansflow delivered flawlessly and on-time.',
    name: 'Mehul Kanjiani',
    role: 'Founder, Ignite Events India',
  },
];

const pricing = [
  { title: 'Airport Transfer', price: '₹999', note: 'Comfortable transfer rides' },
  { title: '4 Hours Chauffeur', price: '₹2,499', note: 'Best for meetings & errands' },
  { title: '8 Hours Chauffeur', price: '₹4,499', note: 'Perfect full-day booking' },
  { title: 'Outstation Trip', price: 'Custom', note: 'Intercity flat rate packages' },
];

const faq = [
  {
    q: 'How does hourly booking work?',
    a: 'Choose your vehicle, select the time block, and book a chauffeur-driven car for the duration you need.',
  },
  {
    q: 'Can I extend my booking?',
    a: 'Yes. You can extend the ride subject to chauffeur availability and additional hourly charges.',
  },
  {
    q: 'Do you cover all of Mumbai?',
    a: 'Yes. Hansflow operates across Mumbai including South Mumbai, BKC, Andheri, Powai, Navi Mumbai, Thane, and airport routes.',
  },
  {
    q: 'Do you provide corporate accounts?',
    a: 'Yes. We support recurring bookings, monthly billing, GST invoices, and executive chauffeur plans for companies.',
  },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-5 select-none">
      <img src="/assets/images/logo_light.png" alt="Hansflow Logo" className="h-[68px] w-auto object-contain filter invert" />
      <div>
        <div className="text-[1.6rem] font-semibold tracking-[0.38em] text-[#071b46] leading-none">HANSFLOW</div>
        <div className="text-[1.07rem] tracking-[0.35em] text-[#8a8f98] mt-1.5">DRIVE WITH GRACE</div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a15a]">{eyebrow}</div>
      ) : null}
      <h2 className="font-serif text-3xl leading-tight text-[#071b46] md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-sm leading-7 text-[#5d6470] md:text-base">{subtitle}</p> : null}
    </div>
  );
}

function BookingField({ label, placeholder, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#5d6470]">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-2xl border border-[#e6e8ee] bg-white px-4 py-3 shadow-sm transition focus-within:border-[#c8a15a]">
        <Icon className="h-4 w-4 shrink-0 text-[#c8a15a]" />
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-[#97a0ad]"
          placeholder={placeholder}
        />
      </div>
    </label>
  );
}

export default function HansFlowLandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState('Hourly Rental');
  const [activeFaq, setActiveFaq] = useState(0);

  const tripTabs = ['Hourly Rental', 'Airport Transfer', 'Outstation', 'Corporate'];

  const heroImage = useMemo(
    () => '/assets/images/hero_car.jpg',
    []
  );

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-[#111827]">
      <style>{`
        .glass { backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
        .text-balance { text-wrap: balance; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/75 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <LogoMark />

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-[#1f2430] transition hover:text-[#c8a15a]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href="tel:+917977760702" className="flex items-center gap-2 text-sm font-medium text-[#1f2430]">
              <Phone className="h-4 w-4 text-[#c8a15a]" />
              +91 79777 60702
            </a>
            <a
              href="#booking"
              className="rounded-full bg-[#c8a15a] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#c8a15a]/25 transition hover:translate-y-[-1px] hover:bg-[#b68f3e]"
            >
              Book Your Ride
            </a>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e6e8ee] bg-white text-[#071b46] lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-[#e6e8ee] bg-white px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="py-2 text-sm font-medium text-[#1f2430]">
                  {item}
                </a>
              ))}
              <a href="#booking" className="mt-2 rounded-full bg-[#c8a15a] px-5 py-3 text-center text-sm font-semibold text-white">
                Book Your Ride
              </a>
            </div>
          </div>
        ) : null}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-[#071b46] text-white">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury chauffeur service" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071b46] via-[#071b46]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071b46] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f4d9a1]">
                  Premium chauffeur service in Mumbai
                </div>
                <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-[1.02] text-balance md:text-7xl">
                  Drive with Grace.
                  <br />
                  Arrive in Style.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
                  Book luxury chauffeur-driven cars by the hour for meetings, airport transfers, weddings, corporate travel,
                  and private city rides across Mumbai.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 rounded-full bg-[#c8a15a] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:translate-y-[-1px] hover:bg-[#b68f3e]"
                  >
                    Book Your Ride <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#fleet"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Explore Fleet <ChevronRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 glass">
                      <div className="font-serif text-2xl text-[#f6dfb0]">{s.value}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/77">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative mx-auto max-w-xl"
              >
                <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] glass">
                  <video
                    src="https://ik.imagekit.io/35gxst7xf/example.com"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-[420px] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 right-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white shadow-2xl glass">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-[#f4d9a1]" />
                    Five-star hospitality
                  </div>
                  <div className="mt-1 text-xs text-white/75">Professional chauffeur • spotless vehicle • on-time service</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="relative -mt-10 px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#e8ebf2] bg-white p-5 shadow-[0_25px_80px_rgba(7,27,70,0.12)] md:p-6">
          <div className="flex flex-wrap items-center gap-3 border-b border-[#eef1f5] pb-4">
            {tripTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTrip(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTrip === tab ? 'bg-[#071b46] text-white' : 'bg-[#f7f8fb] text-[#556070] hover:bg-[#eef2f8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[repeat(6,minmax(0,1fr))_170px]">
            <BookingField label="Pickup Location" placeholder="e.g. Marol, Andheri East" icon={MapPin} />
            <BookingField label="Drop Location" placeholder="e.g. Mumbai Airport" icon={MapPin} />
            <BookingField label="Date" placeholder="Select date" icon={CalendarDays} />
            <BookingField label="Time" placeholder="Select time" icon={Clock3} />
            <BookingField label="Duration" placeholder="Select duration" icon={BadgeIndianRupee} />
            <BookingField label="Vehicle" placeholder="Select vehicle" icon={CarFront} />
            <div className="flex items-end">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#071b46] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#071b46]/25 transition hover:bg-[#0a245e]">
                Book Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: BadgeCheck, title: 'Professional Chauffeurs', desc: 'Verified drivers trained for premium hospitality and safe driving.' },
            { icon: ShieldCheck, title: 'Luxury Fleet', desc: 'Well-maintained sedans and SUVs for every kind of trip.' },
            { icon: Clock3, title: 'Hourly Bookings', desc: 'Choose 2, 4, 8 hours, or a full day based on your schedule.' },
            { icon: MapPin, title: 'Across Mumbai', desc: 'Service available from South Mumbai to Navi Mumbai, Thane, and airport routes.' },
          ].map((f) => (
            <div key={f.title} className="rounded-[1.6rem] border border-[#e9edf4] bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7e8] text-[#c8a15a]">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#071b46]">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#5d6470]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="bg-[#071b46] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f4d9a1]">Our Fleet</div>
              <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">Choose your perfect ride</h2>
            </div>
            <a href="#contact" className="hidden text-sm font-semibold text-[#f4d9a1] md:inline-flex items-center gap-2">
              View all vehicles <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {fleet.map((car) => (
              <div key={car.name} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <img src={car.image} alt={car.name} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <div className="text-lg font-semibold">{car.name}</div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-white/75">
                    <span className="inline-flex items-center gap-2"><CarFront className="h-4 w-4 text-[#f4d9a1]" /> {car.seats}</span>
                    <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#f4d9a1]" /> {car.bags}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-2xl font-semibold text-[#f4d9a1]">{car.price}</div>
                      <div className="text-xs uppercase tracking-[0.22em] text-white/60">/day</div>
                    </div>
                    <button className="rounded-full border border-[#f4d9a1]/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#f4d9a1] hover:text-[#071b46]">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Services Designed Around You"
            title="Built for every premium travel moment"
            subtitle="From airport transfers to corporate travel, Hansflow is designed for smooth, reliable, chauffeur-led journeys throughout Mumbai."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((s) => (
              <div key={s.title} className="rounded-[1.5rem] border border-[#e8ebf2] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071b46] text-[#f4d9a1]">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#071b46]">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5d6470]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + Pricing */}
      <section id="pricing" className="px-4 pb-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-2">
          <div className="rounded-[2rem] bg-[#071b46] p-8 text-white shadow-[0_20px_70px_rgba(7,27,70,0.18)] md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f4d9a1]">How It Works</div>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">Simple booking, premium experience</h3>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                ['01', 'Choose Your Ride', 'Select your preferred vehicle from our fleet.'],
                ['02', 'Choose Time & Location', 'Enter pickup, drop, date, time, and duration.'],
                ['03', 'Chauffeur Arrives', 'Your professional chauffeur reaches on time.'],
                ['04', 'Enjoy the Ride', 'Relax and travel in comfort and style.'],
              ].map(([num, title, desc]) => (
                <div key={num} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4d9a1] text-sm font-bold text-[#071b46]">
                    {num}
                  </div>
                  <div className="mt-4 text-lg font-semibold">{title}</div>
                  <p className="mt-2 text-sm leading-7 text-white/75">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e8ebf2] bg-white p-8 shadow-sm md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a15a]">Pricing</div>
            <h3 className="mt-3 font-serif text-3xl text-[#071b46] md:text-4xl">Hourly plans that keep things simple</h3>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {pricing.map((p) => (
                <div key={p.title} className="rounded-[1.5rem] border border-[#eef1f5] bg-[#fbfcfe] p-5">
                  <div className="text-lg font-semibold text-[#071b46]">{p.title}</div>
                  <div className="mt-2 font-serif text-3xl text-[#c8a15a]">{p.price}</div>
                  <p className="mt-2 text-sm text-[#5d6470]">{p.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-[#eef1f5] bg-[#f7f8fb] p-5 text-sm leading-7 text-[#4d5560]">
              Need a custom corporate package, wedding convoy, or outstation plan? Contact us directly for tailor-made solutions.
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="bg-[#f1f4f9] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Testimonials"
            title="Trusted by people who expect more"
            subtitle="Every ride is designed to feel calm, polished, and professional from the first booking step to the final drop-off."
          />

          <div className="mt-10 grid gap-5 xl:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-[1.5rem] border border-[#e8ebf2] bg-white p-6 shadow-sm">
                <div className="flex gap-1 text-[#c8a15a]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-[#4d5560]">“{t.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071b46] text-sm font-semibold text-white">
                    {t.name
                      .split(' ')
                      .map((s) => s[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-[#071b46]">{t.name}</div>
                    <div className="text-sm text-[#6b7280]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="FAQ"
              title="Questions people usually ask before booking"
              subtitle="Clear answers help users move from interest to booking faster."
            />
            <div className="mt-8 space-y-3">
              {faq.map((item, idx) => {
                const open = activeFaq === idx;
                return (
                  <button
                    key={item.q}
                    onClick={() => setActiveFaq(open ? -1 : idx)}
                    className="w-full rounded-[1.3rem] border border-[#e8ebf2] bg-white p-5 text-left shadow-sm focus:outline-none"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-[#071b46]">{item.q}</span>
                      <ChevronRight className={`h-4 w-4 shrink-0 text-[#c8a15a] transition ${open ? 'rotate-90' : ''}`} />
                    </div>
                    {open ? <p className="mt-3 text-sm leading-7 text-[#5d6470]">{item.a}</p> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="corporate" className="overflow-hidden rounded-[2rem] bg-[#071b46] text-white shadow-[0_20px_70px_rgba(7,27,70,0.2)]">
            <div className="grid h-full gap-0 lg:grid-cols-2">
              <div className="p-8 md:p-10">
                <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f4d9a1]">Corporate / VIP</div>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl">Experience chauffeur luxury every time</h3>
                <p className="mt-4 max-w-md text-sm leading-8 text-white/75">
                  Build the premium transport layer for your business, events, and high-value customers with a service that feels
                  dependable and refined.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="rounded-full bg-[#c8a15a] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#b68f3e]">
                    Request a Quote
                  </a>
                  <a href="#fleet" className="rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                    View Fleet
                  </a>
                </div>
              </div>

              <div className="relative min-h-[280px]">
                <img
                  src="/assets/images/lifestyle_drive.jpg"
                  alt="Luxury sedan on a city road"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#071b46] via-[#071b46]/25 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#f7f8fb] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-[#e8ebf2] bg-white p-8 shadow-sm md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a15a]">Contact</div>
            <h3 className="mt-3 font-serif text-3xl text-[#071b46] md:text-4xl">Book your next ride with Hansflow</h3>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[#5d6470]">
              Get in touch with our team for immediate bookings, custom itinerary support, and corporate transport solutions.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <BookingField label="Full Name" placeholder="Your name" icon={BadgeCheck} />
              <BookingField label="Phone Number" placeholder="Your phone number" icon={Phone} />
              <BookingField label="Email Address" placeholder="Your email" icon={Mail} />
              <BookingField label="Service Needed" placeholder="Hourly / Airport / Corporate" icon={ShieldCheck} />
            </div>

            <div className="mt-4">
              <label className="block">
                <span className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#5d6470]">Message</span>
                <textarea
                  rows={5}
                  className="w-full rounded-2xl border border-[#e6e8ee] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#97a0ad] focus:border-[#c8a15a]"
                  placeholder="Tell us about your trip, location, date, time, and vehicle preference"
                />
              </label>
            </div>

            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#071b46] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#071b46]/20 transition hover:bg-[#0a245e]">
              Send Enquiry <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-[2rem] bg-[#071b46] p-8 text-white shadow-[0_20px_70px_rgba(7,27,70,0.2)] md:p-10">
            <LogoMark />
            <p className="mt-6 text-sm leading-8 text-white/75">
              Premium chauffeur-driven car rentals across Mumbai with a calm, polished, five-star booking experience.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[#f4d9a1]" />
                <span>+91 79777 60702</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[#f4d9a1]" />
                <span>support@hansflow.rent</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#f4d9a1]" />
                <span>Marol, Andheri East, Mumbai, India</span>
              </div>
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#f4d9a1]">
                <CheckCircle2 className="h-4 w-4" />
                Available Across Mumbai
              </div>
              <p className="mt-2 text-sm leading-7 text-white/75">
                South Mumbai, BKC, Powai, Andheri East, Navi Mumbai, Thane, airport routes, and premium hotel pickups.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 text-white/80">
              <a href="#" className="transition hover:text-[#f4d9a1]"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="transition hover:text-[#f4d9a1]"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="transition hover:text-[#f4d9a1]"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8ebf2] bg-white px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#6b7280] md:flex-row md:items-center md:justify-between">
          <div>© 2026 Hansflow. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-[#071b46]">Privacy</a>
            <a href="#" className="hover:text-[#071b46]">Terms</a>
            <a href="#" className="hover:text-[#071b46]">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
