"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import image from "@/public/image-1.jpg";

const slides = [
  {
    title: "Shape Your Story",
    subtitle: "Let's build a stunning media kit that showcases your unique creator journey",
    button: "Let's Begin",
    url: image,
    images: true,
  },
  {
    title: "Stand Out to Brands",
    subtitle: "Your influence deserves recognition. Let's highlight your true impact",
    button: "Continue",
    url: image,
    images: true,
  },
  {
    title: "Win Dream Collabs",
    subtitle: "Connect with brands that align with your authentic voice",
    button: "Get Started",
    url: image,
    images: true,
  },
];

const WelcomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleButtonClick = () => {
    if (currentSlide === slides.length - 1) {
      router.push("/auth/register"); // Redirect to the auth page
    } else {
      setCurrentSlide((prev) => prev + 1); // Move to the next slide
    }
  };

  return (
    <div className="min-h-screen flex bg-primary items-center justify-center rounded-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-[375px] h-[812px] relative overflow-hidden"
        >
          <div className="h-100vh w-full relative flex flex-col px-8">
            <div className="flex flex-col h-full">
              <div className="flex justify-center">
                {slides[currentSlide].images && (
                  <Image
                    src={slides[currentSlide].url}
                    alt="welcome"
                    width={375}
                    height={272}
                    className="rounded-xl bg-primary"
                  />
                )}
              </div>

              <div className="flex-1 flex flex-col items-center" style={{ paddingTop: "20%" }}>
                <motion.div
                  className="w-20 h-20 bg-black/10 rounded-3xl flex items-center justify-center"
                >
                  <Camera className="w-10 h-10 text-black" />
                </motion.div>

                <div className="flex gap-2 mt-8 mb-16">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors shadow-md border border-black ${
                        index === currentSlide
                          ? "bg-black"
                          : "bg-black/30"
                      }`}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-lg text-black/90">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 mb-4">
                <Button
                  onClick={handleButtonClick}
                  className="w-full py-7 mb-30 bg-[#000] text-primary hover:bg-yellow/90 rounded-3xl text-lg font-semibold shadow-md"
                >
                  {slides[currentSlide].button}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WelcomeCarousel;
