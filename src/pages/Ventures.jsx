
import { useState } from "react"
import Cards from "../components/ventures/cards"
import { cards } from "../components/ventures/data"
import Tabs from "../components/ventures/tabs"
import Pagination from "../components/ventures/pagination"

const Ventures = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3
    const [currentTab, setCurrentTab] = useState(0)


    const headers = [
        "All Ventures",
        "Saas",
        "Entertainment",
        "Retail"
    ]


    const filteredCards =
        currentTab === 0
            ? cards
            : cards.filter((card) => card.category === headers[currentTab])




    return (
        <div className="flex flex-col gap-8 w-full my-12 lg:my-16 container p-3 lg:p-0">
            <div className="flex flex-col gap-10">
                <h2 className="lg:text-4xl font-bold font-['BankGothic'] uppercase">$GVV Backed Ventures</h2>
                <Tabs header={headers} currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </div>
            <div className="w-full flex flex-col gap-10">
                <Cards itemsPerPage={itemsPerPage} currentPage={currentPage} cards={filteredCards} />
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} length={filteredCards?.length} />
            </div>

        </div>
    )
}

export default Ventures