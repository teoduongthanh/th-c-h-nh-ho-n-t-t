import LineChart from "../components/Profile/Chart";
import React, { useState, useEffect } from "react";

const Profile = () => {
    const [isLoginGG, setGG] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [Users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users_account");
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    const User = Users.find((user) => user.user_id === 1)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="mx-4 py-28 lg:flex gap-x-4 flex-col lg:flex-row">
            <div className="lg:w-2/3 w-full rounded-xl border-2 shadow-xl px-6 lg:px-20">
                <div className="flex py-8 flex-col lg:flex-row items-center lg:items-start">
                    <img className="w-20 h-20 rounded-xl" src="https://images.unsplash.com/photo-1728155469374-df8569326706?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="description" />
                    <div className="mt-4 lg:mt-0 lg:ml-4 text-center lg:text-left">
                        <div className="text-3xl font-semibold">{User.username}</div>
                        <div className="text-gray-500">#632745</div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                    <div className="text-gray-500 flex items-center">Join date:<span className="text-black px-2">05 Dec 2024</span></div>
                    <div className="w-full lg:w-[1px] bg-gray-500"></div>
                    <div className="text-gray-500 flex items-center">Last active:<span className="text-black px-2">1 second ago</span></div>
                    <div className="w-full lg:w-[1px] bg-gray-500"></div>
                    <div className="text-gray-500 flex items-center">Active time:<span className="text-black px-2">0 hours</span></div>
                    <div className="w-full lg:w-[1px] bg-gray-500"></div>
                    <div className="text-gray-500 flex items-center">Lesson completion:<span className="text-black px-2">0</span></div>
                </div>
                <LineChart />
            </div>
            <div className="lg:w-1/3 w-full grid grid-flow-row gap-y-4 mt-4 lg:mt-0">
                <div className="rounded-xl border-2 shadow-xl px-4 py-4">
                    <div className="text-3xl mb-4">Account information</div>
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left text-xl">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 w-1/3">Information</th>
                                <th className="border border-gray-300 px-4 py-2 w-2/3">Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Email</td>
                                <td className="border border-gray-300 px-4 py-2">haiztvn@gmail.com</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Display name</td>
                                <td className="border border-gray-300 px-4 py-2">Hoang Hai</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Google login</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {isLoginGG ? (
                                        <span className="text-white bg-green-500 rounded-xl px-3 py-1">Yes</span>
                                    ) : (
                                        <span className="text-white bg-red-500 rounded-xl px-3 py-1">No</span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Join date</td>
                                <td className="border border-gray-300 px-4 py-2">2024-12-05</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Total days</td>
                                <td className="border border-gray-300 px-4 py-2">1</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Active days</td>
                                <td className="border border-gray-300 px-4 py-2">0</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Inactive days</td>
                                <td className="border border-gray-300 px-4 py-2">1</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Active hours</td>
                                <td className="border border-gray-300 px-4 py-2">0 hours 0 minutes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="rounded-xl border-2 shadow-xl px-4 py-4">
                    <div className="text-3xl mb-4">Change password</div>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <input className="w-full lg:w-3/4 border-2 border-gray-500 rounded-lg p-2" placeholder="New password" />
                        <button onClick={() => setIsOpen(true)} className="w-full lg:w-1/4 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white">Summit</button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-10 flex justify-center items-center">
                    <div className="bg-slate-100 p-4 rounded shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-3xl">Verify Code</div>
                            <button onClick={() => setIsOpen(false)}>✖</button>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <input className="w-full lg:w-3/4 border-2 border-gray-500 rounded-lg p-2" placeholder="Verify code" />
                            <button className="w-full lg:w-1/4 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white">Summit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;