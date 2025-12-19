// utils/utils.ts
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
/**
 * 格式化数字
 * @param num
 * @param decimals
 */
export const formatNumber = (num: number | string, decimals: number = 4): string => {
    if (typeof num === 'string') num = parseFloat(num);
    if (isNaN(num)) return '0';
    if (num < 0.01 && num > 0) return '<0.01';
    return num.toFixed(decimals).replace(/\.?0+$/, '');
};