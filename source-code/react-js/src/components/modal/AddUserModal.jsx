import { useState, useRef } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useActionData, useFetcher } from "react-router-dom";
import PasswordInput from "./PasswordInput.jsx";

import defaultUserImage from "../../assets/default-user.webp";
import { useSelector } from "react-redux";
export default function AddUserModal({ onClose, onConfirm }) {
  const isAdmin = useSelector((state) => state.userRole.userRole === "admin");
  const { state, data, Form } = useFetcher();
  const isLoading = state === "submitting";
  useActionData();
  const [currentImageSrc, setCurrentImageSrc] = useState(defaultUserImage);
  const imageRef = useRef();
  const submitButtonRef = useRef();
  const pickImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form
        method="post"
        className="px-8 pb-4 pt-5 rounded-md bg-white"
      >
        <input name="form-type" defaultValue="sign-up-form" hidden />
        <h3 className="text-black font-semibold text-xl mb-4">
          User information
        </h3>
        <div className="flex flex-row justify-between items-center">
          <div className="flex relative">
            <img
              className="rounded-xl  w-32 h-32 object-cover"
              src={currentImageSrc}
              alt="User"
            />
            <input
              type="file"
              name=""
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              ref={imageRef}
              style={{ display: "none" }}
            />
            <button onClick={pickImage}>
              <CameraIcon
                className=" outline-none absolute w-10 h-10 text-black-500 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                style={{ bottom: "-16px", right: "-16px" }}
              />
            </button>
          </div>
          {isAdmin ? (
            <select className="font-semibold py-2 px-4 pe-9 flex h-min bg-gray-100 border-transparent rounded-lg focus:outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ">
              <option value="member">Member</option>
              <option value="coach">Coach</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            <select className="font-semibold py-2 px-4 pe-9 flex h-min bg-gray-100 border-transparent rounded-lg focus:outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ">
              <option value="member">Member</option>
              <option value="coach">Coach</option>
            </select>
          )}
        </div>
        {/* Other input fields */}
        <div className="mt-10">
          <Input label="Email" placeholder="Enter Your Email" type="email" />
          <Input label="Username" placeholder="Enter Your Username" />
          <PasswordInput label="Password" placeholder="Enter Your Password" />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Your Password"
          />
          <Input label="First Name" placeholder="Enter Your First Name" />
          <Input label="Last Name" placeholder="Enter Your Last Name" />
          <DateInput label="Date" placeholder="Enter Your Birth Day" />
          <PhoneNumberInput />
          <GenderInput />
          <TextAreaInput />
          <button type="submit" className="hidden" ref={submitButtonRef} />
        </div>
      </Form>
      <ul className="bg-white px-8 flex flex-col gap-2">
        {!isLoading &&
          data &&
          data.errors &&
          data.errors.map((error, index) => (
            <li key={index}>
              <div
                className="bg-red-100 border-s-4 border-red-500 p-4 "
                role="alert"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 ">
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                  </div>
                  <div className="ms-3">
                    <h3 className="text-gray-800 font-semibold capitalize">
                      {error.title || "An error occurred"}
                    </h3>
                    <p className="text-sm text-gray-700 capitalize">
                      {error.description ||
                        "An error occurred while processing your request."}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          disabled={isLoading}
          type="button"
          className={`${isLoading ? "bg-gray-200" : "bg-blue-600 "}   ${
            isLoading ? "text-gray-500 " : "text-white"
          } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
            !isLoading && "hover:bg-blue-500"
          } sm:ml-3 sm:w-auto`}
          onClick={() => {
            if (submitButtonRef) {
              submitButtonRef.current.click();
            }
          }}
        >
          {isLoading ? "Loading..." : isAdmin ? "Add user" : "Sign Up"}
        </button>
        <button
          disabled={isLoading}
          type="button"
          className={` outline-none  mt-3 inline-flex w-full justify-center rounded-md ${
            isLoading ? "bg-gray-100" : "bg-white"
          } px-3 py-2 text-sm font-semibold ${
            isLoading ? "text-gray-400" : "text-gray-900"
          } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
export function Input({ label, placeholder, type = "text", ...props }) {
  return (
    <>
      <label className="block text-sm font-medium my-2">{label}</label>
      <input
        required
        type={type}
        className="py-3 px-4 block border-gray-200 border-2  w-96 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}
export function DateInput({ label, placeholder, ...props }) {
  return (
    <>
      <label className="block text-sm font-medium my-2">{label}</label>
      <input
        required
        type="date"
        className="py-2 px-4 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}
export function GenderInput() {
  return (
    <>
      <label className="block text-sm font-medium my-2">Gender</label>
      <div className="flex gap-x-6 border-gray-200 border-2 w-min px-4 py-2 rounded-lg">
        <div className="flex items-center">
          <input
            defaultChecked
            id="male-radio"
            type="radio"
            name="gender-group"
            className="mr-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-500">Male</label>
        </div>
        <div className="flex items-center">
          <input
            id="female-radio"
            type="radio"
            name="gender-group"
            className="mr-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-500">Female</label>
        </div>
      </div>
    </>
  );
}
export function TextAreaInput({ ...props }) {
  return (
    <>
      <label className="block text-sm font-medium my-2">Address</label>
      <textarea
        required
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm border-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        rows="3"
        placeholder="Enter your address"
        {...props}
      ></textarea>
    </>
  );
}
export function PhoneNumberInput({ ...props }) {
  return (
    <>
      <label className="block text-sm font-medium my-2">Phone Number</label>
      <div className="flex">
        <div
          className=" outline-none flex-shrink-0 z-10 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 "
          type="button"
        >
          <svg
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className=" w-6"
            preserveAspectRatio="xMidYMid meet"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                fill="#006233"
                d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h14V5H4z"
              />

              <path
                fill="#EEE"
                d="M32 5H18v26h14a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
              />

              <path
                fill="#D20F34"
                d="M20 24c-3.315 0-6-2.685-6-6c0-3.314 2.685-6 6-6c1.31 0 2.52.425 3.507 1.138A7.332 7.332 0 0 0 18 10.647A7.353 7.353 0 0 0 10.647 18A7.353 7.353 0 0 0 18 25.354c2.195 0 4.16-.967 5.507-2.492A5.963 5.963 0 0 1 20 24z"
              />

              <path
                fill="#D20F34"
                d="M25.302 18.23l-2.44.562l-.22 2.493l-1.288-2.146l-2.44.561l1.644-1.888l-1.287-2.147l2.303.98l1.644-1.889l-.22 2.494z"
              />
            </g>
          </svg>
          <p style={{ marginLeft: "1px" }}>+213</p>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-e-lg   border-gray-300 border-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            placeholder="699-213-213"
            required
            {...props}
          />
        </div>
      </div>
    </>
  );
}
