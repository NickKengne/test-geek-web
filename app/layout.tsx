
 import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/themProviders";
import clsx from "clsx";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster }  from "@/app/components/ui/sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Test Geek",
  description: "Developper une application de synchronisation cas d'une todolist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background w-full flex",
          bricolageGrotesque.className,
          { "debug-screens": process.env.NODE_ENV === "development" }
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
            <div className="w-full h-full">{children}</div>
          <Toaster position="bottom-left" closeButton/>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
