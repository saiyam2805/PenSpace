import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config.ts";


export interface Blog {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    }
    "date":string;
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Blog>();
    const token = localStorage.getItem("token")
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                "Authorization": "Bearer "+token 
            }
        })
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        post
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/get/bulk`, {
                    headers: {
                        "Authorization": "Bearer " + token 
                    }
                });
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [token]);

    return {
        loading,
        blogs
    };
};

export const useMyblogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/get/myblogs`, {
                    headers: {
                        "Authorization": "Bearer " + token 
                    }
                });
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [token]);

    return {
        loading,
        blogs
    };
};