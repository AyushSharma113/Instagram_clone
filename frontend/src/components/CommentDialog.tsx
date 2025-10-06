import React, { useState } from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const dummyPost = {
  _id: "1",
  image: "https://via.placeholder.com/400x400",
  author: {
    username: "john_doe",
    profilePicture: "https://via.placeholder.com/100"
  },
  comments: [
    { _id: "c1", text: "Nice post!", author: { username: "alice" } },
    { _id: "c2", text: "Looks great!", author: { username: "bob" } },
  ]
};

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(dummyPost.comments);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (text.trim()) {
      const newComment = {
        _id: Date.now().toString(),
        text,
        author: { username: "demo_user" }
      };
      setComments([...comments, newComment]);
      setText("");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">
        <div className='flex flex-1'>
          {/* Left: Image */}
          <div className='w-1/2'>
            <img
              src={dummyPost.image}
              alt="post_img"
              className='w-full h-full object-cover rounded-l-lg'
            />
          </div>

          {/* Right: Comments + Input */}
          <div className='w-1/2 flex flex-col justify-between'>
            {/* Top: Author Info */}
            <div className='flex items-center justify-between p-4'>
              <div className='flex gap-3 items-center'>
                <Link>
                  <Avatar>
                    <AvatarImage src={dummyPost.author.profilePicture} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className='font-semibold text-xs'>{dummyPost.author.username}</Link>
                </div>
              </div>

              {/* Menu */}
              <MoreHorizontal className='cursor-pointer' />
            </div>

            <hr />

            {/* Comments */}
            <div className='flex-1 overflow-y-auto max-h-96 p-4'>
              {
                comments.map((comment) => (
                  <div key={comment._id} className="text-sm mb-2">
                    <span className="font-semibold">{comment.author.username}</span>: {comment.text}
                  </div>
                ))
              }
            </div>

            {/* Input */}
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <input
                  type="text"
                  value={text}
                  onChange={handleInputChange}
                  placeholder='Add a comment...'
                  className='w-full outline-none border text-sm border-gray-300 p-2 rounded'
                />
                <Button disabled={!text.trim()} onClick={handleSend} variant="outline">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
