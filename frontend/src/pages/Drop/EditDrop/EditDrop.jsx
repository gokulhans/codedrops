import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../../../axios';
import ShimmerDropBlock from "./../../../components/Shimmer/ShimmerDropBlock";
import convertToSlug from "../../../utils/slugify";

const EditDrop = () => {
    const [dropName, setdropName] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const editorRef = useRef(null);
    const [dropBody, setdropBody] = useState("")
    const [showError, setShowError] = useState(null)
    const navigate = useNavigate();
    const [Tags, setTags] = useState([])

    const fetchTags = async () => {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
        const headers = {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        };
        const response = await axiosClient.get('/tag', { headers });
        setTags(response.data.data);
        return response.data.data; // Assuming your API response contains an array of drops
    };

    const { data: tags } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
    });

    const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

    const { id } = useParams();

    const fetchDrop = async () => {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
        const headers = {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        };
        const response = await axiosClient.get(`/drop/${id}`, { headers });
        let data = response.data.data
        setSelectedTags(data.tags)
        setdropBody(data.dropbody)
        setdropName(data.dropname)
        return data; // Assuming your API response contains an array of drops
    };

    const { data: drop, isLoading, isError, error } = useQuery({
        queryKey: ['editdrop'],
        queryFn: fetchDrop,
    });

    const handleTagToggle = (tag) => {
        if (
            selectedTags.some(singletag => singletag._id === tag._id)
        ) {
            setSelectedTags(
                selectedTags.filter(selectedTag => selectedTag._id !== tag._id)
            );
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleEditDrop = async () => {
        let dropbody;
        let userid = localStorage.getItem("userid");
        let username = localStorage.getItem("username");
        if (editorRef.current) {
            dropbody = editorRef.current.getContent();
        }
        let data = {
            dropname: dropName,
            dropbody: dropbody,
            tags: selectedTags,
            username: username,
            userid: userid,
        }
        const slug = convertToSlug(data.dropname);
        data = {
            ...data,
            slug: slug
        };
        mutateAsync(data);
    };

    const { mutateAsync } = useMutation({
        mutationFn: (data) => {
            const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
            const headers = {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            };
            return axiosClient.put(`/drop/${id}`, data, { headers });
        },
        onSuccess: () => {
            navigate("/");
        },
        onError: (error) => {
            setShowError('Error occurred while adding drop. Please try again.');
        },
    });

    if (isLoading) {
        return <>
            <div className="w-full max-w-3xl sm:pt-8 p-4 pt-6 sm:px-0">
                <ShimmerDropBlock />
                <ShimmerDropBlock />
                <ShimmerDropBlock />
                <ShimmerDropBlock />
            </div>
        </>
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <main className="w-full mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <center className="self-center text-2xl mb-5 font-bold block font-bold text-gray-900 dark:text-white">
                        <b>Edit Drop</b>
                    </center>
                    <form className="mx-auto px-6 pt-6 pb-2 rounded-md">
                        <div className="mb-4">
                            <label
                                htmlFor="dropName"
                                className="block text-sm mb-2 dark:text-white"
                            >
                                Drop Name
                            </label>
                            <input
                                type="text"
                                id="dropName"
                                name="dropName"
                                value={dropName}
                                onChange={(e) => {
                                    setdropName(e.target.value);
                                }}
                                className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                            />
                        </div>

                        <div className="mb-8">
                            <label
                                htmlFor="description"
                                className="block text-sm mb-2 dark:text-white mb-4"
                            >
                                Drop Body
                            </label>

                            <Editor
                                apiKey={apiKey}
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={dropBody}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "code",
                                        "help",
                                        "wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | blocks | " +
                                        "bold italic forecolor | alignleft aligncenter " +
                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                        "removeformat | help",
                                    content_style:
                                        "body { font-family:'Poppins', sans-serif; font-size:14px }",
                                    skin: (document.body.classList.contains('dark') ? "oxide-dark" : "oxide"),
                                    content_css: (document.body.classList.contains('dark') ? "dark" : "default")
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm mb-2 dark:text-white"
                            >
                                Drop Tags
                            </label>

                            <div className="flex flex-wrap">
                                {Tags.map((tag) => (
                                    <div
                                        key={tag._id}
                                        onClick={() => handleTagToggle(tag)}
                                        className={`cursor-pointer border border-1 border-green-700 rounded-full  px-3 py-1 m-2 
                        ${selectedTags.some(singletag => singletag._id === tag._id)
                                                ? "bg-green-700 text-white"
                                                : "text-green-600"
                                            }`}
                                    >
                                        {tag.tagName}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-end justify-between">
                                <p className="text-orange-700 text-xs dark:text-orange-500">
                                    Crafted with 💚 by <b> {localStorage.getItem("username")}</b>
                                </p>
                                <button
                                    type="button"
                                    onClick={handleEditDrop}
                                    className="bg-green-700 mt-4 hover:bg-green-800 font-bold text-green-100 py-2 px-4 rounded-full"
                                >
                                    Edit Drop
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default EditDrop;