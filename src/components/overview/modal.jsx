import { FaX } from "react-icons/fa6"
import { IoCardOutline } from "react-icons/io5"
import { MdOutlineEmail } from "react-icons/md"

const Modal = () => {


    const buttons = [
        {
            title: "Instant Claim",
            icon: <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1673 0.333984V22.6548L2.90065 12.3882L0.333984 15.0007L15.0007 29.6673L29.6673 15.0007L27.1007 12.3882L16.834 22.6548V0.333984H13.1673Z" fill="white" />
            </svg>

        },
        {
            title: "Set Claim schedule",
            icon: <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.66667 28H12.4167V24.3333H16.0833V21.5833H12.4167V17.9167H9.66667V21.5833H6V24.3333H9.66667V28ZM18.8333 26.625H28V23.875H18.8333V26.625ZM18.8333 22.0417H28V19.2917H18.8333V22.0417ZM20.85 15.075L23.4167 12.5083L25.9833 15.075L27.9083 13.15L25.3417 10.4917L27.9083 7.925L25.9833 6L23.4167 8.56667L20.85 6L18.925 7.925L21.4917 10.4917L18.925 13.15L20.85 15.075ZM6.45833 11.8667H15.625V9.11667H6.45833V11.8667ZM4.16667 33.5C3.15833 33.5 2.29514 33.141 1.57708 32.4229C0.859028 31.7049 0.5 30.8417 0.5 29.8333V4.16667C0.5 3.15833 0.859028 2.29514 1.57708 1.57708C2.29514 0.859028 3.15833 0.5 4.16667 0.5H29.8333C30.8417 0.5 31.7049 0.859028 32.4229 1.57708C33.141 2.29514 33.5 3.15833 33.5 4.16667V29.8333C33.5 30.8417 33.141 31.7049 32.4229 32.4229C31.7049 33.141 30.8417 33.5 29.8333 33.5H4.16667ZM4.16667 29.8333H29.8333V4.16667H4.16667V29.8333Z" fill="white" />
            </svg>

        },

        {
            title: "Stake",
            icon: <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.6673 23.834C24.1395 23.834 22.8409 23.2993 21.7715 22.2298C20.702 21.1604 20.1673 19.8618 20.1673 18.334C20.1673 16.8062 20.702 15.5076 21.7715 14.4382C22.8409 13.3687 24.1395 12.834 25.6673 12.834C27.1951 12.834 28.4937 13.3687 29.5631 14.4382C30.6326 15.5076 31.1673 16.8062 31.1673 18.334C31.1673 19.8618 30.6326 21.1604 29.5631 22.2298C28.4937 23.2993 27.1951 23.834 25.6673 23.834ZM12.834 29.334C11.8257 29.334 10.9625 28.975 10.2444 28.2569C9.52634 27.5388 9.16732 26.6757 9.16732 25.6673V11.0007C9.16732 9.99232 9.52634 9.12912 10.2444 8.41107C10.9625 7.69301 11.8257 7.33398 12.834 7.33398H38.5006C39.509 7.33398 40.3722 7.69301 41.0902 8.41107C41.8083 9.12912 42.1673 9.99232 42.1673 11.0007V25.6673C42.1673 26.6757 41.8083 27.5388 41.0902 28.2569C40.3722 28.975 39.509 29.334 38.5006 29.334H12.834ZM16.5007 25.6673H34.834C34.834 24.659 35.193 23.7958 35.9111 23.0777C36.6291 22.3597 37.4923 22.0007 38.5006 22.0007V14.6673C37.4923 14.6673 36.6291 14.3083 35.9111 13.5902C35.193 12.8722 34.834 12.009 34.834 11.0007H16.5007C16.5007 12.009 16.1416 12.8722 15.4236 13.5902C14.7055 14.3083 13.8423 14.6673 12.834 14.6673V22.0007C13.8423 22.0007 14.7055 22.3597 15.4236 23.0777C16.1416 23.7958 16.5007 24.659 16.5007 25.6673ZM36.6673 36.6673H5.50065C4.49232 36.6673 3.62912 36.3083 2.91107 35.5902C2.19301 34.8722 1.83398 34.009 1.83398 33.0007V12.834H5.50065V33.0007H36.6673V36.6673Z" fill="white" />
            </svg>

        },
        {
            title: "Buy $GVV",
            icon: <svg width="70" height="18" viewBox="0 0 70 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M57.1033 17.1132L47.2109 0H51.7604L58.6899 12.3694L65.2956 0H69.2622L59.8556 17.1132H57.1033Z" fill="white" />
                <path d="M34.5017 17.1132L24.6094 0H29.1589L36.0884 12.3694L42.694 0H46.6607L37.2541 17.1132H34.5017Z" fill="white" />
                <path d="M16.417 3.05998H3.98283V13.8913H16.417V10.0866H9.90851V7.17234H20.2865V13.0656C20.2865 14.6307 19.9951 15.6993 19.4123 16.2713C18.8294 16.8326 17.7069 17.1132 16.0447 17.1132H4.24188C2.57967 17.1132 1.45713 16.8326 0.87428 16.2713C0.291426 15.6993 0 14.6307 0 13.0656V4.0476C0 2.49332 0.291426 1.43015 0.87428 0.85809C1.45713 0.28603 2.57967 0 4.24188 0H16.0447C17.6853 0 18.8024 0.280633 19.3961 0.8419C19.9897 1.40317 20.2865 2.41776 20.2865 3.88569V4.27426L16.417 4.97045V3.05998Z" fill="white" />
            </svg>

        },
    ]


    return (
        <div className="flex flex-col gap-8 items-center justify-center p-8 rounded-xl bg-[#12172C] max-w-3xl self-center w-full">
            <div>
                <div className="w-[90px] h-[90px] rounded-full bg-[#B9C8FF] flex items-center justify-center text-black">
                    <FaX size={30} />
                </div>
            </div>
            <h1 className="text-3xl font-bold font-['BankGothic']">xxx@gmail.com</h1>

            <div className="flex flex-col gap-4 items-center justify-center w-full p-12 bgCard rounded-3xl">
                <h1 className="text-3xl font-bold font-['BankGothic'] opacity-90">$GVV50000</h1>
                <p className="text-lg opacity-85">Available</p>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <div className=" relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <MdOutlineEmail size={25} />
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="xxxxxxxxxxx@gmail.com"
                        required
                        className="block w-full pl-12 font-['BankGothic'] rounded-xl bg-slate-950 border-0 py-4 text-white shadow-sm placeholder:text-white focus:ring-1 text-sm sm:text-lg"
                    />
                </div>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <IoCardOutline size={25} />
                    </div>
                    <input
                        id="card"
                        name="card"
                        type="text"
                        placeholder="0xf2D4...6f91"
                        required
                        className="block w-full pl-12 font-['BankGothic'] rounded-xl bg-slate-950 border-0 py-4 text-white shadow-sm placeholder:text-white focus:ring-1 text-sm sm:text-lg "
                    />
                </div>
            </div>

            <div className="flex items-stretch flex-wrap justify-between w-full my-8">
                {buttons.map((button, index) => (
                    <button key={index} className="flex flex-col shrink-0 items-center gap-3 w-[100px]  lg:w-[120px] justify-between h-full ">
                        <div
                            className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#FFFFFF1A] flex items-center justify-center "
                        >
                            {button.icon}
                        </div>
                        {button.title}
                    </button>
                ))}
            </div>




        </div >
    )
}

export default Modal