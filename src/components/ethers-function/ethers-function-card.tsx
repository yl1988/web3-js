import CyberCard from "@/src/components/ui/card/cyber-card";
import CollapseExpandIcon from "@/src/components/ethers-function/collapse-expand-icon";

interface Props {
    cardProps?: {[k:string]: string},
    children?: React.ReactNode
}
export default function EthersFunctionCard({cardProps = {}, children}:Props) {

    return <CyberCard {...cardProps}>
        {children}
        <CollapseExpandIcon size="20px"/>
    </CyberCard>
}