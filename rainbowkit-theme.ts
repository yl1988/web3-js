// rainbowkit-theme.ts
import { Theme, darkTheme } from '@rainbow-me/rainbowkit'

export const cyberpunkTheme: Theme = {
    ...darkTheme(),

    // 覆盖所有颜色
    colors: {
        // 连接按钮
        accentColor: '#99ffff',
        accentColorForeground: '#0a0a0f',
        connectButtonBackground: '#0a0a0f',
        connectButtonBackgroundError: '#ff3366',
        connectButtonInnerBackground: '#121215',
        connectButtonText: '#cc99ff',
        connectButtonTextError: '#ffffff',

        // 模态框
        modalBackground: '#0a0a0f',
        modalBackdrop: 'rgba(10, 10, 15, 0.9)',
        modalBorder: 'rgba(153, 255, 255, 0.3)',
        modalText: '#ffffff',
        modalTextDim: '#888888',
        modalTextSecondary: '#cccccc',

        // 菜单和下拉
        menuItemBackground: '#121215',
        // dropdownBackground: '#0a0a0f',
        // dropdownBoxShadow: '0 0 20px rgba(0, 255, 157, 0.4)',
        // dropdownMenuBorder: 'rgba(0, 255, 157, 0.2)',

        // 操作按钮
        actionButtonBorder: 'rgba(0, 255, 157, 0.3)',
        actionButtonBorderMobile: 'rgba(0, 255, 157, 0.3)',
        actionButtonSecondaryBackground: '#121215',

        // 关闭按钮
        closeButton: '#cccccc',
        closeButtonBackground: 'rgba(0, 255, 157, 0.1)',

        // 钱包相关
        // walletLogoBackground: 'rgba(0, 255, 157, 0.1)',
        selectedOptionBorder: 'rgba(0, 255, 157, 0.5)',
        // selectedWallet: '#121215',
        standby: '#ffcc00',

        // 个人资料
        profileAction: 'rgba(0, 255, 157, 0.1)',
        profileActionHover: 'rgba(0, 255, 157, 0.2)',
        profileForeground: '#121215',

        // 通用
        generalBorder: 'rgba(0, 255, 157, 0.2)',
        generalBorderDim: 'rgba(0, 255, 157, 0.1)',
        error: '#ff3366',

        connectionIndicator: "#cc99ff", // 连接时显示绿色
        downloadBottomCardBackground: "#121215", // 下载卡片底部背景
        downloadTopCardBackground: "#0a0a0f", // 下载卡片顶部背景
    },

    // 阴影
    shadows: {
        connectButton: '0 0 15px rgba(0, 255, 157, 0.4)',
        dialog: '0 0 30px rgba(153, 255, 255, 0.3)',
        profileDetailsAction: '0 0 10px rgba(0, 255, 157, 0.3)',
        selectedOption: '0 0 10px rgba(0, 255, 157, 0.4)',
        selectedWallet: '0 0 20px rgba(0, 255, 157, 0.4)',
        walletLogo: '0 0 15px rgba(0, 255, 157, 0.3)',
    },

    // 字体
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },

    // 圆角
    radii: {
        actionButton: '8px',
        connectButton: '8px',
        menuButton: '8px',
        modal: '12px',
        modalMobile: '12px',
    },

    // 模糊效果
    blurs: {
        modalOverlay: 'blur(8px)',
    },
}