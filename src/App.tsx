import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppContext, Screen } from './store';

import { Splash, Permission, Auth, ProfileCompletion } from './screens/Onboarding';
import { Home, MemberManagement, AddressSelection, ConsultationHistory, Profile } from './screens/Main';
import { ConfirmLocation, SearchingDoctor, DoctorAccepted, Payment, DoctorEnRoute, OTPVerification, ConsultationOngoing, EndConsultationOTP, PrescriptionUploaded, RatingFeedback } from './screens/Booking';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Splash');
  const [history, setHistory] = useState<Screen[]>([]);

  const navigate = (screen: Screen) => {
    setHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevScreen = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(prevScreen);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash': return <Splash key="Splash" />;
      case 'Permission': return <Permission key="Permission" />;
      case 'Auth': return <Auth key="Auth" />;
      case 'ProfileCompletion': return <ProfileCompletion key="ProfileCompletion" />;
      case 'Home': return <Home key="Home" />;
      case 'MemberManagement': return <MemberManagement key="MemberManagement" />;
      case 'AddressSelection': return <AddressSelection key="AddressSelection" />;
      case 'ConfirmLocation': return <ConfirmLocation key="ConfirmLocation" />;
      case 'SearchingDoctor': return <SearchingDoctor key="SearchingDoctor" />;
      case 'DoctorAccepted': return <DoctorAccepted key="DoctorAccepted" />;
      case 'Payment': return <Payment key="Payment" />;
      case 'DoctorEnRoute': return <DoctorEnRoute key="DoctorEnRoute" />;
      case 'OTPVerification': return <OTPVerification key="OTPVerification" />;
      case 'ConsultationOngoing': return <ConsultationOngoing key="ConsultationOngoing" />;
      case 'EndConsultationOTP': return <EndConsultationOTP key="EndConsultationOTP" />;
      case 'PrescriptionUploaded': return <PrescriptionUploaded key="PrescriptionUploaded" />;
      case 'RatingFeedback': return <RatingFeedback key="RatingFeedback" />;
      case 'ConsultationHistory': return <ConsultationHistory key="ConsultationHistory" />;
      case 'Profile': return <Profile key="Profile" />;
      default: return <Splash key="Splash" />;
    }
  };

  return (
    <AppContext.Provider value={{ currentScreen, navigate, goBack }}>
      <div className="min-h-screen bg-gray-200 flex justify-center sm:items-center sm:p-4">
        <div className="w-full sm:max-w-[400px] h-[100dvh] sm:h-[850px] bg-background sm:rounded-[2.5rem] relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {renderScreen()}
          </AnimatePresence>
        </div>
      </div>
    </AppContext.Provider>
  );
}
