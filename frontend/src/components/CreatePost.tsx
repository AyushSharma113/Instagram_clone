import { Dialog } from "@radix-ui/react-dialog";
import React, { useRef, useState } from "react";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";
import type { RootState } from "@/redux/store";

const CreatePost: React.FC<{ open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ open, setOpen }) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {posts} = useSelector((store: RootState) => store.post) || [];
  const {user} = useSelector((store: RootState)=> store.auth)


  
  const fileChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImagePreview(result); // Type-safe
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const createPostHandler = async (): Promise<void> => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? String(error.response.data.message)
          : error instanceof Error
          ? error.message
          : String(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
    
    
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
