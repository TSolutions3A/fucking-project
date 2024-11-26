import Cards from "../components/Cards"
import { cards } from "../components/overview/data"
import Modal from "../components/overview/modal"

const Overview = () => {
    return (
        <div className="flex flex-col gap-8 w-full my-12 lg:my-16 container p-3 lg:p-0">
            <div className="flex flex-col gap-10">
                <h2 className="lg:text-4xl font-bold font-['BankGothic'] uppercase">$GVV Overview</h2>
                <Cards cards={cards} />
                <div className="my-16 w-full flex items-center justify-center">
                    <Modal />
                </div>
            </div>
        </div>
    )
}

export default Overview