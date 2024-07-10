import { useNavigate } from "react-router-dom"

const SignupForm = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="w-96 p-2">
                <div className="font-extrabold text-4xl text-center">
                    Create an account
                </div>
                <div className="font-medium text-lg text-center text-slate-500 pt-2">
                    Already have an account?
                    <span className="underline ml-2 cursor-pointer"
                        onClick={()=>{navigate('/signin')}}>
                        Login
                    </span>
                </div>
                <div className="mt-5">
                    <div className="text-lg font-medium my-2">Username</div>
                    <input className="pl-3 p-2 rounded-md w-full border border-slate-300" type="text" name="username" placeholder="Enter your username" />
                    <div className="text-lg font-medium my-2">Email</div>
                    <input className="pl-3 p-2 rounded-md w-full border border-slate-300" type="text" name="email" placeholder="abc@example.com" />
                    <div className="text-lg font-medium my-2">Password</div>
                    <input className="pl-3 p-2 rounded-md w-full border border-slate-300" type="password" name="password" placeholder="********" />
                    <div>
                        <button className="text-center bg-black w-full text-white p-2 mt-4 border rounded-lg font-medium">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignupForm