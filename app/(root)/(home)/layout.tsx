import React, { ReactNode } from "react"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const RootLayout = ({ children } : { children: ReactNode }) => {
  return (
    <main className="relative">
        <Navbar/>
        <div className="flex">
            <Sidebar/>
            <section 
              className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-10 max-md:pb-14 sm:px-14"
              style={{ backgroundColor: "#35404c" }}
            >
                <div className="w-full">
                    { children }
                </div>
            </section>
        </div>
    </main>
  )
};

export default RootLayout;