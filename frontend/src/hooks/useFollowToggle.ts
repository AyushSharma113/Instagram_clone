
import { setAuthUser, setUserProfile } from "@/redux/authslice";
import type { RootState } from "@/redux/store";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner";

// const useFollowToggle = () => {
//   const dispatch = useDispatch();
//   const { user, userProfile } = useSelector((s: RootState) => s.auth);

//   const toggleFollow = useCallback(
//     async (targetUserId: string) => {
//       if (!user || !targetUserId) return;

//       if (user._id === targetUserId) {
//         toast.error("Cannot follow yourself");
//         return;
//       }

//       const wasFollowing = user.following.includes(targetUserId);

//       // snapshot for rollback
//       const prevAuthUser = { ...user, following: [...user.following] };
//       const prevProfile = userProfile ? { ...userProfile, followers: [...userProfile.followers] } : null;

//       // compute optimistic updates
//       const newAuthFollowing = wasFollowing
//         ? user.following.filter((id) => id !== targetUserId)
//         : [...user.following, targetUserId];

//       const newProfileFollowers = userProfile && userProfile._id === targetUserId
//         ? (wasFollowing
//             ? userProfile.followers.filter((id) => id !== user._id)
//             : [...userProfile.followers, user._id])
//         : userProfile?.followers ?? [];

//       // apply optimistic update to store
//       dispatch(setAuthUser({ ...user, following: newAuthFollowing } as any));
//       if (userProfile && userProfile._id === targetUserId) {
//         dispatch(setUserProfile({ ...userProfile, followers: newProfileFollowers } as any));
//       }

//       try {
//         const res = await axios.post(
//           `http://localhost:8080/api/v1/user/followorunfollow/${targetUserId}`,
//           {},
//           { withCredentials: true }
//         );

//         if (!res.data?.success) {
//           throw new Error(res.data?.message || "Failed to follow/unfollow");
//         }

//         toast.success(res.data.message || (wasFollowing ? "Unfollowed" : "Followed"));
//       } catch (err) {
//         // rollback on error
//         dispatch(setAuthUser(prevAuthUser as any));
//         if (prevProfile) dispatch(setUserProfile(prevProfile as any));
//         const msg = axios.isAxiosError(err) ? err.response?.data?.message || err.message : (err as Error).message;
//         toast.error(msg || "Action failed");
//       }
//     },
//     [dispatch, user, userProfile]
//   );

//   return { toggleFollow };
// };

// export default useFollowToggle;



const useFollowToggle = () => {
    const dispatch = useDispatch();
  const { user, userProfile } = useSelector((s: RootState) => s.auth);

  const toggleFollow = useCallback(
    async (targetUserId: string) => {
        if(!user || !targetUserId) return console.log('user id or target is missing')


        if(user._id === targetUserId){
            toast.error('cannot follow yourself')
            return;
        }
            
        const wasFollowing = user.following.includes(targetUserId);

        // snapshot for rollback 
        const prevAuthUser = {...user, following: [...user.following]};
        const prevProfile = userProfile ? {...userProfile, followers: [...userProfile.followers]} : null;
        

        // compute optimistic updates 
        const newAuthFollowing = wasFollowing ? user.following.filter(
            (id) => id !== targetUserId
        ) : [...user.following, targetUserId];

     const newProfileFollowers = userProfile && userProfile._id === targetUserId
        ? (wasFollowing
            ? userProfile.followers.filter((id) => id !== user._id)
            : [...userProfile.followers, user._id])
        : userProfile?.followers ?? [];
        

        // apply  optimistic update to store 
        dispatch(setAuthUser({...user, following: newAuthFollowing}));
        if(userProfile && userProfile._id === targetUserId){
            dispatch(setUserProfile({...userProfile, followers: newProfileFollowers}))
        }
        

        try {
        const res = await axios.post(
          `http://localhost:8080/api/v1/user/followorunfollow/${targetUserId}`,
          {},
          { withCredentials: true }
        );

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Failed to follow/unfollow");
        }

        toast.success(res.data.message || (wasFollowing ? "Unfollowed" : "Followed"));
      } catch (err) {
        // rollback on error
        dispatch(setAuthUser(prevAuthUser));
        if (prevProfile) dispatch(setUserProfile(prevProfile));
        const msg = axios.isAxiosError(err) ? err.response?.data?.message || err.message : (err as Error).message;
        toast.error(msg || "Action failed");
      }
        
    },
    [dispatch, user, userProfile]
  )
  return {toggleFollow}
}


export default useFollowToggle;