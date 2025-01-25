"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the welcome page
    router.push("/welcome");
  }, [router]);

  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
   helo
    </div>
  );
}
