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
  | 'MedicineTracking'
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
  | 'CarePlanConfirmed'
  | 'PulseCareHistory'
  | 'DocumentViewer'
  | 'NotificationCenter'
  | 'AISymptomChecker';

export interface ActiveBooking {
  id: string;
  type: 'doctor' | 'nurse' | 'ambulance' | 'physio' | 'lab' | 'medicine';
  providerName: string;
  status: 'searching' | 'confirmed' | 'enroute' | 'arrived' | 'ongoing' | 'ordered' | 'packed' | 'out_for_delivery';
  eta?: string;
  icon: string;
}

export type BookingService = 'doctor' | 'nurse' | 'physio' | 'lab' | 'vaccination' | 'psychologist' | 'dietitian';

interface AppContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  activeTab: 'doctor' | 'pulsecare';
  setActiveTab: (tab: 'doctor' | 'pulsecare') => void;
  activeBookings: ActiveBooking[];
  addBooking: (booking: ActiveBooking) => void;
  removeBooking: (id: string) => void;
  updateBookingStatus: (id: string, status: ActiveBooking['status'], eta?: string) => void;
  selectedService: BookingService;
  setSelectedService: (service: BookingService) => void;
}

export const AppContext = createContext<AppContextType>({
  currentScreen: 'Splash',
  navigate: () => {},
  goBack: () => {},
  activeTab: 'doctor',
  setActiveTab: () => {},
  activeBookings: [],
  addBooking: () => {},
  removeBooking: () => {},
  updateBookingStatus: () => {},
  selectedService: 'doctor',
  setSelectedService: () => {},
});

export const useAppContext = () => useContext(AppContext);

