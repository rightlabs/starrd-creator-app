'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';


const StepIndicator = () => {
  const steps = [
    { id: 1, width: 'w-2', active: true },
    { id: 2, width: 'w-2', active: false },
    { id: 3, width: 'w-8', active: true },
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

const SocialConnect = () => {
  const [loading, setLoading] = useState(false);
  const [socialStates, setSocialStates] = useState({
    instagram: false,
    youtube: false
   });

   const handleInstaConnect = async () => {
    try {
      setLoading(true);
      await api.post('/connect/instagram');
      setSocialStates(prev => ({...prev, instagram: true}));
      toast.success('Instagram connected successfully', {
        style: { 
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius:"16px"
          
        },
        icon: <CheckCircle size={24} color="#00ff00" />,
       });
    } catch (error) {
      toast.error('Failed to connect Instagram');
    } finally {
      setLoading(false);
    }
   };
   
   const handleYoutubeConnect = async () => {
    try {
      setLoading(true); 
      await api.post('/connect/youtube');
      setSocialStates(prev => ({...prev, youtube: true}));
      toast.success('YouTube connected successfully', {
        style: { 
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius:"16px"
          
        },
        icon: <CheckCircle size={24} color="#00ff00" />,
       });
    } catch (error) {
      toast.error('Failed to connect YouTube');
    } finally {
      setLoading(false);
    }
   };

  const handleNext = () => {
    setTimeout(() => {
      window.location.href = '/auth/register/congratulations';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-36 bg-primary">
      <div className="absolute inset-x-0 bottom-0">
          <div className="bg-black h-16 rounded-t-[5.5rem]" />
        </div>
        <div className="container px-6">
  <div className="flex items-center justify-between pt-6 relative">
    {/* Back Arrow */}
    <Link href="/auth/register/profession">
    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-primary" />
              </div>
    </Link>

    {/* Step Indicator */}
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <StepIndicator />
    </div>

    {/* Skip Button */}
    <button
      className="px-4 py-2 bg-black/10 rounded-lg text-sm font-medium"
      onClick={handleNext}
    >
      SKIP
    </button>
  </div>
</div>

      </div>

     
        {/* Content */}
        <div className=" px-6 pb-8 container space-y-36">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl  text-white font-extrabold mb-2">Connect your socials</h1>
            <p className="text-gray-400">Your follower count will be displayed on your profile. Your analytics will integrate into the creator tools.</p>
          </div>

          {/* Social Buttons */}
          <div className="space-y-4">
            <motion.div 
              className="p-4 bg-primary rounded-2xl flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
<radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fd5"></stop><stop offset=".328" stopColor="#ff543f"></stop><stop offset=".348" stopColor="#fc5245"></stop><stop offset=".504" stopColor="#e64771"></stop><stop offset=".643" stopColor="#d53e91"></stop><stop offset=".761" stopColor="#cc39a4"></stop><stop offset=".841" stopColor="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9"></stop><stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
</svg>
                </div>
                <span className="text-black">Instagram</span>
              </div>
              <button 
 className={`px-4 py-2 ${
   socialStates.instagram 
     ? 'bg-primary/20 text-black' 
     : 'bg-black text-primary'
 } rounded-lg text-sm font-medium`}
 onClick={() => handleInstaConnect()}
 disabled={loading || socialStates.instagram}
>
 {socialStates.instagram ? 'CONNECTED' : 'CONNECT'}
</button>
            </motion.div>

        

            <motion.div 
              className="p-4 bg-primary rounded-2xl flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 48 48">
<path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
</svg>
                </div>
                <span className="text-black">YouTube</span>
              </div>
              <button 
 className={`px-4 py-2 ${
   socialStates.youtube 
      ? 'bg-primary/20 text-black' 
     : 'bg-black text-primary'
 } rounded-lg text-sm font-medium`}
 onClick={() => handleYoutubeConnect()}
 disabled={loading || socialStates.youtube}
>
 {socialStates.youtube ? 'CONNECTED' : 'CONNECT'}
</button>
            </motion.div>
          </div>
        
          
          </motion.div>
          <Button
            className="w-full bg-primary rounded-3xl text-black hover:bg-primary/90"
            size="lg"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Continue'}
          </Button>
        </div>

     

   
      </div>
  );
};

export default SocialConnect;