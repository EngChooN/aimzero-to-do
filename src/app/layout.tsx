import type { Metadata } from "next"
// import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/layout/Header/Header"
import ModalProvider from "@/components/provider/ModalProvider";


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Aimzero to do",
  description: "test description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="modal"></div>
        <ModalProvider>
          <Header />
          <div className="flex flex-col items-center w-screen h-full">
            {children}
          </div>
        </ModalProvider>    
      </body>
    </html>
  );
}
