import PracticeTypeCard from "./PracticeTypeCard";
import Link from "next/link";

interface SRSWord {
    id: string;
    word: string;
}

interface PracticePageProps {
    stats?: {
        wordsSaved: number;
        exercisesCompleted: number;
        accuracyRate: number;
    } | null;
    srsWords?: SRSWord[];
}

export default function PracticePage(props: PracticePageProps){
    const { stats, srsWords } = props;

    const practiceTypes = [
    {
      id: 1,
      title: "Multiple Choice Quiz",
      description: "Test your understanding with carefully crafted multiple choice questions",
      icon: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
      difficulty: "Easy",
      duration: "5 min",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Sentence Practice",
      description: "Create meaningful sentences using the word in different contexts",
      icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
      difficulty: "Medium",
      duration: "10 min",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      borderColor: "border-green-200",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      title: "Fill in the Blanks",
      description: "Complete sentences by filling in the missing word",
      icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z",
      difficulty: "Easy",
      duration: "7 min",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      borderColor: "border-purple-200",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      title: "Paragraph Writing",
      description: "Write a complete paragraph incorporating the word naturally",
      icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
      difficulty: "Hard",
      duration: "15 min",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      borderColor: "border-orange-200",
      bgColor: "bg-orange-50",
    },
    {
      id: 5,
      title: "Word Association",
      description: "Match the word with related concepts and ideas",
      icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z",
      difficulty: "Medium",
      duration: "8 min",
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600",
      borderColor: "border-pink-200",
      bgColor: "bg-pink-50",
    },
    {
      id: 6,
      title: "Pronunciation Practice",
      description: "Perfect your pronunciation with audio guides and feedback",
      icon: "M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z",
      difficulty: "Easy",
      duration: "5 min",
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      borderColor: "border-indigo-200",
      bgColor: "bg-indigo-50",
    },
    {
      id: 7,
      title: "Context Clues",
      description: "Identify the word's meaning from surrounding context",
      icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z",
      difficulty: "Medium",
      duration: "10 min",
      color: "bg-teal-500",
      hoverColor: "hover:bg-teal-600",
      borderColor: "border-teal-200",
      bgColor: "bg-teal-50",
    },
    {
      id: 8,
      title: "Story Creation",
      description: "Write a creative short story featuring the word",
      icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
      difficulty: "Hard",
      duration: "20 min",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      borderColor: "border-red-200",
      bgColor: "bg-red-50",
    },
  ]
    
    return(
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col justify-center items-center gap-7">
                <section className="flex gap-4 items-center justify-center pt-8 text-4xl font-bold text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-8 text-orange-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                    <h1 className="text-4xl md:text-5xl text-[#2c6ff6] text-roboto font-bold tracking-wide text-center">
                        Practice Time
                    </h1>
                </section>
                <section className="w-full flex flex-col items-center justify-center gap-3 px-4 text-center">
                    <p className="text-lg md:text-xl text-gray-300 text-roboto tracking-wide">
                        Choose how you&apos;d like to practice your vocabulary.
                    </p>
                    <section className="flex flex-col md:flex-row gap-2 md:gap-4">
                        <span className="flex items-center gap-2 text-gray-400 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                            <p>Build vocabulary</p>
                        </span>
                        <span className="flex items-center gap-2 text-gray-400 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                            <p>Interactive learning</p>
                        </span>
                        <span className="flex items-center gap-2 text-gray-400 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                            </svg>
                            <p>Personalised space</p>
                        </span>
                    </section>
                </section>
            </div>
            <div className="w-full flex flex-wrap items-center justify-around gap-6 md:gap-8 px-4 md:px-10 py-10">
                {practiceTypes.map(({id, title, description, icon, difficulty, duration, color, hoverColor, borderColor, bgColor}) => {
                    return <PracticeTypeCard 
                        key={id}
                        borderColor={borderColor}
                        bgColor={bgColor}
                        iconColor={color}
                        text={title}
                        para={description}
                        svg={icon}
                        ButtonColor={color}
                        buttonHover={hoverColor}
                        difficulty={difficulty}
                        duration={duration}
                    />
                })}
            </div>
            {srsWords && srsWords.length > 0 && (
                <div className="w-full px-6 md:px-10 mb-8">
                    <div className="flex flex-col gap-4 bg-[#222] border border-slate-700 rounded-2xl p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Recommended for You (Spaced Repetition)</h2>
                        <p className="text-gray-400 mb-2">These words are due for a review to strengthen your memory.</p>
                        <div className="flex flex-wrap gap-4">
                            {srsWords.map((item) => (
                                <Link key={item.id} href={`/search?word=${item.word}`}>
                                    <div className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer font-semibold tracking-wide capitalize">
                                        {item.word}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full px-6 md:px-10 mb-5">
                <div className="flex flex-col gap-6 bg-white/90 backdrop-blur-md shadow-lg shadow-blue-500/10 border border-gray-200 rounded-2xl p-6 md:p-8 transition-transform duration-300 hover:scale-[1.02]">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 tracking-tight">
                        Your Lifetime Progress
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center space-y-1">
                        <div className="text-3xl font-bold text-blue-600 drop-shadow-sm">{stats ? stats.wordsSaved : 0}</div>
                        <div className="text-xs md:text-base text-gray-600">Words Saved</div>
                    </div>
                    <div className="text-center space-y-1">
                        <div className="text-3xl font-bold text-green-600 drop-shadow-sm">{stats ? stats.exercisesCompleted : 0}</div>
                        <div className="text-sm md:text-base text-gray-600">Exercises Completed</div>
                    </div>
                    <div className="text-center space-y-1">
                        <div className="text-3xl font-bold text-purple-600 drop-shadow-sm">{stats ? stats.wordsSaved * 3 : 0}</div>
                        <div className="text-sm md:text-base text-gray-600">Estimated Minutes Studied</div>
                    </div>
                    <div className="text-center space-y-1">
                        <div className="text-3xl font-bold text-orange-600 drop-shadow-sm">{stats ? stats.accuracyRate : 0}%</div>
                        <div className="text-sm md:text-base text-gray-600">Accuracy Rate</div>
                    </div>
                    </div>
                </div>
            </div>
            <footer className="w-full bg-black">
                <p className="text-center text-sm text-gray-300 p-3">Choose your preferred learning style • Track your progress • Master new words</p>
            </footer>
        </div>
    )
}
