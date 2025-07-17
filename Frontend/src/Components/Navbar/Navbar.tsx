import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrTransaction, GrConfigure } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { MdLogout} from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || 'default');
    const {isAuthenticated,user} = useSelector((state:RootState)=>state.auth);
    const name = JSON.parse(user);
    
    
    const [dropdownOpen, setDropdownOpen] = useState({
        configuration: false,
        transaction: false,
        reports: false,
        theme: false,
        profile: false,
    });

    const handleThemeChange = (selectedTheme: string) => {
        setTheme(selectedTheme);
    };

    const handleDropdownClick = (dropdown: any) => {
        setDropdownOpen((prev: any) => ({ ...prev, [dropdown]: !prev[dropdown] }));
    };
    const handleMenuItemClick = () => {
        setDropdownOpen({
            configuration: false,
            transaction: false,
            reports: false,
            theme: false,
            profile: false,
        });
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme])


    //   useEffect(() => {
    //     if (theme) {
    //       setTheme(theme)
    //     } else {
    //       setTheme('default')
    //     }

    //   }, [themee, theme])
    // useEffect(() => {
    // document.documentElement.setAttribute("data-theme", theme)
    // localStorage.setItem("theme", theme)
    // }, [theme])

    return (
        <>
            <div className="navbar sticky top-0 w-full border-b bg-base-300 border-base-800 z-10 ">

                {/* mobile menu */}
                <div className="flex-none">
                    <div className="drawer lg:hidden">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <label className="btn btn-circle swap swap-rotate z-10" htmlFor="my-drawer">
                            <svg className="swap-off fill-current [:checked~*_&]:!-rotate-45 [:checked~*_&]:!opacity-0" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                            <svg className="swap-on fill-current [:checked~*_&]:!rotate-0 [:checked~*_&]:!opacity-100" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                        </label>

                        <div className="drawer-content"></div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-10">

                                <ul className="menu bg-base-200 rounded-box w-56">
                                    <li><Link to="/">Home</Link></li>
                                    <li>
                                        <details open>
                                            <summary>Transaction</summary>
                                            <ul>
                                                <li onClick={handleMenuItemClick}><Link to='/inwardentryview'>Inward Entry</Link></li>
                                                <li onClick={handleMenuItemClick}><Link to='/outwardentryview'>Outward Entry</Link></li>
                                                <li onClick={handleMenuItemClick}><Link to='/stampentryview'>Stamp Purchase</Link></li>
                                                <li onClick={handleMenuItemClick}><Link to='/outwarddetailsentry'>Outward Details Entry</Link></li>
                                                <li onClick={handleMenuItemClick}><Link to='/voucherentryview'>Voucher Entry</Link></li>
                                            </ul>
                                        </details>
                                    </li>
                                    <li>
                                        <details open>
                                            <summary>Parent</summary>
                                            <ul>
                                                <li><a>Submenu 1</a></li>
                                                <li><a>Submenu 2</a></li>

                                            </ul>
                                        </details>
                                    </li>
                                    <li>
                                        <details open>
                                            <summary>Parent</summary>
                                            <ul>
                                                <li><a>Submenu 1</a></li>
                                                <li><a>Submenu 2</a></li>

                                            </ul>
                                        </details>
                                    </li>
                                    <li><a>Item 3</a></li>
                                </ul>
                            </ul>

                        </div>
                    </div>

                </div>

                {/* main menu */}

                <div className="flex-auto">
                    
                    {isAuthenticated && (<><div className="navbar-start hidden lg:flex">
                        {/* dropdown menu */}

                        {/* deskMenu */}

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1 " onClick={() => handleDropdownClick('home')}>
                                <ul tabIndex={0} >
                                    <li><Link className="flex gap-2 " to="/"> <FiHome size={16} />Home</Link></li>
                                    </ul>                               
                            </div>
                        </div>

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1" onClick={() => handleDropdownClick('configuration')}>
                                <GrConfigure size={16} />Configuration
                            </div>
                            {dropdownOpen.configuration && (
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={handleMenuItemClick}><Link to="/codemasterview">Code Master</Link></li>
                                    <li onClick={handleMenuItemClick}><a>Teting...2</a></li>
                                    <li onClick={handleMenuItemClick}> <a >Tesing...3</a>
                                    </li>
                                </ul>


                            )}
                        </div>

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1" onClick={() => handleDropdownClick('transaction')}>
                                <GrTransaction size={16} />Transaction
                            </div>
                            {dropdownOpen.transaction && (
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={handleMenuItemClick}><Link to='/inwardentryview'>Inward Entry</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/outwardentryview'>Outward Entry</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/stampentryview'>Stamp Purchase</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/outwarddetailsentry'>Outward Details Entry</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/voucherentryview'>Voucher Entry</Link></li>

                                </ul>
                            )}
                        </div>

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1" onClick={() => handleDropdownClick('reports')}>
                                <TbReportSearch size={16} />Reports
                            </div>
                            {dropdownOpen.reports && (
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={handleMenuItemClick}><Link to='/inout'>Inward/Outward Register</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/purchaseregiser'>Purchase Register</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/ledgerdetails'>Ledger Details</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/ledgersummary'>Ledger Summary</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/cashvoucherreport'>Cash Voucher</Link></li>
                                </ul>
                            )}
                        </div>
                    </div>

                    
                    </>)}
                    
                </div>

                {/* right side menu theme/user profile */}

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1" onClick={() => handleDropdownClick('theme')}>
                        <FaRegMoon size={16} />Theme


                    </div>
                    {dropdownOpen.theme && (
                        <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-15">
                            <li>
                                <input onChange={() => handleThemeChange("dark")} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="dark" value="dark" />
                            </li>
                            <li>
                                <input onChange={() => handleThemeChange("light")} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="light" value="light" />
                            </li>
                        </ul>
                    )}
                </div>

                <div className="flex-none gap-3">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost btn-circle avatar" onClick={() => handleDropdownClick('profile')}>
                            <div className="w-10 rounded-full bg-slate-300 ">
                               {!isAuthenticated ? <div className=" text-xl text-blue-900 flex justify-center"><BsPersonCircle size={30} /></div> : (<><div className="flex justify-center font-bold text-lg text-indigo-800">{name.firstName.toUpperCase().charAt(0) + "" +name.lastName.toUpperCase().charAt(0)}</div></>)}
                            </div>
                        </div>
                        {dropdownOpen.profile && (
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <div className="px-4 py-1">
                                    <div className="flex justify-center">
                                        {isAuthenticated && user ? (<div className="font-bold text-primary flex" >{name.firstName[0].toUpperCase() + name.firstName.slice(1) + "  " + name.lastName[0].toUpperCase() + name.lastName.slice(1)}</div>) : null}
                                    </div>
                                </div>
                                <ul className="py-1" aria-labelledby="user-menu-button">
                                    <li onClick={handleMenuItemClick}>
                                        <a href="/userProfile" className="block px-4 py-1 text-sm">Profile</a>
                                    </li>
                                    {isAuthenticated ? (<li onClick={handleMenuItemClick}>
                                        <Link to="/logout" className=" px-4 py-1 flex">Logout<span><MdLogout size={20} /></span></Link>
                                    </li>):(<li onClick={handleMenuItemClick}>
                                        <Link to="/login" className="block px-4 py-1 ">Login</Link>
                                        <Link to="/register" className="block px-4 py-1 ">Register</Link>
                                    </li>)}
                                    
                                    
                                </ul>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
