'use client';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { saveWord } from "@/app/actions/userActions";
import toast from 'react-hot-toast';

export default function DefinitionPageHeading({word, audioUrl}: {word?: string, audioUrl: string}) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!word) return;
        setIsSaving(true);
        const res = await saveWord(word);
        if (res?.error) toast.error(res.error);
        else if (res?.success) toast.success(res.message);
        else toast.success(res?.message || "Word status updated");
        setIsSaving(false);
    }

    const playAudio = async () => {
        if (audioUrl) {
            const audio = document.getElementById("sound") as HTMLAudioElement;
            if (audio) {
                try {
                    await audio.play();
                    return;
                } catch(e) {
                    console.error("Audio playback failed, falling back to synthesis", e);
                }
            }
        }
        
        // Fallback to Web Speech API
        if (word && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            console.error("Speech Synthesis not supported in this browser.");
        }
    }

    return(
        <motion.div 
            initial={{opacity: 0, y: -20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.3, ease: "easeInOut", delay: 0.2}}
            className={`w-full h-auto min-h-[80px] md:h-32 text-4xl sm:text-5xl md:text-6xl text-white flex items-center justify-center py-5 md:py-7 border-b-2 border-slate-700 flex-wrap gap-1`}
            >
            <h1 className="text-adventure z-30">{word}</h1>
            <svg onClick={playAudio} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`size-9 md:size-12 p-2 z-30 hover:bg-[#334155] ml-1 md:ml-2 mt-1 md:mt-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 block`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
            <button 
                onClick={handleSave} 
                disabled={isSaving}
                className="z-30 ml-4 mt-3 flex items-center justify-center p-2 rounded-full hover:bg-[#334155] transition-all duration-300 hover:scale-110"
                title="Save Word"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
            </button>
            {(audioUrl && audioUrl.length > 0) &&
                <audio id="sound" src={audioUrl} className="hidden" />
            }
        </motion.div>
    )
}