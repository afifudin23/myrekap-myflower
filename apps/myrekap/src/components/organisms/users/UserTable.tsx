import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { badgeColorUser, formatters } from "@/utils";

const UserTable = ({
    settings,
    handleDeleteUser,
    users,
}: any) => {
    return (
        <>
            <div className="overflow-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.1)] hidden lg:block">
                <table className="w-full text-sm 2xl:text-lg ">
                    <thead className="bg-gray-50 border-b-2 border-gray-300">
                        <tr className="tracking-wide font-semibold text-left cursor-default">
                            <th className="p-3">ID</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">Telepon</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Password</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">CreatedAt</th>
                            <th className="p-3">UpdatedAt</th>
                            {settings && <th className="p-3">Settings</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {users.map((user: any, i: number) => (
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
                                <td className="p-3 2xl:py-7 whitespace-nowrap">{user.phoneNumber}</td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">
                                    {formatters.simplyfyEmail(user.email)}
                                </td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">xxxxxx</td>
                                <td className="p-3 2xl:py-7 whitespace-nowrap">
                                    <span
                                        className={`font-semibold uppercase tracking-wide p-1.5 rounded-lg bg-opacity-40 ${badgeColorUser(
                                            user.role
                                        )}`}
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
                                {settings && (
                                    <td className="flex gap-2 items-center p-3 py-5 text-lg whitespace-nowrap">
                                        <Link
                                            to={`/users/admin/${user.id}/edit`}
                                            onClick={() => localStorage.setItem("userSelected", JSON.stringify(user))}
                                            className="p-2 bg-amber-400 bg-opacity-90 rounded-lg"
                                        >
                                            <FaPencilAlt className="text-amber-100 text-sm 2xl:text-lg" />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteUser(user.id, user.username)}
                                            className="p-2 bg-red-500 bg-opacity-90 rounded-lg"
                                        >
                                            <FaRegTrashAlt className="text-red-100 text-sm 2xl:text-lg" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-8 cursor-default lg:hidden">
                {users.map((user: any) => (
                    <div
                        className="bg-white text-md p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.1)] flex flex-col gap-4"
                        key={user.id}
                    >
                        <div className="flex justify-between">
                            <p className="text-blue-700 font-bold text-lg">{user.id.slice(0, 7)}xxx</p>
                            {settings && (
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
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                                <p>
                                    {user.username} ({user.phoneNumber})
                                </p>
                                <p>xxxxxxxx</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>{formatters.simplyfyEmail(user.email)}</p>
                                <p
                                    className={`font-semibold capitalize tracking-wide px-2 rounded-lg bg-opacity-40 ${badgeColorUser(
                                        user.role
                                    )}`}
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

            
        </>
    );
};

export default UserTable;
