import { Link, useLocation } from "react-router-dom";
import { MdOutlineExpandMore } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { assets, generateProfilePicture } from "../utils/assets";
import { useState } from "react";
import { logout } from "../redux/actions/user";


const Sidebar = ({
    routes = [],
    component: Component,
    pageTitle,
    isAuthenticated,
    user,
}) => {
    const [expandedRoute, setExpandedRoute] = useState(null);
    const location = useLocation();

    const handleExpandClick = (title) => {
        setExpandedRoute(expandedRoute === title ? null : title);
    };
    const dispatch = useDispatch()


    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logout());
    };



    return (
        <section className="w-full min-h-screen bg-bg p-[20px]">
            <div className="wrapper w-full  flex gap-[16px] relative">
                <div className="sidebar fixed w-[20%] h-[calc(100vh-40px)] bg-white p-[20px] rounded-md flex flex-col justify-between overflow-y-auto">
                    {/* Sidebar content */}
                    <div>
                        <div className="profile-container flex flex-col items-center border-b pb-[16px] mb-[16px]">
                            <img
                                src={generateProfilePicture(isAuthenticated, user)}
                                alt=""
                                className="w-[120px] h-[120px] bg-zinc-400 rounded-full mb-[5px] object-cover"
                            />
                            <p className="text-xl font-medium text-black">
                                {isAuthenticated && user?.name}
                            </p>
                            {/* <Link className="font-medium text-accent">Edit Profile</Link> */}
                        </div>
                        <div className="routes">
                            <ul className="flex flex-col gap-[16px]">
                                {routes.map((r, index) => (
                                    <li key={index} className="flex flex-col">
                                        {r.expandAble ? (
                                            <>
                                                <button
                                                    onClick={() => handleExpandClick(r.title)}
                                                    className="flex items-center justify-between"
                                                >
                                                    <span className="text-base font-[400] flex gap-[8px] items-center">
                                                        <r.icon className="text-xl"/>
                                                        {r.title}
                                                    </span>
                                                    <span>
                                                        {expandedRoute === r.title ? (
                                                            <MdOutlineExpandMore className="text-lg rotate-180" />
                                                        ) : (
                                                            <MdOutlineExpandMore className="text-lg" />
                                                        )}
                                                    </span>
                                                </button>
                                                {expandedRoute === r.title && (
                                                    <ul className="ml-4 flex flex-col gap-[8px] mt-[8px]">
                                                        {r.subRoutes.map((subRoute, subIndex) => (
                                                            <li
                                                                key={subIndex}
                                                                className={`text-[15px] ${location.pathname === subRoute.value
                                                                    ? "bg-accent text-white p-2 rounded-md"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                <Link
                                                                    className={`flex items-center text-[14px] gap-[8px] ${location.pathname === subRoute.value ? "" : "hover:bg-accent-hover-light hover:p-2 hover:rounded-md hover:duration-200"} `}
                                                                    to={subRoute.value}
                                                                >
                                                                    {subRoute.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                to={r.value}
                                                className={`flex items-center gap-[8px]  ${location.pathname === r.value
                                                    ? "bg-accent p-2.5 rounded-md text-white"
                                                    : "hover:bg-accent-hover-light hover:p-2.5 hover:rounded-md hover:duration-200"
                                                    }`}
                                            >
                                                <r.icon />
                                                {r.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center justify-between logout-container mt-[32px]">
                        <div className="flex items-center gap-[8px]">
                            <img
                                src={generateProfilePicture(isAuthenticated, user)}
                                alt=""
                                className="rounded-full object-cover object-center w-[56px] h-[56px]"
                            />
                            <p>{isAuthenticated && user.name}</p>
                        </div>

                        <button onClick={logoutHandler}>
                            <IoMdLogOut className="text-2xl" />
                        </button>
                    </div>
                </div>

                <div className="component-area h-auto flex-grow w-full ml-[21.5%]">
                    <div className="header w-full bg-white mb-[16px] p-[16px] rounded-md flex items-center justify-between">
                        {pageTitle ? (
                            <p className="text-lg font-medium">{pageTitle}</p>
                        ) : (
                            <p className="text-lg font-medium">
                                Greetings <span className="text-accent">{user.name}!</span>
                            </p>
                        )}


                        <div className="routes flex items-center gap-[8px]">




                            <IoIosNotificationsOutline className="text-3xl" />
                            <img
                                src={generateProfilePicture(isAuthenticated, user)}
                                alt=""
                                className="w-[48px] h-[48px] object-cover object-top bg-zinc-50 rounded-full"
                            />
                        </div>

                    </div>

                    <div className="component">
                        <Component isAuthenticated={isAuthenticated} user={user} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;
