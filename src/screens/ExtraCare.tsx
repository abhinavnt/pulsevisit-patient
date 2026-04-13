import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Card, ScreenWrapper, TopBar } from '../components/UI';
import { useAppContext } from '../store';
import {
  MapPin, Phone, Star, CheckCircle2, Clock, ShieldCheck,
  Video, Mic, MicOff, VideoOff, User, MessageSquare,
  AlertTriangle, Package, Download, FileText, Plus, Minus,
  Calendar, ChevronRight, Zap, Heart
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// DIETITIAN BOOKING
// ─────────────────────────────────────────────────────────────

const DIET_SPECIALITIES = [
  { id: 'diabetes', icon: '🍬', label: 'Diabetes Management', desc: 'Blood sugar & insulin control' },
  { id: 'weight', icon: '⚖️', label: 'Weight Management', desc: 'Healthy weight loss & gain' },
  { id: 'sports', icon: '🏃', label: 'Sports Nutrition', desc: 'Performance & recovery diet' },
  { id: 'general', icon: '🌿', label: 'General Wellness', desc: 'Balanced everyday nutrition' },
];

export const DietitianBooking = () => {
  const { navigate, goBack } = useAppContext();
  const [mode, setMode] = useState<'video' | 'inperson' | ''>('');
  const [speciality, setSpeciality] = useState('');
  const [sessionType, setSessionType] = useState<'onetime' | 'plan' | ''>('');

  const canContinue = mode !== '' && speciality !== '' && sessionType !== '';

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Book a Dietitian" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">

        {/* Mode */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Session Mode</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { id: 'video', icon: '📹', label: 'Video Call', desc: 'Remote consultation' },
            { id: 'inperson', icon: '🏠', label: 'In-Person', desc: 'Dietitian visits you' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as 'video' | 'inperson')}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${mode === m.id ? 'border-green-500 bg-green-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <div className="text-2xl mb-2">{m.icon}</div>
              <p className={`font-semibold text-sm ${mode === m.id ? 'text-green-700' : 'text-gray-900'}`}>{m.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
              {mode === m.id && <CheckCircle2 className="w-4 h-4 text-green-500 mt-2" />}
            </button>
          ))}
        </div>

        {/* Speciality */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Area of Focus</h3>
        <div className="flex flex-col gap-2.5 mb-6">
          {DIET_SPECIALITIES.map(s => (
            <button
              key={s.id}
              onClick={() => setSpeciality(s.id)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all text-left ${speciality === s.id ? 'border-green-500 bg-green-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <span className="text-xl w-8 text-center shrink-0">{s.icon}</span>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${speciality === s.id ? 'text-green-700' : 'text-gray-900'}`}>{s.label}</p>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
              {speciality === s.id && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Session type */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Session Type</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { id: 'onetime', label: 'One-time', desc: 'Single consultation' },
            { id: 'plan', label: 'Follow-up Plan', desc: '3, 6, or 12 sessions' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSessionType(t.id as 'onetime' | 'plan')}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${sessionType === t.id ? 'border-green-500 bg-green-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <p className={`font-semibold text-sm ${sessionType === t.id ? 'text-green-700' : 'text-gray-900'}`}>{t.label}</p>
              <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Button
            onClick={() => navigate(mode === 'inperson' ? 'ConfirmLocation' : 'SearchingDietitian')}
            disabled={!canContinue}
            className="bg-green-600 hover:bg-green-700"
          >
            {mode === 'inperson' ? 'Confirm & Choose Location' : 'Find a Dietitian'}
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// SEARCHING DIETITIAN
// ─────────────────────────────────────────────────────────────

export const SearchingDietitian = () => {
  const { navigate, goBack } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => navigate('DietitianAccepted'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-white items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow-sm border border-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        {[1, 2, 3].map(i => (
          <motion.div key={i} animate={{ scale: [1, 2, 3], opacity: [0.4, 0.15, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: 'easeOut' }} className="absolute inset-0 bg-green-400/20 rounded-full" />
        ))}
        <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center z-10 shadow-lg shadow-green-600/30 text-4xl">🥗</div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Finding the right<br />dietitian for you</h2>
      <p className="text-gray-500 mb-12 text-center text-sm">Matching based on your speciality</p>

      <div className="absolute bottom-12 w-full px-6">
        <Button variant="outline" onClick={goBack} className="border-red-200 text-red-500 hover:bg-red-50">Cancel</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// DIETITIAN ACCEPTED
// ─────────────────────────────────────────────────────────────

export const DietitianAccepted = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-green-600 text-white items-center justify-center px-6 relative overflow-hidden">
      {[1, 2, 3].map(i => (
        <motion.div key={i} animate={{ scale: [1, 1.5, 2.5], opacity: [0.15, 0.05, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 1, ease: 'easeOut' }} className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-64 h-64 pointer-events-none" />
      ))}

      <div className="flex flex-col items-center justify-center flex-1 w-full mt-8">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }} className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }} className="w-20 h-20 rounded-full border-[4px] border-green-500 flex items-center justify-center bg-green-500/5">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }} d="M20 6L9 17l-5-5" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-center relative z-10 w-full px-2">
          <h2 className="text-[30px] font-extrabold mb-3 tracking-tight leading-tight text-white">Dietitian Matched!</h2>
          <p className="text-white/90 text-base font-medium leading-relaxed max-w-[300px] mx-auto mb-8">
            Dt. Sneha Sharma is ready for your nutrition session.
          </p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-left border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">RD Certified Clinical Dietitian</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">Session starts in 5 mins</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">Personalized meal plan included</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="w-full pb-8 pt-6 relative z-10">
        <Button variant="custom" className="bg-white text-green-600 hover:bg-gray-50 shadow-xl text-lg py-4 font-bold rounded-2xl w-full" onClick={() => navigate('DietitianSession')}>
          Join Session
        </Button>
        <p className="text-center text-white/80 text-xs mt-4 font-medium">Payment collected after session ends.</p>
      </motion.div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// DIETITIAN SESSION (Video Call)
// ─────────────────────────────────────────────────────────────

export const DietitianSession = () => {
  const { navigate } = useAppContext();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <ScreenWrapper className="bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 to-gray-900 flex items-center justify-center">
        <div className="w-32 h-32 bg-green-500/30 rounded-full flex items-center justify-center text-6xl">🥗</div>
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white font-bold text-lg">Dt. Sneha Sharma</p>
          <p className="text-gray-400 text-sm">Clinical Dietitian</p>
        </div>
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full z-10">
        <p className="text-white font-mono font-bold text-sm">{fmt(elapsed)}</p>
      </div>

      <div className="absolute top-16 right-4 w-24 h-32 bg-gray-700 rounded-2xl border-2 border-white/20 overflow-hidden flex items-center justify-center z-10">
        {videoOff ? <VideoOff className="w-6 h-6 text-gray-400" /> : <User className="w-8 h-8 text-gray-400" />}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-6 pb-10 z-10">
        <div className="flex justify-center gap-6 mb-4">
          <button onClick={() => setMuted(m => !m)} className={`w-14 h-14 rounded-full flex items-center justify-center ${muted ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}>
            {muted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </button>
          <button onClick={() => navigate('RatingFeedback')} className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg active:scale-95">
            <Phone className="w-7 h-7 text-white rotate-[135deg]" />
          </button>
          <button onClick={() => setVideoOff(v => !v)} className={`w-14 h-14 rounded-full flex items-center justify-center ${videoOff ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}>
            {videoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
          </button>
        </div>
        <p className="text-center text-gray-400 text-xs">Tap the red button to end session</p>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// VACCINATION BOOKING
// ─────────────────────────────────────────────────────────────

const VACCINES = [
  { id: 'flu', icon: '🤧', name: 'Influenza (Flu)', dose: 'Single dose · Annual', price: '₹799' },
  { id: 'covid', icon: '🦠', name: 'COVID-19 Booster', dose: 'Single dose · Pfizer / Covishield', price: '₹999' },
  { id: 'hep', icon: '🛡️', name: 'Hepatitis B', dose: '3-dose series · Monthly', price: '₹649/dose' },
  { id: 'typhoid', icon: '💊', name: 'Typhoid', dose: 'Single dose · Every 3 years', price: '₹549' },
  { id: 'pneumo', icon: '🫁', name: 'Pneumococcal', dose: 'Single dose · Recommended 65+', price: '₹1,299' },
  { id: 'mmr', icon: '🧒', name: 'MMR (Measles, Mumps, Rubella)', dose: '2-dose series', price: '₹699/dose' },
];

export const VaccinationBooking = () => {
  const { navigate, goBack } = useAppContext();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Home Vaccination" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">
        <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-2xl p-4 mb-6">
          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center shrink-0 text-xl">💉</div>
          <div>
            <p className="text-sm font-semibold text-sky-800">At-Home Vaccination</p>
            <p className="text-xs text-sky-600 mt-0.5">A certified vaccinator brings the vaccine to your door in a sterile kit</p>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-900 mb-4">Select Vaccine(s)</h3>
        <div className="flex flex-col gap-3 mb-6">
          {VACCINES.map(v => {
            const isSelected = selected.includes(v.id);
            return (
              <button
                key={v.id}
                onClick={() => toggle(v.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${isSelected ? 'border-sky-500 bg-sky-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${isSelected ? 'bg-sky-100' : 'bg-gray-100'}`}>{v.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${isSelected ? 'text-sky-700' : 'text-gray-900'}`}>{v.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{v.dose}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-xs font-bold ${isSelected ? 'text-sky-700' : 'text-gray-600'}`}>{v.price}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-sky-500 bg-sky-500' : 'border-gray-300'}`}>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-sky-50 border border-sky-200 rounded-2xl p-4 mb-4">
            <p className="text-sm font-semibold text-sky-800">{selected.length} vaccine{selected.length > 1 ? 's' : ''} selected</p>
            <p className="text-xs text-sky-600 mt-1">Delivery address: 123 Health Ave, Medical District</p>
          </motion.div>
        )}

        <div className="mt-auto pt-4">
          <Button
            onClick={() => navigate('SearchingVaccinator')}
            disabled={selected.length === 0}
            className="bg-sky-500 hover:bg-sky-600"
          >
            Confirm & Book Vaccinator
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// SEARCHING VACCINATOR
// ─────────────────────────────────────────────────────────────

export const SearchingVaccinator = () => {
  const { navigate, goBack } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => navigate('VaccinatorEnRoute'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-white items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow-sm border border-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        {[1, 2, 3].map(i => (
          <motion.div key={i} animate={{ scale: [1, 2, 3], opacity: [0.4, 0.15, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: 'easeOut' }} className="absolute inset-0 bg-sky-400/20 rounded-full" />
        ))}
        <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center z-10 shadow-lg shadow-sky-500/30 text-4xl">💉</div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Dispatching a certified<br />vaccinator</h2>
      <p className="text-gray-500 mb-12 text-center text-sm">Vaccines are stored in sterile cold-chain kits</p>

      <div className="absolute bottom-12 w-full px-6">
        <Button variant="outline" onClick={goBack} className="border-red-200 text-red-500 hover:bg-red-50">Cancel Request</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// VACCINATOR EN ROUTE
// ─────────────────────────────────────────────────────────────

export const VaccinatorEnRoute = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background relative">
      <div className="absolute inset-0 z-0 bg-gray-200">
        <img src="https://developers.google.com/static/maps/documentation/maps-static/images/map-warning.png" alt="Map" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none">
          <path d="M200 600 Q 155 380 245 195" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 10" />
          <circle cx="200" cy="600" r="8" fill="#1FA97A" />
          <circle cx="245" cy="195" r="12" fill="#0EA5E9" />
        </svg>
      </div>

      <div className="absolute top-0 w-full p-6 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Arriving in</p>
              <p className="text-lg font-bold text-gray-900">14 mins</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">Distance</p>
            <p className="text-sm font-bold text-gray-900">2.2 km</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 p-6 pb-8">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-sky-50 border-2 border-white shadow-md flex items-center justify-center text-2xl shrink-0">💉</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Ramesh Vaccinator</h3>
            <p className="text-sm text-gray-500 font-medium">Certified Immunization Nurse</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-700">4.9</span>
              <span className="text-xs text-gray-400">• 520 vaccinations</span>
            </div>
          </div>
          <button className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-secondary hover:bg-green-100 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3 bg-sky-50 rounded-xl p-3 mb-5">
          <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
          <p className="text-xs text-sky-700 font-medium">Vaccines are transported in WHO-approved cold-chain containers</p>
        </div>
        <Button onClick={() => navigate('Home')} className="bg-sky-500 hover:bg-sky-600">Simulate Vaccination Done</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// EQUIPMENT RENTAL
// ─────────────────────────────────────────────────────────────

const EQUIPMENT_CATEGORIES = [
  {
    category: 'Oxygen & Respiratory',
    items: [
      { id: 'oxygen', icon: '🫁', name: 'Oxygen Concentrator', desc: '5L/min · Home use', price: '₹500/day' },
      { id: 'nebulizer', icon: '💨', name: 'Nebulizer Machine', desc: 'For asthma & COPD', price: '₹150/day' },
    ]
  },
  {
    category: 'Mobility Aids',
    items: [
      { id: 'wheelchair', icon: '♿', name: 'Wheelchair', desc: 'Standard folding, adult', price: '₹200/day' },
      { id: 'walker', icon: '🚶', name: 'Walking Frame / Walker', desc: 'Post-surgery support', price: '₹100/day' },
    ]
  },
  {
    category: 'Monitoring',
    items: [
      { id: 'bp', icon: '🩺', name: 'BP Monitor', desc: 'Auto digital, upper-arm', price: '₹80/day' },
      { id: 'pulse', icon: '❤️', name: 'Pulse Oximeter', desc: 'SpO2 + Heart rate', price: '₹60/day' },
    ]
  },
  {
    category: 'Hospital Furniture',
    items: [
      { id: 'bed', icon: '🛏️', name: 'Hospital Bed', desc: 'Manual adjustable, with rails', price: '₹600/day' },
      { id: 'mattress', icon: '🛋️', name: 'Anti-Bedsore Mattress', desc: 'Air pressure alternating', price: '₹300/day' },
    ]
  },
];

export const EquipmentRental = () => {
  const { navigate, goBack } = useAppContext();
  const [selectedItem, setSelectedItem] = useState('');
  const [days, setDays] = useState(7);

  const canOrder = selectedItem !== '';
  const selectedEquip = EQUIPMENT_CATEGORIES.flatMap(c => c.items).find(i => i.id === selectedItem);

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Medical Equipment" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">

        {/* Categories */}
        {EQUIPMENT_CATEGORIES.map(cat => (
          <div key={cat.category} className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{cat.category}</h3>
            <div className="flex flex-col gap-2.5">
              {cat.items.map(item => {
                const isSelected = selectedItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${isSelected ? 'border-orange-400 bg-orange-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${isSelected ? 'bg-orange-100' : 'bg-gray-100'}`}>{item.icon}</div>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${isSelected ? 'text-orange-700' : 'text-gray-900'}`}>{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`text-xs font-bold ${isSelected ? 'text-orange-600' : 'text-gray-600'}`}>{item.price}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-orange-400 bg-orange-400' : 'border-gray-300'}`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Duration & Summary */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-6">
              <Card className="p-5 border-orange-200 bg-orange-50/20">
                <p className="text-sm font-bold text-gray-900 mb-4">Rental Duration</p>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setDays(d => Math.max(1, d - 1))} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-orange-500">{days}</span>
                    <p className="text-xs text-gray-500 font-medium">days</p>
                  </div>
                  <button onClick={() => setDays(d => Math.min(90, d + 1))} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[3, 7, 14, 30].map(d => (
                    <button key={d} onClick={() => setDays(d)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${days === d ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-200 text-gray-600 bg-white'}`}>{d} days</button>
                  ))}
                </div>
                {selectedEquip && (
                  <div className="mt-4 pt-4 border-t border-orange-100 flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">Estimated Total</span>
                    <span className="text-lg font-bold text-orange-600">
                      ₹{parseInt(selectedEquip.price.replace('₹', '').replace('/day', '')) * days}
                    </span>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-4">
          <Button
            onClick={() => navigate('EquipmentOrderConfirmed')}
            disabled={!canOrder}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Confirm Rental Order
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// EQUIPMENT ORDER CONFIRMED
// ─────────────────────────────────────────────────────────────

export const EquipmentOrderConfirmed = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Order Confirmed" />
      <div className="px-6 py-6 flex flex-col flex-1">
        <div className="flex flex-col items-center text-center mb-8 mt-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-4xl">
            🛏️
          </motion.div>
          <h2 className="text-xl font-bold text-gray-900">Equipment Booked!</h2>
          <p className="text-sm text-gray-500 mt-2 px-4 leading-relaxed">Your medical equipment will be delivered and set up at your home.</p>
        </div>

        <Card className="p-5 mb-4 border-orange-200/60 bg-white">
          <h3 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Order Details</h3>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Order ID</span>
            <span className="text-sm font-bold text-gray-900">#EQP-3341</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Delivery By</span>
            <span className="text-sm font-bold text-gray-900">Today, 4–6 PM</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Rental Period</span>
            <span className="text-sm font-bold text-gray-900">7 days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Security Deposit</span>
            <span className="text-sm font-bold text-gray-900">₹2,000 (refundable)</span>
          </div>
        </Card>

        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl mb-auto">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
          <p className="text-xs text-primary font-medium leading-relaxed">Our technician will deliver, install, and demo the equipment at your home.</p>
        </div>

        <div className="mt-6">
          <Button onClick={() => navigate('Home')}>Back to Home</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// SOS ALERT SCREEN
// ─────────────────────────────────────────────────────────────

export const SOSAlert = () => {
  const { navigate } = useAppContext();
  const [countdown, setCountdown] = useState(5);
  const [dispatched, setDispatched] = useState(false);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    if (countdown === 0) { setDispatched(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  return (
    <ScreenWrapper className="bg-red-600 items-center justify-center px-6 relative overflow-hidden">
      {/* Pulse rings */}
      {[1, 2, 3].map(i => (
        <motion.div key={i} animate={{ scale: [1, 2, 3.5], opacity: [0.4, 0.15, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.4, ease: 'easeOut' }} className="absolute inset-0 m-auto w-48 h-48 bg-white/20 rounded-full" />
      ))}

      <div className="flex flex-col items-center justify-center flex-1 w-full z-10">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }} className="w-36 h-36 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl">
          <span className="text-6xl">🚨</span>
        </motion.div>

        {!dispatched ? (
          <>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">SOS</h1>
            <p className="text-white/90 text-base font-medium mb-6 text-center">Dispatching ALS Ambulance in</p>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/40 mb-8">
              <span className="text-4xl font-black text-white">{countdown}</span>
            </div>
            <button onClick={() => { setCountdown(0); setDispatched(true); }} className="text-white/60 text-sm font-medium underline">Dispatch now</button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Dispatched!</h2>
            <p className="text-white/90 font-medium mb-2">ALS Ambulance · ETA 8 mins</p>
            <p className="text-white/70 text-sm mb-8">Vehicle: KA 01 AB 5678 · Paramedic: Ajay K.</p>
          </motion.div>
        )}
      </div>

      <div className="w-full pb-8 z-10 space-y-3">
        {!notified && (
          <button
            onClick={() => setNotified(true)}
            className="w-full py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white font-semibold text-sm"
          >
            📲 Notify Emergency Contact — Ravi (Brother)
          </button>
        )}
        {notified && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full py-3 bg-white/10 rounded-2xl text-center">
            <p className="text-white text-sm font-medium">✓ Ravi has been notified</p>
          </motion.div>
        )}
        <button onClick={() => navigate('Home')} className="w-full py-4 bg-white/10 rounded-2xl text-white/70 font-medium text-sm">
          Cancel Emergency
        </button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// CARE PACKAGES
// ─────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: 'basic',
    icon: '🏥',
    name: 'Basic Care Plan',
    tagline: 'For everyday health needs',
    color: 'from-blue-500 to-blue-600',
    includes: ['2 Doctor visits', '1 Lab Test (Basic Health)', '₹300 Pharmacy credit'],
    price: '₹1,499',
    originalPrice: '₹2,100',
    duration: '/month',
  },
  {
    id: 'diabetes',
    icon: '🍬',
    name: 'Diabetes Care Pack',
    tagline: 'Comprehensive diabetes management',
    color: 'from-teal-500 to-teal-600',
    includes: ['1 Dietitian session', '1 Diabetes Lab Panel', '2 Nurse monitoring visits', 'Home BP Monitor (7 days)'],
    price: '₹2,999',
    originalPrice: '₹4,500',
    duration: '/month',
  },
  {
    id: 'surgery',
    icon: '🩹',
    name: 'Post-Surgery Recovery',
    tagline: 'Designed for seamless home recovery',
    color: 'from-purple-500 to-purple-600',
    includes: ['7-day Nurse subscription', '2 Doctor follow-ups', '1 Physiotherapy session', 'Equipment rental (as needed)'],
    price: '₹4,999',
    originalPrice: '₹7,200',
    duration: '/package',
  },
  {
    id: 'senior',
    icon: '👴',
    name: 'Senior Care Plan',
    tagline: 'Ongoing care for elderly family',
    color: 'from-amber-500 to-orange-500',
    includes: ['4 Doctor visits', '2 Lab Tests', '4 Nurse visits', 'Vaccination (annual flu)'],
    price: '₹3,499',
    originalPrice: '₹5,600',
    duration: '/month',
  },
];

export const CarePackages = () => {
  const { goBack, navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Care Packages" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col gap-5 pb-12">
        <p className="text-sm text-gray-500">Bundled plans that save money and simplify your healthcare.</p>

        {PACKAGES.map(pkg => (
          <div key={pkg.id} className="rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            {/* Header */}
            <div className={`bg-gradient-to-r ${pkg.color} p-5`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl">{pkg.icon}</span>
                  <h3 className="text-lg font-bold text-white mt-2">{pkg.name}</h3>
                  <p className="text-white/80 text-xs mt-1">{pkg.tagline}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs line-through">{pkg.originalPrice}</p>
                  <p className="text-2xl font-black text-white">{pkg.price}</p>
                  <p className="text-white/80 text-xs">{pkg.duration}</p>
                </div>
              </div>
            </div>

            {/* Includes */}
            <div className="bg-white p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">What's Included</p>
              <div className="flex flex-col gap-2 mb-4">
                {pkg.includes.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('Home')}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 active:scale-[0.98] transition-all"
              >
                Get This Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </ScreenWrapper>
  );
};
