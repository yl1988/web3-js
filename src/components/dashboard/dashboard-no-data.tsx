import React from "react";

export default function DashBoardNoData({refreshData} : {refreshData: () => void}) {

    return  <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="text-6xl mb-6">📊</div>
        <h2 className="text-2xl font-bold text-white mb-4">暂无市场数据</h2>
        <p className="text-cyber-neon-400/70 text-lg max-w-md text-center">
            未能获取到市场数据，请检查网络连接或稍后再试
        </p>
        <button
            onClick={refreshData}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-cyber-neon-400 to-cyber-pink-400 rounded-lg font-bold text-black hover:scale-105 transition-all duration-300"
        >
            重试获取数据
        </button>
    </div>
}