import React from 'react'
import axiosClient from '../../../axios';

const AdminDashboard = () => {

    const handleDelete = async (entityId) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete ${entityId}?`);
        if (isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                await axiosClient.delete(`/admin/${entityId}`, { headers });
            } catch (error) {
                console.error('Error deleting entity:', error);
            }
        }
    };

    return (
        <>
            <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
                <div className="flex flex-col gap-4 w-96">
                    <button onClick={() => handleDelete('drops')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Delete Drops
                    </button>
                    <button onClick={() => handleDelete('users')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Delete Users
                    </button>
                    <button onClick={() => handleDelete('admins')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Delete Admin
                    </button>
                    <button onClick={() => handleDelete('tags')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Delete Tags
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard