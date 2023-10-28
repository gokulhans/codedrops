import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useMutation } from '@tanstack/react-query';
import axiosClient from '../../../axios';

const AddDrop = () => {
    const [snippetName, setSnippetName] = useState("");
    const [codeBlock, setCodeBlock] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const editorRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)
    const [showError, setShowError] = useState(null)
    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

    const Tags = [
        "JavaScript",
        "React",
        "Nodejs",
        "HTML",
        "CSS",
        "Style",
        "TailwindCSS",
        "MongoDB",
        "Flutter",
        "Php",
        "Ajax",
        "Jquery",
        "Bootstrap",
        "Sass",
        "Laravel",
        "TypeScript",
        "ExpressJs",
    ];

    const handleTagToggle = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(
                selectedTags.filter((selectedTag) => selectedTag !== tag)
            );
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleAddDrop = async () => {
        let dropbody;
        let authorid = localStorage.getItem("userid");
        let authorname = localStorage.getItem("username");
        if (editorRef.current) {
            dropbody = editorRef.current.getContent();
        }
        let data = {
            dropname: snippetName,
            dropbody: dropbody,
            tags: selectedTags,
            username: authorname,
            userid: authorid,
        }
        setIsLoading(true);
        mutateAsync(data);
    };

    const { mutateAsync } = useMutation({
        mutationFn: (data) => {
            const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
            const headers = {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            };
            return axiosClient.post('/drop/', data, { headers });
        },
        onSuccess: () => {
            // Handle success, navigate to a different page or show a success message
            navigate("/");
        },
        onError: (error) => {
            setShowError('Error occurred while adding drop. Please try again.');
            setIsLoading(false);
        },
    });


    return (
        <main className="w-full mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <center className="self-center text-2xl mb-5 font-bold block font-bold text-gray-900 dark:text-white">
                        <b>Add Drop</b>
                    </center>
                    <form className="mx-auto px-6 pt-6 pb-2 rounded-md">
                        <div className="mb-4">
                            <label
                                htmlFor="snippetName"
                                className="block text-sm mb-2 dark:text-white"
                            >
                                Drop Name
                            </label>
                            <input
                                type="text"
                                id="snippetName"
                                name="snippetName"
                                onChange={(e) => {
                                    setSnippetName(e.target.value);
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
                                initialValue="<p>This is the initial content of the editor.</p>"
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
                                        key={tag}
                                        onClick={() => handleTagToggle(tag)}
                                        className={`cursor-pointer border border-1 border-green-700 rounded-full  px-3 py-1 m-2 
                        ${selectedTags.includes(tag)
                                                ? "bg-green-700 text-white"
                                                : "text-green-600"
                                            }`}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-end justify-between">
                                <p className="text-orange-700 text-xs dark:text-orange-500">
                                    Crafted with 💚 by <b> {localStorage.getItem("username")}</b>
                                </p>
                                <button
                                    type="button"
                                    onClick={handleAddDrop}
                                    className="bg-green-700 mt-4 hover:bg-green-800 font-bold text-green-100 py-2 px-4 rounded-full"
                                >
                                    Add Drop
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AddDrop;