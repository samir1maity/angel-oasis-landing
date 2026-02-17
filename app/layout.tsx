import "./globals.css";
import { Playfair_Display, Sora } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "Angel Oasis Spa",
  description: "Angel Oasis Spa — modern wellness rituals with a serene touch."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
