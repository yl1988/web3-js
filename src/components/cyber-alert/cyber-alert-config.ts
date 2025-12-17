import {AlertTriangle, CheckCircle2, Info, XCircle, Zap} from "lucide-react";
import {AlertSize, AlertType, SizeConfigItem, TypeConfigItem} from "@/src/types/cyber-alert";

export const typeConfig: Record<AlertType, TypeConfigItem> = {
    success: {
        icon: CheckCircle2,
        titleColor: "text-green-400",
        bgColor: "bg-green-400/10",
        borderColor: "border-green-400/30",
        iconColor: "text-green-400",
        glow: "shadow-neon-green",
    },
    info: {
        icon: Info,
        titleColor: "text-cyber-blue-400",
        bgColor: "bg-cyber-blue-400/10",
        borderColor: "border-cyber-blue-400/30",
        iconColor: "text-cyber-blue-400",
        glow: "shadow-neon-blue",
    },
    warning: {
        icon: AlertTriangle,
        titleColor: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
        borderColor: "border-yellow-400/30",
        iconColor: "text-yellow-400",
        glow: "shadow-neon-yellow",
    },
    error: {
        icon: XCircle,
        titleColor: "text-red-400",
        bgColor: "bg-red-400/10",
        borderColor: "border-red-400/30",
        iconColor: "text-red-400",
        glow: "shadow-neon-red",
    },
    cyber: {
        icon: Zap,
        titleColor: "text-cyber-neon-400",
        bgColor: "bg-gradient-to-r from-cyber-dark-300/80 to-cyber-neon-400/5",
        borderColor: "border-cyber-neon-400/30",
        iconColor: "text-cyber-neon-400",
        glow: "shadow-neon",
    },
} // 类型配置

export const sizeConfig: Record<AlertSize, SizeConfigItem> = {
    small: {
        rounded: "rounded-sm",
        padding: "p-1",
        title: "text-sm",
        description: "text-xs",
        icon: "w-4 h-4",
    },
    middle: {
        rounded: "rounded-md",
        padding: "p-2",
        title: "text-base",
        description: "text-sm",
        icon: "w-5 h-5",
    },
    large: {
        rounded: "rounded-md",
        padding: "p-3",
        title: "text-lg",
        description: "text-base",
        icon: "w-6 h-6",
    },
    xlLarge: {
        rounded: "rounded-lg",
        padding: "p-4",
        title: "text-2lg",
        description: "text-lg",
        icon: "w-7 h-7",
    },
    "2xlLarge": {
        rounded: "rounded-lg",
        padding: "p-5",
        title: "text-3lg",
        description: "text-2lg",
        icon: "w-8 h-8",
    },
    "3xlLarge": {
        rounded: "rounded-lg",
        padding: "p-6",
        title: "text-4lg",
        description: "text-3lg",
        icon: "w-9 h-9",
    }
}