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
  | 'PhysioEnRoute';

interface AppContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
}

export const AppContext = createContext<AppContextType>({
  currentScreen: 'Splash',
  navigate: () => {},
  goBack: () => {},
});

export const useAppContext = () => useContext(AppContext);
