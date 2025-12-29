import {LucideIcon} from "lucide-react";

export type AlertType = "success" | "info" | "warning" | "error" | "cyber"
export type AlertSize = "small" | "middle" | "large" | "xlLarge" | "2xlLarge" | "3xlLarge"
export interface CyberAlertProps {
    type?: AlertType
    size?: AlertSize
    title?: string
    message?: string
    description?: string
    showIcon?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
}

export interface TypeConfigItem {
    icon: LucideIcon
    titleColor: string
    bgColor: string
    iconColor: string
    glow: string
    borderColor: string
}
export interface SizeConfigItem {
    rounded: string
    padding: string
    title: string
    description: string
    icon: string
}