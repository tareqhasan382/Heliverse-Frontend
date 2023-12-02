/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../redux/api/userApi";
import axios from "axios";
export interface Inputs {
  first_name: string;
  last_name: string;
  email: string;
  gender: "Male" | "Female" | "Others";
  domain: string;
  available: boolean;
  avatar?: string;
}
const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Others"])
    .typeError("Gender is required")
    .required("Gender is required"),
  avatar: yup.string(),
  domain: yup.string().required("Domain is required"),
  available: yup
    .boolean()
    .typeError("Available is required")
    .required("Availability is required"),
});

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [addUser, { isLoading }] = useAddUserMutation();
  const [selectImage, setSelectImage] = useState<File | null>(null);
  // const [loading, setLoading] = useState<boolean>();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectImage(e.target.files[0]);
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    // console.log("data:", data);
    // setLoading(true);

    if (selectImage) {
      const formData = new FormData();
      //selectImage || formData.append("file", data.image[0]);
      formData.append("file", selectImage);
      formData.append("upload_preset", "Reservation");
      // Make a request to Cloudinary using axios
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsybkyula/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      const UserData: Inputs = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        gender: data.gender,
        domain: data.domain,
        available: data.available,
        avatar: imageUrl,
      };

      const respo = await addUser(UserData);
      navigate("/");
      console.log(respo);
      toast.success("user create successfully");
    }
  };
  // console.log("isSuccess:", isSuccess);
  // console.log("loading:", loading);
  return (
    <div className=" flex items-center justify-center w-full py-14 bg-slate-300 ">
      <div className=" lg:w-1/2 w-full px-4 lg:px-24 flex flex-col lg:flex-row justify-between gap-5 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full flex flex-col gap-3 "
        >
          <p className=" text-2xl font-bold py-3 ">Create User</p>
          <input
            {...register("first_name")}
            type="text"
            placeholder=" Enter first name"
            className=" w-full focus:outline-none h-10 rounded px-2 "
          />
          <p className=" text-red-500 font-bold ">
            {errors.first_name?.message}
          </p>
          <input
            {...register("last_name")}
            type="text"
            placeholder="Enter last name"
            className=" w-full focus:outline-none h-10 rounded px-2 "
          />
          <p className=" text-red-500 font-bold ">
            {errors.last_name?.message}
          </p>
          <input
            {...register("email")}
            type="text"
            placeholder="Enter email"
            className=" w-full focus:outline-none h-10 rounded px-2 "
          />
          <p className=" text-red-500 font-bold ">{errors.email?.message}</p>
          <input
            {...register("domain")}
            type="text"
            placeholder="Enter your domain"
            className=" w-full focus:outline-none h-10 rounded px-2 "
          />
          <p className=" text-red-500 font-bold ">{errors.domain?.message}</p>
          <select
            {...register("gender")}
            className=" w-full focus:outline-none h-10 rounded px-2 "
          >
            <option
              value=""
              className=" w-full focus:outline-none h-10 rounded px-2 "
            >
              Gender Selection
            </option>
            <option
              value="Female"
              className=" w-1/2 focus:outline-none h-10 rounded px-2 "
            >
              Female
            </option>
            <option
              value="Male"
              className=" w-1/2 focus:outline-none h-10 rounded px-2 "
            >
              Male
            </option>
            <option
              value="Other"
              className=" w-1/2 focus:outline-none h-10 rounded px-2 "
            >
              Other
            </option>
          </select>
          <p className=" text-red-500 font-bold ">{errors.gender?.message}</p>
          <select
            {...register("available", {})}
            className=" w-full block focus:outline-none h-10 rounded px-2 "
          >
            <option value="">Selection Availability</option>
            <option value="false">Acitve</option>
            <option
              value="true"
              className=" w-1/2 block focus:outline-none h-10 rounded px-2 "
            >
              Inacitve
            </option>
          </select>
          <p className=" text-red-500 font-bold ">
            {errors.available?.message}
          </p>

          <input
            onChange={handleImageChange}
            // {...register("image", { required: true })}
            required
            type="file"
            placeholder="Upload Food Image"
            className=" focus:outline-none bg-white h-10 rounded px-2 right-0 py-1 items-center "
          />
          <p className=" text-red-500 font-bold ">{errors.avatar?.message}</p>
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading && " opacity-30 "
            }w-full h-10 rounded font-bold bg-black text-white hover:bg-slate-800 transition ease-in-out duration-1000`}
          >
            Submit
          </button>
        </form>
        <div className=" mt-16 w-[200px] h-[200px] bg-white rounded-md flex items-center justify-center border border-spacing-2 border-black ">
          {selectImage ? (
            <img src={URL.createObjectURL(selectImage)} alt="img" />
          ) : (
            <p className=" text-center ">
              image upload preview will appear here!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
