// components/cyber-alert.tsx

import { cn } from "@/src/utils/utils"
import {
    XCircle,
} from "lucide-react"
import {CyberAlertProps} from "@/src/types/cyber-alert";
import {sizeConfig, typeConfig} from "@/src/components/ui/cyber-alert/cyber-alert-config";

// 使用示例
// <CyberAlert
//     type="success"
//     message="交易成功"
//     description="您的 1.5 ETH 转账已确认，可以在交易历史中查看详情。"
//     showIcon
//     closable
// />
//
// <CyberAlert
//     type="info"
//     title="网络切换提醒"
//     message="已从以太坊主网切换到 Sepolia 测试网"
//     showIcon
// />
//
// <CyberAlert
//     type="cyber"
//     message="🎉 新功能上线！"
//     description="现在支持 NFT 展示和跨链转账功能，快去体验吧！"
//     showIcon
// />


export function CyberAlert({
                               type = "info",
                               title,
                               message,
                               description,
                               showIcon = true,
                               closable = false,
                               onClose,
                               className,
                               size="middle",
                           }: CyberAlertProps) {
    const config = typeConfig[type] || typeConfig.info
    const Icon = config.icon
    const sizeConfigValues = sizeConfig[size] || sizeConfig.middle
    const { rounded, padding, icon:iconSize, title:titleSize, description:descriptionSize } = sizeConfigValues

    // console.log("iconSize========", iconSize)
    return (
        <div
            className={cn(
                `relative ${rounded} border ${padding} transition-all duration-300`,
                config.bgColor,
                config.borderColor,
                config.glow,
                "hover:shadow-lg",
                className
            )}
        >
            {/* 关闭按钮 */}
            {closable && (
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 rounded-md text-gray-400 hover:text-white hover:bg-cyber-dark-400 transition-colors"
                >
                    <XCircle className={iconSize} />
                </button>
            )}

            <div className="flex gap-3">
                {/* 图标 */}
                {showIcon && (
                    <div className="flex-shrink-0">
                        <div className={cn(
                            "p-2 rounded-full",
                            config.iconColor === "text-cyber-neon-400"
                                ? "bg-cyber-neon-400/20 animate-pulse"
                                : "bg-opacity-20",
                            config.iconColor
                        )}>
                            <Icon className={iconSize} />
                        </div>
                    </div>
                )}

                {/* 内容 */}
                <div className="flex-1 space-y-1">
                    {/* 标题 */}
                    {title && (
                        <h4 className={cn(
                            `font-bold ${titleSize}`,
                            config.titleColor
                        )}>
                            {title}
                        </h4>
                    )}

                    {/* 消息 */}
                    <p className="text-white font-medium">
                        {message}
                    </p>

                    {/* 描述 */}
                    {description && (
                        <p className={`text-gray-400 ${descriptionSize} mt-2`}>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

