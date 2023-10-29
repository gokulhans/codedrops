import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../../../axios';
import { Link } from 'react-router-dom';


const DroplistTile = ({ drop }) => {

    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: () => {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            return axiosClient.delete(`/drop/${drop._id}`, { headers });
        },
        onSuccess: () => {
            // Invalidate and refetch queries related to the updated data
            queryClient.invalidateQueries('drops');
        },
    });

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this Drop ?"
        );
        if (isConfirmed) {
            mutateAsync();
        }
    };

    return (
        <><tr>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <Link to={`/drop/${drop._id}/${drop.slug}`} className="flex items-center gap-x-3">
                        <div className="grow">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {drop.dropname}
                            </span>
                        </div>
                    </Link>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <span className="text-sm text-gray-500">
                        {drop.slug}
                    </span>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <span className="text-sm text-gray-500">
                        {drop.username}
                    </span>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <span className="text-sm text-gray-500">
                        {new Date(drop.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </span>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-1.5 flex space-x-2">
                    {/* <a
                className="inline-flex items-center gap-x-1.5 text-sm dark:text-gray-300 text-gray-600 decoration-2 hover:underline font-medium"
                href={`#view/${drop._id}`}
            >
                View
            </a>
            <a
                className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium"
                href={`#edit/${drop._id}`}
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

export default DroplistTile