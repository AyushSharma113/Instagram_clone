import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "./ui/input";
import { useState } from "react";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
      } satisfies Record<string, string>);

    const loading = false;
 

      const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
      };
    
      const loginHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(input);
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