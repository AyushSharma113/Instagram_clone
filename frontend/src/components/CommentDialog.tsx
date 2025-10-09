import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreHorizontal } from "lucide-react";
import Comment from "./comment";
import { Button } from "./ui/button";

const dummyPost = {
  _id: "1",
  image:
    "https://deadline.com/wp-content/uploads/2025/09/Emmy-Watson.jpg?w=681&h=383&crop=1",
  author: {
    username: "john_doe",
    profilePicture: "https://via.placeholder.com/100",
  },
  comments: [
    { _id: "c1", text: "Nice post!", author: { username: "alice" } },
    { _id: "c2", text: "Looks great!", author: { username: "bob" } },
  ],
  };

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState()

  const changeEventHandler = (e)=>{
    const inputText = e.target.value;
    if(inputText.trim()){
      setText(inputText)
    }else{
      setText('')
    }
  }
  
  const sendMessageHandler = () => {
    console.log(text)
  }
  
  
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="min-w-3xl min-h-[500px] p-0 flex flex-col">
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src={dummyPost.image}
              alt="image"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-0 p-4">
              <div className="flex gap-3 items-center">
                <Link to={"/"}>
                  <Avatar>
                    <AvatarImage src={dummyPost.author.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link to={"/"} className="font-semibold text-xs">
                    {dummyPost.author.username}
                  </Link>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
             <hr />
             <div>
              {
                dummyPost.comments.map((comment) => <Comment key={comment._id} comment={comment}/>)
              }
             </div>
             
              </div>
             <div className="p-4">
              <div className="flex items-center gap-2">
                <input type="text" value={text} onChange={changeEventHandler} placeholder="add a comment..." className="w-full border rounded text-sm border-gray-300" />
                <Button disabled={!text} onClick={sendMessageHandler} variant="outline">Send</Button>
              </div>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
