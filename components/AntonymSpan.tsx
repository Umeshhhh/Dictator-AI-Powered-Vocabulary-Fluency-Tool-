export default function AntonymSpan({ antonyms }: { antonyms: string }) {
    return(
        <span 
            className='bg-red-50 text-sm rounded-xl text-red-700 border-2 px-2 border-red-200 hover:bg-red-200 transition-colors cursor-pointer font-mono'
            >
            {antonyms}
        </span>
    )
}