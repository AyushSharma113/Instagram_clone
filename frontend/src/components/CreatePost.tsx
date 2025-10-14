import { Dialog } from "@radix-ui/react-dialog";
import React, { useReducer, useRef, useState } from "react";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const CreatePost = ({ open, setOpen }) => {
const imageRef = useRef<HTMLInputElement>(null);
      const [caption, setCaption] = useState("");
      const [file, setFile] = useState("");
        const [imagePreview, setImagePreview] = useState("");
        const loading = false


    
  const user = {
    profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxaARPwKgt1F7kgIs4K9Ezyzpy5iCPNtVp2ZMPi6wqu1wuttoTEPc49jXz2Fm8AmA-gEs&usqp=CAU",
    username: "Ayush sharma"
  };

  const fileChangeHandler= async(e) => {
    const file = e.target.files[0]
    if(file){
        setFile(file)
        const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }
  
  const createPostHandler = () => {

  }
  
  
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-semibold">
          Create new post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">{user?.username}</h1>
            <span className="text-gray-600 text-xs">Bio here...</span>
          </div>
        </div>

        <Textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
          className="focus-visible:ring-transparent "
          placeholder="Write a caption..."
        />
        <div className="w-full h-64 flex items-center justify-center">
            {
          imagePreview && (
            <div className='w-full h-64 flex items-center justify-center'>
              <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
            </div>
          )
        }
        </div>
        <input ref={imageRef} type="file" onChange={fileChangeHandler} className="hidden" />
        <Button onClick={()=> imageRef.current?.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] ">
          Select the computer
        </Button>
        {
          imagePreview && (
            loading ? (
              <Button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
            )
          )
        }
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
