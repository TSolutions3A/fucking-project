import { IoArrowBack } from "react-icons/io5";
import { PropTypes } from 'prop-types';


const Pagination = ({ currentPage,itemsPerPage, setCurrentPage, length }) => {

   
    const pages = Math.ceil(length / itemsPerPage);
    const pagesArray = Array.from({ length: pages }, (_, index) => index + 1)
    return (
        <div className="flex justify-center gap-4">

            {/* prev */}
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded-full text-white"
            >
                <IoArrowBack />
            </button>



            {pagesArray.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-full ${currentPage === page ? "bg-[#F9E727] text-gray-900" : "text-white"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* next */}
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages))}
                className="px-4 py-2 rounded-full text-white"
            >
                <IoArrowBack className="-scale-90" />
            </button>



        </div>
    )
}
Pagination.propTypes = {
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    length: PropTypes.any
}
export default Pagination