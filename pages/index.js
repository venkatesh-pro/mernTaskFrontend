import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/http-client";
import { useRouter } from "next/router";
import EditUserModal from "../components/Modal/EditUserModal";

const index = () => {
  const [userData, setUserData] = useState([]);
  const [formDataForEdit, setFormDataForEdit] = useState({
    name: "",
    email: "",
    contactNumber: null,
    address: "",
    gender: "",
    password: "",
  });
  const [isUser, setIsUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const router = useRouter();

  const getUser = async () => {
    try {
      if (user?.token) {
        const { data } = await api.get(`/user/${user?._id}`);

        setUserData(data);
        setFormDataForEdit(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (user?.token) {
        const { data } = await api.delete(`/user/${user?._id}`);
        localStorage.removeItem("user");

        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.token) {
      setIsUser(true);
    }
  }, [user]);

  const handleEditChange = async (e) => {
    // console.log(e.target.value);
    // console.log(e.target.name);
    const { name, value } = e.target;
    if (name === "name") {
      setFormDataForEdit({ ...formDataForEdit, name: e.target.value });
    } else if (name === "email") {
      setFormDataForEdit({ ...formDataForEdit, email: e.target.value });
    } else if (name === "address") {
      setFormDataForEdit({ ...formDataForEdit, address: e.target.value });
    } else if (name === "contactNumber") {
      setFormDataForEdit({ ...formDataForEdit, contactNumber: e.target.value });
    } else if (name === "gender") {
      setFormDataForEdit({ ...formDataForEdit, gender: e.target.value });
    } else if (name === "password") {
      setFormDataForEdit({ ...formDataForEdit, password: e.target.value });
    }
  };

  const handleEditSubmit = async () => {
    try {
      const { data } = await api.put(`/user/${user?._id}`, {
        ...formDataForEdit,
      });
      const localStorageData = JSON.parse(localStorage.getItem("user"));

      setUserData(data);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, token: localStorageData.token })
      );
      dispatch({
        type: "LOGIN",
        payload: { ...data, token: localStorageData.token },
      });

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-[89vh] ">
      {isUser && user?.token ? (
        <>
          <div className="">
            <div className="flex justify-between">
              <p className="">User Name :</p>
              <p className="text-green-700">{userData.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="">Email : </p>
              <p className="text-green-700">{userData.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="">Address : </p>
              <p className="text-green-700">{userData.address}</p>
            </div>{" "}
            <div className="flex justify-between">
              <p className="">Contact Number : </p>
              <p className="text-green-700">{userData.contactNumber}</p>
            </div>
            <div className="flex justify-between">
              <p className="">Gender : </p>
              <p className="text-green-700">{userData.gender}</p>{" "}
            </div>
            <div className="mt-4 text-center">
              <button
                className="mr-2 bg-green-400 p-2"
                onClick={() => setIsModalOpen(true)}
              >
                {" "}
                Edit
              </button>
              <button className="ml-2 bg-red-400 p-2" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </div>

          {isModalOpen && (
            <EditUserModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              formDataForEdit={formDataForEdit}
              setFormDataForEdit={setFormDataForEdit}
              handleEditChange={handleEditChange}
              handleEditSubmit={handleEditSubmit}
            />
          )}

          {/* <pre>{JSON.stringify(userData, null, 4)}</pre> */}
        </>
      ) : (
        <p>Please Login to see User data</p>
      )}
    </div>
  );
};

export default index;
