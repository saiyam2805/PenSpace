import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";
import { ChangeEvent } from "react";
import { Spinner } from "../components/Spinner.tsx";

export const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(BACKEND_URL + "/api/v1/blog/" + id, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });
                // Access data from the response object
                setTitle(response.data.title);
                setDescription(response.data.content);
                setLoading(false);

            } catch (error) {
                navigate("/blogs");
            }
        };

        fetchData();
    }, []);

    if (loading ) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        value={title} // Set value attribute to populate input with fetched title
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                    />

                    <TextEditor
                        value={description} // Set value attribute to populate textarea with fetched content
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        onClick={async () => {
                            const token = localStorage.getItem('token')
                            await axios.put(`${BACKEND_URL}/api/v1/blog/${id}`, {
                                title,
                                content: description,
                                id

                            }, {
                                headers: {
                                    "Authorization": "Bearer " + token
                                }
                            });
                            navigate(`/blogs`)
                        }}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Update post
                    </button>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ value, onChange }: { value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4 ">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            value={value} // Set value attribute to populate textarea with fetched content
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
