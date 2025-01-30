'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Phone, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import image from "@/public/image-1.jpg";
import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 5000,
});

const AuthPage = () => {
  const [phone, setPhone] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      setTimeout(() => {
        setShowOTP(true);
      }, 2000);
      toast.success('OTP sent successfully', {
        style: { 
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius:"16px"
          
        },
        icon: <CheckCircle size={24} color="#00ff00" />,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      setError('');
      const otpString = otp.join('');
      
      toast.success('Account Verified Successfully!', {
        style: { 
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius:"16px"
          
        },
        icon: <CheckCircle size={24} color="#00ff00" />,
      });
      
      setTimeout(() => {
        window.location.href = '/auth/register/personal';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
      toast.error('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-black relative">
      <div className="w-full h-64 relative">
        <Image
          src={image}
          alt="Header"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
      </div>

      <div className="relative -mt-12">
        <div className="bg-black rounded-t-[2.5rem] h-[75vh] pt-8 px-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto w-full"
          >
            <div className="space-y-6 text-primary">
              <h1 className="text-4xl font-bold mb-8 text-white">Get started</h1>

              {error && (
                <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-lg">
                  {error}
                </div>
              )}

              {!showOTP ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-black/50 rounded-lg border-2 border-primary focus:ring-2 focus:ring-primary outline-none transition-colors text-white placeholder-white/60"
                        placeholder="+91 Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="rounded border-primary accent-primary bg-transparent focus:ring-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-white">
                      I agree to{' '}
                      <Link href="/terms" className="text-primary underline">
                        Terms & Conditions
                      </Link>
                    </label>
                  </div>

                  <Button 
                    className="w-full bg-primary text-black rounded-3xl hover:bg-primary/90"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!acceptedTerms || loading || !phone}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'GET OTP'
                    )}
                  </Button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-center text-white">
                    Enter the OTP sent to {phone}
                  </p>
                  <div className="flex gap-2 justify-between">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="number"
                        name={`otp-${index}`}
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 text-center bg-black/50 rounded-lg border-2 border-primary focus:ring-2 focus:ring-primary outline-none transition-colors text-white text-xl"
                      />
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-primary text-black rounded-3xl hover:bg-primary/90"
                    size="lg"
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.some(digit => !digit)}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                </motion.div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-primary/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-white">
                    or continue with
                  </span>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-transparent border-2 border-primary rounded-lg flex items-center justify-center space-x-2 hover:bg-primary/5 transition-colors text-white">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                <span>GOOGLE</span>
              </button>

              <p className="text-center text-sm text-white">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary underline">
                  LOG IN
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;