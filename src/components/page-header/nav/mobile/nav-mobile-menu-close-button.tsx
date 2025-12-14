"use client"

import NavButtonLine from "./nav-button-line";

export default function NavMobileMenuCloseButton({change} : {change: (isOpen: boolean) => void}) {
    return <button
        onClick={() => change(false)}
        className="group relative w-8 h-8 p-1 transition-all duration-300 overflow-hidden cursor-pointer"
    >
        <div className="flex flex-col justify-around w-full h-full" style={{transform: "rotateY(180deg)"}}>
            <span className="relative h-0.5">
                    <NavButtonLine className={`absolute left-0 top-0 rotate-45`}/>
                    <NavButtonLine className={`absolute left-0 top-0 -rotate-45`} />
                </span>
        </div>
    </button>
}