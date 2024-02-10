import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    router.push("/login");
  };

  useEffect(() => {
    if (user?.token) {
      setIsUser(true);
    }
  }, [user]);
  return (
    <>
      <div className="h-[10vh] flex items-center justify-between text-white bg-blue-600">
        <div>
          <Link href={"/"} className="ml-10 ">
            Kartoffel
          </Link>
        </div>
        {isUser && user?.token ? (
          <div>
            <Link href={"/getAllUser"} className="inline ml-10 mr-10">
              Get All User
            </Link>
            <p className="inline">{user?.name}</p>
            <button onClick={handleLogout} className="ml-10 mr-10">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"} className="ml-10 mr-10">
              Register
            </Link>
          </div>
        )}
      </div>
      {children}
    </>
  );
};

export default Layout;
