export default function Sentences({sentence, index, mainWord} : {sentence: string, index: number, mainWord: string}) {
    return(
        <section className='flex gap-3'>
            <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-semibold">
                {index}
            </div>
            <p className="text-gray-700 leading-relaxed">
                {sentence.split(" ").map((word, i) => {
                    if(word.toLowerCase() == mainWord.toLowerCase() || word.indexOf(mainWord) > -1){
                        return(
                            <span key={i} className="font-semibold text-indigo-600 bg-indigo-50 px-1 rounded">
                                {`${word}`}
                            </span>
                        )
                    }else{
                        return(
                            <span key={i}>
                                {` ${word} `}
                            </span>
                        )
                    }
                })}
            </p>
        </section>
    )
}