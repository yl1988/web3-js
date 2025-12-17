import CyberCard from "@/src/components/card/cyber-card";
import {motion} from "framer-motion";
import {useState} from "react";

export default function IndexContentListCard({title}: {title: string}) {

    const [isOpen, setIsOpen] = useState(false);

    return <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1">
        <CyberCard contentClassName="flex flex-col">
            <div className="flex justify-between">
                <p className="text-cyber-neon-400 text-xl font-bold mb-6">{title}</p>
                <div className="flex justify-end items-center">
                    <div>下拉框</div>
                </div>
            </div>
            {/*下面内容区*/}
            <div>

            </div>
        </CyberCard>
    </motion.div>
}