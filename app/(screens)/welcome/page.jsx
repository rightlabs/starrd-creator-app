"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import image1 from "@/public/welcome-1.jpg";
import image2 from "@/public/welcome-2.jpg";

const slides = [
  {
    title: "Shape Your Story",
    subtitle: "Let's build a stunning media kit that showcases your unique creator journey",
    button: "Let's Begin",
    image1: image1,
    image2: image2,
    images: true,
  },
  {
    title: "Stand Out to Brands",
    subtitle: "Your influence deserves recognition. Let's highlight your true impact",
    button: "Continue",
    image1: image1,
    image2: image2,
    images: true,
  },
  {
    title: "Win Dream Collabs",
    subtitle: "Connect with brands that align with your authentic voice",
    button: "Get Started",
    image1: image1,
    image2: image2,
    images: true,
  },
];

const WelcomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleButtonClick = () => {
    if (currentSlide === slides.length - 1) {
      router.push("/auth/register");
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex bg-primary items-center justify-center rounded-3xl">
      <div className="w-[375px] h-[812px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-100vh w-full relative flex flex-col px-8"
          >
            <div className="flex flex-col h-full">
              {/* Stacked Images Section */}
              <div className="relative h-72 flex justify-center mt-8">
                {slides[currentSlide].images && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-4 w-48 h-64 rounded-2xl overflow-hidden shadow-lg transform -rotate-6"
                    >
                      <div className="w-full h-full bg-black p-1 rounded-2xl">
                        <Image
                          src={slides[currentSlide].image1}
                          alt="welcome"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 right-4 w-48 h-64 rounded-2xl overflow-hidden shadow-lg transform rotate-6"
                    >
                      <div className="w-full h-full bg-black p-1 rounded-2xl">
                        <Image
                          src={slides[currentSlide].image2}
                          alt="welcome"
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                    </motion.div>
                  </>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center" style={{ paddingTop: "10%" }}>
                <div className="flex gap-2 mt-8 mb-16">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors shadow-md border border-black ${
                        index === currentSlide ? "bg-black" : "bg-black/30"
                      }`}
                    />
                  ))}
                </div>

                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-4xl font-extrabold mb-4">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-lg text-black/90">
                    {slides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </div>

              <div className="mt-4 mb-4">
                <Button
                  onClick={handleButtonClick}
                  className="w-full py-7 bg-[#000] text-primary hover:bg-black/90 rounded-3xl text-lg font-semibold shadow-md"
                >
                  {slides[currentSlide].button}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WelcomeCarousel;