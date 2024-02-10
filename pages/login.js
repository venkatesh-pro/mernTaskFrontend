import axios from "axios";
import React, { useState } from "react";
import api from "../utils/http-client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const login = () => {
  const [formData, setFormData] = useState({
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = async (e) => {
    // console.log(e.target.value);
    // console.log(e.target.name);
    const { name, value } = e.target;
    if (name === "name") {
      setFormData({ ...formData, name: e.target.value });
    } else if (name === "email") {
      setFormData({ ...formData, email: e.target.value });
    } else if (name === "password") {
      setFormData({ ...formData, password: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.post("/login", {
        ...formData,
      });

      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex items-center flex-col h-[87vh] justify-center">
      <div>
        <input
          className="border-2 p-2"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className="border-2 p-2"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className="border-2 p-2"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default login;
