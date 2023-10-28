import React, { useState } from 'react'
import axiosClient from '../../../axios';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

const AddTag = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(null);

    const navigate = useNavigate()

    const schema = yup.object().shape({
        tagName: yup.string().required('Tag Name is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { mutateAsync } = useMutation({
        mutationFn: (data) => {
            const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
            const headers = {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            };
            return axiosClient.post('/tag', data, { headers });
        },
        onSuccess: () => {
            navigate("/admin/tags")
            window.location.reload()
        },
        onError: (error) => {
            setShowError(error);
            setIsLoading(false)
        },
    })

    const onSubmit = (data) => {
        setIsLoading(true)
        mutateAsync(data);
    }

    return (
        <>
            <>
                <div className="text-center">
                    <button
                        type="button"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        data-hs-overlay="#hs-modal-signin"
                    >
                        <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                            />
                        </svg>
                        Add Tag
                    </button>
                </div>
                <div
                    id="hs-modal-signin"
                    className="hs-overlay hidden w-full h-full fixed top-10 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                >
                    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
                                        Add Tag
                                    </h2>
                                </div>
                                <div className="mt-5">

                                    {/* Form */}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid gap-y-4">
                                            {/* Form Group */}
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm mb-2 dark:text-white"
                                                >
                                                    Tag
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                        {...register('tagName')}
                                                    />
                                                    {errors.tagName && <span>{errors.tagName.message}</span>}
                                                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                        <svg
                                                            className="h-5 w-5 text-red-500"
                                                            width={16}
                                                            height={16}
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End Form Group */}
                                            <button
                                                type="submit" disabled={isLoading}
                                                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                            >
                                                {isLoading ? 'Adding Tag...' : 'Add Tag'}
                                            </button>
                                            {showError && <div>Error: {showError}</div>}
                                        </div>
                                    </form>
                                    {/* End Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}

export default AddTag