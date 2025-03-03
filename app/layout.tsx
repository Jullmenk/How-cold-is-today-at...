import HeaderPage from "@/components/UI/header/header";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/UI/footer/footer";
import { GlobalProvider } from "./GlobalProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://howcoldistoday.vercel.app/";

  return {
    title: "How cold is today?",
    description: "A weather app",
    author: "Julmenk",
    copyright: "Julmenk",
    openGraph: {
      title: "How cold is today?",
      description: "A weather app",
      url: `${siteUrl}`,
      images: [
        {
          url: "https://res.cloudinary.com/dkvsuatxf/image/upload/v1741042572/wfbfyxnasyjhvkfqslyf.svg",
          alt: "How cold is today?",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "How cold is today",
      description: "A weather app",
      images: [
        {
          url: "https://res.cloudinary.com/dkvsuatxf/image/upload/v1741042572/wfbfyxnasyjhvkfqslyf.svg",
          alt: "How cold is today?",
        },
      ],
    },
  };}
  
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="https://res.cloudinary.com/dkvsuatxf/image/upload/v1741042572/wfbfyxnasyjhvkfqslyf.svg" />
       <body className={`${inter.variable}`}>
        <GlobalProvider>
          <HeaderPage />
          {children}
          <Footer/>
        </GlobalProvider>
      </body>
    </html>
  );
}
