import { createContext, useContext } from 'react';

export type Screen = 
  | 'Splash'
  | 'Permission'
  | 'Auth'
  | 'ProfileCompletion'
  | 'Home'
  | 'MemberManagement'
  | 'AddressSelection'
  | 'ConfirmLocation'
  | 'SearchingDoctor'
  | 'DoctorAccepted'
  | 'Payment'
  | 'DoctorEnRoute'
  | 'OTPVerification'
  | 'ConsultationOngoing'
  | 'EndConsultationOTP'
  | 'PrescriptionUploaded'
  | 'RatingFeedback'
  | 'ConsultationHistory'
  | 'Profile'
  // Pulse Care — Nurse
  | 'NurseBooking'
  | 'SearchingNurse'
  | 'NurseAccepted'
  | 'NurseEnRoute'
  // Pulse Care — Medicine
  | 'MedicineRequest'
  | 'MedicineOrderConfirmed'
  // Pulse Care — Ambulance
  | 'AmbulanceRequest'
  | 'SearchingAmbulance'
  | 'AmbulanceEnRoute'
  // Pulse Care — Physiotherapy
  | 'PhysioBooking'
  | 'SearchingPhysio'
  | 'PhysioAccepted'
  | 'PhysioEnRoute'
  // Pulse Care — Lab Test
  | 'LabTestBooking'
  | 'LabTestConfirm'
  | 'SearchingPhlebotomist'
  | 'PhlebotomistEnRoute'
  | 'LabResults'
  // Pulse Care — Psychologist
  | 'PsychologistBooking'
  | 'SearchingPsychologist'
  | 'PsychologistAccepted'
  | 'PsychologistSession'
  // Pulse Care — Online Counseling (kept for router compatibility)
  | 'OnlineCounseling'
  | 'CounselorMatched'
  | 'CounselingSession'
  // Pulse Care — Dietitian
  | 'DietitianBooking'
  | 'SearchingDietitian'
  | 'DietitianAccepted'
  | 'DietitianSession'
  // Pulse Care — Vaccination
  | 'VaccinationBooking'
  | 'SearchingVaccinator'
  | 'VaccinatorEnRoute'
  // Pulse Care — Equipment Rental
  | 'EquipmentRental'
  | 'EquipmentOrderConfirmed'
  // SOS & Extras
  | 'SOSAlert'
  | 'CarePackages'
  // Post-Consultation Care Plan
  | 'CarePlanRecommended'
  | 'CarePlanReview'
  | 'CarePlanCheckout'
  | 'CarePlanConfirmed';

interface AppContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  activeTab: 'doctor' | 'pulsecare';
  setActiveTab: (tab: 'doctor' | 'pulsecare') => void;
}

export const AppContext = createContext<AppContextType>({
  currentScreen: 'Splash',
  navigate: () => {},
  goBack: () => {},
  activeTab: 'doctor',
  setActiveTab: () => {},
});

export const useAppContext = () => useContext(AppContext);
