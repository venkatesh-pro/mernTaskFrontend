import axios from "axios";
import React, { useState } from "react";
import api from "../utils/http-client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: null,
    address: "",
    gender: "",
    password: "",
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
    } else if (name === "address") {
      setFormData({ ...formData, address: e.target.value });
    } else if (name === "contactNumber") {
      setFormData({ ...formData, contactNumber: e.target.value });
    } else if (name === "gender") {
      console.log("gender", e.target.value);
      console.log("gender", e.target);
      setFormData({ ...formData, gender: e.target.value });
    } else if (name === "password") {
      setFormData({ ...formData, password: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.post("/user", {
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
          placeholder="Please Enter Your Name"
        />
      </div>
      <div>
        <input
          className="border-2 p-2"
          name="email"
          type="text"
          value={formData.email}
          placeholder="Please Enter Your Email"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          className="border-2 p-2"
          type="number"
          name="contactNumber"
          onChange={handleChange}
          value={formData.contactNumber}
          placeholder="Please Enter Your Number"
        />
      </div>
      <div>
        <input
          className="border-2 p-2"
          name="address"
          type="text"
          onChange={handleChange}
          value={formData.address}
          placeholder="Please Enter Your Address"
        />
      </div>
      <div className="w-[197px] border-2 p-2">
        <select
          name="gender"
          value={formData.gender}
          className="w-full"
          onChange={handleChange}
        >
          <option value="null">Please Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <input
          className="border-2 p-2"
          type="password"
          name="password"
          placeholder="Please Enter Your Password"
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

export default register;
