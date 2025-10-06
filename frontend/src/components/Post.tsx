import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { MoreHorizontal, MessageCircle, Send, Bookmark } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useState } from "react";

const Post = () => {
    const [open, setOpen] = useState(false);

    const commentHandler = ()=>{
      setOpen(prev => !prev)
    }
    
  const dummyPost = {
    author: {
      username: "john_doe",
      profilePicture: "https://via.placeholder.com/40",
      _id: "123",
    },
    image: "https://deadline.com/wp-content/uploads/2025/09/Emmy-Watson.jpg?w=681&h=383&crop=1",
    caption: "This is a dummy caption for the post.",
  };

  const dummyUser = {
    _id: "123", // same as author to show 'Author' badge
  };

  const dummyLikes = 123;
  const dummyComments = [
    { id: 1, text: "Nice post!" },
    { id: 2, text: "Awesome!" },
  ];

  const dummyText = "";

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={dummyPost.author.profilePicture} alt="post_image" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h1>{dummyPost.author.username}</h1>
            {dummyUser._id === dummyPost.author._id && (
              <Badge variant="secondary">Author</Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4956] font-bold">
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit">
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={dummyPost.image}
        alt="post_img"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <FaRegHeart size={"22px"} className="cursor-pointer hover:text-gray-600" />
          <MessageCircle className="cursor-pointer hover:text-gray-600" />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>

      <span className="font-medium block mb-2">{dummyLikes} likes</span>
      <p>
        <span className="font-medium mr-2">{dummyPost.author.username}</span>
        {dummyPost.caption}
      </p>

      {dummyComments.length > 0 && (
        <span className="cursor-pointer text-sm text-gray-400">
          View all {dummyComments.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />
            <div className='flex items-center justify-between'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    // value={text}
                    // onChange={changeEventHandler}
                    className='outline-none text-sm w-full'
                />
                {
                     <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer'>Post</span>
                }

            </div>
    </div>
  );
};

export default Post;
