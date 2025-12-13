import type { NextPage } from 'next';
import ScanStarAnimations from "../components/scan-star-animations";
import Halo from "../components/halo";

const Dashboard: NextPage = () => {
  return <>
    <main className="flex flex-col">


    </main>
    {/*光晕*/}
    <Halo/>
    {/*底部模糊层 */}
    <div className="fixed inset-0 pointer-events-none z-30">
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-cyber-pink-400/10 to-transparent" />
    </div>
    {/* 第3层：轻量动画（CSS） */}
    <ScanStarAnimations />
  </>
};

export default Dashboard;
