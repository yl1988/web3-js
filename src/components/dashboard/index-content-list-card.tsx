import CyberCard from "@/src/components/ui/card/cyber-card";
import {motion} from "framer-motion";
import {useState} from "react";

// 导入组件
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {CyberAlert} from "@/src/components/ui/cyber-alert/cyber-alert";
import {CyberTable, CyberTableColumn} from "@/src/components/ui/cyber-table/cyber-table";

interface Props<T> {
    title: string,
    columns: CyberTableColumn<T>[],
    data: T[],
}

export default function IndexContentListCard<T>({title, columns, data}: Props<T>) {

    const [isOpen, setIsOpen] = useState(true);
    const [value, setValue] = useState("all")

    return <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex-shrink-0">
        <CyberCard contentClassName="flex flex-col">
            <div className="flex justify-between">
                <p className="text-cyber-neon-400 text-xl font-bold mb-6">{title}</p>
                <div className="flex justify-end items-center">
                    {
                        isOpen ?  <Select value={value} onValueChange={setValue}>
                            <SelectTrigger className="w-[160px] text-cyber-blue-200">
                                <SelectValue placeholder="Token Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Tokens</SelectItem>
                                <SelectItem value="stablecoins">💰 Stablecoins</SelectItem>
                                <SelectItem value="ethereum">🔷 Ethereum & L2s</SelectItem>
                                <SelectItem value="defi">🔄 DeFi Tokens</SelectItem>
                                <SelectItem value="nft">🖼️ NFT & Gaming</SelectItem>
                                <SelectItem value="meme">🐸 Meme Tokens</SelectItem>
                                <SelectItem value="governance">🏛️ Governance</SelectItem>
                            </SelectContent>
                        </Select> : null
                    }
                    <button className="flex justify-end items-center ml-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <span className="w-10 text-cyber-blue-200">{isOpen ? "Hide" : "Show"}</span>
                        <div className="relative w-6 h-6 ml-2">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-cyber-blue-200"/>
                            <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-cyber-blue-200 transition-all duration-300 ${isOpen ? "rotate-0" : "rotate-90"}`}/>
                        </div>
                    </button>
                </div>
            </div>
            {/*下面内容区*/}
            <div>
                <CyberAlert
                    type="info"
                    size="small"
                    description="Your Ethereum wallet is empty. Purchase or transfer assets."
                    showIcon
                />
                <div className="mt-2">
                    <CyberTable columns={columns} data={data}/>
                </div>
            </div>
        </CyberCard>
    </motion.div>
}