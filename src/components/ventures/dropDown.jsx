import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";


const DropDown = () => {

    const options = [
        "our ventures",
        "sales round",
        "staking",
    ]

    const [value, setValue] = useState();


    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const handleSelect = (option) => {
        setIsOpen(false);
        setValue(option)
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={handleToggle}
                onBlur={()=>{setIsOpen(false)}}
                className="block w-full pl-3 font-['BankGothic'] rounded-full bg-slate-950 border-0 py-4 text-[#CBFB45] shadow-sm focus:ring-1 sm:text-sm sm:leading-6 cursor-pointer"
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {options[value] ||
                            "our ventures "}
                    </div>
                    <MdKeyboardArrowDown className="text-gray-400 text-xl mr-6" />
                </div>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-slate-950 rounded-md shadow-lg">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="flex items-center px-4 py-2 w-full text-[#CBFB45] hover:bg-slate-800"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropDown