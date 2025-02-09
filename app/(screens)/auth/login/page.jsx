'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Phone, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import image from "@/public/image-1.jpg";
import { toast } from 'sonner';
import { loginUser, verifyLoginOTP, verifyUserOTP } from '@/api/user';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  // Location states
  const [isIndianUser, setIsIndianUser] = useState(true);
  const [locationChecked, setLocationChecked] = useState(false);
  
  // Auth states
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  // Location detection effect
  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://api.ipapi.com/check?access_key=' + process.env.NEXT_PUBLIC_IP_API_KEY);
        const data = await response.json();
        setIsIndianUser(data.country_code === 'IN');
      } catch (error) {
        console.error('Error detecting location:', error);
        setIsIndianUser(true); // Fallback to showing phone auth
      } finally {
        setLocationChecked(true);
      }
    };

    checkLocation();
  }, []);

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

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.querySelector(`input[name=otp-${index - 1}]`)?.focus();
    }
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 10 ? cleanPhone : false;
  };

  const handleSubmit = async () => {
    try {
      const validPhone = validatePhone(phone);
      if (!validPhone) {
        toast.error('Please enter a valid 10-digit phone number', {
          style: { 
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: "16px"
          }
        });
        return;
      }

      setLoading(true);
      setError('');
      const response = await loginUser(validPhone);

      if (response.data.statusCode === 200) {
        setShowOTP(true);
        startResendTimer();
        toast.success('OTP sent successfully', {
          style: { 
            backgroundColor: '#000000',
            color: '#bcee45',
            borderRadius: "16px"
          },
          icon: <CheckCircle size={24} color="#00ff00" />,
        });
      }
    } catch (err) {
      let errorMessage;
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (!err.response) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = "An error occurred. Please try again.";
      }

      setError(errorMessage);
      toast.error(errorMessage, {
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

// Inside LoginPage component
const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const otpString = otp.join('');
      
      const response = await verifyLoginOTP(phone, otpString);
      
      if (response.status === 200) {
        const userData = response.data?.data?.user;
        
        toast.success('Login Successful!', {
          style: { 
            backgroundColor: '#000000',
            color: '#bcee45',
            borderRadius: "16px"
          },
          icon: <CheckCircle size={24} color="#00ff00" />,
        });
  
        // Wait for cookies to be set
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        // Redirect based on onboarding step
        if (userData?.onboardingStep === 4) {
          window.location.href = '/dashboard';
        } else {
          // Redirect to appropriate onboarding step
          const stepRoutes = {
            1: '/auth/register/personal',
            2: '/auth/register/profession',
            3: '/auth/register/connect-socials'
          };
          window.location.href = stepRoutes[userData.onboardingStep] || '/auth/register/personal';
        }
      }
    } catch (error) {
      console.error('Verification Error:', error);
      const errorMessage = error.response?.data?.message || 'Verification failed';
      
      setOtp(['', '', '', '', '', '']);
      document.querySelector('input[name=otp-0]')?.focus();
      
      toast.error(errorMessage, {
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
  // Show loading state while checking location
  if (!locationChecked) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
              <h1 className="text-4xl font-bold mb-8 text-white">Welcome back</h1>

              {isIndianUser ? (
                // Phone auth for Indian users
                !showOTP ? (
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

                    <Button 
                      className="w-full bg-primary text-black rounded-3xl hover:bg-primary/90"
                      size="lg"
                      onClick={handleSubmit}
                      disabled={loading || !phone}
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
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 text-center bg-black/50 rounded-lg border-2 border-primary focus:ring-2 focus:ring-primary outline-none transition-colors text-white text-xl"
                        />
                      ))}
                    </div>

                    {resendTimer > 0 ? (
                      <p className="text-center text-sm text-white">
                        Resend OTP in {resendTimer}s
                      </p>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full text-sm text-primary hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}

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
                )
              ) : (
                // Google auth for non-Indian users
                <button className="w-full px-4 py-3 bg-transparent border-2 border-primary rounded-lg flex items-center justify-center space-x-2 hover:bg-primary/5 transition-colors text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              )}

              <p className="text-center text-sm text-white">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-primary underline">
                  SIGN UP
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;