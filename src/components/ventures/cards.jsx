import { useEffect, useState } from "react";
import Card from "./card"
import { PropTypes } from 'prop-types';


const Cards = ({ itemsPerPage, currentPage, cards }) => {

 
    const [currentItems, setCurrentItems] = useState([]);
    useEffect(() => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        setCurrentItems(cards.slice(begin, end));
    }, [currentPage, cards, itemsPerPage]);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {
                currentItems?.map((card, index) => (
                    <Card key={index} {...card} />
                ))
            }
        </div>
    )
}
Cards.propTypes = {
    cards: PropTypes.array,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number
}
export default Cards