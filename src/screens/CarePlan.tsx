import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Card, ScreenWrapper, TopBar } from '../components/UI';
import { useAppContext } from '../store';
import {
  CheckCircle2, ChevronRight, MapPin, Trash2,
  ShieldCheck, Clock, Star, CreditCard, Zap, ChevronDown, ChevronUp
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// DATA — prototype-level shared state
// ─────────────────────────────────────────────────────────────

export type PlanItem = {
  id: string;
  icon: string;
  service: string;
  detail: string;
  reason: string;
  priority: 'urgent' | 'recommended' | 'optional';
  price: number;
  isReferral?: boolean;
  referralScreen?: string;
};

export const CARE_PLAN_ITEMS: PlanItem[] = [
  {
    id: 'medicine',
    icon: '💊',
    service: 'Medicine Delivery',
    detail: 'Paracetamol 500mg + Azithromycin 500mg',
    reason: 'Prescribed by Dr. Sarah for fever & infection',
    priority: 'urgent',
    price: 280,
  },
  {
    id: 'labtest',
    icon: '🔬',
    service: 'Lab Test — CBC + CRP',
    detail: 'Home sample collection · Results in 24hrs',
    reason: 'To confirm infection level & guide treatment',
    priority: 'urgent',
    price: 599,
  },
  {
    id: 'nurse',
    icon: '🩺',
    service: 'Nurse Follow-up',
    detail: '2-day home monitoring visit',
    reason: 'Post-consultation recovery check recommended',
    priority: 'recommended',
    price: 800,
  },
  {
    id: 'dietitian',
    icon: '🥗',
    service: 'Dietitian Consultation',
    detail: 'Immunity-boosting nutrition plan · Video call',
    reason: 'Dietary support to speed up recovery',
    priority: 'optional',
    price: 799,
  },
  {
    id: 'specialist',
    icon: '🫁',
    service: 'Specialist Referral',
    detail: 'Pulmonologist — if symptoms persist > 5 days',
    reason: 'Precautionary referral for respiratory check',
    priority: 'optional',
    price: 0,
    isReferral: true,
    referralScreen: 'PsychologistBooking', // proxy for demo
  },
];

// Default selection: urgent = pre-selected, recommended = pre-selected, optional = off
const defaultSelected = new Set(
  CARE_PLAN_ITEMS.filter(i => i.priority !== 'optional').map(i => i.id)
);

// Module-level store so state survives screen transitions
export const carePlanStore: { selected: Set<string> } = {
  selected: new Set(defaultSelected),
};

const PRIORITY_META = {
  urgent: {
    label: '🚨 Urgent',
    badge: 'bg-red-100 text-red-600',
    border: 'border-red-200',
    ring: 'ring-red-400',
  },
  recommended: {
    label: '✅ Recommended',
    badge: 'bg-blue-100 text-secondary',
    border: 'border-blue-200',
    ring: 'ring-secondary',
  },
  optional: {
    label: '💡 Optional',
    badge: 'bg-gray-100 text-gray-500',
    border: 'border-gray-200',
    ring: 'ring-gray-300',
  },
};

// ─────────────────────────────────────────────────────────────
// CARE PLAN RECOMMENDED
// ─────────────────────────────────────────────────────────────

export const CarePlanRecommended = () => {
  const { navigate, goBack } = useAppContext();
  const [selected, setSelected] = useState<Set<string>>(new Set(carePlanStore.selected));

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set<string>(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      carePlanStore.selected = next;
      return next;
    });
  };

  const grouped = {
    urgent: CARE_PLAN_ITEMS.filter(i => i.priority === 'urgent'),
    recommended: CARE_PLAN_ITEMS.filter(i => i.priority === 'recommended'),
    optional: CARE_PLAN_ITEMS.filter(i => i.priority === 'optional'),
  };

  const selectedItems = CARE_PLAN_ITEMS.filter(i => selected.has(i.id) && !i.isReferral);
  const total = selectedItems.reduce((s, i) => s + i.price, 0);
  const count = selected.size;

  const PlanItemCard = ({ item }: { item: PlanItem }) => {
    const meta = PRIORITY_META[item.priority];
    const isSelected = selected.has(item.id);

    if (item.isReferral) {
      return (
        <Card
          className={`p-4 border-2 transition-all ${meta.border} bg-gray-50/50`}
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="font-semibold text-sm text-gray-900">{item.service}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.badge}`}>
                  {meta.label}
                </span>
              </div>
              <p className="text-xs text-gray-700 font-medium">{item.detail}</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">"{item.reason}"</p>
            </div>
          </div>
          <button
            onClick={() => navigate(item.referralScreen as any)}
            className="w-full mt-3 py-2.5 rounded-xl border-2 border-secondary text-secondary text-sm font-semibold flex items-center justify-center gap-2 hover:bg-secondary/5 transition-all active:scale-[0.98]"
          >
            Book Specialist <ChevronRight className="w-4 h-4" />
          </button>
        </Card>
      );
    }

    return (
      <button
        onClick={() => toggle(item.id)}
        className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
          isSelected
            ? `${meta.border} bg-white shadow-sm ring-2 ${meta.ring}/20`
            : 'border-gray-100 bg-white hover:bg-gray-50'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0 transition-all ${
            isSelected ? 'bg-white ring-2 ring-offset-1 ' + meta.ring + '/40' : 'bg-gray-50'
          }`}>
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p className={`font-semibold text-sm ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                {item.service}
              </p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.badge}`}>
                {meta.label}
              </span>
            </div>
            <p className="text-xs text-gray-600 font-medium">{item.detail}</p>
            <p className="text-xs text-gray-400 mt-0.5 italic leading-relaxed">"{item.reason}"</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
            <p className="text-sm font-bold text-gray-900">₹{item.price}</p>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected ? `${meta.border} bg-secondary` : 'border-gray-200 bg-white'
            }`}>
              {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Care Plan" onBack={goBack} />

      <div className="px-6 pb-32">
        {/* Doctor context */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-md"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 text-2xl">
            🩺
          </div>
          <div className="flex-1">
            <p className="text-white/80 text-xs font-medium">Post-Consultation Plan</p>
            <p className="text-white font-bold text-sm">Dr. Sarah Jenkins · General Checkup</p>
            <p className="text-white/70 text-xs mt-0.5">Oct 24, 2023 · Review & activate your care</p>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-1.5">
            <p className="text-white text-xs font-bold">{CARE_PLAN_ITEMS.length} items</p>
          </div>
        </motion.div>

        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
          Tap to select • Pre-filled based on consultation
        </p>

        {/* Urgent */}
        <p className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full inline-block" /> Urgent — Act Today
        </p>
        <div className="flex flex-col gap-3 mb-5">
          {grouped.urgent.map(item => <div key={item.id}><PlanItemCard item={item} /></div>)}
        </div>

        {/* Recommended */}
        <p className="text-sm font-bold text-secondary mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-secondary rounded-full inline-block" /> Strongly Recommended
        </p>
        <div className="flex flex-col gap-3 mb-5">
          {grouped.recommended.map(item => <div key={item.id}><PlanItemCard item={item} /></div>)}
        </div>

        {/* Optional */}
        <p className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-300 rounded-full inline-block" /> Optional Add-ons
        </p>
        <div className="flex flex-col gap-3 mb-2">
          {grouped.optional.map(item => <div key={item.id}><PlanItemCard item={item} /></div>)}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-6 pb-8 pt-4 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 font-medium">Selected services</p>
            <p className="text-lg font-bold text-gray-900">
              {count} {count === 1 ? 'item' : 'items'} · <span className="text-secondary">₹{total.toLocaleString()}</span>
            </p>
          </div>
          <button
            onClick={() => {
              carePlanStore.selected = defaultSelected;
              setSelected(new Set(defaultSelected));
            }}
            className="text-xs text-gray-400 hover:text-primary transition-colors"
          >
            Reset
          </button>
        </div>
        <Button
          onClick={() => navigate('CarePlanReview')}
          disabled={selectedItems.length === 0}
        >
          Review My Plan →
        </Button>
      </motion.div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// CARE PLAN REVIEW (Cart)
// ─────────────────────────────────────────────────────────────

export const CarePlanReview = () => {
  const { navigate, goBack } = useAppContext();
  const [items, setItems] = useState<PlanItem[]>(
    CARE_PLAN_ITEMS.filter(i => carePlanStore.selected.has(i.id) && !i.isReferral)
  );

  const remove = (id: string) => {
    const next = new Set(carePlanStore.selected);
    next.delete(id);
    carePlanStore.selected = next;
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const convFee = Math.round(subtotal * 0.03);
  const total = subtotal + convFee;

  const SERVICE_ETA: Record<string, string> = {
    medicine: '45–60 mins',
    labtest: 'Today · 2–4 hrs',
    nurse: 'Tomorrow · 9–11 AM',
    dietitian: 'Today · 5 PM (video)',
    specialist: 'This week',
  };

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Review Your Plan" onBack={goBack} />

      <div className="px-6 pb-36">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">🛒</span>
            <p className="text-gray-500 font-medium">Your plan is empty</p>
            <button onClick={goBack} className="mt-4 text-secondary font-semibold text-sm hover:underline">
              ← Go back and add services
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">
              {items.length} service{items.length > 1 ? 's' : ''} selected
            </p>

            {/* Service cards */}
            <div className="flex flex-col gap-3 mb-6">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 flex items-start gap-3">
                    <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{item.service}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Clock className="w-3 h-3 text-secondary" />
                        <span className="text-xs text-secondary font-semibold">{SERVICE_ETA[item.id]}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <p className="font-bold text-gray-900 text-sm">₹{item.price}</p>
                      <button
                        onClick={() => remove(item.id)}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors active:scale-90"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Delivery address */}
            <Card className="p-4 mb-4 border-secondary/20 bg-green-50/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-medium">Delivery / Visit Address</p>
                  <p className="text-sm font-semibold text-gray-900">123 Health Ave, Medical District</p>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">Change</button>
              </div>
            </Card>

            {/* Order summary */}
            <Card className="p-4 mb-2">
              <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">Order Summary</h3>
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">{item.icon} {item.service}</span>
                  <span className="text-sm font-semibold text-gray-900">₹{item.price}</span>
                </div>
              ))}
              <div className="flex justify-between items-center mb-2 pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500">Convenience fee (3%)</span>
                <span className="text-sm text-gray-600">₹{convFee}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-secondary">₹{total.toLocaleString()}</span>
              </div>
            </Card>

            <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs text-primary font-medium">All services are fulfilled by verified Pulse Care providers</p>
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      {items.length > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-6 pb-8 pt-4 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">{items.length} services</span>
            <span className="text-base font-bold text-gray-900">Total: <span className="text-secondary">₹{total.toLocaleString()}</span></span>
          </div>
          <Button onClick={() => navigate('CarePlanCheckout')}>
            Proceed to Checkout →
          </Button>
        </motion.div>
      )}
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// CARE PLAN CHECKOUT
// ─────────────────────────────────────────────────────────────

export const CarePlanCheckout = () => {
  const { navigate, goBack } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash'>('upi');
  const [orderExpanded, setOrderExpanded] = useState(false);
  const [placing, setPlacing] = useState(false);

  const items = CARE_PLAN_ITEMS.filter(i => carePlanStore.selected.has(i.id) && !i.isReferral);
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const convFee = Math.round(subtotal * 0.03);
  const total = subtotal + convFee;

  const handlePlace = () => {
    setPlacing(true);
    setTimeout(() => navigate('CarePlanConfirmed'), 1800);
  };

  const payMethods = [
    { id: 'upi', icon: '⚡', label: 'UPI', desc: 'Google Pay / PhonePe / Paytm' },
    { id: 'card', icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
    { id: 'cash', icon: '💵', label: 'Cash on Service', desc: 'Pay when service is complete' },
  ] as const;

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Checkout" onBack={goBack} />

      <div className="px-6 pb-36">
        {/* Collapsible order summary */}
        <button
          onClick={() => setOrderExpanded(e => !e)}
          className="w-full flex items-center justify-between p-4 bg-secondary/5 border border-secondary/20 rounded-2xl mb-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🧾</span>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">{items.length} services · ₹{total.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Tap to {orderExpanded ? 'hide' : 'view'} breakdown</p>
            </div>
          </div>
          {orderExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>

        <AnimatePresence>
          {orderExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <Card className="p-4 border-gray-100">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{item.icon} {item.service}</span>
                    <span className="text-sm font-semibold">₹{item.price}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Convenience fee</span>
                  <span className="text-sm">₹{convFee}</span>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Address */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Delivery & Visit Address</h3>
        <Card className="p-4 mb-6 border-secondary/20 bg-green-50/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <MapPin className="w-4 h-4 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">123 Health Ave, Medical District</p>
              <p className="text-xs text-gray-400 mt-0.5">Home · New York, NY 10001</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">Change</button>
          </div>
        </Card>

        {/* Payment method */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Payment Method</h3>
        <div className="flex flex-col gap-3 mb-6">
          {payMethods.map(m => (
            <button
              key={m.id}
              onClick={() => setPaymentMethod(m.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                paymentMethod === m.id
                  ? 'border-secondary bg-green-50/40 shadow-sm'
                  : 'border-gray-100 bg-white hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl w-10 text-center">{m.icon}</span>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${paymentMethod === m.id ? 'text-secondary' : 'text-gray-900'}`}>
                  {m.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                paymentMethod === m.id ? 'border-secondary bg-secondary' : 'border-gray-200'
              }`}>
                {paymentMethod === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </button>
          ))}
        </div>

        {/* Total summary */}
        <Card className="p-4 border-secondary/20 bg-green-50/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-extrabold text-gray-900">₹{total.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{items.length} services</p>
              <div className="flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <p className="text-xs text-secondary font-medium">Secure Payment</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-6 pb-8 pt-4 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
      >
        <Button onClick={handlePlace} disabled={placing}>
          {placing ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                className="inline-block"
              >
                ⏳
              </motion.span>
              Placing Orders…
            </span>
          ) : (
            `⚡ Place All Orders · ₹${total.toLocaleString()}`
          )}
        </Button>
        <p className="text-center text-xs text-gray-400 mt-2">
          You'll receive confirmations for each service separately
        </p>
      </motion.div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// CARE PLAN CONFIRMED
// ─────────────────────────────────────────────────────────────

export const CarePlanConfirmed = () => {
  const { navigate } = useAppContext();

  const items = CARE_PLAN_ITEMS.filter(i => carePlanStore.selected.has(i.id) && !i.isReferral);

  const SERVICE_STATUS: Record<string, { status: string; eta: string; color: string; icon: string }> = {
    medicine: { status: 'Dispatched', eta: 'Arriving in 45–60 mins', color: 'bg-green-100 text-green-700', icon: '🚀' },
    labtest: { status: 'Confirmed', eta: 'Phlebotomist booked · 2–4 hrs', color: 'bg-blue-100 text-blue-700', icon: '✅' },
    nurse: { status: 'Scheduled', eta: 'Tomorrow 9–11 AM', color: 'bg-purple-100 text-purple-700', icon: '📅' },
    dietitian: { status: 'Scheduled', eta: 'Today · 5:00 PM (video)', color: 'bg-amber-100 text-amber-700', icon: '📅' },
  };

  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <ScreenWrapper className="bg-background">
      <div className="px-6 pb-28">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center pt-10 pb-8">
          {/* Animated celebration */}
          <div className="relative mb-6">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.5], opacity: [1, 0], x: Math.cos((i / 8) * Math.PI * 2) * 60, y: Math.sin((i / 8) * Math.PI * 2) * 60 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                style={{ backgroundColor: ['#1FA97A', '#0F3D73', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'][i] }}
              />
            ))}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.3 }}
              className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 relative z-10"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="text-4xl"
              >
                🎉
              </motion.span>
            </motion.div>
          </div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-extrabold text-gray-900 mb-2"
          >
            Care Plan Activated!
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-500 text-sm px-6 leading-relaxed"
          >
            All {items.length} services have been placed. You're on your way to a full recovery. 💪
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mt-3"
          >
            <Zap className="w-4 h-4 text-secondary" />
            <p className="text-xs font-bold text-secondary">₹{total.toLocaleString()} paid · Order #CP-{Math.floor(Math.random() * 9000) + 1000}</p>
          </motion.div>
        </div>

        {/* Per-service status */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Service Status</p>
        <div className="flex flex-col gap-3 mb-6">
          {items.map((item, idx) => {
            const s = SERVICE_STATUS[item.id] ?? { status: 'Confirmed', eta: 'ETA TBD', color: 'bg-gray-100 text-gray-600', icon: '✅' };
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + idx * 0.12 }}
              >
                <Card className="p-4 flex items-center gap-3">
                  <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{item.service}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{s.eta}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.color}`}>
                    {s.icon} {s.status}
                  </span>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-2 bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-4"
        >
          <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">
            After each service, you'll be asked to rate your experience.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col gap-3"
        >
          <Button onClick={() => navigate('Home')}>
            Track All Services on Home
          </Button>
          <button
            onClick={() => navigate('ConsultationHistory')}
            className="text-sm text-gray-400 font-medium py-2 hover:text-primary transition-colors"
          >
            View Consultation History
          </button>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
};
