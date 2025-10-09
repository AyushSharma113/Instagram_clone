import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { MoreHorizontal, MessageCircle, Send, Bookmark } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
// import CommentDialog from "./CommentDialog";
import { useState } from "react";
import CommentDialog from "./CommentDialog";

const Post = () => {
  const [open, setOpen] = useState(true);
  //     const [text, setText] = useState('');

  //   const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //     const inputText = e.target.value;
  //     if (inputText.trim()) {
  //         setText(inputText);
  //     } else {
  //         setText("");
  //     }
  // };

  //     const commentHandler = ()=>{
  //       setOpen(prev => !prev)
  //     }

  const dummyPost = {
    author: {
      username: "john_doe",
      profilePicture: "https://via.placeholder.com/40",
      _id: "123",
    },
    image:
      "https://deadline.com/wp-content/uploads/2025/09/Emmy-Watson.jpg?w=681&h=383&crop=1",
    caption: "This is a dummy caption for the post.",
  };

  const dummyUser = {
    _id: "123", // same as author to show 'Author' badge
  };

  //   const dummyLikes = 123;
  //   const dummyComments = [
  //     { id: 1, text: "Nice post!" },
  //     { id: 2, text: "Awesome!" },
  //   ];

  const liked = false;

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={dummyPost.author?.profilePicture}
              alt="post_image"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3 ">
            <h1>Ayush sharma</h1>
            <Badge variant={"secondary"}>Author</Badge>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant={"ghost"}
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Delete
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit">
              Unfollow
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <img
        className="rounded-sm my-2 aspect-square object-cover w-full "
        src={dummyPost.image}
        alt="post_img"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart size={"24"} className="cursor-pointer text-red-600" />
          ) : (
            <FaRegHeart
              size={"24"}
              className="cursor-pointer hover:text-gray-600"
            />
          )}
          <MessageCircle className="cursor-pointer hover:text-gray-600" />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">123 likes</span>

      <p>
        <span className="font-medium mr-2">Ayushsharma145</span>
        this is my crush
      </p>
      <span className="cursor-pointer text-sm text-gray-400">
        View all comments
      </span>

<CommentDialog open={open}/>

      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          placeholder="add your comment"
          className=" text-sm w-full"
        />
        <span className="text-[#3BADF8] cursor-pointer">Post</span>
      </div>
    </div>
  );
};

export default Post;
