import { RiGeminiFill } from "react-icons/ri";

type GeneratedQuestionProps = {
    question: string;
    answer: string;
    howTo: string;
}

export default function GeneratedQuestion(props: GeneratedQuestionProps) {
    return (
        <div className="grid grid-cols-[auto_1fr] rounded-2xl shadow-md border border-gray-200 overflow-hidden w-3/4 divide-y-1 divide-gray-200">
            <div className="p-4 border-r border-gray-200 bg-gray-100">Question:</div>
            <div className="p-4">{props.question}</div>
            <div className="p-4 border-r border-gray-200 bg-gray-100">Answer:</div>
            <div className="p-4">{props.answer}</div>
            {/* <div className="p-4 border-r border-gray-200">Explanation:</div>
            <div className="p-4">{props.how_to}</div> */}

            <div className="p-4 border-r border-gray-200 text-gray-400 bg-gray-100">Explanation:</div>
            <div className="p-4 flex flex-row no-wrap gap-4">
                <span className="text-gray-200">N/A</span>
                <button className="rounded-sm border-1 p-2 justify-self-end self-end ml-auto text-sm hover:bg-blue-300">Generate a response <RiGeminiFill className="ml-1 inline"/></button>
            </div>
        </div>
    )
}