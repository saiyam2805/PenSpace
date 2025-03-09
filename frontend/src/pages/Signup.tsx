import { Auth } from "../components/Auth.tsx"
import { Quote } from "../components/Quote.tsx"
import { LabelledInput } from "../components/Auth.tsx"
import { useState,useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config.ts"

export const Signup = ()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.post(BACKEND_URL+"/api/v1/user/me", {
                token,
            });
      
            if (response.status) {
              navigate("/blogs");
            }
          } catch (error) {
            navigate("/signup");
          }
        };
      
        fetchData(); 
      }, []);


    return (
        <div className="grid grid-cols-2">
            <div className="h-screen flex justify-center flex-col">
                <Auth/>
                <LabelledInput label="Full Name" placeholder="Enter your full name" id="name" type="name" onChange={(e:any)=>{
                    setName(e.target.value);
                }}/>

                <LabelledInput label="Email" placeholder="Enter your email" id="email" type="email" onChange={(e:any)=>{
                    setEmail(e.target.value);
                }}/>

                <LabelledInput label="Password" placeholder="Enter your password" id="password" type="password" onChange={(e:any)=>{
                    setPassword(e.target.value);
                }}/>

                <div className="flex justify-center w-full">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-96 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 " onClick={async ()=>{
                        try{
                            const response = await axios.post(BACKEND_URL+"/api/v1/user/signup", {
                                email,
                                password,
                                name
                            });
                            
                            if (response.status) {
                                localStorage.setItem('token', response.data.jwt);
                                localStorage.setItem('name', name);
                                localStorage.setItem('email', email);
                                navigate("/blogs");
                            } else {
                                
                            }
        
                        }catch (error:any) {
                            alert(`${error}`)
                        }
                    }}>Submit</button>
                </div>

            </div>

            <div className="invisible md:visible">
                <Quote/>
            </div>
            
        </div>
    )
}