'use client';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { selectedIconAtom, sidebar } from '../store/atom/sidebar';
import { motion } from 'framer-motion';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';

export default function SideBar(){

    const [sideBar, setSideBar] = useAtom(sidebar);
    const [selectedIcon, setSelectedIcon] = useAtom(selectedIconAtom);
    const { data: session } = useSession();

    const [show, setShow] = useState<boolean>(true);
    
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            if(window.scrollY == 0) setShow(true);
            else if(window.scrollY < lastScrollY) setShow(true);
            else setShow(false);
            lastScrollY = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return(
        <div>
            {!sideBar && 
                <div className={`fixed h-full top-0 left-0 z-50 flex flex-col items-center justify-start gap-4`}>
                    <div onClick={() => setSideBar(true)} className='text-white pr-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`size-10 cursor-pointer transition-all duration-300 rounded-full svg-hover-draw hover:bg-white/15 p-2 hover:text-white ml-3 mt-5 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                            <path className="svg-path-visible" pathLength={100} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                    </div>
                    <motion.div 
                        initial={{opacity: 0, x: -20}}
                        animate={show ? {opacity: 1, x: 0} : {opacity: 0, x: -20}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                        className={`flex flex-col items-center justify-center gap-5 text-gray-500 mt-10 bg-black/80 rounded-r-xl pr-4 py-3 ${show ? '' : 'pointer-events-none'}`}
                        >
                        <div className='relative group'>
                            <svg onClick={() => {
                                setSelectedIcon('home');
                                if(window.location.pathname !== '/'){
                                    window.location.href = '/';
                                }
                            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`size-10 cursor-pointer transition-all duration-300 rounded-xl svg-hover-draw p-2 ${selectedIcon == "home" ? 'bg-white/10 text-white' : 'hover:bg-white/10 hover:text-white'} ml-3`}>
                                <path className="svg-path-visible" pathLength={100} strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <p className={`absolute h-full group-hover:opacity-100 opacity-0 pointer-events-none flex items-center top-0 text-white -right-[calc(100%+3.5rem)] bg-black/70 rounded-xl px-5 transition-opacity duration-300`}>Home</p>
                        </div>
                        <div className='relative group'>
                            <svg onClick={() => setSelectedIcon('test')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`size-10 cursor-pointer transition-all duration-300 rounded-xl svg-hover-draw p-2 ${selectedIcon == "test" ? 'bg-white/10 text-white' : 'hover:bg-white/10 hover:text-white'} ml-3`}>
                                <path className="svg-path-visible" pathLength={100} strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                            </svg>
                            <p className={`absolute h-full group-hover:opacity-100 opacity-0 pointer-events-none flex items-center top-0 text-white -right-[calc(100%+2.2rem)] bg-black/70 rounded-xl px-5 transition-opacity duration-300`}>Test</p>
                        </div>
                        <div className='relative group'>
                            <svg onClick={() => setSelectedIcon('learn')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`size-10 cursor-pointer transition-all duration-300 rounded-xl svg-hover-draw p-2 ${selectedIcon == "learn" ? 'bg-white/10 text-white' : 'hover:bg-white/10 hover:text-white'} ml-3`}>
                                <path className="svg-path-visible" pathLength={100} strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <p className={`absolute h-full group-hover:opacity-100 opacity-0 pointer-events-none flex items-center top-0 text-white -right-[calc(100%+3rem)] bg-black/70 rounded-xl px-5 transition-opacity duration-300`}>Learn</p>
                        </div>
                    </motion.div>
                </div>
            }
            <div className={`fixed ${sideBar ? 'translate-x-[0%]' : '-translate-x-[100%]'} divide-y divide-gray-600 top-0 left-0 h-full w-[85%] md:w-64 bg-black/80 backdrop-blur-lg flex flex-col rounded-r-4xl transition-all duration-500 ease-in-out z-50`}>
                <section className='w-full flex justify-between items-center py-4 px-4 text-white'>
                    <h1 className='text-neon text-3xl text-white pt-1'>Dictator</h1>
                    <svg onClick={() => setSideBar(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-10 cursor-pointer transition-all duration-300 svg-hover-draw rounded-full p-2 hover:bg-white/20">
                        <path className="svg-path-visible" strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </section>
                <section className='w-full h-full flex flex-col justify-between mt-3'>
                    <ul className='w-full flex flex-col justify-center items-center gap-1 space-x-1 text-gray-300 text-lg font-semibold'>
                        <li className='w-full px-2 flex items-center justify-center'>
                            <span className='rounded-xl w-full py-5 flex items-start justify-start gap-3 tracking-wide px-3 cursor-pointer hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300 text-md text-roboto hover:scale-105'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <p>Search a Word</p>
                            </span>
                        </li>
                        <li className='w-full px-2 flex items-center justify-center'>
                            <Link href="/practice" className='rounded-xl w-full py-5 flex items-start justify-start gap-3 tracking-wide px-3 cursor-pointer hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300 text-md text-roboto hover:scale-105'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                <p>Practice</p>
                            </Link>
                        </li>
                        <li className='w-full px-2 flex items-center justify-center'>
                            <span className='rounded-xl w-full py-5 flex items-start justify-start gap-3 tracking-wide px-3 cursor-pointer hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300 text-md text-roboto hover:scale-105'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                                <p>Test your knowledge</p>
                            </span>
                        </li>
                        <li className='w-full px-2 flex items-center justify-center'>
                            <span className='rounded-xl w-full py-5 flex items-start justify-start gap-3 tracking-wide px-3 cursor-pointer hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300 text-md text-roboto hover:scale-105'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>
                                <p>Learn</p>
                            </span>
                        </li>
                        <li className='w-full px-2 flex items-center justify-center'>
                            <Link href="/dashboard" className='rounded-xl w-full py-5 flex items-start justify-start gap-3 tracking-wide px-3 cursor-pointer hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300 text-md text-roboto hover:scale-105'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                                <p>My Vocabulary</p>
                            </Link>
                        </li>
                    </ul>
                    <section className='w-full px-2 pb-5 flex flex-col mt-3 text-roboto'>
                        <h2 className='text-gray-200 py-2 font-semibold underline'>Search history</h2>
                        {/* <section>
                            <ul className='w-full flex flex-col space-y-2 overflow-y-scroll'>
                                <li className='w-full px-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer text-gray-300'>Serendipity</li>
                                <li className='w-full px-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer text-gray-300'>Magnanimous</li>
                                <li className='w-full px-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer text-gray-300'>Euphoria</li>
                                <li className='w-full px-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer text-gray-300'>Serendipity</li>
                                <li className='w-full px-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer text-gray-300'>Magnanimous</li>
                                <li className='w-full px-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer text-gray-300'>Euphoria</li>
                            </ul>
                        </section> */}
                        <section className='w-full flex flex-col justify-between items-center mt-4 px-2 gap-2 text-white'>
                            {session ? (
                                <button 
                                    onClick={() => signOut()}
                                    className="w-full py-3 px-4 rounded-full cursor-pointer border border-red-500 hover:bg-red-500/20 transition-all duration-500 text-red-400 hover:text-red-300 text-lg font-semibold"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => signIn()}
                                        className="w-full py-3 px-4 rounded-full cursor-pointer border-0 bg-white/10 transition-all duration-500 text-white text-lg font-semibold hover:bg-white/20"
                                    >
                                        Sign In
                                    </button>
                                </>
                            )}
                        </section>
                    </section>
                </section>
            </div>
        </div>
    )
}