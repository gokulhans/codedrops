import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../../axios';


const AdminListTile = ({ admin }) => {

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: () => {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            return axiosClient.delete(`/admin/admin/${admin._id}`, { headers });
        },
        onSuccess: () => {
            // Invalidate and refetch queries related to the updated data
            queryClient.invalidateQueries('admins');
        },
    });

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this Admin ?"
        );
        if (isConfirmed) {
            mutateAsync();
        }
    };

    return (
        <><tr>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <Link to={`/admin/${admin._id}/${admin.slug}`} className="flex items-center gap-x-3">
                        <div className="grow">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {admin.name}
                            </span>
                        </div>
                    </Link>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <span className="text-sm text-gray-500">
                        {admin.email}
                    </span>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <span className="text-sm text-gray-500">
                        {new Date(admin.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </span>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-1.5 flex space-x-2">
                    {/* <a
                className="inline-flex items-center gap-x-1.5 text-sm dark:text-gray-300 text-gray-600 decoration-2 hover:underline font-medium"
                href={`#view/${admin._id}`}
            >
                View
            </a>
            <a
                className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium"
                href={`#edit/${admin._id}`}
            >
                Edit
            </a> */}
                    <button
                        className="inline-flex items-center gap-x-1.5 text-sm text-red-600 decoration-2 hover:underline font-medium"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr ></>
    )
}

export default AdminListTile