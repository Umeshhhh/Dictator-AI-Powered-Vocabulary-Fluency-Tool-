'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Sentences from '../../../components/Sentences';
import OnymsSection from '../../../components/OnymsSection';
import Divheading from '../../../components/Divheading';
import DefinitionPageHeading from '../../../components/DefintionPageHeading';
import SideBar from '../../../components/SideBar';
import LoginUser from '../../../components/LoginUser';
import { wordSearch } from '../actions/wordSearch';
import { selectedIconAtom, sidebar } from '../../../store/atom/sidebar';
import { useAtom, useSetAtom } from 'jotai';
import Loader from '../../../components/LoadingCard/Loader';
import ParticlesBackground from '../../../components/ParticlesBackground';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

interface WordData {
    word: string;
    definition: string;
    synonyms: string[];
    antonyms: string[];
    exampleSentences: string[];
    audio: string;
}

function SearchContent() {
    const [searchWordData, setSearchWordData] = useState<WordData>({
        word: '',
        definition: '',
        synonyms: [],
        antonyms: [],
        exampleSentences: [],
        audio: ''
    });

    const [sideBar, setSideBar] = useAtom(sidebar);
    const setSelectedIcon = useSetAtom(selectedIconAtom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [typedWord, setTypedWord] = useState<string>('');
    const [searchWord, setSearchWord] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const word = searchParams.get('word') || "";

    const proceedSearch = async (word: string) => {
        try {
            setLoading(true); 
            setSearchWord(true);
            const parsedResult = await wordSearch(word);
            if (!parsedResult) {
                throw new Error("Could not find definition.");
            }
            setSearchWordData({
                word: parsedResult.word || word,
                definition: parsedResult.definition || '',
                synonyms: parsedResult.synonyms || [],
                antonyms: parsedResult.antonyms || [],
                exampleSentences: parsedResult.exampleSentences || [],
                audio: parsedResult.audio || ""
            });
        } catch(err) {
            console.error('Error searching word:', err);
            setError('An error occurred while fetching the word. Please Retry.');
            toast.error('Failed to fetch word definition.');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        setSelectedIcon('');
        if (word) {
            proceedSearch(word);
        }
    }, [word, setSelectedIcon]);

    if (loading) {
        return (
        <div className="min-h-screen flex justify-center items-center text-white text-xl bg-[#111]">
            <Loader />
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen flex flex-col justify-center items-center text-red-500 bg-[#111] px-4 text-center">
            <p className="text-2xl font-semibold mb-4">Oops!</p>
            <p className="text-lg">{error}</p>
        </div>
        );
    }

    return (
    <div 
        onClick={() => {if(sideBar) setSideBar(false)}} 
        className="w-full min-h-screen bg-[#111] overflow-clip"
        >
        <div className='fixed top-0 left-0 w-full h-full z-0'>
            <ParticlesBackground />
        </div>
        <SideBar />
        <motion.div 
            initial={{opacity: 0, y: -20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.3, ease: "easeInOut", delay: 0.2}}
            className='absolute top-0 right-4 md:right-28 p-4 text-white z-40 w-[250px] md:w-auto'
            >
            <div className='w-full flex items-center shadow-gray-400 shadow-sm rounded-xl'>
                <button
                    className='px-4 py-3 h-full rounded-l-xl flex items-center justify-end'
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                <form
                    className='h-full w-full'
                    onSubmit={(e) => {
                        e.preventDefault();
                        window.location.href= `/search?word=${typedWord}`;
                    }}
                    >
                    <input
                        onChange={(e) => setTypedWord(e.target.value)}
                        className={`py-3 h-full ${searchWord ? 'w-full' : 'w-0'} duration-300 transition-all text-xl rounded-r-xl outline-none`}
                        placeholder='Search...'
                        type='text'
                    />
                </form>
            </div>
        </motion.div>
        <LoginUser />
        <div className="pt-24 md:pt-0">
            <DefinitionPageHeading word={searchWordData.word} audioUrl={searchWordData.audio}/>
        </div>
        <div className="w-full px-6 md:px-20 lg:px-40 py-10 grid grid-cols-1 gap-7">
            {/* Definition */}
            <motion.div 
                initial={{opacity: 0, y: 20, scale: 0.95}}
                whileInView={{opacity: 1, y: 0, scale: 1}}
                transition={{duration: 0.3, ease: "easeInOut", delay: 0.4}}
                className="w-full bg-white rounded-xl py-4 px-5 shadow-md shadow-slate-500 z-30"
                >
                <Divheading
                    heading="Definition"
                    svg="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    textColor="text-purple-800"
                />
                <section className="mt-1 text-lg">
                    <p className="text-gray-700 leading-relaxed">{searchWordData.definition}</p>
                </section>
            </motion.div>
            {/* Synonyms & Antonyms */}
            <motion.div 
                initial={{opacity: 0, y: 20, scale: 0.95}}
                whileInView={{opacity: 1, y: 0, scale: 1}}
                transition={{duration: 0.3, ease: "easeInOut", delay: 0.6}}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 z-30"
                >
                <OnymsSection
                    heading="Synonyms"
                    svg="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    check
                    words={searchWordData.synonyms}
                    headingColor="text-green-800"
                />
                <OnymsSection
                    heading="Antonyms"
                    svg="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    check={false}
                    words={searchWordData.antonyms}
                    headingColor="text-red-800"
                />
            </motion.div>
            {/* Example Sentences */}
            <motion.div 
                initial={{opacity: 0, y: 20, scale: 0.95}}
                whileInView={{opacity: 1, y: 0, scale: 1}}
                transition={{duration: 0.3, ease: "easeInOut", delay: 0.8}}
                className="w-full bg-white rounded-xl py-4 px-5 shadow-md shadow-slate-500 z-30"
                >
                <Divheading
                    heading="Example Sentences"
                    svg="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    textColor="text-blue-800"
                />
                <section className="mt-3 flex flex-col space-y-4">
                    {searchWordData.exampleSentences.map((sentence, index) => (
                    <Sentences
                        key={index}
                        sentence={sentence}
                        index={index + 1}
                        mainWord={searchWordData.word}
                    />
                    ))}
                </section>
            </motion.div>
        </div>
    </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex justify-center items-center text-white text-xl bg-[#111]">
                <Loader />
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
