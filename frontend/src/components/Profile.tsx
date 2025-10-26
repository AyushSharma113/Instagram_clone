import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts')
  
  
  const userProfile = {
    username: "Ayush kumar sharma",
    profilePicture: "https://i.pravatar.cc/150?img=5",
    posts: [
      {
        _id: 1,
        image: "https://picsum.photos/400?random=1",
        likes: [1, 2, 3],
        comments: [1, 2],
      },
      {
        _id: 2,
        image: "https://picsum.photos/400?random=2",
        likes: [1],
        comments: [1, 2, 3],
      },
      {
        _id: 3,
        image: "https://picsum.photos/400?random=3",
        likes: [],
        comments: [],
      },
      {
        _id: 4,
        image: "https://picsum.photos/400?random=4",
        likes: [1, 2, 3, 4],
        comments: [1],
      },
      {
        _id: 5,
        image: "https://picsum.photos/400?random=5",
        likes: [1],
        comments: [],
      },
    ],
    followers: [1, 2, 3, 4, 5, 6],
    following: [1, 2, 3],
    bio: "Fullstack Developer | Building cool stuff 🚀",
  };

  const displayedPosts = userProfile.posts;
  

  const isLoggedInUserProfile: boolean = false;
  const isFollowing: boolean = false;

  const handleTabChange = (tab)=> setActiveTab(tab)
  
  

  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          {/* Profile card  */}
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilephoto"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>

          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>{userProfile.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      View archieves
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      add tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button className="h-8" variant={"secondary"}>
                      Unfollow
                    </Button>
                    <Button className="h-8" variant={"secondary"}>
                      Message
                    </Button>
                  </>
                ) : (
                  <Button
                    variant={"secondary"}
                    className="bg-[#0095F6] hover:bg-[#3192d2] h-8"
                  >
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts.length}{" "}
                  </span>
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers.length}{" "}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following.length}{" "}
                  </span>
                  following
                </p>
              </div>
               <div className='flex flex-col gap-1'>
                <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
                <Badge className='w-fit' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
                <span>🤯Learn code with Ayush</span>
                <span>🤯Turing code into fun</span>
                <span>🤯DM for collaboration</span>
              </div>
            </div>
          </section>
        </div>


        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
                POSTS
            </span>
            <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
                SAVED
            </span>
            <span className="py-3 cursor-pointer">
                REELS
            </span>
            <span className="py-3 cursor-pointer">
                TAGS
            </span>
          </div>

{/* posts grid  */}
<div className="grid grid-cols-3 gap-1">
  {displayedPosts.map((post) => (
    <div key={post._id} className="relative group cursor-pointer">
      <img src={post.image} alt="post image" className="rounded-sm my-2 w-full aspect-square object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/35 bg-opacity-5
      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center gap-2 hover:text-gray-300">
            <Heart size={18} />
            <span>{post.likes.length}</span>
          </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
            <MessageCircle size={18} />
            <span>{post.comments.length}</span>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

          <div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
