import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"))?.userInfo;
    return !!user;
  });
  
  const user = JSON.parse(localStorage.getItem("user"))?.userInfo;

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    photo: user?.photo,
    address: user?.address,
    isAdmin: user?.isAdmin,
    id: user?._id,
    user: user,
    isLogin: isLogin,
    setIsLogin
  };
};

export default useAuth;
