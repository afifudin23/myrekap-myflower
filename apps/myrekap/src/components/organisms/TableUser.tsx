import useUsers from "@/hooks/useUsers";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import formatters from "@/utils/formatters";
import { UserType } from "@/types/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AlertConfirm, AlertInfo } from "@/components/molecules/Alert";
import axiosInstance from "@/utils/axiosInstance";
import { setUserDetailCookies } from "@/utils/userDetailCookies";

const TableUser = () => {
    const { users, setUsers } = useUsers();
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showAlertConfirm, setShowAlertConfirm] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        const state = location.state as { message?: string };

        if (state?.message) {
            setMessage(state.message);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            navigate(location.pathname, { replace: true });
        }
    }, []);
    const handleDeleteUser = (id: string, name: string) => {
        setSelectedUserId(id);
        setMessage(`Apakah anda akan menghapus user ${name} ?`);
        setShowAlertConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedUserId) return;

        try {
            const response = await axiosInstance.delete(`/api/users/${selectedUserId}`);
            if (response.status === 200) {
                const updated = users.filter((user: UserType) => user.id !== selectedUserId);
                setUsers(updated);
                setMessage("User berhasil dihapus dari sistem");
            } else {
                setMessage("Gagal menghapus user");
            }
        } catch (error) {
            setMessage("Oops! Server mengalami kendala teknis. Tim kami akan segera menanganinya");
        }

        setShowAlert(true);
        setShowAlertConfirm(false);
        setSelectedUserId(null);
        setTimeout(() => setShowAlert(false), 3000);
    };
    return (
        <>
            <div className="overflow-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.1)] hidden lg:block">
                <table className="w-full text-sm 2xl:text-lg ">
                    <thead className="bg-gray-50 border-b-2 border-gray-300">
                        <tr className="tracking-wide font-semibold text-left cursor-default">
                            <th className="p-3">ID</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">PIN</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">CreatedAt</th>
                            <th className="p-3">UpdatedAt</th>
                            <th className="p-3">Settings</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {users.map((user: UserType, i) => (
                            <tr
                                className={` hover:bg-gray-200 text-gray-700 cursor-default ${
                                    i % 2 === 0 ? "bg-white" : "bg-gray-100"
                                }`}
                                key={user.id}
                            >
                                <td className="p-3 2xl:py-7 whitespace-nowrap">
                                    <span className="font-semibold">{user.id.slice(0, 7)}xxx</span>
                                </td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">{user.username}</td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">{formatters.simplyfyEmail(user.email)}</td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">xxxxxx</td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">
                                    <span
                                        className={`font-semibold uppercase tracking-wide p-1.5 rounded-lg bg-opacity-40 ${
                                            user.role === "ADMIN"
                                                ? "text-blue-600 bg-blue-100"
                                                : "text-yellow-700 bg-yellow-200"
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">
                                    <span className="font-semibold p-1.5 rounded-lg bg-opacity-40 text-slate-700 bg-slate-300">
                                        {formatters.isoDateToStringDateTime(user.createdAt)}
                                    </span>
                                </td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">
                                    <span className="font-semibold p-1.5 rounded-lg bg-opacity-40 text-slate-700 bg-slate-300">
                                        {formatters.isoDateToStringDateTime(user.updatedAt)}
                                    </span>
                                </td>

                                <td className="flex gap-2 items-center p-3 py-5 text-lg whitespace-nowrap">
                                    <Link
                                        to={`/administrator/edit/${user.id}`}
                                        onClick={() => setUserDetailCookies(user)}
                                        className="p-2 bg-amber-400 bg-opacity-90 rounded-lg"
                                    >
                                        <FaPencilAlt className="text-amber-100 text-sm 2xl:text-lg" />
                                    </Link>
                                    <button
                                        onClick={handleDeleteUser.bind(0, user.id, user.username)}
                                        className="p-2 bg-red-500 bg-opacity-90 rounded-lg"
                                    >
                                        <FaRegTrashAlt className="text-red-100 text-sm 2xl:text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-8 cursor-default lg:hidden">
                {users.map((user: UserType) => (
                    <div
                        className="bg-white text-md p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4"
                        key={user.id}
                    >
                        <div className="flex justify-between">
                            <p className="text-blue-700 font-bold text-lg">{user.id.slice(0, 7)}xxx</p>
                            <div className="flex gap-2">
                                <Link
                                    to={`/administrator/edit/${user.id}`}
                                    state={user}
                                    className="py-1.5 px-2 bg-amber-400 bg-opacity-90 rounded-lg"
                                >
                                    <FaPencilAlt className="text-amber-100" />
                                </Link>
                                <button className="py-1.5 px-2 bg-red-500 bg-opacity-90 rounded-lg">
                                    <FaRegTrashAlt className="text-red-100" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                                <p className="">{user.username}</p>
                                <p>xxxxxxxx</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>{formatters.simplyfyEmail(user.email)}</p>
                                <p
                                    className={`font-semibold capitalize tracking-wide px-2 rounded-lg bg-opacity-40 ${
                                        user.role === "ADMIN"
                                            ? "text-blue-600 bg-blue-100"
                                            : "text-yellow-700 bg-yellow-200"
                                    }`}
                                >
                                    {user.role}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold px-1 rounded-lg bg-opacity-40 text-slate-700 bg-slate-300">
                                    {formatters.isoDateToStringDateTime(user.createdAt)}
                                </p>
                                <p className="font-semibold px-1 rounded-lg bg-opacity-40 text-slate-700 bg-slate-300">
                                    {formatters.isoDateToStringDateTime(user.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Alert */}
            <AnimatePresence>
                {showAlert && message && <AlertInfo message={message} handleAlert={() => setShowAlert(false)} />}
                {showAlertConfirm && message && (
                    <AlertConfirm
                        message={message}
                        handleAlert={() => {
                            setShowAlertConfirm(false);
                            setSelectedUserId(null);
                        }}
                        handleResultConfirm={handleConfirmDelete}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default TableUser;
