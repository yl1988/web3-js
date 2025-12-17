import CyberCard from "@/src/components/card/cyber-card";
import {motion} from "framer-motion";
import {ReactNode} from "react";

export default function IndexTopTitleCard({title,children}: {title: string,children: ReactNode}) {

    return <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1">
        <CyberCard contentClassName="flex flex-col">
            <p className="text-cyber-neon-400 text-xl font-bold mb-6">{title}</p>
            <p className="text-cyber-blue-200 text-md">{children}</p>
        </CyberCard>
    </motion.div>
}