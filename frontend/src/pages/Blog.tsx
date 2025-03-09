import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog.tsx";
import { Spinner } from "../components/Spinner.tsx";
import { useBlog } from "../hooks/index.ts";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, post} = useBlog({
        id: id || ""
    });

    if (loading || !post) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={post} />
    </div>
}