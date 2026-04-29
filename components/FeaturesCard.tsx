

export default function FeaturesCard({bgColor, hvColor, feature, para, svg}:{bgColor:string, hvColor:string, feature:string, para:string, svg:string}){

    return(
        <div className={`p-4 py-6 w-full h-full bg-white border border-gray-100 rounded-lg group hover:scale-105 ${hvColor} transition-all duration-300 cursor-pointer`}>
            <div className="flex flex-col gap-5">
                <span className={`rounded-xl px-3 py-3 w-fit ${bgColor} group-hover:scale-110 transition-all duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d={`${svg}`} />
                    </svg>
                </span>
                <h2 className="font-bold text-xl">{feature}</h2>
                <p className="text-gray-500">{para}</p>
            </div>
        </div>
    )
}