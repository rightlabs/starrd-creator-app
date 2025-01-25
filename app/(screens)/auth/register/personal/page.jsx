'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, Calendar } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 5000,
});

const StepIndicator = () => {
  const steps = [
    { id: 1, width: 'w-8', active: true },
    { id: 2, width: 'w-2', active: false },
    { id: 3, width: 'w-2', active: false },
    { id: 4, width: 'w-2', active: false }
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
    <label className="text-sm font-medium">
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
    country: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!Object.values(formData).every(Boolean)) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
    //   await api.post('/onboarding/personal', formData);
      // toast.success('Profile updated successfully!');
      setTimeout(() => {
        window.location.href = '/auth/register/profession';
      }, 500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="relative h-36 bg-black/5">
        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-primary h-16 rounded-t-[5.5rem]" />
        </div>
        <div className="container px-6">
          <div className="flex items-center justify-between pt-6">
            <Link href="/auth">
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
            <h1 className="text-4xl  font-extrabold">Tell us about yourself</h1>
            <p className="text-black/60 pt-2">This helps us personalize your experience</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" required>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-black/5 rounded-xl border-2 border-transparent focus:border-black focus:bg-transparent outline-none transition-colors text-black placeholder-black/60"
                  placeholder="John"
                />
              </InputField>

              <InputField label="Last Name" required>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-black/5 rounded-xl border-2 border-transparent focus:border-black focus:bg-transparent transition-colors text-black placeholder-black/60 outline-none"
                  placeholder="Doe"
                />
              </InputField>
            </div>

            <InputField label="Gender" required>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-4 py-3 bg-black/5 rounded-xl border-2 border-transparent focus:border-black focus:bg-transparent transition-all outline-none appearance-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </InputField>

            <InputField label="Date of Birth" required>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full px-4 py-3 bg-black/5 rounded-xl border-2 border-transparent focus:border-black focus:bg-transparent transition-all outline-none"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </InputField>

            <InputField label="Country" required>
              <div className="relative">
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full px-4 py-3 bg-black/5 rounded-xl border-2 border-transparent focus:border-black focus:bg-transparent transition-all outline-none appearance-none"
                >
                  <option value="">Select country</option>
                  <option value="india">India</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </InputField>

            {/* {formData.country === 'india' && (
              <InputField label="State" required>
                <div className="relative">
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-4 py-3 bg-black/5 rounded-xl border-2 border-transparent focus:border-black focus:bg-transparent transition-all outline-none appearance-none"
                  >
                    <option value="">Select state</option>
                    <option value="delhi">Delhi</option>
                    <option value="haryana">Haryana</option>
                    <option value="punjab">Punjab</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </InputField>
            )} */}
          </div>

          <Button
            className="w-full bg-black rounded-3xl text-primary hover:bg-black/90"
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