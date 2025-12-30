import type { NextPage } from 'next';
import ScanStarAnimations from "../components/dashboard/scan-star-animations";
import PureSVGHalo from "../components/dashboard/pure-svg-halo";
import React from "react";
import RealTimeMarket from "@/src/components/dashboard/real-time-market";

const Dashboard: NextPage = () => {

  return <>
    <main className="flex flex-col flex-1 justify-center items-center">
      <RealTimeMarket/>
    </main>
    <PureSVGHalo/>
    {/*底部模糊层 */}
    <div className="fixed inset-0 pointer-events-none z-30">
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-cyber-pink-400/10 to-transparent" />
    </div>
    {/* 第3层：轻量动画（CSS） */}
    <ScanStarAnimations/>
  </>
};

export default Dashboard;
