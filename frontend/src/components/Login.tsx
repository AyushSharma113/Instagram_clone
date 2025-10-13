import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "./ui/input";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authslice";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
      } satisfies Record<string, string>);

      const navigate = useNavigate()
      const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
 

      const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
      };
    
     const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(input);

    try {
      setLoading(true)

      const res = await axios.post('http://localhost:8080/api/v1/user/login', input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      } );

      if(res.data.success){
        
        dispatch(setAuthUser(res.data.user))
         navigate("/");
        toast.success(res.data.message)
           setInput({
                    email: "",
                    password: ""
                });
      }else{
        toast.success(res.data.message)
           setInput({
                    email: "",
                    password: ""
                });
      }
      setLoading(false)
      
    } catch (error) {
      console.log(error as Error)
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    
  };

    
    return (
        <div onSubmit={loginHandler} className='flex items-center w-screen h-screen justify-center'>
            <form  className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-sm text-center'>Login to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit'>Login</Button>
                    )
                }

                <span className='text-center'>Dosent have an account?
                     <Link to="/signup" className='text-blue-600'>Signup</Link></span>
            </form>
        </div>
    )
}

export default Login