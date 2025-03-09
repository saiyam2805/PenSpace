import { ChangeEvent, useEffect, useState } from "react"
import { Appbar } from "../components/Appbar.tsx"

import axios from "axios"
import { BACKEND_URL } from "../config.ts"
import { useNavigate } from "react-router-dom"

export const  Profile = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [about, setAbout] = useState("")
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
                headers: {
                    "Authorization":"Bearer " + token
                }
            })

            setName(response.data.name)
            setEmail(response.data.email)
            setFollowing(response.data.followingCount)
            setFollowers(response.data.followersCount)
            setAbout(response.data.about)

        }

        fetchData()
    },[])

    return (
        <div >
            <Appbar/>
          <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="w-screen h-screen p-6 rounded-lg shadow-md bg-white">
              <div className="flex items-center">
                <div className="ml-4">
                  <h1 className="text-2xl font-semibold">{name}</h1>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between ml-4">
                  <div className="flex">
                    <div className="mr-2">
                      <span className="font-semibold">{followers}</span>{' '}
                      <button
                        className="text-blue-500"
                        onClick={() => {
                          navigate(`/profile/followers`);
                        }}
                      >
                        Followers
                      </button>
                    </div>
              <div>
                <span className="font-semibold">{following}</span>{' '}
                <button
                  className="text-blue-500"
                  onClick={() => {
                    navigate(`/profile/following`);
                  }}
                >
                  Following
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">About</h2>
          <TextEditor value={about} onChange={(e) => setAbout(e.target.value)} />
        </div>
        <button
          onClick={async () => {
            const token = localStorage.getItem('token');
            await axios.put(
              `${BACKEND_URL}/api/v1/user/profile`,
              {
                about,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              }
            );
            navigate(`/blogs`);
          }}
          type="submit"
          className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Update About
        </button>
      </div>
    </div>
    
        </div>  );
    
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
                            placeholder="Write a about section..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
  
    )
  }