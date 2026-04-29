'use client';

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginUser(){
    const { data: session } = useSession();
    const [show, setShow] = useState<boolean>(true);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            if(window.scrollY < lastScrollY) setShow(true);
            else setShow(false);
            lastScrollY = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return(
        <div 
            className={`fixed top-0 right-0 z-50 p-3 md:p-4 flex flex-col items-end ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'} transition-all duration-500`}
            >
            {session ? (
                <div className="flex items-center gap-2 md:gap-4 bg-black/50 p-2 rounded-full border border-gray-700 backdrop-blur-md">
                    <Link href="/dashboard" className="text-gray-300 hover:text-white px-2 md:px-3 text-sm md:text-base font-semibold transition-colors">
                        Dashboard
                    </Link>
                    <div className="relative">
                        <div 
                            className='w-9 h-9 md:w-10 md:h-10 border border-gray-500 rounded-full bg-[#0f172a] flex items-center justify-center shadow-md overflow-hidden cursor-pointer'
                            onClick={() => setShowMenu(!showMenu)}
                            title="Account"
                        >
                            {session.user?.image ? (
                                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <p className='text-lg md:text-xl text-white font-semibold'>
                                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                                </p>
                            )}
                        </div>
                        {showMenu && (
                            <div className="absolute right-0 top-12 bg-black/90 border border-gray-700 rounded-xl p-2 min-w-[160px] backdrop-blur-md shadow-xl">
                                <p className="text-gray-400 text-xs px-3 py-1 truncate">{session.user?.email}</p>
                                <hr className="border-gray-700 my-1" />
                                <button 
                                    onClick={() => signOut()}
                                    className="w-full text-left text-red-400 hover:text-red-300 hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Link href="/login">
                    <button 
                        className={`py-2 px-4 md:py-3 md:px-5 bg-gray-900 rounded-xl hover:scale-105 cursor-pointer border-0 transition-all duration-300 text-white text-sm md:text-base font-semibold`}
                    >
                        Sign In
                    </button>
                </Link>
            )}
        </div>
    )
}
