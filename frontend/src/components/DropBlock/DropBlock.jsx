import React, { useEffect, useState } from "react";
import CopyToast from "../Toast/CopyToast";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../axios";

const DropBlock = ({
    dropname,
    dropbody,
    slug,
    tags,
    username,
    userid,
    dropid,
    hideview,
    expand,
}) => {

    const queryClient = useQueryClient();


    // const urlRegex = /(https?:\/\/[^\s]+)/g;
    // const highlighteddropbody = dropbody.replace(urlRegex, (url) => {
    //   return `<a href="${url}" style="color: blue; text-decoration: underline;" target="_blank">${url}</a>`;
    // });

    const [isCopied, setIsCopied] = useState(false);
    const [isShared, setIsShared] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(dropbody);
        setIsCopied(true);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(
            `${import.meta.env.VITE_FRONTEND_URL}#/drop/${dropid}/${slug}`
        );
        setIsShared(true);
    };

    // let navigate = useNavigate()

    const { mutateAsync } = useMutation({
        mutationFn: () => {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            return axiosClient.delete(`/drop/${dropid}`, { headers });
        },
        onSuccess: () => {
            // Invalidate and refetch queries related to the updated data
            queryClient.invalidateQueries('drops');
        },
    });

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this code block?"
        );
        if (isConfirmed) {
            mutateAsync();
        }
    };

    const closeToast = () => {
        setIsCopied(false);
        setIsShared(false);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 p-5 mb-4">
            <div className="flex items-center mb-2">
                <Link to={`/drop/${dropid}/${slug}`}>
                    <h2 className="text-xl font-semibold mb-2">{dropname}</h2>
                </Link>
                <div className="ml-auto mb-2 space-x-2 flex">
                    <button
                        onClick={handleShare}
                        className="font-normal text-sm text-gray-600 dark:text-gray-400"
                    >
                        {" "}
                        {!isShared && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                        </svg>}
                        {isShared && (
                            <CopyToast
                                message="Link copied to clipboard!"
                                onClose={closeToast}
                            />
                        )}
                    </button>

                    {userid == localStorage.getItem("userid") && (
                        <>
                            {!hideview && (
                                <>
                                    <Link
                                        to={`/drop/edit/${dropid}`}
                                        className="font-bold text-sm text-blue-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="font-bold text-sm text-red-600 dark:text-red-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </button>
                                </>)}
                        </>
                    )}
                    <button
                        onClick={handleCopy}
                        className="font-bold text-sm text-green-700 dark:text-green-500"
                    >
                        {!isCopied && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z" />
                        </svg>}
                        {isCopied && (
                            <CopyToast message="Copied!" onClose={closeToast} />
                        )}
                    </button>
                </div>
            </div>
            {/* <Link to={`/drop/${dropid}/${generateSlug(dropname)}`}> */}
            <div className="my-5">
                {isExpanded || expand ? (
                    <p
                        className="text-black-600 text-sm whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: dropbody }}
                    />
                ) : (
                    <p
                        className="text-black-600 text-sm whitespace-pre-line line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: dropbody }}
                    />
                )}
            </div>
            {/* </Link> */}

            <div className="flex items-center mb-2">
                <div className="flex space-x-2 mt-2">
                    {tags.map((tag, index) => (
                        <Link
                            to={`/tag/${tag._id}/${tag.tagName}`}
                            key={index}
                            className="bg-green-600 text-green-50 py-1 px-2 rounded-full text-xs"
                        >
                            {tag.tagName}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mt-5">
                <Link
                    to={`/profile/${userid}/${username}`}
                    className="text-orange-700 text-xs dark:text-orange-500"
                >
                    Crafted with 💚 by {username}
                </Link>
                {!expand && (
                    <button
                        onClick={handleReadMore}
                        className="mt-2 text-xs cursor-pointer text-orange-700 text-xs dark:text-orange-500"
                    >
                        {!isExpanded ? "See More.." : "Show Less"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default DropBlock;