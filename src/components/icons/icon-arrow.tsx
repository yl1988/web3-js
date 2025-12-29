import {IconProp} from "@/src/types/icon";

export default function IconArrow({ width = 30, height = 30, color = "#272636", className="" } : IconProp) {

    return <svg className={className} fill={color} width={width} height={height} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6088">
        <path d="M464.6 736C346 613.3 227.3 490.5 108.8 367.8c-48.9-50.5 30.5-125.9 79.5-75.1C293.9 401.9 399.4 511.2 505 620.3 614.2 510.6 723.6 400.8 832.8 291c49.7-50 129.1 25.4 79.5 75.2C789.6 489.5 666.9 612.7 544.2 736c-20.4 20.4-59.4 20.9-79.6 0z" p-id="6089"/>
    </svg>
}