import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppContext, Screen } from './store';

import { Splash, Permission, Auth, ProfileCompletion } from './screens/Onboarding';
import { Home, MemberManagement, AddressSelection, ConsultationHistory, Profile } from './screens/Main';
import { ConfirmLocation, SearchingDoctor, DoctorAccepted, Payment, DoctorEnRoute, OTPVerification, ConsultationOngoing, EndConsultationOTP, PrescriptionUploaded, RatingFeedback } from './screens/Booking';
import { NurseBooking, SearchingNurse, NurseAccepted, NurseEnRoute, MedicineRequest, MedicineOrderConfirmed, AmbulanceRequest, SearchingAmbulance, AmbulanceEnRoute, PhysioBooking, SearchingPhysio, PhysioAccepted, PhysioEnRoute } from './screens/PulseCare';
import { LabTestBooking, LabTestConfirm, SearchingPhlebotomist, PhlebotomistEnRoute, LabResults, PsychologistBooking, SearchingPsychologist, PsychologistAccepted, PsychologistSession, OnlineCounseling, CounselorMatched, CounselingSession } from './screens/MoreCare';
import { DietitianBooking, SearchingDietitian, DietitianAccepted, DietitianSession, VaccinationBooking, SearchingVaccinator, VaccinatorEnRoute, EquipmentRental, EquipmentOrderConfirmed, SOSAlert, CarePackages } from './screens/ExtraCare';
import { CarePlanRecommended, CarePlanReview, CarePlanCheckout, CarePlanConfirmed } from './screens/CarePlan';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Splash');
  const [history, setHistory] = useState<Screen[]>([]);
  const [activeTab, setActiveTab] = useState<'doctor' | 'pulsecare'>('doctor');

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
      // Pulse Care — Nurse
      case 'NurseBooking': return <NurseBooking key="NurseBooking" />;
      case 'SearchingNurse': return <SearchingNurse key="SearchingNurse" />;
      case 'NurseAccepted': return <NurseAccepted key="NurseAccepted" />;
      case 'NurseEnRoute': return <NurseEnRoute key="NurseEnRoute" />;
      // Pulse Care — Medicine
      case 'MedicineRequest': return <MedicineRequest key="MedicineRequest" />;
      case 'MedicineOrderConfirmed': return <MedicineOrderConfirmed key="MedicineOrderConfirmed" />;
      // Pulse Care — Ambulance
      case 'AmbulanceRequest': return <AmbulanceRequest key="AmbulanceRequest" />;
      case 'SearchingAmbulance': return <SearchingAmbulance key="SearchingAmbulance" />;
      case 'AmbulanceEnRoute': return <AmbulanceEnRoute key="AmbulanceEnRoute" />;
      // Pulse Care — Physiotherapy
      case 'PhysioBooking': return <PhysioBooking key="PhysioBooking" />;
      case 'SearchingPhysio': return <SearchingPhysio key="SearchingPhysio" />;
      case 'PhysioAccepted': return <PhysioAccepted key="PhysioAccepted" />;
      case 'PhysioEnRoute': return <PhysioEnRoute key="PhysioEnRoute" />;
      // Pulse Care — Lab Test
      case 'LabTestBooking': return <LabTestBooking key="LabTestBooking" />;
      case 'LabTestConfirm': return <LabTestConfirm key="LabTestConfirm" />;
      case 'SearchingPhlebotomist': return <SearchingPhlebotomist key="SearchingPhlebotomist" />;
      case 'PhlebotomistEnRoute': return <PhlebotomistEnRoute key="PhlebotomistEnRoute" />;
      case 'LabResults': return <LabResults key="LabResults" />;
      // Pulse Care — Psychologist
      case 'PsychologistBooking': return <PsychologistBooking key="PsychologistBooking" />;
      case 'SearchingPsychologist': return <SearchingPsychologist key="SearchingPsychologist" />;
      case 'PsychologistAccepted': return <PsychologistAccepted key="PsychologistAccepted" />;
      case 'PsychologistSession': return <PsychologistSession key="PsychologistSession" />;
      // Pulse Care — Online Counseling (legacy)
      case 'OnlineCounseling': return <OnlineCounseling key="OnlineCounseling" />;
      case 'CounselorMatched': return <CounselorMatched key="CounselorMatched" />;
      case 'CounselingSession': return <CounselingSession key="CounselingSession" />;
      // Pulse Care — Dietitian
      case 'DietitianBooking': return <DietitianBooking key="DietitianBooking" />;
      case 'SearchingDietitian': return <SearchingDietitian key="SearchingDietitian" />;
      case 'DietitianAccepted': return <DietitianAccepted key="DietitianAccepted" />;
      case 'DietitianSession': return <DietitianSession key="DietitianSession" />;
      // Pulse Care — Vaccination
      case 'VaccinationBooking': return <VaccinationBooking key="VaccinationBooking" />;
      case 'SearchingVaccinator': return <SearchingVaccinator key="SearchingVaccinator" />;
      case 'VaccinatorEnRoute': return <VaccinatorEnRoute key="VaccinatorEnRoute" />;
      // Pulse Care — Equipment
      case 'EquipmentRental': return <EquipmentRental key="EquipmentRental" />;
      case 'EquipmentOrderConfirmed': return <EquipmentOrderConfirmed key="EquipmentOrderConfirmed" />;
      // SOS & Extras
      case 'SOSAlert': return <SOSAlert key="SOSAlert" />;
      case 'CarePackages': return <CarePackages key="CarePackages" />;
      // Post-Consultation Care Plan
      case 'CarePlanRecommended': return <CarePlanRecommended key="CarePlanRecommended" />;
      case 'CarePlanReview': return <CarePlanReview key="CarePlanReview" />;
      case 'CarePlanCheckout': return <CarePlanCheckout key="CarePlanCheckout" />;
      case 'CarePlanConfirmed': return <CarePlanConfirmed key="CarePlanConfirmed" />;
      default: return <Splash key="Splash" />;
    }
  };

  return (
    <AppContext.Provider value={{ currentScreen, navigate, goBack, activeTab, setActiveTab }}>
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
