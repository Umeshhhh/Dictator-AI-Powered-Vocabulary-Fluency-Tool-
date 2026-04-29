'use client';
import { useAtom } from "jotai";
import { sidebar } from "../store/atom/sidebar";
import Divheading from "./Divheading";
import { motion } from "framer-motion";

export default function WordOfTheDay(){

    const [sideBar, setSideBar] = useAtom(sidebar);

    return(
        <div
            onClick={() => {if(sideBar) setSideBar(false)}}  
            className="w-full bg-transparent flex flex-col items-center px-4 md:p-10 gap-3 md:gap-5 mt-10">
            <motion.h1 
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                viewport={{
                    amount: 'all'
                }}
                className="text-3xl md:text-5xl text-[#2563df] text-roboto font-bold tracking-wide text-center">
                Word of the Day
            </motion.h1>
            <motion.p 
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                viewport={{
                    amount: 'all'
                }}
                className="text-base md:text-xl text-gray-400 text-roboto text-center px-2">
                Expand your vocabulary with our carefully curated daily word selection
            </motion.p>
            <motion.div 
                className="w-full flex justify-center items-center px-2 sm:px-6 md:px-20 lg:px-40"
                initial={{opacity: 0, y: 50, scale: 0.95}}
                whileInView={{opacity: 1, y: 0, scale: 1}}
                transition={{duration: 0.5}}
                viewport={{
                    margin: '-100px'
                }}
                >
                <section className="w-full mt-5 bg-blue-50 rounded-xl px-4 sm:px-6 md:px-10 pt-6 md:pt-10 flex flex-col justify-center items-center">
                    <section className="w-full flex justify-between items-center mb-5">
                        <section className="flex gap-2 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                            <p className="font-semibold">Today&apos;s Word</p>
                        </section>
                        <section className="flex gap-4">
                            <span className="cursor-pointer p-2 hover:bg-black/5 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            </span>
                            <span className="cursor-pointer p-2 hover:bg-black/5 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                </svg>
                            </span>
                        </section>
                    </section>
                    <motion.h1
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.9}}
                        viewport={{
                            amount: 'all'
                        }}
                        className="text-4xl sm:text-5xl md:text-6xl text-[#2258c3] text-roboto font-bold tracking-wide text-center"
                        >
                        Serendipity
                    </motion.h1>
                    <section className="w-full mt-10 flex flex-col gap-7">
                        <motion.span 
                            initial={{opacity: 0, scale: 0.95, y: 50}}
                            whileInView={{opacity: 1, scale: 1, y: 0}}
                            transition={{duration: 0.5}}
                            className="relative flex flex-col gap-2 overflow-clip"
                            >
                            <motion.div
                                initial={{opacity: 1, x: 0}}
                                whileInView={{opacity: 0, x: '100%'}}
                                transition={{duration: 0.9, delay: 0.3}}
                                viewport={{
                                    margin: '-5px',
                                }}
                                className="absolute top-0 h-full w-full bg-blue-50/50">
                            </motion.div>
                            <Divheading
                                heading="Definition"
                                svg="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                                textColor="text-purple-800"
                            />
                            <section className="mt-1 text-lg">
                                <p className="text-black/60 text-lg text-roboto">{"The occurrence and development of events by chance in a happy or beneficial way; a pleasant surprise or unexpected discovery."}</p>
                            </section>
                        </motion.span>
                        <motion.span 
                            initial={{opacity: 0, scale: 0.95, y: 50}}
                            whileInView={{opacity: 1, scale: 1, y: 0}}
                            transition={{duration: 0.5}}
                            className="relative flex flex-col gap-2 overflow-clip"
                            >
                            <motion.div
                                initial={{opacity: 1, x: 0}}
                                whileInView={{opacity: 0, x: '100%'}}
                                transition={{duration: 0.9, delay: 0.3}}
                                viewport={{
                                    margin: '-10px',
                                }}
                                className="absolute top-0 h-full w-full bg-blue-50/50">
                            </motion.div>
                            <Divheading
                                heading="Example"
                                svg="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                textColor="text-blue-800"
                            />
                            <section className="mt-1 text-lg">
                                <p className="text-black/60 text-lg text-roboto italic">{`"Meeting my future business partner at that random coffee shop was pure serendipity."`}</p>
                            </section>
                        </motion.span>
                        <motion.span 
                            initial={{opacity: 0, scale: 0.95, y: 50}}
                            whileInView={{opacity: 1, scale: 1, y: 0}}
                            transition={{duration: 0.5}}
                            className="relative flex flex-col gap-2 overflow-clip"
                            >
                            <motion.div
                                initial={{opacity: 1, x: 0}}
                                whileInView={{opacity: 0, x: '100%'}}
                                transition={{duration: 0.9, delay: 0.3}}
                                viewport={{
                                    margin: '-10px',
                                }}
                                className="absolute top-0 h-full w-full bg-blue-50/50">
                            </motion.div>
                            <Divheading
                                heading="Synonyms"
                                svg="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                textColor="text-green-800"
                            />
                            <section className='flex flex-wrap mt-2 gap-2'>
                                {["fortune", "luck", "chance", "providence", "kismet"].map((word, index) => (
                                    <span 
                                        key={index}
                                        className='bg-amber-700/10 p-2 text-sm rounded-full text-black/80 px-4 cursor-pointer text-roboto border-b-2 border-gray-600'
                                        >
                                        {word}
                                    </span>
                                ))}
                            </section>
                        </motion.span>
                        <motion.span 
                            initial={{opacity: 0, scale: 0.95, y: 50}}
                            whileInView={{opacity: 1, scale: 1, y: 0}}
                            transition={{duration: 0.5}}
                            className="relative flex flex-col gap-2 overflow-clip"
                            >
                            <motion.div
                                initial={{opacity: 1, x: 0}}
                                whileInView={{opacity: 0, x: '100%'}}
                                transition={{duration: 0.9, delay: 0.3}}
                                viewport={{
                                    margin: '-10px',
                                }}
                                className="absolute top-0 h-full w-full bg-blue-50/50">
                            </motion.div>
                            <Divheading
                                heading="Antonyms"
                                svg="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                                textColor="text-red-800"
                            />
                            <section className='flex flex-wrap mt-2 gap-2'>
                                {["Misfortune", "Bad luck", "Calamity", "Disaster", "Tragedy", "Unluckiness"].map((word, index) => (
                                    <span 
                                        key={index}
                                        className='bg-amber-700/10 p-2 text-sm rounded-full text-black/80 px-4 cursor-pointer text-roboto border-b-2 border-gray-600'
                                        >
                                        {word}
                                    </span>
                                ))}
                            </section>
                        </motion.span>
                    </section>
                    <section className="w-full mt-10 flex items-center justify-center border-t border-gray-300 p-5">
                        <motion.button 
                            initial={{opacity: 0, scale: 0.85}}
                            whileInView={{opacity: 1, scale: 1}}
                            transition={{duration: 0.9}}
                            className="rounded-xl hover:scale-105 transition-all cursor-pointer"
                            >
                            <span className="flex gap-2 py-4 px-7 text-sm rounded-xl text-black bg-amber-200 font-semibold cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                                <p>Add to My Collection</p>
                            </span>
                        </motion.button>
                    </section>
                </section>
            </motion.div>
        </div>
    )
}
