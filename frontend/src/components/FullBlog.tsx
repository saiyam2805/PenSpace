import { Blog } from "../hooks/index.ts"
import { Appbar } from "./Appbar.tsx"
import { Avatar } from "./BlogCard.tsx"

export const FullBlog = ({ blog }: {blog: Blog}) => {

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
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on {formatDate(blog.date)}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}