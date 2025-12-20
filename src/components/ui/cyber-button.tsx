import React from "react";
import { cn } from "@/lib/utils"; // 假设你有 cn 工具函数

export type CyberButtonVariant =
    | 'primary'     // 主要按钮（默认）
    | 'secondary'   // 次要按钮
    | 'danger'      // 危险操作
    | 'success'     // 成功状态
    | 'warning'     // 警告
    | 'cancel'      // 取消按钮
    | 'ghost';      // 幽灵按钮

export type CyberButtonSize = 'small' | 'middle' | 'large';

export interface CyberButtonProps {
    children: React.ReactNode;
    size?: CyberButtonSize;
    variant?: CyberButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

export default function CyberButton({
                                        children,
                                        onClick,
                                        size = 'middle',
                                        variant = 'primary',
                                        disabled = false,
                                        loading = false,
                                        className,
                                        fullWidth = false,
                                        icon
                                    }: CyberButtonProps) {

    /**
     * 获取尺寸对应的 className
     */
    const getSizeClasses = () => {
        const base = {
            small: 'h-6 px-2 text-xs',
            middle: 'h-8 px-3 text-sm',
            large: 'h-10 px-4 text-base'
        };
        return base[size];
    };

    /**
     * 获取按钮主题配置
     */
    const getVariantConfig = () => {
        const configs: Record<CyberButtonVariant, {
            border: string;
            gradientFrom: string;
            gradientTo: string;
            color: string;
            bg: string;
            hoverBg?: string;
            disabledBg?: string;
        }> = {
            primary: {
                border: 'linear-gradient(135deg, #00ff9d, #ff00ff, #00e0ff)',
                gradientFrom: '#00ff9d',
                gradientTo: '#00e0ff',
                color: '#00e0ff',
                bg: '#0a0a0f',
                disabledBg: '#1a1a1a'
            },
            secondary: {
                border: 'linear-gradient(135deg, #9d00ff, #ff00ff)',
                gradientFrom: '#9d00ff',
                gradientTo: '#ff00ff',
                color: '#ff00ff',
                bg: '#0a0a0f',
                disabledBg: '#1a1a1a'
            },
            danger: {
                border: 'linear-gradient(135deg, #ff3366, #ff0044)',
                gradientFrom: '#ff3366',
                gradientTo: '#ff0044',
                color: '#ff3366',
                bg: '#0a0a0f',
                disabledBg: '#1a1a1a'
            },
            success: {
                border: 'linear-gradient(135deg, #00ff9d, #00cc77)',
                gradientFrom: '#00ff9d',
                gradientTo: '#00cc77',
                color: '#00ff9d',
                bg: '#0a0a0f',
                disabledBg: '#1a1a1a'
            },
            warning: {
                border: 'linear-gradient(135deg, #ffcc00, #ff9900)',
                gradientFrom: '#ffcc00',
                gradientTo: '#ff9900',
                color: '#ffcc00',
                bg: '#0a0a0f',
                disabledBg: '#1a1a1a'
            },
            cancel: {
                border: 'linear-gradient(135deg, #666666, #999999)',
                gradientFrom: '#666666',
                gradientTo: '#999999',
                color: '#cccccc',
                bg: '#0a0a0f',
                disabledBg: '#1a1a1a'
            },
            ghost: {
                border: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                gradientFrom: 'rgba(255,255,255,0.3)',
                gradientTo: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                bg: 'transparent',
                hoverBg: 'rgba(255,255,255,0.05)'
            }
        };

        return configs[variant];
    };

    /**
     * 获取按钮背景样式
     */
    const getBackgroundStyle = () => {
        const config = getVariantConfig();

        if (disabled) {
            return {
                background: `
          linear-gradient(${config.disabledBg || config.bg}, ${config.disabledBg || config.bg}) padding-box,
          linear-gradient(135deg, #333333, #555555) border-box
        `,
                border: '1px solid transparent',
                color: '#666666'
            };
        }

        return {
            background: `
        linear-gradient(${config.bg}, ${config.bg}) padding-box,
        ${config.border} border-box
      `,
            border: '1px solid transparent',
            color: config.color
        };
    };

    /**
     * 获取光晕层样式
     */
    const getGlowStyle = () => {
        if (disabled) return { display: 'none' };

        const config = getVariantConfig();

        return {
            background: `radial-gradient(circle at center, ${config.gradientFrom}20 0%, transparent 70%)`,
            filter: 'blur(10px)'
        };
    };

    /**
     * 获取扫描线样式
     */
    const getScanlineStyle = () => {
        if (disabled) return { display: 'none' };

        const config = getVariantConfig();

        return {
            background: `linear-gradient(transparent 50%, ${config.gradientFrom}20 50%)`,
            backgroundSize: '100% 4px',
            animation: 'scan-line 2s linear infinite'
        };
    };

    const sizeClasses = getSizeClasses();
    const variantConfig = getVariantConfig();
    const backgroundStyle = getBackgroundStyle();
    const glowStyle = getGlowStyle();
    const scanlineStyle = getScanlineStyle();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!disabled && !loading && onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={cn(
                "group relative rounded-sm transition-all duration-300 overflow-hidden cursor-pointer",
                sizeClasses,
                fullWidth && "w-full",
                disabled && "cursor-not-allowed opacity-60",
                loading && "cursor-wait",
                className
            )}
            style={backgroundStyle}
        >
            {/* 光晕层 */}
            {!disabled && !loading && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={glowStyle}
                />
            )}

            {/* 扫描线效果 */}
            {!disabled && !loading && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={scanlineStyle}
                />
            )}

            {/* 悬停背景层 - 针对 outline 和 ghost 变体 */}
            {(variant === 'outline' || variant === 'ghost') && !disabled && !loading && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: variantConfig.hoverBg || 'transparent'
                    }}
                />
            )}

            {/* 加载状态 */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                </div>
            )}

            {/* 按钮内容 */}
            <span className={cn(
                "relative z-10 flex items-center justify-center gap-2",
                loading && "opacity-0"
            )}>
        {icon && <span className="flex items-center">{icon}</span>}
                {children}
      </span>
        </button>
    );
}

// 如果你还没有 cn 工具函数，可以添加这个：
// src/lib/utils.ts
export function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(' ');
}