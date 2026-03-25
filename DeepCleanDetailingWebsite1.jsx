import React, { useMemo, useState } from "react";

const services = [
  {
    id: "light",
    name: "Essential Detail",
    price: 60,
    badge: "Clean Maintenance",
    description:
      "This is not just a quick wipe down. The Essential Detail is for customers who want their vehicle cleaned the right way with real attention to the areas people usually miss. We vacuum thoroughly, wipe down surfaces with care, clean the glass properly, and use brushes and detail tools to work through vents, seams, cracks, and tighter interior spaces so the vehicle feels fresher, cleaner, and better cared for when we are done.",
    features: [
      "Gentle exterior hand wash",
      "Wheel face and tire cleaning",
      "Streak-free glass cleaned inside and out",
      "Interior vacuum for seats, floors, mats, and edges",
      "Dashboard, console, cupholders, and door panels cleaned",
      "Brush work in cracks, seams, vents, and tighter crevice areas",
    ],
    time: "45–60 min",
  },
  {
    id: "medium",
    name: "Signature Detail",
    price: 90,
    badge: "Most Popular",
    description:
      "The Signature Detail is for vehicles that need a more complete reset. This package goes beyond the basics and gives more time to the areas that collect dust, grime, crumbs, fingerprints, and everyday buildup. We use brushes, towels, and detail tools to work through cupholders, trim lines, seams, vents, and other hard-to-reach spots so the interior feels noticeably cleaner and the vehicle looks much more put together overall.",
    features: [
      "Everything in the Essential Detail",
      "More detailed vacuum throughout cabin and trunk",
      "Door jamb wipe down",
      "Interior plastics cleaned and dressed",
      "Seat surfaces cleaned and refreshed",
      "Extra brush and crevice work throughout the cabin plus spray wax and tire shine finish",
    ],
    time: "1.5–2 hrs",
  },
  {
    id: "heavy",
    name: "Deep Clean Detail",
    price: 160,
    badge: "Full Interior Reset",
    description:
      "This is the service for vehicles that need serious attention. The Deep Clean Detail is built for heavier dirt, buildup, pet hair, neglected interior areas, and the kind of mess that needs more than a surface-level cleanup. We spend real time working through crevices, trim, panels, problem areas, and buildup with a more hands-on process so the vehicle does not just look better on the surface — it feels brought back to life.",
    features: [
      "Everything in the Signature Detail",
      "Deep wipe down of harder-to-reach interior areas",
      "Heavier grime and buildup removal",
      "Crevice, trim, panel, and brush detail work throughout the vehicle",
      "Spot treatment for light stains",
      "Extra service time for heavily used vehicles, neglected interiors, and problem areas",
    ],
    time: "2.5–4 hrs",
  },
];

const addOns = [
  { name: "Pet Hair Removal", price: 25 },
  { name: "Seat Spot Treatment", price: 20 },
  { name: "Spray Wax Upgrade", price: 15 },
  { name: "Odor Refresh", price: 20 },
];

const testimonials = [
  {
    name: "James R.",
    text: "Showed up on time, worked hard, and treated my SUV like it mattered. The whole experience felt professional and respectful.",
  },
  {
    name: "Alyssa T.",
    text: "It did not feel rushed at all. My car looked cleaner, felt fresher, and the booking process was simple.",
  },
  {
    name: "Marcus D.",
    text: "Super convenient and easy to work with. I liked that they came to me and still gave my car real attention.",
  },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  vehicle: "",
  date: "",
  time: "",
  condition: 3,
  notes: "",
};

function getActiveService(serviceId) {
  return services.find((service) => service.id === serviceId) || services[1];
}

function calculateDeposit(price) {
  return Math.max(0, Math.round(Number(price || 0) * 0.25));
}

function getConditionLabel(value) {
  const numericValue = Number(value);

  if (numericValue <= 1) {
    return "Not bad";
  }

  if (numericValue === 2) {
    return "Lightly dirty";
  }

  if (numericValue === 3) {
    return "Average use";
  }

  if (numericValue === 4) {
    return "Pretty dirty";
  }

  return "Needs major TLC";
}

function validateBookingForm(form) {
  const requiredFields = ["name", "phone", "address", "vehicle", "date", "time"];
  const missing = requiredFields.filter((field) => !String(form[field] || "").trim());

  if (missing.length > 0) {
    return {
      isValid: false,
      message: `Please fill out: ${missing.join(", ")}`,
    };
  }

  if (Number(form.condition) < 1 || Number(form.condition) > 5) {
    return {
      isValid: false,
      message: "Please choose how dirty the vehicle is.",
    };
  }

  return {
    isValid: true,
    message: "Looks good.",
  };
}

function runSelfChecks() {
  console.assert(getActiveService("light").price === 60, "Essential Detail should be $60");
  console.assert(getActiveService("medium").price === 90, "Signature Detail should be $90");
  console.assert(getActiveService("heavy").price === 160, "Deep Clean Detail should be $160");
  console.assert(getActiveService("missing").id === "medium", "Fallback service should be medium");
  console.assert(calculateDeposit(60) === 15, "25% deposit for $60 should be $15");
  console.assert(calculateDeposit(90) === 23, "25% deposit for $90 should round to $23");
  console.assert(calculateDeposit(160) === 40, "25% deposit for $160 should be $40");
  console.assert(services[0].name === "Essential Detail", "First package should be Essential Detail");
  console.assert(services[2].name === "Deep Clean Detail", "Top package should be Deep Clean Detail");
  console.assert(addOns.length === 4, "There should be four add-ons listed");
  console.assert(getConditionLabel(1) === "Not bad", "Slider start label should be Not bad");
  console.assert(getConditionLabel(5) === "Needs major TLC", "Slider max label should be Needs major TLC");
  console.assert(
    validateBookingForm({
      ...initialForm,
      name: "Dera",
      phone: "555",
      address: "123 Main",
      vehicle: "SUV",
      date: "2026-03-24",
      time: "10:00",
      condition: 4,
    }).isValid === true,
    "A complete booking form should validate"
  );
  console.assert(
    validateBookingForm({
      ...initialForm,
      name: "Dera",
      phone: "555",
      address: "123 Main",
      vehicle: "SUV",
      date: "2026-03-24",
      time: "10:00",
      condition: 8,
    }).isValid === false,
    "An out-of-range condition value should not validate"
  );
  console.assert(validateBookingForm(initialForm).isValid === false, "An empty form should not validate");
}

runSelfChecks();

function IconWrap({ children }) {
  return <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d4af37]/15">{children}</div>;
}

function CarIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M5 16l1.2-4.2A2 2 0 0 1 8.1 10h7.8a2 2 0 0 1 1.9 1.8L19 16" />
      <path d="M3 16h18v3a1 1 0 0 1-1 1h-1v-1.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5V20H4a1 1 0 0 1-1-1v-3Z" />
      <circle cx="7.5" cy="16.5" r="1.2" />
      <circle cx="16.5" cy="16.5" r="1.2" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ClockIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function CardIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function DropIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 3c2.8 3.4 5 6.2 5 9a5 5 0 1 1-10 0c0-2.8 2.2-5.6 5-9Z" />
    </svg>
  );
}

function MapPinIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function PhoneIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6.5 4.5h3l1.2 3.1-1.7 1.7a14 14 0 0 0 5.4 5.4l1.7-1.7 3.1 1.2v3A1.5 1.5 0 0 1 17.7 20C10.1 19.6 4.4 13.9 4 6.3A1.5 1.5 0 0 1 5.5 4.5Z" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z" />
      <path d="m9.5 12 1.7 1.7L15 10" />
    </svg>
  );
}

function SparklesIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3Z" />
      <path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />
      <path d="m6 14 .8 2.2L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8L6 14Z" />
    </svg>
  );
}

function StarIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8L12 3.6Z" />
    </svg>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]/80">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">{subtitle}</p>
    </div>
  );
}

function LuxuryCard({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-[#d4af37]/15 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

export default function LuxuryMobileDetailingWebsite() {
  const [selectedService, setSelectedService] = useState("medium");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const activeService = useMemo(() => getActiveService(selectedService), [selectedService]);
  const deposit = useMemo(() => calculateDeposit(activeService.price), [activeService.price]);
  const conditionLabel = useMemo(() => getConditionLabel(form.condition), [form.condition]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    const validation = validateBookingForm(form);

    if (!validation.isValid) {
      setStatus(validation.message);
      return;
    }

    setStatus(
      `Booking request submitted for ${activeService.name} — $${activeService.price}. Vehicle condition noted as: ${conditionLabel}. Thank you for reaching out to Deep Clean Detailing LLC. Appointments are not guaranteed until accepted.`
    );
  };

  const handlePaymentClick = () => {
    setStatus(
      `Payment link goes here once you connect Stripe, Square, or PayPal. Suggested deposit for ${activeService.name}: $${deposit}. Appointments are not guaranteed until accepted.`
    );
  };

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return null;
}
