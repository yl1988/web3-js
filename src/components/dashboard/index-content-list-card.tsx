import CyberCard from "@/src/components/card/cyber-card";
import {motion} from "framer-motion";
import {useState} from "react";

// 导入组件
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"

export default function IndexContentListCard({title}: {title: string}) {

    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("all")

    return <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1">
        <CyberCard contentClassName="flex flex-col">
            <div className="flex justify-between">
                <p className="text-cyber-neon-400 text-xl font-bold mb-6">{title}</p>
                <div className="flex justify-end items-center">
                    <div>
                        <Select value={value} onValueChange={setValue}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="choose categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Stablecoins">Stablecoins</SelectItem>
                                <SelectItem value="eth">ETH Correlated</SelectItem>
                                <SelectItem value="Principle">Principle Tokens</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {/*下面内容区*/}
            <div>

            </div>
        </CyberCard>
    </motion.div>
}