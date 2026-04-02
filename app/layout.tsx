import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Best Spa in Kolkata for Relaxation & Wellness",
  description:
    "Angel Oasis Spa | Best Spa in Bangur Avenue, Kolkata for Relaxation & Wellness",
  keywords: [
    "best spa in Kolkata",
    "spa in Kolkata",
    "wellness spa in Kolkata",
    "body spa in Kolkata",
    "relaxation spa Kolkata",
    "best spa in Bangur Avenue Kolkata",
    "spa in Bangur Avenue",
    "spa near Jessore Road Kolkata",
    "spa near Lake Town Kolkata",
    "spa near Dum Dum Kolkata",
    "spa near VIP Road Kolkata",
    "best spa for relaxation in Kolkata",
    "affordable spa in Kolkata near me",
    "professional spa services in Bangur Avenue",
    "relaxing spa experience in Kolkata",
    "hygienic spa in Kolkata",
    "premium wellness spa in Kolkata",
    "full body spa in Kolkata",
    "stress relief spa Kolkata",
    "aromatherapy spa Kolkata",
    "relaxation therapy spa Kolkata",
    "couple spa in Kolkata",
    "body massage in Kolkata",
    "best body massage in Kolkata",
    "body massage spa Kolkata",
    "professional body massage Kolkata",
    "full body massage Kolkata",
    "body massage in Bangur Avenue Kolkata",
    "body massage near Jessore Road",
    "body massage near Lake Town Kolkata",
    "body massage near Dum Dum Kolkata",
    "body massage near VIP Road Kolkata",
    "relaxing body massage in Kolkata",
    "stress relief body massage Kolkata",
    "affordable body massage near me",
    "professional massage therapy Kolkata",
    "best massage for relaxation in Kolkata",
    "best body massage spa in Kolkata near me",
    "affordable body massage in Bangur Avenue",
    "relaxing spa and body massage in Kolkata",
    "professional body massage service near Jessore Road",
    "top rated body massage spa in Kolkata",
    "massage spa in Kolkata",
    "best massage spa in Kolkata",
    "massage spa near me",
    "spa and massage Kolkata",
    "professional massage spa Kolkata",
    "massage spa in Bangur Avenue Kolkata",
    "massage spa near Jessore Road",
    "massage spa near Lake Town Kolkata",
    "massage spa near Dum Dum Kolkata",
    "massage spa near VIP Road Kolkata",
    "relaxing massage spa in Kolkata",
    "affordable massage spa near me",
    "best spa for massage in Kolkata",
    "stress relief massage spa Kolkata",
    "premium massage spa Kolkata",
    "best massage spa in Kolkata near me",
    "affordable massage spa in Bangur Avenue",
    "professional massage spa near Jessore Road Kolkata",
    "top rated massage spa in Kolkata",
    "relaxing massage spa experience in Kolkata"
  ],
  icons: {
    icon: "/brand-logo-removebg-preview.png"
  }
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
