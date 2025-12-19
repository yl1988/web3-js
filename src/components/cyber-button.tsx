import React from "react";

export interface CyberButtonProps {
    children: React.ReactNode,
    size?: 'small' | 'middle' | 'large'
    onClick?: () => void
}
export default function CyberButton({children, onClick, size = 'middle'}: CyberButtonProps) {

    /**
     * 根据size返回对应的className
     */
    const getSize = () => {
        switch (size) {
            case 'small':
                return 'h-6'
            case 'large':
                return 'h-10'
            default:
                return 'h-8'
        }
    }
    const renderSize = getSize()
    return <button
        onClick={onClick}
        className={`group relative px-2 ${renderSize} rounded-sm transition-all duration-300 overflow-hidden cursor-pointer`}
        style={{
            // 渐变边框
            background: `
                    linear-gradient(#0a0a0f, #0a0a0f) padding-box,
                    linear-gradient(135deg, #00ff9d, #ff00ff, #00e0ff) border-box
                  `,
            border: '1px solid transparent',
            color: '#00e0ff',
        }}
    >
        {/* 光晕层 */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{
                 background: 'radial-gradient(circle at center, rgba(0,255,157,0.2) 0%, transparent 70%)',
                 filter: 'blur(10px)',
             }}
        />

        {/* 扫描线效果 */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
             style={{
                 background: 'linear-gradient(transparent 50%, rgba(0,255,157,0.1) 50%)',
                 backgroundSize: '100% 4px',
                 animation: 'scan-line 2s linear infinite',
             }}
        />

        <span className="relative z-10 flex items-center gap-3 text-xs">
                        {children}
                </span>
    </button>
}