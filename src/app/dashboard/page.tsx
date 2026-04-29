import { getSavedWords, getUserStats } from "@/app/actions/userActions";
import Link from "next/link";
import SideBar from "../../../components/SideBar";
import LoginUser from "../../../components/LoginUser";
import DotBackground from "../../../components/GridDotBackground";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const savedWords = await getSavedWords();
    const stats = await getUserStats();

    return (
        <div className="w-full min-h-screen bg-[#111] overflow-clip text-white">
            <DotBackground dotSize={0.5} spacing={50} className="min-h-screen">
                <SideBar />
                <LoginUser />
                
                <div className="pt-20 md:pt-24 px-4 sm:px-8 md:px-16 lg:px-32 z-30 relative w-full pb-16">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12 gap-4">
                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl text-adventure text-neon tracking-wide">My Vocabulary</h1>
                            <p className="text-gray-400 mt-2 text-sm md:text-base">Your personal word collection • Keep learning, keep growing</p>
                        </div>
                        <Link href="/">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 text-sm md:text-base flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add Words
                            </button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-8 md:mb-12">
                            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 rounded-xl p-4 md:p-5 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-blue-400">{stats.wordsSaved}</p>
                                <p className="text-xs md:text-sm text-gray-400 mt-1">Words Saved</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-500/20 to-green-600/5 border border-green-500/30 rounded-xl p-4 md:p-5 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-green-400">{stats.exercisesCompleted}</p>
                                <p className="text-xs md:text-sm text-gray-400 mt-1">Exercises Done</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/30 rounded-xl p-4 md:p-5 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-purple-400">{stats.accuracyRate}%</p>
                                <p className="text-xs md:text-sm text-gray-400 mt-1">Accuracy Rate</p>
                            </div>
                            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/30 rounded-xl p-4 md:p-5 text-center">
                                <p className="text-2xl md:text-3xl font-bold text-amber-400">{stats.wordsSaved * 3}</p>
                                <p className="text-xs md:text-sm text-gray-400 mt-1">Minutes Studied</p>
                            </div>
                        </div>
                    )}
                    
                    {savedWords.length === 0 ? (
                        <div className="bg-[#1a1a1a] p-8 md:p-12 rounded-2xl text-center border border-slate-700/50 shadow-lg">
                            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-blue-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <p className="text-xl md:text-2xl text-gray-200 font-semibold">Your vocabulary is empty</p>
                            <p className="text-gray-400 mt-2 text-sm md:text-base">Search for words and save them to build your personal dictionary.</p>
                            <Link href="/">
                                <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105">
                                    Start Exploring
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-500 text-sm mb-4">{savedWords.length} word{savedWords.length > 1 ? 's' : ''} saved</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                                {savedWords.map((item, index) => (
                                    <Link href={`/search?word=${item.word}`} key={item.id}>
                                        <div className="bg-[#1a1a1a] hover:bg-[#222] cursor-pointer p-5 rounded-xl border border-slate-700/50 shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/40 flex justify-between items-center group">
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm">
                                                    {index + 1}
                                                </span>
                                                <h2 className="text-lg md:text-xl capitalize text-white font-semibold group-hover:text-blue-400 transition-colors">{item.word}</h2>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 text-gray-600 group-hover:text-blue-400 transition-colors">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </DotBackground>
        </div>
    );
}
