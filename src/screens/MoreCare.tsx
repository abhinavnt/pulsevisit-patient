import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Card, ScreenWrapper, TopBar } from '../components/UI';
import { useAppContext } from '../store';
import {
  MapPin, Phone, Star, CheckCircle2, Clock, ShieldCheck,
  FileText, Download, Video, Mic, MicOff, VideoOff,
  Calendar, ChevronRight, User, MessageSquare, AlertCircle,
  FlaskConical, Activity, Heart, Brain, Smile
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// LAB TEST BOOKING
// ─────────────────────────────────────────────────────────────

const LAB_PACKAGES = [
  { id: 'basic', icon: '🩸', name: 'Basic Health Package', tests: 'CBC · Blood Sugar · Urine', price: '₹499', popular: true },
  { id: 'diabetes', icon: '🍬', name: 'Diabetes Panel', tests: 'HbA1c · Fasting Sugar · PP Sugar', price: '₹649', popular: false },
  { id: 'lipid', icon: '❤️', name: 'Lipid Profile', tests: 'Cholesterol · Triglycerides · HDL/LDL', price: '₹549', popular: false },
  { id: 'thyroid', icon: '🦋', name: 'Thyroid Panel', tests: 'T3 · T4 · TSH', price: '₹599', popular: false },
  { id: 'kidney', icon: '🫘', name: 'Kidney Function', tests: 'Creatinine · Uric Acid · BUN', price: '₹699', popular: false },
  { id: 'cbc', icon: '🔬', name: 'Complete Blood Count', tests: 'RBC · WBC · Platelets · Hemoglobin', price: '₹349', popular: false },
];

export const LabTestBooking = () => {
  const { navigate, goBack } = useAppContext();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Book Lab Test" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">
        <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0 text-xl">🔬</div>
          <div>
            <p className="text-sm font-semibold text-teal-800">Home Sample Collection</p>
            <p className="text-xs text-teal-600 mt-0.5">A certified phlebotomist will visit your home to collect samples</p>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-900 mb-4">Select Test Package(s)</h3>
        <div className="flex flex-col gap-3 mb-6">
          {LAB_PACKAGES.map(pkg => {
            const isSelected = selected.includes(pkg.id);
            return (
              <button
                key={pkg.id}
                onClick={() => toggle(pkg.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${isSelected ? 'border-teal-500 bg-teal-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${isSelected ? 'bg-teal-100' : 'bg-gray-100'}`}>
                  {pkg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm ${isSelected ? 'text-teal-700' : 'text-gray-900'}`}>{pkg.name}</p>
                    {pkg.popular && <span className="text-[10px] font-bold bg-teal-500 text-white px-2 py-0.5 rounded-full">Popular</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{pkg.tests}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-sm font-bold ${isSelected ? 'text-teal-700' : 'text-gray-700'}`}>{pkg.price}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-teal-500 bg-teal-500' : 'border-gray-300'}`}>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-teal-800">{selected.length} package{selected.length > 1 ? 's' : ''} selected</p>
              <p className="text-sm font-bold text-teal-700">
                Total: ₹{LAB_PACKAGES.filter(p => selected.includes(p.id)).reduce((sum, p) => sum + parseInt(p.price.replace('₹', '')), 0)}
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-auto pt-4">
          <Button onClick={() => navigate('LabTestConfirm')} disabled={selected.length === 0}>
            Review & Confirm
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// LAB TEST CONFIRM
// ─────────────────────────────────────────────────────────────

export const LabTestConfirm = () => {
  const { navigate, goBack } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Confirm Booking" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Selected Tests</h3>
        <Card className="p-4 mb-5">
          <div className="flex items-center gap-3 py-2">
            <span className="text-lg">🩸</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">Basic Health Package</p>
              <p className="text-xs text-gray-400">CBC · Blood Sugar · Urine</p>
            </div>
            <span className="ml-auto text-sm font-bold text-gray-700">₹499</span>
          </div>
          <div className="pt-3 mt-1 border-t border-dashed border-gray-200 flex justify-between">
            <span className="text-sm font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-teal-600">₹499</span>
          </div>
        </Card>

        <h3 className="text-sm font-bold text-gray-900 mb-3">Collection Address</h3>
        <Card className="p-4 border-teal-200 bg-teal-50/20 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
              <MapPin className="w-4 h-4 text-teal-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">123 Health Ave, Medical District</p>
              <p className="text-xs text-gray-500 mt-0.5">Home • Default</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">Change</button>
          </div>
        </Card>

        <h3 className="text-sm font-bold text-gray-900 mb-3">Preferred Time Slot</h3>
        <div className="flex gap-3 mb-6 flex-wrap">
          {['6–8 AM', '8–10 AM', '10–12 PM', 'On-demand'].map((slot, i) => (
            <button
              key={slot}
              className={`px-4 py-2.5 rounded-full border text-xs font-semibold transition-all ${i === 0 ? 'bg-teal-500 text-white border-teal-500' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`}
            >
              {slot}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl mb-auto">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
          <p className="text-xs text-primary font-medium leading-relaxed">
            Samples are collected using sterile equipment. Reports available in-app within 24–48 hours.
          </p>
        </div>

        <div className="mt-8">
          <Button onClick={() => navigate('SearchingPhlebotomist')}>Confirm & Book</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// SEARCHING PHLEBOTOMIST
// ─────────────────────────────────────────────────────────────

export const SearchingPhlebotomist = () => {
  const { navigate, goBack, addBooking } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      addBooking({
        id: 'lab-1',
        type: 'lab',
        providerName: 'Anjali (Lab Tech)',
        status: 'enroute',
        eta: '15 mins',
        icon: '🔬'
      });
      navigate('PhlebotomistEnRoute');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, addBooking]);


  return (
    <ScreenWrapper className="bg-white items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow-sm border border-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        {[1, 2, 3].map(i => (
          <motion.div key={i} animate={{ scale: [1, 2, 3], opacity: [0.4, 0.15, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: 'easeOut' }} className="absolute inset-0 bg-teal-400/20 rounded-full" />
        ))}
        <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center z-10 shadow-lg shadow-teal-500/30 text-4xl">🔬</div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Finding a certified<br />phlebotomist</h2>
      <p className="text-gray-500 mb-12 text-center text-sm">Estimated wait time: 2 mins</p>

      <div className="absolute bottom-12 w-full px-6">
        <Button variant="outline" onClick={goBack} className="border-red-200 text-red-500 hover:bg-red-50">Cancel Request</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// PHLEBOTOMIST EN ROUTE
// ─────────────────────────────────────────────────────────────

import { AnimatedMap } from '../components/Tracking';

export const PhlebotomistEnRoute = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background relative">
      <div className="absolute inset-0 z-0">
        <AnimatedMap type="lab" />
      </div>


      <div className="absolute top-0 w-full p-6 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Arriving in</p>
              <p className="text-lg font-bold text-gray-900">15 mins</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">Distance</p>
            <p className="text-sm font-bold text-gray-900">2.7 km</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 p-6 pb-8">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-teal-50 border-2 border-white shadow-md flex items-center justify-center text-2xl shrink-0">🔬</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Anjali Lab Tech</h3>
            <p className="text-sm text-gray-500 font-medium">Certified Phlebotomist</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-700">4.9</span>
              <span className="text-xs text-gray-400">• 312 collections</span>
            </div>
          </div>
          <button className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-secondary hover:bg-green-100 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-start gap-3 bg-teal-50 rounded-xl p-3 mb-5">
          <AlertCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <p className="text-xs text-teal-700 font-medium leading-relaxed">Please fast for 8–10 hours before blood collection if you selected Diabetes or Lipid tests.</p>
        </div>
        <Button onClick={() => navigate('LabResults')}>Simulate Sample Collected</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// LAB RESULTS
// ─────────────────────────────────────────────────────────────

export const LabResults = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Lab Results" />

      <div className="px-6 py-6 flex flex-col flex-1">
        <div className="flex flex-col items-center text-center mb-8 mt-2">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-4xl">
            🔬
          </motion.div>
          <h2 className="text-xl font-bold text-gray-900">Results Ready</h2>
          <p className="text-sm text-gray-500 mt-2 px-4 leading-relaxed">Your lab results have been uploaded by the diagnostic center.</p>
        </div>

        <Card className="p-5 mb-4 border-teal-200/60 bg-white">
          <h3 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Basic Health Package</h3>

          {[
            { name: 'Hemoglobin', value: '13.8 g/dL', status: 'Normal', color: 'text-secondary bg-green-50' },
            { name: 'Blood Sugar (Fasting)', value: '98 mg/dL', status: 'Normal', color: 'text-secondary bg-green-50' },
            { name: 'WBC Count', value: '9,200 /μL', status: 'Borderline', color: 'text-amber-600 bg-amber-50' },
            { name: 'Platelet Count', value: '2.4 L /μL', status: 'Normal', color: 'text-secondary bg-green-50' },
          ].map(row => (
            <div key={row.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-xs font-semibold text-gray-800">{row.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{row.value}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${row.color}`}>{row.status}</span>
            </div>
          ))}
        </Card>

        <Card className="p-4 mb-auto border-secondary/20 bg-green-50/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Full_Report_BasicHealth.pdf</p>
              <p className="text-xs text-gray-400 mt-0.5">2.1 MB • Oct 27, 2023</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4 border-teal-300 text-teal-700 hover:bg-teal-50 gap-2">
            <Download className="w-4 h-4" />
            Download Full Report
          </Button>
        </Card>

        <div className="mt-6">
          <Button onClick={() => navigate('Home')}>Back to Home</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// PSYCHOLOGIST BOOKING
// ─────────────────────────────────────────────────────────────

const PSYCH_SPECIALTIES = [
  { id: 'anxiety', icon: '😰', label: 'Anxiety & Depression', desc: 'Stress, panic, low mood' },
  { id: 'trauma', icon: '💔', label: 'Trauma & PTSD', desc: 'Past trauma processing' },
  { id: 'couples', icon: '💑', label: 'Couples Therapy', desc: 'Relationship & communication' },
  { id: 'child', icon: '🧒', label: 'Child Psychology', desc: 'Ages 5–17, behavioral issues' },
  { id: 'sleep', icon: '😴', label: 'Sleep Disorders', desc: 'Insomnia, sleep anxiety' },
  { id: 'ocd', icon: '🔁', label: 'OCD & Phobias', desc: 'Compulsions, specific fears' },
];

export const PsychologistBooking = () => {
  const { navigate, goBack } = useAppContext();
  const [mode, setMode] = useState<'inperson' | 'video' | ''>('');
  const [specialty, setSpecialty] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'any' | ''>('');
  const [sessionType, setSessionType] = useState<'onetime' | 'plan' | ''>('');

  const canContinue = mode && specialty && gender && sessionType;

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Book Psychologist" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">

        {/* Mode */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Session Mode</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { id: 'inperson', icon: '🏠', label: 'In-Person', desc: 'Therapist visits you' },
            { id: 'video', icon: '📹', label: 'Video Call', desc: 'Online session' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as 'inperson' | 'video')}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${mode === m.id ? 'border-violet-500 bg-violet-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <div className="text-2xl mb-2">{m.icon}</div>
              <p className={`font-semibold text-sm ${mode === m.id ? 'text-violet-700' : 'text-gray-900'}`}>{m.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
              {mode === m.id && <CheckCircle2 className="w-4 h-4 text-violet-500 mt-2" />}
            </button>
          ))}
        </div>

        {/* Specialty */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Area of Concern</h3>
        <div className="flex flex-col gap-2.5 mb-6">
          {PSYCH_SPECIALTIES.map(s => (
            <button
              key={s.id}
              onClick={() => setSpecialty(s.id)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all text-left ${specialty === s.id ? 'border-violet-500 bg-violet-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <span className="text-xl w-8 text-center shrink-0">{s.icon}</span>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${specialty === s.id ? 'text-violet-700' : 'text-gray-900'}`}>{s.label}</p>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
              {specialty === s.id && <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Gender Preference */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Therapist Gender Preference</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[{ id: 'any', label: 'No Preference' }, { id: 'female', label: 'Female' }, { id: 'male', label: 'Male' }].map(g => (
            <button
              key={g.id}
              onClick={() => setGender(g.id as 'male' | 'female' | 'any')}
              className={`py-2.5 text-center rounded-xl border-2 text-xs font-semibold transition-all ${gender === g.id ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-600 bg-white'}`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Session Type */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Session Type</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[{ id: 'onetime', label: 'One-time', desc: 'Single session' }, { id: 'plan', label: 'Session Plan', desc: '5, 10, or 15 sessions' }].map(t => (
            <button
              key={t.id}
              onClick={() => setSessionType(t.id as 'onetime' | 'plan')}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${sessionType === t.id ? 'border-violet-500 bg-violet-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <p className={`font-semibold text-sm ${sessionType === t.id ? 'text-violet-700' : 'text-gray-900'}`}>{t.label}</p>
              <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Button
            onClick={() => navigate(mode === 'inperson' ? 'ConfirmLocation' : 'SearchingPsychologist')}
            disabled={!canContinue}
            className="bg-violet-600 hover:bg-violet-700"
          >
            {mode === 'inperson' ? 'Confirm & Choose Location' : 'Find a Psychologist'}
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// SEARCHING PSYCHOLOGIST
// ─────────────────────────────────────────────────────────────

export const SearchingPsychologist = () => {
  const { navigate, goBack, addBooking } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      addBooking({
        id: 'psych-1',
        type: 'doctor', // Using doctor as a fallback for psychologist icon/color
        providerName: 'Dr. Meera Krishnan',
        status: 'ongoing',
        eta: 'Session starts now',
        icon: '🧠'
      });
      navigate('PsychologistAccepted');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, addBooking]);

  return (
    <ScreenWrapper className="bg-white items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow-sm border border-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        {[1, 2, 3].map(i => (
          <motion.div key={i} animate={{ scale: [1, 2, 3], opacity: [0.4, 0.15, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: 'easeOut' }} className="absolute inset-0 bg-violet-400/20 rounded-full" />
        ))}
        <div className="w-24 h-24 bg-violet-600 rounded-full flex items-center justify-center z-10 shadow-lg shadow-violet-600/30 text-4xl">🧠</div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Matching you with<br />a psychologist</h2>
      <p className="text-gray-500 mb-12 text-center text-sm">Based on your preferences & specialty</p>

      <div className="absolute bottom-12 w-full px-6">
        <Button variant="outline" onClick={goBack} className="border-red-200 text-red-500 hover:bg-red-50">Cancel</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// PSYCHOLOGIST ACCEPTED
// ─────────────────────────────────────────────────────────────

export const PsychologistAccepted = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-violet-600 text-white items-center justify-center px-6 relative overflow-hidden">
      {[1, 2, 3].map(i => (
        <motion.div key={i} animate={{ scale: [1, 1.5, 2.5], opacity: [0.15, 0.05, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 1, ease: 'easeOut' }} className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-64 h-64 pointer-events-none" />
      ))}

      <div className="flex flex-col items-center justify-center flex-1 w-full mt-8">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }} className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }} className="w-20 h-20 rounded-full border-[4px] border-violet-500 flex items-center justify-center bg-violet-500/5">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-violet-600" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }} d="M20 6L9 17l-5-5" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-center relative z-10 w-full px-2">
          <h2 className="text-[30px] font-extrabold mb-3 tracking-tight leading-tight text-white">Psychologist Matched!</h2>
          <p className="text-white/90 text-base font-medium leading-relaxed max-w-[300px] mx-auto mb-8">
            Dr. Meera Krishnan is ready for your session.
          </p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-left border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">RCI Licensed Clinical Psychologist</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">Session starts in 5 mins</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">100% confidential & private</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="w-full pb-8 pt-6 relative z-10">
        <Button variant="custom" className="bg-white text-violet-600 hover:bg-gray-50 shadow-xl text-lg py-4 font-bold rounded-2xl w-full" onClick={() => navigate('PsychologistSession')}>
          Join Session
        </Button>
        <p className="text-center text-white/80 text-xs mt-4 font-medium">Payment collected after session ends.</p>
      </motion.div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// PSYCHOLOGIST SESSION (Video Call UI)
// ─────────────────────────────────────────────────────────────

export const PsychologistSession = () => {
  const { navigate } = useAppContext();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <ScreenWrapper className="bg-gray-900 relative overflow-hidden">
      {/* Remote video (therapist) */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="w-32 h-32 bg-violet-600/30 rounded-full flex items-center justify-center text-6xl">🧠</div>
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white font-bold text-lg">Dr. Meera Krishnan</p>
          <p className="text-gray-400 text-sm">Clinical Psychologist</p>
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full z-10">
        <p className="text-white font-mono font-bold text-sm">{formatTime(elapsed)}</p>
      </div>

      {/* Local video (self) */}
      <div className="absolute top-16 right-4 w-24 h-32 bg-gray-700 rounded-2xl border-2 border-white/20 overflow-hidden flex items-center justify-center z-10">
        {videoOff ? (
          <VideoOff className="w-6 h-6 text-gray-400" />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-800 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-6 pb-10 z-10">
        <div className="flex justify-center gap-6 mb-4">
          <button onClick={() => setMuted(m => !m)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${muted ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}>
            {muted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </button>
          <button
            onClick={() => navigate('RatingFeedback')}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
          >
            <Phone className="w-7 h-7 text-white rotate-[135deg]" />
          </button>
          <button onClick={() => setVideoOff(v => !v)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${videoOff ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}>
            {videoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
          </button>
        </div>
        <p className="text-center text-gray-400 text-xs">Tap the red button to end your session</p>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// ONLINE COUNSELING
// ─────────────────────────────────────────────────────────────

const COUNSELOR_TYPES = [
  { id: 'stress', icon: '😓', label: 'Stress & Anxiety', desc: 'Daily overwhelm, burnout' },
  { id: 'relationship', icon: '💞', label: 'Relationships', desc: 'Family, friends, romantic' },
  { id: 'grief', icon: '🌧️', label: 'Grief & Loss', desc: 'Bereavement, major changes' },
  { id: 'coaching', icon: '🎯', label: 'Life Coaching', desc: 'Goals, motivation, purpose' },
  { id: 'career', icon: '💼', label: 'Career & Work', desc: 'Work stress, transitions' },
  { id: 'wellness', icon: '🌿', label: 'General Wellness', desc: 'Mindfulness, self-care' },
];

export const OnlineCounseling = () => {
  const { navigate, goBack, addBooking } = useAppContext();
  const [counselorType, setCounselorType] = useState('');
  const [format, setFormat] = useState<'video' | 'audio' | ''>('');
  const [timing, setTiming] = useState<'now' | 'schedule' | ''>('');

  const canContinue = counselorType && format && timing;

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Online Counseling" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">

        {/* Area of focus */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">What would you like to talk about?</h3>
        <div className="flex flex-col gap-2.5 mb-6">
          {COUNSELOR_TYPES.map(c => (
            <button
              key={c.id}
              onClick={() => setCounselorType(c.id)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all text-left ${counselorType === c.id ? 'border-pink-500 bg-pink-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <span className="text-xl w-8 text-center shrink-0">{c.icon}</span>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${counselorType === c.id ? 'text-pink-700' : 'text-gray-900'}`}>{c.label}</p>
                <p className="text-xs text-gray-400">{c.desc}</p>
              </div>
              {counselorType === c.id && <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Session format */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Session Format</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[{ id: 'video', icon: '📹', label: 'Video Call', desc: 'Face-to-face online' }, { id: 'audio', icon: '🎙️', label: 'Audio Only', desc: 'Voice call, more private' }].map(f => (
            <button
              key={f.id}
              onClick={() => setFormat(f.id as 'video' | 'audio')}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${format === f.id ? 'border-pink-500 bg-pink-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className={`font-semibold text-sm ${format === f.id ? 'text-pink-700' : 'text-gray-900'}`}>{f.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
            </button>
          ))}
        </div>

        {/* Timing */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">When would you like to connect?</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setTiming('now')}
            className={`p-4 rounded-2xl border-2 transition-all text-left ${timing === 'now' ? 'border-pink-500 bg-pink-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
          >
            <div className="text-2xl mb-2">⚡</div>
            <p className={`font-semibold text-sm ${timing === 'now' ? 'text-pink-700' : 'text-gray-900'}`}>Talk Now</p>
            <p className="text-xs text-gray-400 mt-0.5">Connect in ~5 mins</p>
          </button>
          <button
            onClick={() => setTiming('schedule')}
            className={`p-4 rounded-2xl border-2 transition-all text-left ${timing === 'schedule' ? 'border-pink-500 bg-pink-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
          >
            <div className="text-2xl mb-2">📅</div>
            <p className={`font-semibold text-sm ${timing === 'schedule' ? 'text-pink-700' : 'text-gray-900'}`}>Schedule</p>
            <p className="text-xs text-gray-400 mt-0.5">Pick a date & time</p>
          </button>
        </div>

        {/* Date/time picker for scheduled */}
        <AnimatePresence>
          {timing === 'schedule' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
              <Card className="p-4 border-pink-200 bg-pink-50/20">
                <p className="text-sm font-semibold text-gray-900 mb-3">Select a Slot</p>
                <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                  {['Today', 'Tomorrow', 'Sat, Apr 14', 'Sun, Apr 15'].map((d, i) => (
                    <button key={d} className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all ${i === 1 ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 bg-white'}`}>{d}</button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'].map((t, i) => (
                    <button key={t} className={`px-2 py-2 rounded-xl text-xs font-semibold border transition-all ${i === 2 ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 bg-white'}`}>{t}</button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-4">
          <Button
            onClick={() => {
              addBooking({
                id: 'counsel-1',
                type: 'doctor',
                providerName: 'Arya S.',
                status: 'ongoing',
                eta: 'Connecting...',
                icon: '💬'
              });
              navigate('CounselorMatched');
            }}
            disabled={!canContinue}
            className="bg-pink-500 hover:bg-pink-600"
          >
            {timing === 'now' ? 'Find a Counselor Now' : 'Confirm Booking'}
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// COUNSELOR MATCHED
// ─────────────────────────────────────────────────────────────

export const CounselorMatched = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-pink-500 text-white items-center justify-center px-6 relative overflow-hidden">
      {[1, 2, 3].map(i => (
        <motion.div key={i} animate={{ scale: [1, 1.5, 2.5], opacity: [0.15, 0.05, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 1, ease: 'easeOut' }} className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-64 h-64 pointer-events-none" />
      ))}

      <div className="flex flex-col items-center justify-center flex-1 w-full mt-8">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }} className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }} className="text-5xl">💬</motion.div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-center relative z-10 w-full px-2">
          <h2 className="text-[30px] font-extrabold mb-3 tracking-tight leading-tight text-white">Counselor Ready!</h2>
          <p className="text-white/90 text-base font-medium leading-relaxed max-w-[300px] mx-auto mb-8">
            Arya S. is ready to listen. Your session is safe and confidential.
          </p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-left border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Smile className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">Certified Wellness Counselor</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">50-minute session</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-medium text-white">End-to-end encrypted</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="w-full pb-8 pt-6 relative z-10">
        <Button variant="custom" className="bg-white text-pink-600 hover:bg-gray-50 shadow-xl text-lg py-4 font-bold rounded-2xl w-full" onClick={() => navigate('CounselingSession')}>
          Start Session
        </Button>
        <p className="text-center text-white/80 text-xs mt-4 font-medium">₹499 per session • Pay after</p>
      </motion.div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// COUNSELING SESSION (Live call UI)
// ─────────────────────────────────────────────────────────────

export const CounselingSession = () => {
  const { navigate } = useAppContext();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <ScreenWrapper className="bg-gray-900 relative overflow-hidden">
      {/* Remote — counselor */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/60 to-gray-900 flex items-center justify-center">
        <div className="w-32 h-32 bg-pink-500/30 rounded-full flex items-center justify-center text-6xl">💬</div>
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white font-bold text-lg">Arya S.</p>
          <p className="text-gray-400 text-sm">Wellness Counselor</p>
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full z-10 flex items-center gap-2">
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
        <p className="text-white font-mono font-bold text-sm">{formatTime(elapsed)}</p>
      </div>

      {/* Self view */}
      <div className="absolute top-16 right-4 w-24 h-32 bg-gray-700 rounded-2xl border-2 border-white/20 overflow-hidden flex items-center justify-center z-10">
        {videoOff ? <VideoOff className="w-6 h-6 text-gray-400" /> : <User className="w-8 h-8 text-gray-400" />}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-6 pb-10 z-10">
        <div className="flex justify-center gap-6 mb-4">
          <button onClick={() => setMuted(m => !m)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${muted ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}>
            {muted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </button>
          <button onClick={() => navigate('Home')} className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95">
            <Phone className="w-7 h-7 text-white rotate-[135deg]" />
          </button>
          <button onClick={() => setVideoOff(v => !v)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${videoOff ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}>
            {videoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
          </button>
        </div>
        <p className="text-center text-gray-400 text-xs">Tap the red button to end your session</p>
      </div>
    </ScreenWrapper>
  );
};
