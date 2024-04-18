import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import UserApiCall from "../services/UserApiCall";

export const useGetProfileImage = () => {
  const { user } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    if (Object.keys(user).length <= 0) return;
    const userService = new UserApiCall();
    userService.getProfileImage(user.id || user._id).then((img) => {
      setProfileImage(img);
    });
  }, [user]);
  return profileImage;
};
