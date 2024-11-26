import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const TabHeader = ({ labels, current, setCurrent }) => {
    const [indicatorStyle, setIndicatorStyle] = useState({
    });
 
    const tabRefs = useRef([]);

    useEffect(() => {
        const updateIndicatorStyle = () => {
            if (tabRefs.current[current]) {
                const { offsetWidth, offsetLeft, offsetHeight } = tabRefs.current[current];
                
                setIndicatorStyle({
                    width: `${offsetWidth == 133 ? 167 : offsetWidth}px`,
                    height: `${offsetHeight}px`,
                    left: `${offsetLeft - 15}px`,
                    transition: 'left 0.3s ease, width 0.3s ease'
                });
            }
        };
        updateIndicatorStyle();
    }, [current, labels.length]);

    return (
        <div className="flex justify-center space-x-4 bg-[#1d2122] rounded-full p-2 relative">
            {labels.map((label, index) => (
                <button
                    ref={el => tabRefs.current[index] = el}
                    onClick={() => setCurrent(index)}
                    onFocus={() => setCurrent(index)}
                    key={label}
                    className={`p-3 ${index === current ? "text-gray-900" : "text-white"}  focus-within:outline-none outline-none transition-all px-3 lg:px-6 rounded-full text-xs lg:text-base z-[10] font-['BankGothic'] font-bold`}>
                    {label}
                </button>
            ))}
            <div
                className="text-gray-900 bg-[#F9E727] absolute  rounded-full z-[1] left-0"
                style={indicatorStyle}
            ></div>
        </div>
    );
}

TabHeader.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    current: PropTypes.number.isRequired,
    setCurrent: PropTypes.func.isRequired
}

export default TabHeader;
