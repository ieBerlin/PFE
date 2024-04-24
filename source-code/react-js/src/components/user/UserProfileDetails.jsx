import { useSubmit } from "../../hooks/http.js";
import {
  Input,
  DateInput,
  PhoneNumberInput,
  GenderInput,
  TextAreaInput,
} from "../../components/modal/AddUserModal.jsx";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import defaultUserImage from "../../assets/default-user.webp";
import { useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
export default function UserProfileDetails({ data: userData }) {
  const [currentAvatar, setCurrentAvatar] = useState(defaultUserImage);
  const imagePickerButtonRef = useRef();
  const submitButtonRef = useRef();
  const { isFetching, fetchFuncCaller } = useSubmit();

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

  const completionPercentage = Math.floor(
    (Object.entries(userData).filter(([_, value]) => value.trim() !== "")
      .length /
      Object.keys(userData).length) *
      100
  );

  const submitFormHandler = (e) => {
    e.preventDefault();
    fetchFuncCaller();
  };

  return (
    <section className="py-4 px-6 bg-gray-100 flex h-full w-full flex-col">
      <h1 className="font-bold text-2xl mb-3">Edit Profile</h1>
      <main className="grid gap-6" style={{ gridTemplateColumns: "1fr auto" }}>
        <div className="bg-white shadow-lg">
          <div className="flex flex-row gap-20 p-8 pl-12 mb-2">
            <div className="relative w-28 h-28 inline-block box-content">
              <img
                className="object-cover w-28 h-28 rounded-full"
                src={currentAvatar}
                alt="User Avatar"
              />
              <p className="text-center mt-2 font-semibold text-xl text-sky-800 bg-sky-200 rounded-md">
                {userData.role}
              </p>
              <input
                ref={imagePickerButtonRef}
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/jpeg"
                onChange={handleImagePicker}
                className="hidden"
              />
              <span className="z-10 absolute top-0 mt-3.5 end-0 block w-[12px] h-[12px] rounded-full ring-2 ring-white bg-teal-400"></span>
            </div>
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
          <div className="flex w-full ">
            <div className="flex flex-col w-full border border-gray-300 mx-8 my-2 px-4 py-2 rounded-lg">
              <div className="flex flex-row justify-between items-center">
                <h1 className="font-bold text-gray-900 text-lg">
                  Personal info
                </h1>
                <Link
                  to="update-password"
                  className="text-white bg-blue-600 px-4 py-2 rounded-md font-semibold"
                >
                  Update Password
                </Link>
              </div>

              <div className="flex w-full h-full flex-col mt-2 px-5 py-2">
                <Form onSubmit={submitFormHandler}>
                  <Input
                    defaultValue={userData.email || ""}
                    label="Email"
                    placeholder="Enter Your Email"
                    type="email"
                  />
                  <Input
                    defaultValue={userData.username || ""}
                    label="Username"
                    placeholder="Enter Your Username"
                  />

                  <Input
                    defaultValue={userData.first_name || ""}
                    label="First Name"
                    placeholder="Enter Your First Name"
                  />
                  <Input
                    defaultValue={userData.last_name || ""}
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                  />
                  <DateInput
                    defaultValue={userData.date_of_birth || ""}
                    label="Date"
                    placeholder="Enter Your Birth Day"
                  />
                  <PhoneNumberInput
                    defaultValue={userData.phone_number || ""}
                  />
                  <GenderInput />
                  <TextAreaInput defaultValue={userData.address || ""} />
                  <button
                    type="submit"
                    className="hidden"
                    ref={submitButtonRef}
                  />
                </Form>
                <div className="flex justify-end mt-4 font-semibold">
                  <button
                    disabled={isFetching}
                    onClick={() => submitButtonRef.current.click()}
                    className={`${
                      isFetching ? "bg-gray-200" : "bg-blue-600 "
                    }  flex flex-row items-center gap-2 border border-gray-300 p-2 rounded-lg text-white`}
                  >
                    {!isFetching && <PencilIcon className="w-4 h-4" />}
                    <p
                      className={`
                       ${isFetching ? "text-gray-500 " : "text-white"}`}
                    >
                      {isFetching ? "Loading..." : "Save"}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white relative p-4 shadow-lg">
          <h1 className="font-bold mb-3">Complete your profile</h1>
          <div
            style={{
              backgroundImage: `conic-gradient(#2563eb ${completionPercentage}%, white ${completionPercentage}%)`,
            }}
            className="w-36 h-36 rounded-full relative mx-auto border border-blue-800"
          >
            <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-28 h-28 rounded-full border border-blue-800">
              <h1 className="font-bold text-2xl">{completionPercentage}%</h1>
            </div>
          </div>
          <ul className="mt-8">
            {Object.entries(userData).map(([key, value]) => (
              <li
                key={key}
                className="flex flex-row gap-4 mt-1 capitalize font-semibold"
              >
                {value.trim() !== "" ? (
                  <>
                    <CheckIcon className="w-6 h-6 text-gray-900" />
                    <h3 className="text-gray-900 text-sm">
                      {key.replace("_", " ")}
                    </h3>
                  </>
                ) : (
                  <>
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                    <h3 className="text-gray-500 text-sm">
                      {key.replace("_", " ")}
                    </h3>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </section>
  );
}
