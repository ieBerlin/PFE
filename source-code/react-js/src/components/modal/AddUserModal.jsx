import { useState, useRef } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useFetcher } from "react-router-dom";
import PasswordInput from "./PasswordInput.jsx";
import Input from "../../components/Input.jsx";
import TextAreaInput from "../../components/TextAreaInput.jsx";
import defaultUserImage from "../../assets/default-user.webp";
import { useDispatch, useSelector } from "react-redux";
import PhoneNumberInput from "../PhoneNumberInput.jsx";
import GenderInput from "../GenderInput.jsx";
import DateInput from "../DateInput.jsx";
import { setModalType } from "../../features/modal/modalSlice.js";
export default function AddUserModal() {
  const errorsRef = useRef();
  const scrollToRef = () => {
    if (errorsRef.current) {
      errorsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.userRole.userRole === "admin");
  const { state, data, Form } = useFetcher();
  if (data && data.success) {
    window.location.reload();
  }
  const isLoading = state === "submitting";
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
    <div>
      <Form method="post" className="px-8 pb-4 pt-5 rounded-md bg-white">
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
            <button type="button" onClick={pickImage}>
              <CameraIcon
                className=" outline-none absolute w-10 h-10 text-black-500 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                style={{ bottom: "-16px", right: "-16px" }}
              />
            </button>
          </div>
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
        {/* Other input fields */}
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
      </Form>
      {!isLoading && data && data.errors && (
        <ul className="bg-white px-8 flex flex-col gap-2" ref={errorsRef}>
          {typeof data.errors === "object" ? (
            Object.entries(data.errors).map(([key, value]) => (
              <li key={key}>
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
                        {key || "An error occurred"}
                      </h3>
                      <p className="text-sm text-gray-700 capitalize">
                        {value ||
                          "An error occurred while processing your request."}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>
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
                      Error
                    </h3>
                    <p className="text-sm text-gray-700 capitalize">
                      {data.errors ||
                        "An error occurred while processing your request."}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
      )}
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
              scrollToRef();
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
          onClick={() => dispatch(setModalType())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
