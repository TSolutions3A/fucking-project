import { useState } from "react"
import TabHeader from "./tabHeader"
import { PropTypes } from 'prop-types';
import Filters from "./filters";


const Tabs = ({ header,currentTab,setCurrentTab }) => {

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <TabHeader labels={header} current={currentTab} setCurrent={setCurrentTab} />
                <div className="w-full lg:w-fit flex items-center justify-end">
                    <Filters />
                </div>
            </div>

        </div>
    )
}
Tabs.propTypes = {
    header: PropTypes.array,
    content: PropTypes.array,
    currentTab: PropTypes.number,
    setCurrentTab: PropTypes.func
}
export default Tabs