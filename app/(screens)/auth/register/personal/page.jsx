'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import axios from 'axios';
import { getUserDetails, updateUserDetails } from '@/api/user';



// Custom Calendar Component
const CustomCalendar = ({ selectedDate, onSelect, onClose }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onSelect(selected.toISOString().split('T')[0]);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute z-50 top-full left-0 right-0 mt-2 bg-black rounded-xl p-4 shadow-lg border border-primary/20"
    >
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-primary/10 rounded-lg text-white">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="font-medium text-white">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth} className="p-1 hover:bg-primary/10 rounded-lg text-white">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-white/60">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {[...Array(daysInMonth)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handleDateSelect(index + 1)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// Custom Select Component
const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-4 py-3 bg-black rounded-xl border-2 border-primary/20 hover:border-primary focus:border-primary transition-colors cursor-pointer flex justify-between items-center text-white"
      >
        <span className={value ? "text-white" : "text-white/60"}>
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </span>
        <ChevronDown className="w-4 h-4" />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-black rounded-xl overflow-hidden shadow-lg border border-primary/20"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-4 py-3 text-white hover:bg-primary hover:text-black cursor-pointer transition-colors"
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const StepIndicator = () => {
  const steps = [
    { id: 'step-1', width: 'w-8', active: true },
    { id: 'step-2', width: 'w-2', active: false },
    { id: 'step-3', width: 'w-2', active: false },
    { id: 'step-4', width: 'w-2', active: false }
  ];

  return (
    <div className="flex items-center gap-2">
      {steps.map((step) => (
        <motion.div
          key={step.id}
          className={`h-2 rounded-full ${step.active ? 'bg-black' : 'bg-black/20'} ${step.width}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: step.id * 0.1 }}
        />
      ))}
    </div>
  );
};

const InputField = ({ label, required, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    <label className="text-sm font-medium text-white">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </motion.div>
);

const PersonalInfoV2 = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDetails();
        if (response.status === 200 && response.data?.data?.user) {
          const userData = response.data.data.user;
          setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            gender: userData.gender?.toLowerCase() || '', // Convert to lowercase for form
            dateOfBirth: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '',
            country: userData.location || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load your information', {
          style: { 
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: "16px"
          }
        });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    if (!Object.values(formData).every(Boolean)) {
      toast.error('Please fill all required fields', {
        style: { 
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius: "16px"
        }
      });
      return;
    }

    try {
      setLoading(true);
      
      const formattedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
        dob: new Date(formData.dateOfBirth).toISOString(),
        location: formData.country
      };

      const response = await updateUserDetails(formattedData);

      if (response.status === 200) {
        toast.success('Personal information saved!', {
          style: { 
            backgroundColor: '#000000',
            color: '#bcee45',
            borderRadius: "16px"
          }
        });

        // Update onboarding step cookie
        document.cookie = "onboardingStep=2; path=/; max-age=2592000";

        setTimeout(() => {
          window.location.href = '/auth/register/profession';
        }, 1000);
      }
    } catch (error) {
      console.error('Update Error:', error);
      toast.error(error.response?.data?.message || 'Failed to save information', {
        style: { 
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius: "16px"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-36 bg-primary">
        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-black h-16 rounded-t-[5.5rem]" />
        </div>
        <div className="container px-6">
          <div className="flex items-center justify-between pt-6">
            <Link href="/auth/register">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-primary" />
              </div>
            </Link>
            <StepIndicator />
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="container px-6 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-white">Tell us about yourself</h1>
            <p className="text-gray-400 pt-2">This helps us personalize your experience</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" required>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-black rounded-xl border-2 border-primary/20 focus:border-primary hover:border-primary/60 outline-none transition-colors text-white placeholder-white/60"
                  placeholder="John"
                />
              </InputField>
              <InputField label="Last Name" required>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-black rounded-xl border-2 border-primary/20 focus:border-primary hover:border-primary/60 outline-none transition-colors text-white placeholder-white/60"
                  placeholder="Doe"
                />
              </InputField>
            </div>

            <InputField label="Gender" required>
              <CustomSelect
                value={formData.gender}
                onChange={(value) => setFormData({...formData, gender: value})}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' }
                ]}
                placeholder="Select gender"
              />
            </InputField>

            <InputField label="Date of Birth" required>
              <div className="relative">
                <div 
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full px-4 py-3 bg-black rounded-xl border-2 border-primary/20 hover:border-primary/60 focus:border-primary transition-colors cursor-pointer flex justify-between items-center text-white"
                >
                  <span className={formData.dateOfBirth ? "text-white" : "text-white/60"}>
                    {formData.dateOfBirth || 'Select date'}
                  </span>
                  <Calendar className="w-4 h-4" />
                </div>
                <AnimatePresence>
                  {showCalendar && (
                    <CustomCalendar
                      selectedDate={formData.dateOfBirth}
                      onSelect={(date) => setFormData({...formData, dateOfBirth: date})}
                      onClose={() => setShowCalendar(false)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </InputField>

            <InputField label="Country" required>
              <CustomSelect
                value={formData.country}
                onChange={(value) => setFormData({...formData, country: value})}
                options={[
                  { value: 'india', label: 'India' },
                  { value: 'us', label: 'United States' },
                  { value: 'uk', label: 'United Kingdom' }
                ]}
                placeholder="Select country"
              />
            </InputField>
          </div>

          <Button
            className="w-full bg-primary rounded-3xl text-black hover:bg-primary/90"
            size="lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalInfoV2;