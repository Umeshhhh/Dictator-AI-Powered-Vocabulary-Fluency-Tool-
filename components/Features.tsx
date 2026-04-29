'use client';
import { useAtom } from "jotai";
import { sidebar } from "../store/atom/sidebar";
import FeaturesCard from "./FeaturesCard"
import { motion } from "framer-motion";

type dataType = {
    bgColor : string,
    hvColor : string,
    feature : string,
    svg : string,
    para : string
}

export default function Features(){

    const [sideBar, setSideBar] = useAtom(sidebar);
    const data : Array<dataType> = [
        {
            bgColor :"bg-blue-700",
            hvColor :"hover:bg-blue-100",
            feature :"Smart Search",
            svg :"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
            para :"Find any word instantly with our intelligent search algorithm that understands context and meaning."
        },
        {
            bgColor :"bg-amber-300",
            hvColor :"hover:bg-amber-100",
            feature :"50+ Languages",
            svg :"M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
            para :"Explore definitions, translations, and pronunciations across dozens of languages worldwide."
        },
        {
            bgColor :"bg-orange-400" ,
            hvColor :"hover:bg-orange-100",
            feature :"Etymology Explorer",
            svg :"M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
            para :"Discover the fascinating origins and evolution of words through time and cultures.",
        },
        {
            bgColor :"bg-pink-400" ,
            hvColor :"hover:bg-pink-100",
            feature :"Personal Collections",
            svg :"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
            para :"Save your favorite words, create custom lists, and track your vocabulary growth.",
        },
        {
            bgColor :"bg-blue-400" ,
            hvColor :"hover:bg-blue-100",
            feature :"Quick Definitions",
            svg :"m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
            para :"Get instant, accurate definitions with examples and usage notes for any word."
        },
        {
            bgColor :"bg-green-400",
            hvColor :"hover:bg-green-100",
            feature :"Community Driven",
            svg :"M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
            para :"Connect with fellow word lovers, share discoveries, and learn together."
        }
    ]

    return(
        <div
            onClick={() => {if(sideBar) setSideBar(false)}}  
            className="w-full flex flex-col items-center pt-10 px-4 md:px-5 gap-3 md:gap-5 mt-10 pb-20 bg-transparent">
            <motion.h1
                initial={{opacity: 0, y: 50}} 
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: "easeInOut"}}
                className="text-3xl md:text-5xl text-[#2563df] text-roboto font-bold tracking-wide text-center"
                >
                Powerful Features
            </motion.h1>
            <motion.p
                initial={{opacity: 0, y: 50}} 
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: "easeInOut", delay: 0.1}}
                className="text-base md:text-xl text-gray-400 text-roboto text-center px-2">
                    Everything you need to explore, understand, and master the world of words
            </motion.p>
            <section className="w-full flex flex-wrap justify-center gap-8 mt-10">
                {data.map(({bgColor, hvColor, feature, svg, para}, i) => {
                    return <motion.div 
                        initial={{opacity: 0, y: 50, scale: 0.8}} 
                        whileInView={{opacity: 1, y: 0, scale: 1}}
                        transition={{duration: 0.5, ease: "easeInOut", delay: i*0.1}}
                        className="w-full sm:w-[48%] lg:w-[30%]"
                        key={i}
                        >
                        <FeaturesCard 
                            bgColor= {bgColor} 
                            hvColor= {hvColor}
                            feature={feature}
                            svg={svg}
                            para={para}
                        />
                    </motion.div>
                })}
            </section>
        </div>
    )
}