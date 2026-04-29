export default function SynonymSpan({ synonyms }: { synonyms: string }) {
    return(
        <span 
            className='bg-green-50 text-sm rounded-xl text-green-700 border-2 px-2 border-green-200 hover:bg-green-200 transition-colors cursor-pointer font-mono'
            >
            {synonyms}
        </span>
    )
}