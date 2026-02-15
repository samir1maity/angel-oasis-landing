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
        <footer className="footer">
          <div>
            <p className="logo-name">Angel Oasis</p>
            <p className="logo-sub">Spa</p>
          </div>
          <div className="location-stats" aria-label="Location stats">
            <p>
              <span className="location-label">Address</span>
              <span>166 Jessore Road, Bangur Avenue, Kolkata 700055</span>
            </p>
            <p>
              <span className="location-label">Email</span>
              <span>hello.angeloasis@gmail.com</span>
            </p>
            <p>
              <span className="location-label">Phone</span>
              <span>+91 9903300339</span>
            </p>
          </div>
          <p>© 2026 Angel Oasis Spa</p>
        </footer>
      </body>
    </html>
  );
}
