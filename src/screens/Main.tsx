import React from 'react';
import { motion } from 'motion/react';
import { Button, Card, Input, ScreenWrapper, TopBar } from '../components/UI';
import { useAppContext } from '../store';
import { MapPin, UserPlus, FileText, ChevronRight, Search, Clock, CheckCircle2, XCircle, User, Calendar, Home as HomeIcon, Users, HelpCircle, UserCircle, Settings, CreditCard, Bell, LogOut, ChevronLeft } from 'lucide-react';

export const Home = () => {
  const { navigate } = useAppContext();
  const [activeTab, setActiveTab] = React.useState<'doctor' | 'pulsecare'>('doctor');

  const pulseServices = [
    {
      id: 'nurse',
      icon: '🩺',
      title: 'Nurse',
      subtitle: 'At-home care',
      screen: 'NurseBooking' as const,
      bg: 'bg-blue-50',
      border: 'hover:border-blue-200',
    },
    {
      id: 'Pharmacy',
      icon: '💊',
      title: 'Pharmacy',
      subtitle: 'Rx delivery',
      screen: 'MedicineRequest' as const,
      bg: 'bg-purple-50',
      border: 'hover:border-purple-200',
    },
    {
      id: 'ambulance',
      icon: '🚑',
      title: 'Ambulance',
      subtitle: 'Emergency',
      screen: 'AmbulanceRequest' as const,
      bg: 'bg-red-50',
      border: 'hover:border-red-200',
    },
    {
      id: 'physio',
      icon: '🦴',
      title: 'Physiotherapy',
      subtitle: 'Therapy session',
      screen: 'PhysioBooking' as const,
      bg: 'bg-amber-50',
      border: 'hover:border-amber-200',
    },
  ];

  return (
    <ScreenWrapper className="bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-white p-6 rounded-b-[2rem] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-blue-200 text-sm font-medium">Hello,</p>
            <h1 className="text-2xl font-bold tracking-tight">John Doe</h1>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer" onClick={() => navigate('Profile')}>
            <UserCircle className="w-6 h-6 text-white" />
          </div>
        </div>

        <div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between cursor-pointer border border-white/20 active:scale-[0.98] transition-transform"
          onClick={() => navigate('AddressSelection')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="truncate pr-4">
              <p className="text-xs text-blue-200 font-medium">Current Location</p>
              <p className="text-sm font-semibold truncate">123 Health Ave, Medical District</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white shrink-0" />
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Tab Switcher */}
        <div className="bg-gray-100 rounded-2xl p-1 flex mb-6">
          <button
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${activeTab === 'doctor' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
            onClick={() => setActiveTab('doctor')}
          >
            Book a Doctor
          </button>
          <button
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${activeTab === 'pulsecare' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500'}`}
            onClick={() => setActiveTab('pulsecare')}
          >
            Pulse Care
          </button>
        </div>

        {/* ── Doctor Tab ── */}
        {activeTab === 'doctor' && (
          <motion.div
            key="doctor"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-base font-bold text-gray-900 mb-4">Who is this visit for?</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card
                className="flex flex-col items-center justify-center p-6 gap-4 border-2 border-transparent hover:border-secondary/30 transition-colors"
                onClick={() => navigate('ConfirmLocation')}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold text-gray-900 text-center">Book For Me</p>
              </Card>

              <Card
                className="flex flex-col items-center justify-center p-6 gap-4 border-2 border-transparent hover:border-secondary/30 transition-colors"
                onClick={() => navigate('MemberManagement')}
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-secondary" />
                </div>
                <p className="font-semibold text-gray-900 text-center">Book For Someone Else</p>
              </Card>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-gray-900">Recent Consultations</h2>
              <button onClick={() => navigate('ConsultationHistory')} className="text-sm font-medium text-secondary hover:underline">View All</button>
            </div>

            <Card className="mb-6" onClick={() => navigate('ConsultationHistory')}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Dr. Sarah Jenkins</span>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Completed</span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Oct 24, 2023 • General Checkup
              </p>
            </Card>
          </motion.div>
        )}

        {/* ── Pulse Care Tab ── */}
        {activeTab === 'pulsecare' && (
          <motion.div
            key="pulsecare"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-base font-bold text-gray-900 mb-4">Select a Service</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {pulseServices.map((svc) => (
                <Card
                  key={svc.id}
                  className={`flex flex-col items-center justify-center p-5 gap-3 border-2 border-transparent ${svc.border} transition-colors cursor-pointer`}
                  onClick={() => navigate(svc.screen)}
                >
                  <div className={`w-14 h-14 ${svc.bg} rounded-full flex items-center justify-center text-2xl`}>
                    {svc.icon}
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 text-sm">{svc.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{svc.subtitle}</p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-gray-900">Recent Pulse Care</h2>
              <button className="text-sm font-medium text-secondary hover:underline">View All</button>
            </div>

            <Card className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">🩺</div>
                  <span className="text-sm font-semibold text-gray-900">Nurse Visit</span>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Completed</span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Oct 20, 2023 • One-time Session
              </p>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-sm">🦴</div>
                  <span className="text-sm font-semibold text-gray-900">Physiotherapy</span>
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Upcoming</span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Oct 28, 2023 • Session 2 of 5
              </p>
            </Card>
          </motion.div>
        )}

        <Button variant="outline" className="gap-2 border-gray-200 text-gray-700 bg-white mt-6" onClick={() => { }}>
          <HelpCircle className="w-5 h-5 text-primary" />
          Quick Support
        </Button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center py-4 pb-6 px-6 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col items-center gap-1 cursor-pointer text-secondary">
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors" onClick={() => navigate('MemberManagement')}>
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-medium">Members</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
          <HelpCircle className="w-6 h-6" />
          <span className="text-[10px] font-medium">Support</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors" onClick={() => navigate('Profile')}>
          <UserCircle className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </div>
      </div>
    </ScreenWrapper>
  );
};


export const MemberManagement = () => {
  const { navigate, goBack } = useAppContext();

  return (
    <ScreenWrapper className="bg-white">
      <TopBar title="Add Member" onBack={goBack} />
      <div className="px-6 py-6 flex flex-col flex-1">
        <p className="text-gray-500 mb-8">Add details for the family member or friend you are booking for.</p>

        <div className="flex flex-col gap-6">
          <Input label="Full Name" placeholder="Jane Doe" icon={User} />
          <Input label="Age" placeholder="e.g. 28" type="number" icon={Calendar} />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600 ml-1">Gender</label>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'Other'].map((g) => (
                <div key={g} className={`py-3 text-center rounded-xl border ${g === 'Female' ? 'border-secondary bg-green-50 text-secondary font-medium' : 'border-gray-200 text-gray-500'}`}>
                  {g}
                </div>
              ))}
            </div>
          </div>

          <Input label="Relation" placeholder="e.g. Mother, Friend" icon={Users} />
        </div>

        <div className="mt-auto pt-12">
          <Button onClick={() => navigate('ConfirmLocation')}>Save & Continue Booking</Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export const AddressSelection = () => {
  const { goBack, navigate } = useAppContext();

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Select Address" onBack={goBack} />

      <div className="px-6 py-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for an address"
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm"
          />
        </div>

        <div className="h-48 bg-gray-200 rounded-2xl mb-6 overflow-hidden relative border border-gray-200">
          {/* Placeholder for Map */}
          <img src="https://staticmapmaker.com/img/google-placeholder.png" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
            <Button variant="primary" className="py-3 text-sm shadow-lg">Use Current Location</Button>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Saved Addresses</h3>

        <div className="flex flex-col gap-3">
          <Card className="flex items-start gap-4 p-4 border-secondary/30 bg-green-50/30" onClick={goBack}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <HomeIcon className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Home</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">123 Health Ave, Medical District, NY 10001</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-secondary ml-auto shrink-0 mt-2" />
          </Card>

          <Card className="flex items-start gap-4 p-4" onClick={goBack}>
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Office</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">456 Corporate Blvd, Tech Park, NY 10002</p>
            </div>
          </Card>
        </div>

        <Button variant="outline" className="mt-6 border-dashed border-gray-300 text-primary bg-transparent hover:bg-blue-50">
          + Add New Address
        </Button>
      </div>
    </ScreenWrapper>
  );
};

export const ConsultationHistory = () => {
  const { goBack } = useAppContext();

  const history = [
    { id: 1, doctor: 'Dr. Sarah Jenkins', date: 'Oct 24, 2023', type: 'General Checkup', status: 'Completed', color: 'bg-green-100 text-secondary' },
    { id: 2, doctor: 'Dr. Michael Chen', date: 'Sep 12, 2023', type: 'Fever & Cold', status: 'Completed', color: 'bg-green-100 text-secondary' },
    { id: 3, doctor: 'Dr. Emily Davis', date: 'Aug 05, 2023', type: 'Pediatric Visit', status: 'Cancelled', color: 'bg-red-100 text-error' },
  ];

  return (
    <ScreenWrapper className="bg-background">
      <TopBar title="Consultation History" onBack={goBack} />

      <div className="px-6 py-6 flex flex-col gap-4">
        {history.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.doctor}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.type}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${item.color}`}>
                {item.status}
              </span>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Calendar className="w-4 h-4" />
                {item.date}
              </div>
              {item.status === 'Completed' && (
                <div className="flex items-center gap-1.5 text-xs text-primary font-medium ml-auto cursor-pointer hover:underline">
                  <FileText className="w-4 h-4" />
                  View Prescription
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </ScreenWrapper>
  );
};

export const Profile = () => {
  const { navigate, goBack } = useAppContext();

  return (
    <ScreenWrapper className="bg-background pb-24">
      <div className="bg-primary text-white p-6 pb-12 rounded-b-[2rem] shadow-md relative">
        <button onClick={goBack} className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-sm active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex flex-col items-center mt-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
              <img src="/user_profile_photo.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-2 border-primary shadow-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">John Doe</h1>
          <p className="text-blue-200 text-sm mt-1">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="px-6 py-6 -mt-8 relative z-10">
        <Card className="mb-6 p-0 overflow-hidden">
          <div className="flex flex-col">
            <ProfileMenuItem icon={User} label="Personal Information" onClick={() => navigate('ProfileCompletion')} />
            <ProfileMenuItem icon={Users} label="Family Members" onClick={() => navigate('MemberManagement')} />
            <ProfileMenuItem icon={MapPin} label="Saved Addresses" onClick={() => navigate('AddressSelection')} />
            <ProfileMenuItem icon={CreditCard} label="Payment Methods" onClick={() => { }} />
          </div>
        </Card>

        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider px-2">Preferences</h3>
        <Card className="mb-6 p-0 overflow-hidden">
          <div className="flex flex-col">
            <ProfileMenuItem icon={Bell} label="Notifications" onClick={() => { }} />
            <ProfileMenuItem icon={Settings} label="Settings" onClick={() => { }} />
            <ProfileMenuItem icon={HelpCircle} label="Help & Support" onClick={() => { }} />
          </div>
        </Card>

        <Button variant="outline" className="border-red-200 text-red-500 bg-red-50 hover:bg-red-100 gap-2" onClick={() => navigate('Auth')}>
          <LogOut className="w-5 h-5" />
          Log Out
        </Button>
      </div>
    </ScreenWrapper>
  );
};

const ProfileMenuItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
  <div
    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-semibold text-gray-900">{label}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
);
