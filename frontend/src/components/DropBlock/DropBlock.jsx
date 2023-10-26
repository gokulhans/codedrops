import React, { useEffect, useState } from "react";
import CopyToast from "../Toast/CopyToast";
import { Link, useNavigate } from "react-router-dom";

const DropBlock = ({
    dropname,
    dropbody,
    tags,
    username,
    userid,
    dropid,
    hideview,
    expand,
}) => {


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
            `https://codedrops.xyz/#/drop/${dropid}/${generateSlug(dropname)}`
        );
        setIsShared(true);
    };

    function generateSlug(dropname) {
        const slug = dropname.toLowerCase().replace(/\s+/g, "-");
        return slug;
    }

    // let navigate = useNavigate()

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this code block?"
        );
        if (isConfirmed) {
            await deleteDoc(doc(db, "drops", dropid));
            window.location.reload();
        }
    };

    const closeToast = () => {
        setIsCopied(false);
        setIsShared(false);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 p-5 mb-4">
            <div className="flex items-center mb-2">
                <Link to={`/drop/${dropid}/${generateSlug(dropname)}`}>
                    <h2 className="text-xl font-semibold mb-2">{dropname}</h2>
                </Link>
                <div className="ml-auto mb-2   space-x-2">
                    {!hideview && (
                        <button
                            onClick={handleShare}
                            className="font-bold text-sm text-gray-600"
                        >
                            {" "}
                            {!isShared && "Share"}
                            {isShared && (
                                <CopyToast
                                    message="Link copied to clipboard!"
                                    onClose={closeToast}
                                />
                            )}
                        </button>
                    )}
                    {userid == localStorage.getItem("userid") && (
                        <>
                            <Link
                                to={`/edit/${dropid}`}
                                className="font-bold text-sm text-blue-600"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="font-bold text-sm text-red-600"
                            >
                                Delete
                            </button>
                        </>
                    )}
                    <button
                        onClick={handleCopy}
                        className="font-bold text-sm text-green-700"
                    >
                        {!isCopied && "Copy"}
                        {isCopied && (
                            <CopyToast message="Copied to clipboard!" onClose={closeToast} />
                        )}
                    </button>
                </div>
            </div>
            {/* <Link to={`/drop/${dropid}/${generateSlug(dropname)}`}> */}
            <div className="my-5">
                {isExpanded || expand ? (
                    <p
                        className="text-black-600 text-md whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: dropbody }}
                    />
                ) : (
                    <p
                        className="text-black-600 text-md whitespace-pre-line line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: dropbody }}
                    />
                )}
            </div>
            {/* </Link> */}

            <div className="flex items-center mb-2">
                <div className="flex space-x-2 mt-2">
                    {tags.map((tag, index) => (
                        <Link
                            to={`/tag/${tag}`}
                            key={index}
                            className="bg-green-600 text-green-50 py-1 px-2 rounded-full text-xs"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mt-2">
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