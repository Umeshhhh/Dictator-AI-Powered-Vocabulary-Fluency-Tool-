'use client';
import React, { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { selectedIconAtom, sidebar } from '../store/atom/sidebar';
import FLoatingElements from './FloatingElements';
import { motion } from "framer-motion";
import { getPopularSearches } from "@/app/actions/getPopularSearches";
import toast from 'react-hot-toast';

export default function MainPage() {

    const [buttonClick, setButtonClick] = useState<boolean>(false);
    const [typedWord, setTypedWord] = useState<string>('');
    const [sideBar, setSideBar] = useAtom(sidebar);
    const setSelectedIcon = useSetAtom(selectedIconAtom);
    const [popularWords, setPopularWords] = useState<string[]>([]);
    const [hasVisited, setHasVisited] = useState(false);

    useEffect(() => {
        getPopularSearches().then(words => setPopularWords(words));

        // Check if user has already visited this session
        if (sessionStorage.getItem('dictator-visited')) {
            setHasVisited(true);
        } else {
            sessionStorage.setItem('dictator-visited', 'true');
        }
    }, []);

    const searchWord = (word: string) => {
        if (word.trim().length > 0) {
            setSelectedIcon('');
            window.location.href = `/search?word=${word}`;
        } else {
            toast.error("Please enter a word to search");
        }
    }

    return (
        <div
            onClick={() => { if (sideBar) setSideBar(false) }}
            className="relative h-screen w-full"
        >
            <FLoatingElements skipAnimation={hasVisited} />
            <div className='flex flex-col items-center justify-center w-full h-full px-4 text-center'>
                <h1 className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl ${buttonClick ? 'tracking-wider -translate-y-[30%] md:-translate-y-[50%]' : 'tracking-tight -translate-y-[0%]'} z-30 transition-all duration-700 mb-5 text-neon ${hasVisited ? 'text-[#fcd34d]' : 'animate-tube-light'}`}>DICTATOR</h1>
                <div
                    onClick={() => setButtonClick(true)}
                    className={`z-50 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex justify-center`}
                >
                    {!buttonClick && <p className={`text-white font-bold rounded-xl transition-all duration-300 bg-black hover:scale-105 cursor-pointer py-3 px-6 md:py-4 md:px-7 border border-gray-400 text-sm md:text-base ${hasVisited ? '' : 'animate-search-pop-up'}`}>Search Your Word</p>}
                    {buttonClick &&
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={`w-full max-w-2xl rounded-xl flex flex-col divide-y divide-gray-500 gap-6 md:gap-8 text-white px-2 md:px-4 mt-5`}
                        >
                            <div className='w-full flex items-center shadow-gray-400 shadow-sm rounded-xl h-12 sm:h-14 md:h-16'>
                                <button
                                    className='px-3 md:px-4 h-full rounded-l-xl flex items-center justify-end bg-black'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 md:size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                                <form
                                    className='h-full w-full'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        searchWord(typedWord)
                                    }}
                                >
                                    <input
                                        onChange={(e) => setTypedWord(e.target.value)}
                                        className='py-3 md:py-5 h-full w-full text-base sm:text-lg md:text-xl rounded-r-xl outline-none bg-black'
                                        placeholder='Search...'
                                        type='text'
                                        autoFocus
                                    />
                                </form>
                            </div>
                            <div className='w-full flex flex-col gap-3 md:gap-4 items-center'>
                                <h3 className='text-xs sm:text-sm text-gray-300'>Popular searches:</h3>
                                <section className='flex gap-2 md:gap-4 flex-wrap justify-center'>
                                    {popularWords.map((word, index) => (
                                        <div
                                            key={index}
                                            onClick={() => searchWord(word)}
                                            className="glow-border-wrapper hover:scale-110 transition-all duration-400 cursor-pointer"
                                        >
                                            <span className="glow-border-inner py-2 px-3 flex items-center justify-center">
                                                <p className='px-1 md:px-2 capitalize text-sm md:text-base'>{word}</p>
                                            </span>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        </motion.div>
                    }
                </div>
            </div>
        </div>
    )
}