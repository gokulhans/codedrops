import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../../../axios';


const TaglistTile = ({ tag }) => {

    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: () => {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            return axiosClient.delete(`/tag/${tag._id}`, { headers });
        },
        onSuccess: () => {
            // Invalidate and refetch queries related to the updated data
            queryClient.invalidateQueries('tags');
        },
    });

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this Tag ?"
        );
        if (isConfirmed) {
            mutateAsync();
        }
    };


    return (
        <><tr>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <div className="flex items-center gap-x-3">
                        <div className="grow">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {tag.tagName}
                            </span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-3">
                    <span className="text-sm text-gray-500">
                        {new Date(tag.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </span>
                </div>
            </td>
            <td className="h-px w-px whitespace-nowrap">
                <div className="px-6 py-1.5 flex space-x-2">
                    {/* <a
                className="inline-flex items-center gap-x-1.5 text-sm dark:text-gray-300 text-gray-600 decoration-2 hover:underline font-medium"
                href={`#view/${tag._id}`}
            >
                View
            </a>
            <a
                className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium"
                href={`#edit/${tag._id}`}
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
        </tr></>
    )
}

export default TaglistTile