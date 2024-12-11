import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrTransaction, GrConfigure } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";

const Navbar = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || 'default');
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

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme])

    const handleMenuItemClick = () => {
        setDropdownOpen({
            configuration: false,
            transaction: false,
            reports: false,
            theme: false,
            profile: false,
        });
    };
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

                {/* main menu */}

                <div className="flex-auto">
                    <div className="navbar-start hidden lg:flex">
                        {/* dropdown menu */}

                        {/* deskMenu */}

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1" onClick={() => handleDropdownClick('home')}>
                                <FiHome size={16} />Home
                            </div>
                        </div>

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1" onClick={() => handleDropdownClick('configuration')}>
                                <GrConfigure size={16} />Configuration
                            </div>
                            {dropdownOpen.configuration && (
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={handleMenuItemClick}><Link to='/inout'>In/Out</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/gpassentry'>Entry</Link></li>
                                    <li onClick={handleMenuItemClick}><a>Close</a></li>
                                    <li onClick={handleMenuItemClick}><Link to='/dinout'>Director In/Out</Link></li>
                                    <li onClick={handleMenuItemClick}>
                                        <details>
                                            <summary>Reports</summary>
                                            <ul>
                                                <li onClick={handleMenuItemClick}><a>Dashboard</a></li>
                                                <li onClick={handleMenuItemClick}><Link to="/gatepassreport">Gatepass</Link></li>
                                                <li onClick={handleMenuItemClick}><a>Director</a></li>
                                            </ul>
                                        </details>
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
                                    <li onClick={handleMenuItemClick}><Link to='/inwardentry'>Inward Entry</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/outwardentry'>Outward Entry</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/outwardentry'>Stamp Purchase</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/outwardentry'>Outward Details Entry</Link></li>
                                    <li onClick={handleMenuItemClick}><Link to='/outwardentry'>Voucher Entry</Link></li>
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

                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost btn-circle avatar" onClick={() => handleDropdownClick('profile')}>
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        {dropdownOpen.profile && (
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <div className="px-4 py-1">
                                    <div className="flex justify-center">
                                        {/* {isAuthenticated && user ? (<div className="font-bold text-primary flex" >{name.firstName[0].toUpperCase() + name.firstName.slice(1) + "  " + name.lastName[0].toUpperCase() + name.lastName.slice(1)}</div>) : null} */}
                                    </div>
                                </div>
                                <ul className="py-1" aria-labelledby="user-menu-button">
                                    <li onClick={handleMenuItemClick}>
                                        <a href="/userProfile" className="block px-4 py-1 text-sm">Profile</a>
                                    </li>
                                    <li onClick={handleMenuItemClick}>
                                        <Link to="/logout" className="block px-4 py-1 text-sm">Logout</Link>
                                    </li>
                                    <li onClick={handleMenuItemClick}>
                                        <Link to="/login" className="block px-4 py-1 text-sm">Login</Link>
                                        <Link to="/register" className="block px-4 py-1 text-sm">Register</Link>
                                    </li>
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
