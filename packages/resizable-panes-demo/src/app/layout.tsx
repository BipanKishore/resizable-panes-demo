import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Tabs } from "@/components";
import Footer from "@/components/footer";

import '../style/style.scss'
import '../style.css'


export const metadata: Metadata = {
  title: "Resizable Panes React",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body //className={inter.className}
      >
        <div className='w-m-1200 mx-auto' >
          <Header />
          <div className="d-flex">
            <Tabs  />
            <div id="content" className="router w-100p">
              {children}
            </div>
          </div>
          <Footer />

        </div>
      </body>
    </html>
  );
}
