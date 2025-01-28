import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const fonts = {
  poppins,
};

export const metadata = {
  title: "Starrd Media Kit - Build Your Digital Resume",
  description:
    "Create and manage your professional media kit as a content creator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}
      <Toaster />
      </body>
    </html>
  );
}
