import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { MoreHorizontal, MessageCircle, Send, Bookmark } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
// import CommentDialog from "./CommentDialog";
import { useState } from "react";
import CommentDialog from "./CommentDialog";

const Post = ({post}) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(post.comments)
  



  const liked = false;

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={post.author?.profilePicture}
              alt="post_image"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3 ">
            <h1>{post.author?.username}</h1>
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
        src={post.image}
        alt="post_img"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart size={"24"} className="cursor-pointer  text-red-600" />
          ) : (
            <FaRegHeart
              size={"24"}
              className="cursor-pointer hover:text-gray-600"
            />
          )}
          <MessageCircle onClick={() => setOpen(true)} className="cursor-pointer hover:text-gray-600" />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">{`${post.likes?.length} likes`}</span>

      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post.caption}
      </p>

      {
        comment.length > 0 && (

      <span onClick={() => {setOpen(true)}} className="cursor-pointer text-sm text-gray-400">
       view all {comment.length} comments
      </span>
        )
      }
      

<CommentDialog open={open} setOpen={setOpen}/>

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
