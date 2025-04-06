"use client"

import React, { useState } from "react"
import { PiPlusCircle } from "react-icons/pi";
import Modal from "../components/Modal";
import { RiGeminiFill } from "react-icons/ri";
import { useForm } from "react-hook-form";

export default function CreateDocument() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    
    const [showModal, setShowModal] = useState(false);

    const handleOnClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        setShowModal(true);
    }

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    }

    return (
        <div className='px-4 p-2'>
          <button onClick={handleOnClick} className='bg-[#84a98c] hover:bg-[#52796f] text-white cursor-pointer rounded-md px-4 py-2 font-sans w-full flex flex-row items-center justify-center'>Add a document <PiPlusCircle className="ml-2" size={22}/></button>
        <Modal 
            visible={showModal}
            close={() => setShowModal(false)}
        >
            <h1 className="font-bold text-2xl pb-2 mb-4 border-b-2 border-[#84a98c]">Generate your document!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl grid grid-cols-[2fr_1fr] h-[400px] gap-4">
                <div className="flex flex-col pt-2 pr-4 bg-gray-100 py-2 px-4 pb-4 rounded-md">
                    <h2 className="font-bold text-xl mb-3">Enter your material:</h2>
                    <textarea 
                        className="border-1 border-gray-200 bg-white rounded-sm w-full grow p-2"
                        {...register("inputMaterial", { required: true, maxLength: 50000 })}
                    />
                    {/* <select>
                        <option value="Text">Text</option>
                        <option value="Link">Link</option>
                    </select> */}
                </div>
                <div className="flex flex-col bg-gray-100 rounded-sm  py-2 px-4 pb-4">
                    <h2 className="font-bold text-xl mb-3 col-span-2">Options:</h2>

                    <div className="flex flex-col gap-2">
                        <div className="flex no-wrap items-center gap-2">
                            <input
                                required
                                type="number"
                                defaultValue={1}
                                // name="numQuestions"
                                className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("numQuestions", { 
                                    required: true,
                                    max: 100,
                                    min: 1
                                })}
                            />
                            <label htmlFor="numQuestions">Number of questions?</label>
                        </div>
                        <div className="flex no-wrap items-center gap-2">
                            <input type="checkbox" className="w-4 h-4"
                                {...register("generateAnswers", { required: false})}
                            />
                            <label htmlFor="generateAnswers">Generate answers?</label>
                        </div>
                        
                        <div className="flex no-wrap items-center gap-2">
                            <input type="checkbox" className="w-4 h-4"
                                {...register("generateGuide", { required: false})}
                            />
                            <label htmlFor="generateGuide">Generate solution guide?</label>
                        </div>
                    </div>
                    <button className="rounded-sm border-1 p-2 ml-auto text-sm hover:bg-blue-300 col-span-2 mt-auto mx-auto">Generate a response <RiGeminiFill className="ml-1 inline"/></button>
                </div>
            </form>
        </Modal>
        </div>
    )
}