'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  CreditCard,
  Plus,
  Wallet,
  Receipt,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const PaymentMethodsPage = () => {
  const savedCards = [
    {
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
      isDefault: true
    },
    {
      type: 'Mastercard',
      last4: '8353',
      expiry: '09/25',
      isDefault: false
    }
  ];

  const recentTransactions = [
    {
      title: 'Premium Plan',
      amount: '₹4,999',
      date: 'Jan 15, 2024',
      status: 'Completed'
    },
    {
      title: 'Basic Plan',
      amount: '₹2,999',
      date: 'Dec 15, 2023',
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="hover:bg-white/5">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold text-white">Payment Methods</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* Add Payment Method Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            className="w-full bg-[#bcee45] hover:bg-[#bcee45]/90 text-black gap-2" 
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add Payment Method
          </Button>
        </motion.div> */}

        {/* Saved Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center gap-2 text-[#bcee45]">
            <CreditCard className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Saved Cards</h2>
          </div>

          <div className="space-y-3">
            {savedCards.map((card) => (
              <motion.div
                key={card.last4}
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#bcee45]/10 flex items-center justify-center">
                      {/* <Bank className="w-5 h-5 text-[#bcee45]" /> */}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{card.type} •••• {card.last4}</p>
                        {card.isDefault && (
                          <span className="px-2 py-0.5 bg-[#bcee45]/10 rounded text-[#bcee45] text-xs">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400">Expires {card.expiry}</p>
                    </div>
                  </div>
                  {/* <Button variant="ghost" size="icon" className="text-zinc-400">
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </Button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Transactions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-[#bcee45]">
            <Clock className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#bcee45]/10 flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-[#bcee45]" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{transaction.title}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[#bcee45]">{transaction.amount}</span>
                        <span className="text-zinc-400">• {transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-zinc-400">{transaction.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Navbar />
    </div>
  );
};

export default PaymentMethodsPage;