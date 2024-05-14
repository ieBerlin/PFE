import { useRef, useState } from "react";
import { Form, json, Link } from "react-router-dom";
import Input from "../../components/Input.jsx";
import DateInput from "../../components/DateInput.jsx";
import PhoneNumberInput from "../../components/PhoneNumberInput.jsx";
import GenderInput from "../../components/GenderInput.jsx";
import TextAreaInput from "../../components/TextAreaInput.jsx";
import {
  ClipboardDocumentCheckIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import defaultUserImage from "../../assets/default-user.webp";
import { useMutation } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http.js";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import SuccessMessage from "../../components/SuccessMessage.jsx";
const token = getToken();
export default function UpdateUserPassword({ userData }) {
  const [currentAvatar, setCurrentAvatar] = useState(defaultUserImage);
  const { isPending, data, isError, error, mutate } = useMutation({
    mutationKey: ["user-profile"],
    mutationFn: async (data) => {
      return await fetchFun({
        url: "http://localhost:8081/user/profile",
        options: {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        },
      });
    },
  });
  const imagePickerButtonRef = useRef();
  const submitButtonRef = useRef();
  const handleImagePicker = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  let content;
  content =
    !isPending &&
    isError &&
    (error
      ? Object.entries(error.info).map(([key, value]) => (
          <ErrorMessage key={key} title={key} message={value} />
        ))
      : "An error occured!");
  if (data  && !isPending) {
    content = (
      <SuccessMessage
        title="Request Successful"
        message="Your request has been processed successfully."
      />
    );
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get("email"),
      username: formData.get("username"),
      phoneNumber: formData.get("phone-number"),
      dateOfBirth: formData.get("birthday-date"),
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      address: formData.get("address"),
      gender: formData.get("gender"),
    };
    mutate(userData);
  };

  return (
    <div className="bg-white shadow-lg">
      {/* Profile Picture Upload Section */}
      <div className="flex flex-row gap-20 p-8 pl-12 mb-2">
        {/* Avatar Display */}
        <div className="relative w-28 h-28 inline-block box-content">
          <img
            className="object-cover w-28 h-28 rounded-full"
            src={currentAvatar}
            alt="User Avatar"
          />
          {/* Role Display */}
          <p className="text-center mt-2 font-semibold text-xl text-sky-800 bg-sky-200 rounded-md">
            {userData.role}
          </p>
          {/* Image Picker */}
          <input
            ref={imagePickerButtonRef}
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png, image/jpeg"
            onChange={handleImagePicker}
            className="hidden"
          />
          {/* Selection Indicator */}
          <span className="z-10 absolute top-0 mt-3.5 end-0 block w-[12px] h-[12px] rounded-full ring-2 ring-white bg-teal-400"></span>
        </div>
        {/* Upload Button and Guidelines */}
        <div>
          <button
            onClick={() => imagePickerButtonRef.current.click()}
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            Upload new photo
          </button>
          <div className="text-gray-600 font-medium text-sm text-start mt-2">
            <p>At least 800&#215;800 px recommended</p>
            <p>JPG or PNG is allowed</p>
          </div>
        </div>
      </div>
      {/* Personal Info Section */}
      <div className="flex w-full ">
        <div className="flex flex-col w-full border border-gray-300 mx-8 my-2 px-4 py-2 rounded-lg">
          {/* Section Header with Update Password Link */}
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-bold text-gray-900 text-lg">Personal info</h1>
            <Link
              to="update-password"
              className="text-white bg-blue-600 px-4 py-2 rounded-md font-semibold"
            >
              Update Password
            </Link>
          </div>
          {/* Form Inputs */}
          <div className="flex w-full h-full flex-col mt-2 px-5 py-2">
            <Form onSubmit={submitFormHandler}>
              <Input
                name="email"
                defaultValue={userData.email || ""}
                label="Email"
                placeholder="Enter Your Email"
                type="email"
              />
              <Input
                name="username"
                defaultValue={userData.username || ""}
                label="Username"
                placeholder="Enter Your Username"
              />
              <Input
                name="first-name"
                defaultValue={userData.first_name || ""}
                label="First Name"
                placeholder="Enter Your First Name"
              />
              <Input
                name="last-name"
                defaultValue={userData.last_name || ""}
                label="Last Name"
                placeholder="Enter Your Last Name"
              />
              <DateInput
                name="birthday-date"
                defaultValue={userData.date_of_birth || ""}
                label="Date"
                placeholder="Enter Your Birth Day"
              />
              <PhoneNumberInput
                name="phone-number"
                defaultValue={userData.phone_number || ""}
              />
              <GenderInput />
              <TextAreaInput
                name="address"
                label="Address"
                defaultValue={userData.address || ""}
              />
              {/* Hidden submit button to trigger form submission */}
              <button type="submit" className="hidden" ref={submitButtonRef} />
            </Form>
            <p className="block text-sm font-medium my-3">Certifications</p>
            <div
              className="w-full grid gap-2"
              style={{
                gridTemplateColumns: "repeat(auto-fit , minmax(250px , 1fr))",
              }}
            >
              <AddImage />
              <AddImage />
              <AddImage />
            </div>
            {/* Save Button */}
            <div className="flex  justify-end w-full">
              <button className={`font-medium rounded-lg text-orange-600`}>
                Add Certification
              </button>
            </div>
            <div className="flex justify-end mt-4 font-semibold">
              <button
                disabled={isPending}
                onClick={() => submitButtonRef.current.click()}
                className={`${
                  isPending ? "bg-gray-200" : "bg-blue-600 "
                }  flex flex-row items-center gap-2 border border-gray-300 p-2 rounded-lg text-white`}
              >
                {!isPending && <PencilIcon className="w-4 h-4" />}
                <p className={`${isPending ? "text-gray-500 " : "text-white"}`}>
                  {isPending ? "Loading..." : "Save"}
                </p>
              </button>
            </div>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function AddImage() {
  return (
    <div className="relative inline-block">
      <img
        className="rounded-md"
        src="https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/class-size.jpg?fit=2266%2C1322&ssl=1"
        alt=""
      />
      <button>
        <TrashIcon className=" bg-gray-200 p-1 rounded-full w-7 h-7 absolute right-2 top-2" />
      </button>
    </div>
  );
}
