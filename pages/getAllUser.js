import React, { useEffect, useState } from "react";
import api from "../utils/http-client";
import { useSelector } from "react-redux";

const getAllUser = () => {
  const [allUserData, setAllUserData] = useState([]);

 const { user } = useSelector((state) => ({ ...state }));

  const getAllUserFunction = async () => {
    try {
      const { data } = await api.get("/users");

      setAllUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUserFunction();
  }, []);
  return (
    <div>
      <pre>{JSON.stringify(allUserData, null, 4)}</pre>
    </div>
  );
};

export default getAllUser;
