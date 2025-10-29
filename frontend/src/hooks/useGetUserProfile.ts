import { setUserProfile } from "@/redux/authslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetUserProfile = (userId: string) => {
    const dispatch = useDispatch();
    // const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        console.log('getting user profiles data')
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/user/${userId}/profile`, { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfile();
    }, [userId, dispatch]);
};
export default useGetUserProfile;