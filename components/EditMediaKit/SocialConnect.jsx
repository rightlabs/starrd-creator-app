'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  Youtube,
  Twitter,
  AlertCircle,
  CheckCircle2,
  RefreshCcw,
  Unlink,
  Link as LinkIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const SOCIAL_PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: '#E4405F',
    analyticsFields: ['Followers', 'Engagement Rate', 'Avg. Likes']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
    analyticsFields: ['Subscribers', 'Avg. Views', 'Watch Time']
  }
];
const SocialCard = ({ platform, connection, onConnect, onDisconnect, onRefresh }) => {
    const Icon = platform.icon;
    const isConnected = connection?.connected;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-6 bg-[#1A1A1A] rounded-xl border border-[#333333] overflow-hidden group transition-all hover:border-[#bcee45]/20"
      >
        {/* Platform Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Platform Info */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${platform.color}20` }}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: platform.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-medium mb-1 text-sm md:text-base">{platform.name}</h3>
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#bcee45] shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#888888] shrink-0" />
                )}
                <p className="text-xs md:text-sm text-[#888888] truncate">
                  {isConnected ? `@${connection.handle}` : 'Not Connected'}
                </p>
              </div>
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {isConnected ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRefresh(platform.id)}
                  className="p-1.5 md:p-2 rounded-lg border border-[#333333] text-[#888888] hover:border-[#bcee45]/50 hover:text-[#bcee45]"
                >
                  <RefreshCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDisconnect(platform.id)}
                  className="p-1.5 md:p-2 rounded-lg border border-[#333333] text-red-400 hover:border-red-400/50"
                >
                    Remove
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onConnect(platform.id)}
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90 flex items-center gap-1.5 text-sm md:text-base"
              >
                <LinkIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Connect
              </motion.button>
            )}
          </div>
        </div>
  
        {/* Analytics Section */}
        <AnimatePresence>
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-3 gap-2 md:gap-4 pt-4 mt-4 border-t border-[#333333]"
            >
              {platform.analyticsFields.map((field, index) => (
                <div key={index} className="text-center space-y-0.5 md:space-y-1">
                  <p className="text-[#888888] text-[10px] md:text-xs">{field}</p>
                  <p className="text-white font-medium text-sm md:text-base">
                    {connection[field.toLowerCase().replace(/\s+/g, '_')] || '--'}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  
const SocialConnectSection = ({
  socialConnections,
  editForm,
  isEditing,
  setEditForm,
  handleEditToggle,
  handleSaveSection
}) => {

  const handleConnect = async (platformId) => {
    // In a real app, this would open OAuth flow
    // For now, we'll simulate a connection with mock data
    const mockConnectionData = {
      instagram: {
        connected: true,
        handle: 'creator.account',
        followers: '50K',
        engagement_rate: '5.2%',
        avg_likes: '2.5K'
      },
      youtube: {
        connected: true,
        handle: 'CreatorChannel',
        subscribers: '100K',
        avg_views: '25K',
        watch_time: '50K hrs'
      }
    };

    setEditForm(prev => ({
      ...prev,
      socialConnections: {
        ...prev.socialConnections,
        [platformId]: mockConnectionData[platformId]
      }
    }));
  };

  const handleDisconnect = (platformId) => {
    setEditForm(prev => ({
      ...prev,
      socialConnections: {
        ...prev.socialConnections,
        [platformId]: { connected: false }
      }
    }));
  };

  const handleRefresh = async (platformId) => {
    // In a real app, this would refresh the OAuth token and fetch new data
    // For now, we'll just show a simulated update
    const mockUpdatedData = {
      instagram: {
        connected: true,
        handle: 'creator.account',
        followers: '51K',
        engagement_rate: '5.4%',
        avg_likes: '2.6K'
      },
      youtube: {
        connected: true,
        handle: 'CreatorChannel',
        subscribers: '102K',
        avg_views: '26K',
        watch_time: '52K hrs'
      }
    };

    setEditForm(prev => ({
      ...prev,
      socialConnections: {
        ...prev.socialConnections,
        [platformId]: mockUpdatedData[platformId]
      }
    }));
  };

  const renderEditView = () => (
    <motion.div className="space-y-6">
      {/* Social Platforms */}
      <div className="space-y-4">
        {SOCIAL_PLATFORMS.map((platform) => (
          <SocialCard
            key={platform.id}
            platform={platform}
            connection={editForm.socialConnections?.[platform.id]}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onRefresh={handleRefresh}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEditToggle('social')}
          className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333] text-white"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSaveSection('socialConnections')}
          className="px-4 py-2 rounded-lg bg-[#bcee45] text-black hover:opacity-90"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );

  const renderViewMode = () => (
    <div className="space-y-4">
      {SOCIAL_PLATFORMS.map((platform) => (
        <SocialCard
          key={platform.id}
          platform={platform}
          connection={socialConnections?.[platform.id]}
          onConnect={() => handleEditToggle('social')}
          onDisconnect={() => handleEditToggle('social')}
          onRefresh={() => handleEditToggle('social')}
        />
      ))}
    </div>
  );

  return (
    <Card className="p-6 bg-[#1A1A1A] border-[#333333]">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Social Connections</h3>
          <p className="text-sm text-[#888888]">
            Manage your connected social media accounts
          </p>
        </div>
      </div>
      {isEditing ? renderEditView() : renderViewMode()}
    </Card>
  );
};

export default SocialConnectSection;