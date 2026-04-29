
export default function Divheading({heading, svg, textColor} : {heading: string, svg: string, textColor: string}) {
    return(
        <section className={`flex items-center justify-start ${textColor}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1 h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d={svg} />
            </svg>
            <h2 className="text-xl font-semibold">{heading}</h2>
        </section>
    )
}