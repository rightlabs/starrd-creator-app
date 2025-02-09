'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Star, ChevronRight, Instagram, Youtube, Sparkles, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import ProfileAvatar from '@/components/ProfileAvatar';
import Link from 'next/link';
import { LogoutDialog } from '@/components/LogoutDialog';
import { useRouter } from 'next/navigation';
import { getUserDetails } from '@/api/user';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';

const SOCIAL_PLATFORMS = [
  {
    id: 'instagram',
    platform: 'Instagram',
    icon: <Instagram className="w-5 h-5" />,
    gradient: 'from-pink-500 to-purple-600',
    analyticsFields: ['Followers', 'Engagement Rate', 'Avg. Likes']
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    icon: <Youtube className="w-5 h-5" />,
    gradient: 'from-red-500 to-pink-600',
    analyticsFields: ['Subscribers', 'Avg. Views', 'Watch Time']
  }
];

const ConnectedAccounts = ({ socialAccounts = [] }) => {
  return (
    <div className="space-y-4">
      {SOCIAL_PLATFORMS.map((platform) => {
        const connectedAccount = socialAccounts.find(
          account => account.platform === platform.platform
        );
        
        return (
          <motion.div
            key={platform.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-[#1A1A1A]/60 backdrop-blur-md rounded-2xl border border-[#333333] hover:border-[#bcee45]/20 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${platform.gradient} rounded-xl flex items-center justify-center text-white`}>
                {platform.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{platform.platform}</span>
                  {connectedAccount?.verified && (
                    <Star className="w-4 h-4 text-[#bcee45]" />
                  )}
                </div>
                <div className="text-sm text-[#888888]">
                  {connectedAccount ? (
                    `${connectedAccount.username} • ${connectedAccount.followers} followers`
                  ) : (
                    'Not Connected'
                  )}
                </div>
              </div>
              <Button
          onClick={() => onConnect(platform.id)}
          variant={connectedAccount ? "outline" : "default"}
          className={connectedAccount ? 'border-primary text-primary hover:bg-primary/10' : ''}
        >
          {connectedAccount ? 'Connected' : 'Connect'}
        </Button>            </div>

            {connectedAccount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#333333]"
              >
                {platform.analyticsFields.map((field, index) => (
                  <div key={index} className="text-center">
                    <p className="text-[#888888] text-xs mb-1">{field}</p>
                    <p className="text-white font-medium">--</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        );
      })}

    </div>
  );
};

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDetails();
        if (response.status === 200) {
          setUserData(response.data.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "onboardingStep=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/welcome");
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to logout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Transform social accounts data
  const socialAccounts = userData?.socialAccounts?.map(account => ({
    platform: account.platform === 'instagram' ? 'Instagram' : 'YouTube',
    username: account.username,
    followers: `${(account.followers / 1000).toFixed(1)}K`,
    icon: account.platform === 'instagram' ? <Instagram className="w-5 h-5" /> : <Youtube className="w-5 h-5" />,
    verified: account.isVerified,
    gradient: account.platform === 'instagram' ? 'from-pink-500 to-purple-600' : 'from-red-500 to-pink-600'
  })) || [];

  const settingsOptions = [
    { name: 'Privacy & Policy', icon: '🔒', link: '/profile/privacy-and-security' },
    { name: 'Help & Support', icon: '💡', link: '/profile/help-and-support' }
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0F0F0F] text-white">
      {/* Cover Image Section */}
      <div className="relative h-72">
        <Image
          src="/welcome-2.jpg"
          alt="Cover Image"
          className="object-cover w-full h-full brightness-75"
          width={1200}
          height={400}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0A0A0A]" />
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-24 relative flex-grow">
        {/* Profile Image */}
            {/* Profile Image */}

            <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative w-32 h-32 mx-auto mb-6"
        >
<motion.div 
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  className="relative mx-auto mb-6"
>
<ProfileAvatar
            completion={userData?.completionStatus?.totalCompletion || 0}
            image="/welcome-1.jpg"
          />
</motion.div></motion.div>


        {/* Profile Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white">
              {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
            </h1>
            <Sparkles className="w-6 h-6 text-[#bcee45]" />
          </div>
          <p className="text-[#888888] text-lg">
            {userData?.categories?.join(' & ') || 'Digital Creator'}
          </p>
          <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#bcee45] to-[#9BC53D] text-black rounded-xl text-sm font-semibold flex items-center gap-2 mx-auto hover:opacity-90 transition-all">
            <Share2 className="w-4 h-4" />
            Share Your profile
          </button>
        </motion.div>

        {/* Connected Accounts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-xl font-semibold mb-6 text-white">
            Connected Accounts
          </h2>
          <ConnectedAccounts socialAccounts={socialAccounts} />
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-xl font-semibold mb-6 text-white">
            Account Settings
          </h2>
          <div className="space-y-2">
          {/* Regular settings options */}
          {settingsOptions.map((item) => (
            <Link href={item.link} key={item.name}>
              <motion.button
                whileHover={{ x: 4 }}
                className="w-full p-4 mt-2 flex items-center justify-between bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] hover:border-[#bcee45]/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white group-hover:text-[#bcee45] transition-colors">
                    {item.name}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#888888] group-hover:text-[#bcee45] transition-colors" />
              </motion.button>
            </Link>
          ))}

          {/* Logout button */}
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => setShowLogoutDialog(true)}
            className="w-full p-4 flex items-center justify-between bg-[#1A1A1A]/60 backdrop-blur-md rounded-xl border border-[#333333] hover:border-red-500/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🚪</span>
              <span className="text-white group-hover:text-red-500 transition-colors">
                Logout
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#888888] group-hover:text-red-500 transition-colors" />
          </motion.button>
        </div>
      </motion.div>

      {/* Logout Dialog */}
      <AnimatePresence>
        <LogoutDialog
          isOpen={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
          onConfirm={() => {
            handleLogout();
            setShowLogoutDialog(false);
          }}
        />
      </AnimatePresence>

      <Navbar />
    </div>
  </div>
  );
};

export default ProfilePage;
