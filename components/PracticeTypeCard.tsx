'use client';

import { useEffect, useState } from "react";

type Props = {
    borderColor: string,
    bgColor: string, 
    iconColor: string, 
    ButtonColor: string, 
    text: string, 
    para: string, 
    svg: string,
    buttonHover: string,
    difficulty: string,
    duration: string
}

export default function PracticeTypeCard({borderColor, bgColor, iconColor, ButtonColor, text, para, svg, buttonHover, difficulty, duration}: Props){

    const [diffColor, setDiffColor] = useState('bg-green-100 text-green-800');
    useEffect(() => {
        if(difficulty == 'Easy'){
            setDiffColor('bg-green-100 text-green-800');
        } else if(difficulty == 'Medium'){
            setDiffColor('bg-amber-100 text-amber-800');
        } else {
            setDiffColor('bg-red-100 text-red-800');
        }
    }, [difficulty])

    return(
        <div className={`w-full sm:w-[48%] lg:w-[30%] h-full ${bgColor} ${borderColor} border-2 p-4 md:p-5 rounded-xl flex flex-col items-center justify-center group hover:-translate-y-2 transition-all duration-500 cursor-pointer`}>
            <div className="w-full p-3 flex flex-col gap-3">
                <section className="w-full flex justify-between items-center">
                    <span className={`rounded-xl px-3 py-3 ${iconColor} group-hover:scale-110 transition-all duration-400`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d={svg} />
                        </svg>
                    </span>
                    <span className="flex flex-col gap-1 px-2">
                        <p className={`px-2 py-1 flex items-center text-sm justify-center rounded-xl font-semibold ${diffColor}`}>{difficulty}</p>
                        <span className="flex items-center justify-center gap-1 text-sm text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p>{duration}</p>
                        </span>
                    </span>
                </section>
                <section className="flex flex-col gap-2 my-3">
                    <h2 className="font-bold text-xl">{text}</h2>
                    <p className="text-gray-500 line-clamp-1">{para}</p>
                </section>
                <button className={`${ButtonColor} text-white font-semibold px-5 py-2 rounded-lg ${buttonHover} transition-all duration-300 cursor-pointer`}>
                    Start Practice
                </button>
            </div>
        </div>
    )
}