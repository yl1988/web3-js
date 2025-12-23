export default function ExpandToggleShowContainer({expand, children}: {expand: boolean,children: React.ReactNode}) {

    return <div className={`transition-all duration-300 ${expand ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {children}
    </div>
}