import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Card, ScreenWrapper, TopBar } from '../components/UI';
import { useAppContext } from '../store';
import {
  MapPin, Phone, Star, CheckCircle2, Clock, ShieldCheck, ChevronRight,
  Camera, FileText, Package, AlertTriangle, Zap, RefreshCcw, Calendar,
  Activity, Heart, User, MessageSquare, Navigation, Download, Plus, Minus
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// NURSE BOOKING
// ─────────────────────────────────────────────────────────────

export const NurseBooking = () => {
  const { navigate, goBack } = useAppContext();
  const [bookingType, setBookingType] = useState<'onetime' | 'subscription'>('onetime');
  const [nurseType, setNurseType] = useState('');
  const [days, setDays] = useState(7);

  const nurseTypes = [
    { id: 'general', label: 'General Care', desc: 'Daily assistance & monitoring', icon: '🩺' },
    { id: 'wound', label: 'Wound Care', desc: 'Dressing & wound management', icon: '🩹' },
    { id: 'injection', label: 'Injection / IV', desc: 'Medication administration', icon: '💉' },
    { id: 'senior', label: 'Elder Care', desc: 'Specialized senior care', icon: '👴' },
  ];

  const canContinue = nurseType !== '';

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Book a Nurse" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28 overflow-y-auto">
        {/* Booking Type Toggle */}
        <div className="bg-gray-100 rounded-2xl p-1 flex mb-6">
          <button
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${bookingType === 'onetime' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
            onClick={() => setBookingType('onetime')}
          >
            One-time Visit
          </button>
          <button
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${bookingType === 'subscription' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500'}`}
            onClick={() => setBookingType('subscription')}
          >
            Subscription
          </button>
        </div>

        {/* Subscription Duration */}
        <AnimatePresence>
          {bookingType === 'subscription' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-6"
            >
              <Card className="p-5 border-secondary/20 bg-green-50/30">
                <p className="text-sm font-semibold text-gray-900 mb-4">Select Duration</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-primary">{days}</span>
                    <p className="text-sm text-gray-500 font-medium">days</p>
                  </div>
                  <button
                    onClick={() => setDays(Math.min(30, days + 1))}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {[7, 14, 21, 30].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${days === d ? 'bg-secondary text-white border-secondary' : 'border-gray-200 text-gray-600 bg-white'}`}
                    >
                      {d} days
                    </button>
                  ))}
                </div>
                <p className="text-xs text-secondary font-medium mt-4 bg-green-50 px-3 py-2 rounded-xl">
                  Nurse will visit daily for {days} consecutive days
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nurse Type Selection */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Type of Care Needed</h3>
        <div className="flex flex-col gap-3 mb-6">
          {nurseTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setNurseType(type.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${nurseType === type.id ? 'border-primary bg-blue-50/50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${nurseType === type.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {type.icon}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${nurseType === type.id ? 'text-primary' : 'text-gray-900'}`}>{type.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{type.desc}</p>
              </div>
              {nurseType === type.id && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Button onClick={() => navigate('ConfirmLocation')} disabled={!canContinue}>
            Confirm & Choose Location
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// SEARCHING NURSE
// ─────────────────────────────────────────────────────────────

export const SearchingNurse = () => {
  const { navigate, goBack } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => navigate('NurseAccepted'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-white items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 2, 3], opacity: [0.4, 0.15, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-blue-400/20 rounded-full"
          />
        ))}
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center z-10 shadow-lg shadow-primary/30 text-4xl">
          🩺
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Finding a<br />certified nurse</h2>
      <p className="text-gray-500 mb-12 text-center">Estimated wait time: 2 mins</p>

      <div className="absolute bottom-12 w-full px-6">
        <Button variant="outline" onClick={goBack} className="border-red-200 text-red-500 hover:bg-red-50">Cancel Request</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// NURSE ACCEPTED
// ─────────────────────────────────────────────────────────────

export const NurseAccepted = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-primary text-white items-center justify-center px-6 relative overflow-hidden">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.5, 2.5], opacity: [0.15, 0.05, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: i * 1, ease: "easeOut" }}
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-64 h-64 pointer-events-none"
        />
      ))}

      <div className="flex flex-col items-center justify-center flex-1 w-full mt-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
            className="w-20 h-20 rounded-full border-[4px] border-primary flex items-center justify-center bg-primary/5"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                d="M20 6L9 17l-5-5"
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center relative z-10 w-full px-2"
        >
          <h2 className="text-[32px] font-extrabold mb-3 tracking-tight leading-[1.15] text-white">Nurse Confirmed!</h2>
          <p className="text-white/90 text-[16px] font-medium leading-relaxed max-w-[300px] mx-auto mb-8">
            A certified nurse has been matched to your location.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-left border border-white/20 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Verified & Licensed Nurse</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Arrives in approx. 20–30 mins</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Secure Payment to confirm</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full pb-8 pt-6 relative z-10"
      >
        <Button variant="custom" className="bg-white text-primary hover:bg-gray-50 shadow-xl text-lg py-4 font-bold rounded-2xl w-full" onClick={() => navigate('Payment')}>
          Proceed to Payment
        </Button>
        <p className="text-center text-white/80 text-xs mt-4 font-medium">You won't be charged until the visit is complete.</p>
      </motion.div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// NURSE EN ROUTE
// ─────────────────────────────────────────────────────────────

export const NurseEnRoute = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background relative">
      <div className="absolute inset-0 z-0 bg-gray-200">
        <img src="https://developers.google.com/static/maps/documentation/maps-static/images/map-warning.png" alt="Map" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none">
          <path d="M200 600 Q 150 400 250 200" stroke="#0F3D73" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 10" />
          <circle cx="200" cy="600" r="8" fill="#1FA97A" />
          <circle cx="250" cy="200" r="12" fill="#0F3D73" />
        </svg>
      </div>

      <div className="absolute top-0 w-full p-6 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Arriving in</p>
              <p className="text-lg font-bold text-gray-900">18 mins</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">Distance</p>
            <p className="text-sm font-bold text-gray-900">3.1 km</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 p-6 pb-8">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-white shadow-md flex items-center justify-center text-2xl shrink-0">
            🩺
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Nurse Priya S.</h3>
            <p className="text-sm text-gray-500 font-medium">Certified General Nurse</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-700">4.8</span>
              <span className="text-xs text-gray-400">• 124 visits</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary hover:bg-blue-100 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-secondary hover:bg-green-100 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Button onClick={() => navigate('Home')}>Simulate Arrival</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// MEDICINE REQUEST
// ─────────────────────────────────────────────────────────────

export const MedicineRequest = () => {
  const { navigate, goBack } = useAppContext();
  const [selectedSource, setSelectedSource] = useState<'upload' | 'autopull' | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const canOrder = selectedSource !== null && (selectedSource === 'autopull' || (selectedSource === 'upload' && uploaded));

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Medicine Request" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Request medicines from your prescription. Choose how to add your Rx.
        </p>

        {/* Auto-pull from last consultation */}
        <button
          onClick={() => setSelectedSource('autopull')}
          className={`w-full p-5 rounded-2xl border-2 text-left transition-all mb-4 ${selectedSource === 'autopull' ? 'border-secondary bg-green-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${selectedSource === 'autopull' ? 'bg-green-100' : 'bg-gray-50'}`}>
              <RefreshCcw className={`w-6 h-6 ${selectedSource === 'autopull' ? 'text-secondary' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={`font-semibold text-sm ${selectedSource === 'autopull' ? 'text-secondary' : 'text-gray-900'}`}>Auto-pull from Consultation</p>
                {selectedSource === 'autopull' && <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">Use prescription from your last completed consultation</p>
              <div className="mt-3 p-3 bg-white rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Dr. Sarah Jenkins</p>
                    <p className="text-[10px] text-gray-400">Oct 24, 2023 • General Checkup</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 font-medium">Rx_SarahJenkins.pdf</p>
              </div>
            </div>
          </div>
        </button>

        {/* Upload prescription */}
        <button
          onClick={() => setSelectedSource('upload')}
          className={`w-full p-5 rounded-2xl border-2 text-left transition-all mb-6 ${selectedSource === 'upload' ? 'border-primary bg-blue-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${selectedSource === 'upload' ? 'bg-blue-100' : 'bg-gray-50'}`}>
              <Camera className={`w-6 h-6 ${selectedSource === 'upload' ? 'text-primary' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={`font-semibold text-sm ${selectedSource === 'upload' ? 'text-primary' : 'text-gray-900'}`}>Upload Prescription</p>
                {selectedSource === 'upload' && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">Take a photo or upload an image of your prescription</p>
              {selectedSource === 'upload' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3"
                >
                  {!uploaded ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); setUploaded(true); }}
                      className="w-full py-3 border-2 border-dashed border-primary/30 rounded-xl flex items-center justify-center gap-2 text-primary text-xs font-semibold bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Tap to upload photo
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">prescription_photo.jpg</p>
                        <p className="text-[10px] text-gray-400">Uploaded successfully</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </button>

        {/* Delivery address */}
        {selectedSource && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Delivery Address</h3>
            <Card className="p-4 border-secondary/30 bg-green-50/30 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">123 Health Ave, Medical District</p>
                  <p className="text-xs text-gray-500 mt-0.5">Home • Default</p>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">Change</button>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="mt-auto">
          <Button onClick={() => navigate('MedicineOrderConfirmed')} disabled={!canOrder}>
            Place Order
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// MEDICINE ORDER CONFIRMED
// ─────────────────────────────────────────────────────────────

export const MedicineOrderConfirmed = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Order Placed" />

      <div className="px-6 py-6 flex flex-col flex-1">
        <div className="flex flex-col items-center text-center mb-8 mt-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-4xl"
          >
            💊
          </motion.div>
          <h2 className="text-xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="text-sm text-gray-500 mt-2 px-4 leading-relaxed">
            Your medicines have been ordered and will be delivered to your address.
          </p>
        </div>

        <Card className="p-5 mb-4 border-secondary/20 bg-green-50/20">
          <h3 className="text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Order Details</h3>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Order ID</span>
            <span className="text-sm font-bold text-gray-900">#MED-8472</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">Estimated Delivery</span>
            <span className="text-sm font-bold text-gray-900">45–60 mins</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Delivery To</span>
            <span className="text-sm font-bold text-gray-900">Home</span>
          </div>
        </Card>

        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl mb-auto">
          <Package className="w-5 h-5 text-primary shrink-0" />
          <p className="text-xs text-primary font-medium leading-relaxed">
            You will receive an SMS/notification when your order is out for delivery.
          </p>
        </div>

        <div className="mt-8">
          <Button onClick={() => navigate('Home')}>Back to Home</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// AMBULANCE REQUEST
// ─────────────────────────────────────────────────────────────

export const AmbulanceRequest = () => {
  const { navigate, goBack } = useAppContext();
  const [ambulanceType, setAmbulanceType] = useState('');

  const types = [
    {
      id: 'basic',
      icon: '🚑',
      label: 'Basic Life Support',
      desc: 'Trained paramedic + essential equipment',
      eta: '8–12 mins',
    },
    {
      id: 'als',
      icon: '❤️‍🔥',
      label: 'Advanced Life Support',
      desc: 'ICU-equipped + advanced cardiac care',
      eta: '12–18 mins',
    },
  ];

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Emergency Ambulance" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28">
        {/* Emergency Banner */}
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-4 rounded-2xl mb-6">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
          <p className="text-sm text-red-700 font-medium leading-relaxed">
            For life-threatening emergencies, also call <strong>108</strong> immediately.
          </p>
        </div>

        {/* Pickup location */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Pickup Location</h3>
        <Card className="p-4 border-red-200 bg-red-50/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
              <MapPin className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">123 Health Ave, Medical District</p>
              <p className="text-xs text-gray-500 mt-0.5">Using current location</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">Change</button>
          </div>
        </Card>

        {/* Ambulance type */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Select Ambulance Type</h3>
        <div className="flex flex-col gap-3 mb-8">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setAmbulanceType(t.id)}
              className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left ${ambulanceType === t.id ? 'border-red-500 bg-red-50/40' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${ambulanceType === t.id ? 'bg-red-100' : 'bg-gray-50'}`}>
                {t.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className={`font-semibold text-sm ${ambulanceType === t.id ? 'text-red-600' : 'text-gray-900'}`}>{t.label}</p>
                  {ambulanceType === t.id && <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                <p className="text-xs font-semibold text-primary mt-2">ETA: {t.eta}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            onClick={() => navigate('SearchingAmbulance')}
            disabled={!ambulanceType}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700"
          >
            🚨 Request Emergency Ambulance
          </Button>
          <p className="text-center text-xs text-gray-400 mt-3">Dispatch team will call you immediately</p>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// SEARCHING AMBULANCE
// ─────────────────────────────────────────────────────────────

export const SearchingAmbulance = () => {
  const { navigate, goBack } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => navigate('AmbulanceEnRoute'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-red-600 text-white items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 2.5, 4], opacity: [0.4, 0.15, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.5, ease: "easeOut" }}
          className="absolute inset-0 m-auto w-40 h-40 bg-white/20 rounded-full"
        />
      ))}

      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center z-10 shadow-2xl mb-8 text-5xl">
        🚑
      </div>

      <h2 className="text-2xl font-bold text-white mb-2 text-center z-10">Dispatching<br />Ambulance</h2>
      <p className="text-red-100 mb-4 text-center z-10 text-sm">Please stay calm. Help is on the way.</p>
      <p className="text-white/80 text-xs z-10 font-medium">Connecting dispatch team...</p>

      <div className="absolute bottom-12 w-full px-6">
        <Button variant="outline" onClick={goBack} className="border-white/30 text-white hover:bg-white/10">Cancel Request</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// AMBULANCE EN ROUTE
// ─────────────────────────────────────────────────────────────

export const AmbulanceEnRoute = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background relative">
      <div className="absolute inset-0 z-0 bg-gray-200">
        <img src="https://developers.google.com/static/maps/documentation/maps-static/images/map-warning.png" alt="Map" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none">
          <path d="M200 600 Q 120 350 240 180" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" strokeDasharray="12 8" />
          <circle cx="200" cy="600" r="10" fill="#1FA97A" />
          <circle cx="240" cy="180" r="14" fill="#DC2626" />
        </svg>
      </div>

      <div className="absolute top-0 w-full p-6 z-10 bg-gradient-to-b from-black/60 to-transparent">
        <div className="bg-red-500 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-red-100 font-medium uppercase tracking-wider">ETA</p>
              <p className="text-xl font-bold text-white">8 mins</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-red-100 font-medium">Distance</p>
            <p className="text-sm font-bold text-white">1.8 km</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-20 p-6 pb-8">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

        <div className="flex items-center gap-1.5 bg-red-50 rounded-xl px-4 py-2.5 mb-5">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <p className="text-xs font-semibold text-red-600">Ambulance en route — Do not leave your location</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-red-50 border-2 border-white shadow-md flex items-center justify-center text-2xl shrink-0">
            🚑
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Basic Life Support Unit</h3>
            <p className="text-sm text-gray-500 font-medium">Vehicle: KA 01 AB 1234</p>
            <p className="text-xs text-primary font-medium mt-1">Paramedic: Rajesh Kumar</p>
          </div>
          <button className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-secondary hover:bg-green-100 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>

        <Button onClick={() => navigate('Home')} className="bg-red-500 hover:bg-red-600">
          End Emergency
        </Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// PHYSIO BOOKING
// ─────────────────────────────────────────────────────────────

export const PhysioBooking = () => {
  const { navigate, goBack } = useAppContext();
  const [sessionType, setSessionType] = useState<'onetime' | 'plan'>('onetime');
  const [therapyType, setTherapyType] = useState('');
  const [sessions, setSessions] = useState(5);

  const therapyTypes = [
    { id: 'ortho', label: 'Orthopedic', desc: 'Joint, back & muscle pain relief', icon: '🦴' },
    { id: 'neuro', label: 'Neurological', desc: 'Stroke recovery & nerve issues', icon: '🧠' },
    { id: 'sports', label: 'Sports Injury', desc: 'Rehab for athletic injuries', icon: '⚽' },
    { id: 'posture', label: 'Posture & Pain', desc: 'Desk pain & spinal alignment', icon: '🪑' },
  ];

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Book Physiotherapy" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col flex-1 pb-28 overflow-y-auto">
        {/* Session Type Toggle */}
        <div className="bg-gray-100 rounded-2xl p-1 flex mb-6">
          <button
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${sessionType === 'onetime' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
            onClick={() => setSessionType('onetime')}
          >
            One-time Session
          </button>
          <button
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${sessionType === 'plan' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-500'}`}
            onClick={() => setSessionType('plan')}
          >
            Session Plan
          </button>
        </div>

        {/* Session Plan Picker */}
        <AnimatePresence>
          {sessionType === 'plan' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-6"
            >
              <Card className="p-5 border-amber-200 bg-amber-50/30">
                <p className="text-sm font-semibold text-gray-900 mb-4">Number of Sessions</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSessions(Math.max(1, sessions - 1))}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-amber-600">{sessions}</span>
                    <p className="text-sm text-gray-500 font-medium">sessions</p>
                  </div>
                  <button
                    onClick={() => setSessions(Math.min(20, sessions + 1))}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {[5, 10, 15, 20].map((n) => (
                    <button
                      key={n}
                      onClick={() => setSessions(n)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${sessions === n ? 'bg-amber-500 text-white border-amber-500' : 'border-gray-200 text-gray-600 bg-white'}`}
                    >
                      {n} sessions
                    </button>
                  ))}
                </div>
                <p className="text-xs text-amber-700 font-medium mt-4 bg-amber-50 px-3 py-2 rounded-xl">
                  Schedule {sessions} sessions at your preferred frequency
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Therapy Type */}
        <h3 className="text-sm font-bold text-gray-900 mb-3">Select Therapy Type</h3>
        <div className="flex flex-col gap-3 mb-6">
          {therapyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setTherapyType(type.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${therapyType === type.id ? 'border-amber-500 bg-amber-50/50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${therapyType === type.id ? 'bg-amber-100' : 'bg-gray-100'}`}>
                {type.icon}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${therapyType === type.id ? 'text-amber-700' : 'text-gray-900'}`}>{type.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{type.desc}</p>
              </div>
              {therapyType === type.id && <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Button
            onClick={() => navigate('ConfirmLocation')}
            disabled={therapyType === ''}
            className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700"
          >
            Confirm & Choose Location
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// SEARCHING PHYSIO
// ─────────────────────────────────────────────────────────────

export const SearchingPhysio = () => {
  const { navigate, goBack } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => navigate('PhysioAccepted'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-white items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 2, 3], opacity: [0.4, 0.15, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-amber-400/20 rounded-full"
          />
        ))}
        <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center z-10 shadow-lg shadow-amber-500/30 text-4xl">
          🦴
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Finding a<br />physiotherapist</h2>
      <p className="text-gray-500 mb-12 text-center">Estimated wait time: 3 mins</p>

      <div className="absolute bottom-12 w-full px-6">
        <Button variant="outline" onClick={goBack} className="border-red-200 text-red-500 hover:bg-red-50">Cancel Request</Button>
      </div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// PHYSIO ACCEPTED
// ─────────────────────────────────────────────────────────────

export const PhysioAccepted = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-amber-500 text-white items-center justify-center px-6 relative overflow-hidden">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.5, 2.5], opacity: [0.15, 0.05, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: i * 1, ease: "easeOut" }}
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-64 h-64 pointer-events-none"
        />
      ))}

      <div className="flex flex-col items-center justify-center flex-1 w-full mt-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
            className="w-20 h-20 rounded-full border-[4px] border-amber-500 flex items-center justify-center bg-amber-500/5"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-500" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                d="M20 6L9 17l-5-5"
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center relative z-10 w-full px-2"
        >
          <h2 className="text-[32px] font-extrabold mb-3 tracking-tight leading-[1.15] text-white">Therapist Found!</h2>
          <p className="text-white/90 text-[16px] font-medium leading-relaxed max-w-[300px] mx-auto mb-8">
            A certified physiotherapist is on their way to you.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-left border border-white/20 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">BPT Certified Physiotherapist</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Arrives in approx. 25–35 mins</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Full equipment carried along</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full pb-8 pt-6 relative z-10"
      >
        <Button variant="custom" className="bg-white text-amber-600 hover:bg-gray-50 shadow-xl text-lg py-4 font-bold rounded-2xl w-full" onClick={() => navigate('Payment')}>
          Proceed to Payment
        </Button>
        <p className="text-center text-white/80 text-xs mt-4 font-medium">You won't be charged until the session is complete.</p>
      </motion.div>
    </ScreenWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// PHYSIO EN ROUTE
// ─────────────────────────────────────────────────────────────

export const PhysioEnRoute = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background relative">
      <div className="absolute inset-0 z-0 bg-gray-200">
        <img src="https://developers.google.com/static/maps/documentation/maps-static/images/map-warning.png" alt="Map" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none">
          <path d="M200 600 Q 170 380 230 210" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 10" />
          <circle cx="200" cy="600" r="8" fill="#1FA97A" />
          <circle cx="230" cy="210" r="12" fill="#F59E0B" />
        </svg>
      </div>

      <div className="absolute top-0 w-full p-6 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Arriving in</p>
              <p className="text-lg font-bold text-gray-900">22 mins</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">Distance</p>
            <p className="text-sm font-bold text-gray-900">4.2 km</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 p-6 pb-8">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-white shadow-md flex items-center justify-center text-2xl shrink-0">
            🦴
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Vikram PT</h3>
            <p className="text-sm text-gray-500 font-medium">Orthopedic Physiotherapist</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-gray-700">4.9</span>
              <span className="text-xs text-gray-400">• 89 sessions</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 hover:bg-amber-100 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-secondary hover:bg-green-100 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        <Button onClick={() => navigate('Home')} className="bg-amber-500 hover:bg-amber-600">
          Simulate Arrival
        </Button>
      </div>
    </ScreenWrapper>
  );
};
