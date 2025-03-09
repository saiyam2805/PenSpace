import { Appbar } from "../components/Appbar.tsx"
import { BlogCard } from "../components/BlogCard.tsx"
import { BlogSkeleton } from "../components/BlogSkeleton.tsx";
import { useBlogs } from "../hooks/index.ts";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    function formatDate(dateString: string): string {
        // Parse the ISO 8601 date string
        const date: Date = new Date(dateString);
        
        // Array of month names
        const months: string[] = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        // Extract day, month, and year
        const day: number = date.getDate();
        const monthIndex: number = date.getMonth();
        const year: number = date.getFullYear();
      
        // Format the date
        const formattedDate: string = `${day} ${months[monthIndex]} ${year}`;
      
        return formattedDate;
      }

      if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={formatDate(blog.date)}
            
                />)}
            </div>
        </div>
    </div>
    
      
}

    

