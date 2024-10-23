"use client";
import React from "react";
import Image from "next/image";
import {
  DesktopSidebar,
  MobileSidebar,
} from "@/components/Sidebar/Sidebar.jsx";
import World from "@/public/world.svg";
import Content from "@/components/Content/Content.jsx";
import TableTrends from "@/components/Table/Table.jsx";
import * as motion from "framer-motion/client";
import { CountryProvider, useCountry } from "@/context/countrySelect.js"; // Use the correct import
import Faq from "@/components/FAQ/Faq";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <CountryProvider>
      <CountryContent />
    </CountryProvider>
  );
}

const CountryContent = () => {
  const [selectedTrend, setSelectedTrend] = React.useState(null);
  const { selectedCountry } = useCountry(); // Use the correct hook name

  const handleSelectTrend = (trend) => {
    setSelectedTrend(trend);
  };

  return (
    <div className="w-full justify-between flex sm:flex-col">
      <Navbar />
      <div className="lg:hidden items-center flex justify-center flex-col ">
        <MobileSidebar onSelectTrend={handleSelectTrend} />
        <div className="flex flex-col p-3 gap-4 ">
          <div>
            <Image src={World} alt="world" className="w-full h-96 mt-4" />
          </div>
          <div>
            <h1 className="sm:text-4xl md:text-6xl md:font-bold text-center md:leading-relaxed">
              WorldWide Twitter Trends | Twitter Trending Topics & Hashtags
              Today
            </h1>
          </div>

          <div className="bg-blue-100 p-8 rounded-xl mt-24">
            <TableTrends
              selectedTrend={selectedTrend}
              selectedCountry={selectedCountry}
            />
          </div>

          <Content />
        </div>
      </div>

      <div className="hidden lg:flex ">
        <div className="w-[30%] h-screen fixed left-0">
          <DesktopSidebar onSelectTrend={handleSelectTrend} />
        </div>

        <div className="flex flex-col p-3 gap-4 ">
          <div className="flex flex-col p-3 gap-4 w-[70%] ml-[20%] h-screen">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1.1 }}
              transition={{ ease: "easeIn", duration: 1 }}
            >
              <h1 className="sm:text-3xl md:text-4xl md:font-bold text-center ">
                WorldWide Twitter Trends | Twitter Trending Topics & Hashtags
                Today
              </h1>
            </motion.div>

            <div className="bg-blue-50 p-8 rounded-xl mt-24 shadow-xl">
              <TableTrends
                selectedTrend={selectedTrend}
                selectedCountry={selectedCountry}
              />
            </div>

            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};
