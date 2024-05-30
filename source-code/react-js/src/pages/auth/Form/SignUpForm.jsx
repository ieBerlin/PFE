import { CameraIcon } from "@heroicons/react/24/outline";
import PasswordInput from "../../../components/modal/PasswordInput";
import Input from "../../../components/Input";
import DateInput from "../../../components/DateInput";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
import TextAreaInput from "../../../components/TextAreaInput";
import GenderInput from "../../../components/GenderInput";

import { useRef } from "react";
import { useSelector } from "react-redux";

export default function SignUpForm({
  submitButtonRef,
  currentImageSrc,
  onImageChange,
}) {
  const isAdmin = useSelector(
    (state) => state.userRole.userRole?.toLowerCase() === "admin"
  );
  const pickImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const imageRef = useRef();

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-4">
        {/* <div className="flex relative">
          <img
            className="rounded-xl  w-32 h-32 object-cover"
            src={currentImageSrc}
            alt="User"
          />
          <input
            type="file"
            name=""
            accept="image/png, image/jpeg"
            onChange={onImageChange}
            ref={imageRef}
            style={{ display: "none" }}
          />
          <button type="button" onClick={pickImage}>
            <CameraIcon
              className=" outline-none absolute w-10 h-10 text-black-500 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              style={{ bottom: "-16px", right: "-16px" }}
            />
          </button>
        </div> */}
        {isAdmin ? (
          <select
            name="user-role"
            className="font-semibold py-2 px-4 pe-9 flex h-min bg-gray-100 border-transparent rounded-lg focus:outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          >
            <option value="member">Member</option>
            <option value="coach">Coach</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          <select
            name="user-role"
            className="font-semibold py-2 px-4 pe-9 flex h-min bg-gray-100 border-transparent rounded-lg focus:outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          >
            <option value="member">Member</option>
            <option value="coach">Coach</option>
          </select>
        )}
      </div>
      <div className="mt-10">
        <Input
          label="Email"
          placeholder="Enter Your Email"
          type="email"
          name="email"
        />
        <Input
          label="Username"
          placeholder="Enter Your Username"
          name="username"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter Your Password"
          name="password"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Your Password"
          name="confirm-password"
        />
        <Input
          label="First Name"
          placeholder="Enter Your First Name"
          name="first-name"
        />
        <Input
          label="Last Name"
          placeholder="Enter Your Last Name"
          name="last-name"
        />
        <DateInput
          label="Date"
          placeholder="Enter Your Birth Day"
          name="birthday-date"
        />
        <PhoneNumberInput name="phone-number" />
        <GenderInput />
        <TextAreaInput label="Address" name="address" />
        <button type="submit" className="hidden" ref={submitButtonRef} />
      </div>
    </>
  );
}
