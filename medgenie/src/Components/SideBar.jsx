import { Link } from 'react-router-dom';
import {useNavigate } from "react-router-dom";
const Navbar = (props) => {
    const navigate = useNavigate();

    const navigateTo = (address) => {
        navigate(address);
    };

    const jwt = sessionStorage.getItem("jwt");
    const iv = sessionStorage.getItem("iv");
    const encryptedData = sessionStorage.getItem("encryptedData");
    const handleLogout = () => {

        sessionStorage.clear("jwt");
        sessionStorage.clear("iv");
        sessionStorage.clear("encryptedData");
        navigateTo('/login');

    }
    const scrollDown = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: 'smooth',
        });
    };
    const toggleMenu = () => {
        const navbar = document.getElementById('navbar-default');
        if (navbar) {
            navbar.classList.toggle('hidden');
        }
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex mr-[80px]">
                        <img src="/assets/healthcare 1.svg" alt="" />
                        <div className="font-bold text-[20px]">MedGenie</div>
                    </a>
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex text-[16px]">
                        <li className="mr-[25px]"><Link to="/" >Home</Link></li>
                    <li className="mr-[25px]"><Link to="/" onClick={() => scrollDown(props.AboutSection)}>About</Link></li>
                    <li className="mr-[25px]"><Link to="/" onClick={() => scrollDown(props.ServicesPageSection)}>Diagnoses</Link></li>
                    <li className="mr-[25px]"><Link to="/hospitals" >Hospitals</Link></li>
                    <li className="mr-[25px]"><Link to="/" onClick={() => scrollDown(props.ConnectWithUsSection)}>Contact Us</Link></li>
                    {(!jwt) && <li className="mr-[25px]"><Link to="/login">Login</Link></li>}
                    {(!jwt) && <li className="mr-[25px]"><Link to="/signup">Sign Up</Link></li>}
                    {(jwt) && <li className="mr-[25px]"><Link to="/changePass">Change Password</Link></li>}

                    {(jwt) && <button className="mr-[25px] shadow-lg rounded-lg translate-y-[-5px]  bg-[#18A0A9] text-[#FFFFFF] font-medium p-[5px]" onClick={handleLogout}><a href="/login">Logout</a></button>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;