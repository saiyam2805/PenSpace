import { Link } from "react-router-dom"


export const Auth = ()=>{
    return(
        <div className="flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>

                    <div className="text-slate-600">
                        Aready have an account?
                        <Link className="pl-2 underline" to={"/signin"}> Login </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export const Auth2 = ()=>{
    return(
        <div className="flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold">
                       Enter your details
                    </div>

                    <div className="text-slate-600">
                        Not have an account?
                        <Link className="pl-2 underline" to={"/signup"}> Signup </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}



interface LabelledInputType{
    label:string,
    placeholder:string,
    onChange:any,
    id:string,
    type:string
}


export function LabelledInput({label, placeholder, onChange,id, type}:LabelledInputType){


    return(
        <div >
            <label  className="block mb-2 text-sm font-extrabold text-gray-900 dark:text-black ml-48">
                {label}
            </label>
            <div className="flex justify-center" >
            <input type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder={placeholder} onChange={onChange} />
            </div>
        </div>
    )
}