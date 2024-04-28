import { CameraIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import defaultEquipmentImage from "../../assets/default-equipment.webp";
import Input from "../Input";
import TextAreaInput from "../TextAreaInput";

export default function AddEquipmentModal({ onClose }) {
  const submitButtonRef = useRef();
  const [currentImageSrc, setCurrentImageSrc] = useState(defaultEquipmentImage);
  const imageRef = useRef();
  const { state, Form, data } = useFetcher({
    key: "equipments-page-id",
  });
  console.log(data);
  const isLoading = state === "submitting";
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
          Equipment informations
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
        </div>
        <div className="mt-10">
          <Input
            label="Equipement Name"
            placeholder="Enter Equipment Name"
            type="text"
          />
          <TextAreaInput label="Equipment Description" />

          <button type="submit" className="hidden" ref={submitButtonRef} />
        </div>
      </Form>
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
          {isLoading ? "Loading..." : "Add Equipment"}
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
    </div>
  );
}
