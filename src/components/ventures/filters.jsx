import { IoFilter, IoGridOutline } from "react-icons/io5"
import DropDown from "./dropDown"

const Filters = () => {
    return (
        <div className="flex items-center gap-5">
            <button>
                <IoFilter />
            </button>
            <button>
                <IoGridOutline />
            </button>
            <DropDown />

        </div>
    )
}

export default Filters