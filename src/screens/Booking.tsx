import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Card, ScreenWrapper, TopBar } from '../components/UI';
import { useAppContext } from '../store';
import { MapPin, Phone, Star, FileText, CheckCircle2, Navigation, Clock, ShieldCheck, Download, MessageSquare, Check } from 'lucide-react';

export const ConfirmLocation = () => {
  const { navigate, goBack } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Confirm Location" onBack={goBack} />
      
      <div className="px-6 py-6 flex flex-col flex-1">
        <p className="text-gray-500 mb-6">Please confirm the address where the doctor should visit.</p>

        <div className="h-48 bg-gray-200 rounded-2xl mb-6 overflow-hidden relative border border-gray-200">
          <img src="https://staticmapmaker.com/img/google-placeholder.png" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
              <MapPin className="w-8 h-8 text-primary drop-shadow-md" />
            </div>
          </div>
        </div>

        <Card className="p-4 mb-auto border-secondary/30 bg-green-50/30">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm mt-1">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Current Location</h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">123 Health Ave, Medical District, NY 10001</p>
              </div>
            </div>
            <button onClick={() => navigate('AddressSelection')} className="text-sm font-medium text-primary hover:underline whitespace-nowrap ml-4">
              Change
            </button>
          </div>
        </Card>

        <div className="mt-8">
          <Button onClick={() => navigate('SearchingDoctor')}>Confirm & Search Doctors</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export const SearchingDoctor = () => {
  const { navigate, goBack } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => navigate('DoctorAccepted'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-white items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 z-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-12">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 2, 3], opacity: [0.5, 0.2, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-secondary/20 rounded-full"
          />
        ))}
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center z-10 shadow-lg shadow-secondary/30">
          <MapPin className="w-10 h-10 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Searching nearby<br/>verified doctors</h2>
      <p className="text-gray-500 mb-12 text-center">Estimated wait time: 2 mins</p>

      <div className="absolute bottom-12 w-full px-6">
        <Button variant="outline" onClick={goBack} className="border-red-200 text-red-500 hover:bg-red-50">Cancel Request</Button>
      </div>
    </ScreenWrapper>
  );
};

export const DoctorAccepted = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-secondary text-white items-center justify-center px-6 relative overflow-hidden">
      {/* Enhanced Background Pulse Effect */}
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
            className="w-20 h-20 rounded-full border-[4px] border-secondary flex items-center justify-center bg-secondary/5"
          >
            {/* SVG Path Animation for Checkmark */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-secondary" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
          <h2 className="text-[32px] font-extrabold mb-3 tracking-tight leading-[1.15] text-white">Doctor Confirmed!</h2>
          <p className="text-white/90 text-[16px] font-medium leading-relaxed max-w-[300px] mx-auto mb-8">
            We've matched you with a top-rated professional nearby.
          </p>

          {/* Reassuring Next Steps */}
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
              <span className="text-sm font-medium text-white">Verified Medical Professional</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Arrives in approx. 15-20 mins</span>
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
        <Button variant="custom" className="bg-white text-secondary hover:bg-gray-50 shadow-xl text-lg py-4 font-bold rounded-2xl w-full" onClick={() => navigate('Payment')}>
          Proceed to Payment
        </Button>
        <p className="text-center text-white/80 text-xs mt-4 font-medium">You won't be charged until the visit is complete.</p>
      </motion.div>
    </ScreenWrapper>
  );
};

export const Payment = () => {
  const { navigate, goBack } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Payment Summary" onBack={goBack} />
      
      <div className="px-6 py-6 flex flex-col flex-1">
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Consultation Details</h3>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium">Base Consultation Fee</span>
            <span className="font-semibold text-gray-900">₹500.00</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium">Night Charge (After 10 PM)</span>
            <span className="font-semibold text-gray-900">₹150.00</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 font-medium">Platform Fee</span>
            <span className="font-semibold text-gray-900">₹25.00</span>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
            <span className="text-lg font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-primary">₹675.00</span>
          </div>
        </Card>

        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl mb-auto">
          <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
          <p className="text-xs text-primary font-medium leading-relaxed">Payments are secure and encrypted. You will only be charged after the consultation is complete.</p>
        </div>

        <div className="mt-8">
          <Button onClick={() => navigate('DoctorEnRoute')}>Pay Securely</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export const DoctorEnRoute = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background relative">
      <div className="absolute inset-0 z-0 bg-gray-200">
        {/* Map Background */}
        <img src="https://developers.google.com/static/maps/documentation/maps-static/images/map-warning.png" alt="Map" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
        
        {/* Route Line Simulation */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none">
          <path d="M200 600 Q 150 400 250 200" stroke="#0F3D73" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 10" className="animate-[dash_20s_linear_infinite]" />
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
              <p className="text-lg font-bold text-gray-900">12 mins</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 font-medium">Distance</p>
            <p className="text-sm font-bold text-gray-900">2.4 km</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 p-6 pb-8">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
        
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img src="https://picsum.photos/seed/doctor/100/100" alt="Doctor" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-1 -right-1 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border-2 border-white">
              <Star className="w-3 h-3 fill-white" /> 4.9
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Dr. Sarah Jenkins</h3>
            <p className="text-sm text-gray-500 font-medium">General Physician</p>
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

        <Button onClick={() => navigate('OTPVerification')}>Simulate Arrival</Button>
      </div>
    </ScreenWrapper>
  );
};

export const OTPVerification = () => {
  const { navigate } = useAppContext();
  const otp = ['4', '8', '2', '9'];

  useEffect(() => {
    const timer = setTimeout(() => navigate('ConsultationOngoing'), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-white px-6 py-12 flex flex-col justify-between">
      <div className="flex flex-col items-center text-center mt-12">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor has arrived</h2>
        <p className="text-gray-500 mb-12 px-4 leading-relaxed">
          Please share this 4-digit OTP with the doctor to begin the consultation securely.
        </p>

        <div className="flex gap-4 justify-center mb-12">
          {otp.map((digit, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center text-center text-3xl font-bold text-primary shadow-sm"
            >
              {digit}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 flex flex-col items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-gray-500 font-medium">Waiting for doctor to verify...</p>
      </div>
    </ScreenWrapper>
  );
};

export const ConsultationOngoing = () => {
  const { navigate } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => navigate('EndConsultationOTP'), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-primary text-white items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-secondary)_0%,_transparent_70%)] opacity-20" />
      
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="w-48 h-48 rounded-full border-4 border-white/20 flex items-center justify-center mb-12 relative z-10"
      >
        <div className="w-40 h-40 rounded-full border-4 border-white/40 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-4 border-white/60 flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-1">Time</p>
              <p className="text-3xl font-bold font-mono text-white">14:23</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <h2 className="text-2xl font-bold mb-2 text-center tracking-tight relative z-10 text-white">Consultation in progress</h2>
      <p className="text-blue-200 mb-12 text-center relative z-10">Dr. Sarah Jenkins is attending to you.</p>
    </ScreenWrapper>
  );
};

export const EndConsultationOTP = () => {
  const { navigate } = useAppContext();
  const otp = ['8', '1', '0', '5'];

  useEffect(() => {
    const timer = setTimeout(() => navigate('PrescriptionUploaded'), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <ScreenWrapper className="bg-white px-6 py-12 flex flex-col justify-between">
      <div className="flex flex-col items-center text-center mt-12">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
          <ShieldCheck className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">End Consultation</h2>
        <p className="text-gray-500 mb-12 px-4 leading-relaxed">
          Please share this 4-digit OTP with the doctor to officially end the consultation and receive your prescription.
        </p>

        <div className="flex gap-4 justify-center mb-12">
          {otp.map((digit, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center text-center text-3xl font-bold text-red-500 shadow-sm"
            >
              {digit}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 flex flex-col items-center justify-center">
        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-gray-500 font-medium">Waiting for doctor to verify...</p>
      </div>
    </ScreenWrapper>
  );
};

export const PrescriptionUploaded = () => {
  const { navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Consultation Complete" />
      
      <div className="px-6 py-6 flex flex-col flex-1">
        <div className="flex flex-col items-center text-center mb-8 mt-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Prescription Ready</h2>
          <p className="text-sm text-gray-500 mt-2">The doctor has uploaded your prescription and notes.</p>
        </div>

        <Card className="p-6 mb-auto border-2 border-secondary/20 bg-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Rx_SarahJenkins.pdf</h3>
              <p className="text-xs text-gray-500 mt-1">1.2 MB • Oct 24, 2023</p>
            </div>
          </div>
          
          <Button variant="outline" className="border-secondary text-secondary hover:bg-green-50 gap-2">
            <Download className="w-5 h-5" />
            Download Prescription
          </Button>
        </Card>

        <div className="mt-8">
          <Button onClick={() => navigate('RatingFeedback')}>Continue to Feedback</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export const RatingFeedback = () => {
  const { navigate } = useAppContext();
  const [rating, setRating] = useState(0);

  return (
    <ScreenWrapper className="bg-white px-6 py-12 flex flex-col justify-between">
      <div className="flex flex-col items-center text-center mt-12">
        <img src="https://picsum.photos/seed/doctor/120/120" alt="Doctor" className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-lg mb-6" referrerPolicy="no-referrer" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How was your visit?</h2>
        <p className="text-gray-500 mb-12 px-4 leading-relaxed">
          Rate your consultation with Dr. Sarah Jenkins to help us improve.
        </p>

        <div className="flex gap-2 justify-center mb-12">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)} className="p-2 transition-transform active:scale-90">
              <Star className={`w-10 h-10 ${star <= rating ? 'fill-warning text-warning' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>

        <div className="w-full">
          <textarea 
            placeholder="Share your feedback (optional)"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none h-32"
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button onClick={() => navigate('Home')} disabled={rating === 0}>Submit Feedback</Button>
        <button onClick={() => navigate('Home')} className="w-full text-gray-500 font-medium py-4 mt-2 hover:text-primary transition-colors">
          Skip for now
        </button>
      </div>
    </ScreenWrapper>
  );
};
