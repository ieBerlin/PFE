import { useState, useRef } from "react";
import { Form } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/outline";
export default function AddUserModal({ onClose, onConfirm }) {
  const [currentImageSrc, setCurrentImageSrc] = useState(
    "https://www.femalefirst.co.uk/image-library/square/500/t/thehurtlocker.jpg"
  );
  const imageRef = useRef();

  const pickImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const toggleSubmit = () => {
    onClose();
    onConfirm();
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
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
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
                className="absolute w-10 h-10 text-black-500 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                style={{ bottom: "-16px", right: "-16px" }}
              />
            </button>
          </div>
          <select className="font-semibold py-2 px-4 pe-9 flex h-min bg-gray-100 border-transparent rounded-lg focus:outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ">
            <option>Member</option>
            <option>Coach</option>
            <option>Admin</option>
          </select>
        </div>
        {/* Other input fields */}
        <div className="mt-10">
          <Input label="Email" placeholder="Enter Your Email" type="email" />
          <Input label="Username" placeholder="Enter Your Username" />
          <Input label="First Name" placeholder="Enter Your First Name" />
          <Input label="Last Name" placeholder="Enter Your Last Name" />
          <DateInput label="Date" placeholder="Enter Your Birth Day" />
          <Input label="Phone Number" placeholder="Enter Your Phone Number" />
          <PhoneNumberInput />
          <GenderInput />
          <TextAreaInput />
          <button type="submit" className="hidden" />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          onClick={toggleSubmit}
        >
          Add User
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <>
      <label className="block text-sm font-medium my-2">{label}</label>
      <input
        type={type}
        className="py-3 px-4 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
      />
    </>
  );
}

function DateInput({ label, placeholder }) {
  return (
    <>
      <label className="block text-sm font-medium my-2">{label}</label>
      <input
        type="date"
        className="py-2 px-4 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
      />
    </>
  );
}

function GenderInput() {
  return (
    <>
      <label className="block text-sm font-medium my-2">Gender</label>
      <div className="flex gap-x-6 border-gray-200 border-2 w-min px-4 py-2 rounded-lg">
        <div className="flex items-center">
          <input
            id="male-radio"
            type="radio"
            name="gender-group"
            className="mr-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="male-radio" className="text-sm text-gray-500">
            Male
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="female-radio"
            type="radio"
            name="gender-group"
            className="mr-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="female-radio" className="text-sm text-gray-500">
            Female
          </label>
        </div>
      </div>
    </>
  );
}

function TextAreaInput() {
  return (
    <>
      <label className="block text-sm font-medium my-2">Address</label>
      <textarea
        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm border-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        rows="3"
        placeholder="Enter your address"
      ></textarea>
    </>
  );
}
function PhoneNumberInput() {
  return (
    <>
      <label className="block text-sm font-medium my-2">Address</label>
      <div className="flex">
        <div
          className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 "
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
          <p className="ml-1">+213</p>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg   border-gray-300 border-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="699-213-213"
            required
          />
        </div>
      </div>
    </>
  );
}
