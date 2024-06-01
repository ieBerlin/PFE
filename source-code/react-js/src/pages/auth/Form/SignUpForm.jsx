import PasswordInput from "../../../components/modal/PasswordInput";
import Input from "../../../components/Input";
import DateInput from "../../../components/DateInput";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
import TextAreaInput from "../../../components/TextAreaInput";
import GenderInput from "../../../components/GenderInput";
import { useSelector } from "react-redux";
import { useState } from "react";
import SelectInput from "../../../components/SelectInput";

export default function SignUpForm({ submitButtonRef }) {
  const [currentSelectedUser, setCurrentSelectedUser] = useState("member");
  const isAdmin = useSelector(
    (state) => state.userRole.userRole?.toLowerCase() === "admin"
  );

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
            value={currentSelectedUser}
            onChange={(e) => setCurrentSelectedUser(e.target.value)}
            name="user-role"
            className="font-semibold py-2 px-4 pe-9 flex h-min bg-gray-100 border-transparent rounded-lg focus:outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          >
            <option value="member">Member</option>
            <option value="coach">Coach</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          <select
            value={currentSelectedUser}
            onChange={(e) => setCurrentSelectedUser(e.target.value)}
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
        {currentSelectedUser==='coach' && (
          <>
            <SelectInput
              name="specialization"
              label="Specialization"
              data={[
                { value: "kickboxing", label: "Kickboxing" },
                { value: "fitness", label: "Fitness" },
                { value: "yoga", label: "Yoga" },
                { value: "bodybuilding", label: "Bodybuilding" },
              ]}
              placeholder="Select specialization"
            />
            <Input
              label="Total Trained Members"
              placeholder="Enter Total members you trained."
              name="total-trained-members"
              type="number"
            />
            <TextAreaInput label="Bio" name="bio" />
          </>
        )}
        <button type="submit" className="hidden" ref={submitButtonRef} />
      </div>
    </>
  );
}
