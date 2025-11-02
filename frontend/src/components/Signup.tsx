import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  } satisfies Record<string, string>);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {user} = useSelector((store: RootState)=> store.auth)

//   const changeEventHandler = (e: any) => {
//   const target = e.target as HTMLInputElement
//   setInput(prev => ({ ...prev, [target.name]: target.value }))
// }
  
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(input);

    try {
      setLoading(true)

      const res = await axios.post('http://localhost:8080/api/v1/user/register', input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      } );

      if(res.data.success){
        navigate('/login')
        // console.log(res.data.)
        toast.success(res.data.message)
           setInput({
                    username: "",
                    email: "",
                    password: ""
                });
      }else{
        toast.success(res.data.message)
           setInput({
                    username: "",
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

   useEffect(()=>{
          if(user){
              navigate("/");
          }
      },[])
  
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signupHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Signup to see photos & videos from your friends
          </p>
        </div>
        <div>
          <span className="font-medium">Username</span>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Signup</Button>
        )}
        <span className="text-center">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
