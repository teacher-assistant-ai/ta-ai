import { PiPlusCircleBold } from "react-icons/pi";
import { RiGeminiFill } from "react-icons/ri";
import GeneratedQuestion from "./doc/[id]/GeneratedQuestion";
import Sidebar from "../components/Sidebar";

type Props = {}

const data = {
    "question": "\\item Find the general solution of the separable differential equation:\n    \\[\n    \\frac{dy}{dx} = \\frac{x^2}{y}\n    \\]",
    "answer": "$y = \\pm \\sqrt{\\frac{2}{3}x^3 + C}$",
    "how_to": "This is a separable equation. Rearrange the terms to group $y$ with $dy$ and $x$ with $dx$: $y \\, dy = x^2 \\, dx$. Integrate both sides: $\\int y \\, dy = \\int x^2 \\, dx$. This yields $\\frac{y^2}{2} = \\frac{x^3}{3} + C_1$. Multiply by 2 and combine constants ($C=2C_1$) to get $y^2 = \\frac{2}{3}x^3 + C$. Finally, take the square root to solve for $y$."
}

/*
    TODO:
    At this screen the user recieves a form that asks them to input the material into a textbox
        - In the future, maybe we can have the user input a link as an alternative and it will scan the webpage and put it into text
        - Maybe also have it scan pdfs
    The user will also get to pick some options which will affect how Gemini will output the request

    After we generate the document, each question can be edited either with AI or manually by themselves.

    After the teacher is done with the document, we can output it to pdf
*/
const Page = (props: Props) => {
  return (
        <>
        {/* <div className="grow">someting</div> */}
        {/* <GeneratedQuestion question={data.question} answer={data.answer} howTo={data.how_to}/> */}
        {/* <div>
            <h1 className="font-bold text-2xl mb-4">Generate your document!</h1>
            <div className="rounded-2xl shadow-md grid grid-cols-[2fr_1fr] h-[400px] p-8 gap-4 w-[800px]">
                <div className="flex flex-col pt-2 px-4">
                    <h2 className="font-bold text-xl mb-3">Enter your material:</h2>
                    <textarea className="border-1 border-gray-200 rounded-sm w-full grow p-2"/>
                    <select>
                        <option value="Text">Text</option>
                        <option value="Link">Link</option>
                    </select>
                </div>
                <div className="flex flex-col bg-gray-100 rounded-sm  py-2 px-4">
                    <h2 className="font-bold text-xl mb-3 col-span-2">Options:</h2>

                    <div className="flex flex-col gap-2">
                        <div className="flex no-wrap items-center gap-2">
                            <input
                                type="text"
                                name="numQuestions"
                                className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="numQuestions">Number of questions?</label>
                        </div>
                        <div className="flex no-wrap items-center gap-2">
                            <input type="checkbox" name="generateAnswers" className="w-4 h-4"/>
                            <label htmlFor="generateAnswers">Generate answers?</label>
                        </div>
                        
                        <div className="flex no-wrap items-center gap-2">
                            <input type="checkbox" name="generateGuide" className="w-4 h-4"/>
                            <label htmlFor="generateGuide">Generate solution guide?</label>
                        </div>
                    </div>
                    <button className="rounded-sm border-1 p-2 ml-auto text-sm hover:bg-blue-300 col-span-2 mt-auto mx-auto">Generate a response <RiGeminiFill className="ml-1 inline"/></button>
                </div>
            </div>
        </div> */}
        </>
  )
}

export default Page