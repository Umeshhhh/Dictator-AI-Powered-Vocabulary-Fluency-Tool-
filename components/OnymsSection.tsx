import AntonymSpan from "./AntonymSpan";
import Divheading from "./Divheading";
import SynonymSpan from "./SynonymSpan";

type props = {
    heading: string;
    svg: string;
    check: boolean;
    words: string[];
    headingColor: string
}

export default function OnymsSection({heading, svg, check, words, headingColor} : props) {
    return(
        <section className='col-span-1 py-3 px-5 bg-white rounded-xl shadow-md shadow-slate-500'>
            <Divheading heading={heading} svg={svg} textColor={headingColor} />
            <div className='flex flex-wrap mt-2 gap-2'>
                {words.map((word, index) => (
                    check ? 
                    <SynonymSpan key={index} synonyms={word} /> 
                    : 
                    <AntonymSpan key={index} antonyms={word} />
                ))}
            </div>
        </section>
    )
}