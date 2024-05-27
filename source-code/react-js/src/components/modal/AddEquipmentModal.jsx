import { CameraIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import defaultEquipmentImage from "../../assets/default-equipment.webp";
import Input from "../Input";
import TextAreaInput from "../TextAreaInput";
import PriceInput from "../PriceInput";
import ErrorMessage from "../ErrorMessage";
import SelectInput from "../SelectInput";
import { fetchFun, getToken } from "../../hooks/http.js";
import { Form } from "react-router-dom";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";

export default function AddEquipmentModal({ onClose }) {
  const dispatch = useDispatch();
  const submitButtonRef = useRef();
  const [previewImageSrc, setPreviewImageSrc] = useState(defaultEquipmentImage);
  const imageInputRef = useRef();

  const { isPending, isError, error, mutate, data } = useMutation({
    mutationKey: ["equipments"],
    mutationFn: async (equipmentData) =>
      await fetchFun({
        url: "http://localhost:8081/equipments",
        options: {
          method: "POST",
          body: JSON.stringify(equipmentData),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      }),

    // onSuccess: () => {
    //   window.location.reload();
    // },
    onError: (error) => {
      if (typeof error === "string") {
        return error;
      } else if (typeof error === "object" && error.data) {
        return Object.entries(error.data);
      } else {
        return "An error occurred";
      }
    },
  });

  function submitForm(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const equipmentData = {
      name: fd.get("equipment-name"),
      description: fd.get("equipment-description"),
      availableQuantity: fd.get("equipment-available-quantity"),
      max_quantity: fd.get("equipment-max-quantity"),
      price: fd.get("equipment-price"),
      category: fd.get("equipment-category"),
    };
    mutate(equipmentData);
  }

  const pickImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  console.log(data);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  let content;
  content = !isPending && isError && (
    <div className="">
      <h1 className="font-medium text-lg text-red-500">Errors </h1>
      {error
        ? Object.entries(error.info).map(([key, value]) => {
            return <ErrorMessage key={key} title={key} message={value} />;
          })
        : "An error occured!"}
    </div>
  );

  if (data && !isPending) {
    dispatch(setModalType("confirm-add-equipment"));
  }

  return (
    <div className="bg-white px-8 pb-4 pt-5 rounded-md ">
      <Form onSubmit={submitForm}>
        <input name="form-type" defaultValue="sign-up-form" hidden />
        <h3 className="text-black font-semibold text-xl mb-4">
          Equipment Information
        </h3>
        <div className="flex flex-row justify-between items-center">
          <div className="flex relative">
            <img
              className="rounded-xl w-32 h-32 object-cover"
              src={previewImageSrc}
              alt="Equipment Preview"
            />
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              ref={imageInputRef}
              style={{ display: "none" }}
            />
            <button type="button" onClick={pickImage}>
              <CameraIcon
                className="outline-none absolute w-10 h-10 text-black-500 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                style={{ bottom: "-16px", right: "-16px" }}
              />
            </button>
          </div>
        </div>
        <div className="mt-10">
          <Input
            name="equipment-name"
            label="Equipment Name"
            placeholder="Enter Equipment Name"
            type="text"
          />
          <TextAreaInput
            name="equipment-description"
            label="Equipment Description"
          />
          <PriceInput name="equipment-price" />
          <Input
            label="Available Quantity"
            placeholder="Enter Equipment's Available Quantity"
            type="number"
            name="equipment-available-quantity"
          />
          <Input
            label="Max Quantity"
            placeholder="Enter Equipment's Max Quantity"
            type="number"
            name="equipment-max-quantity"
          />
          <SelectInput
            label="Category"
            data={categories}
            name="equipment-category"
          />
          <button type="submit" className="hidden" ref={submitButtonRef} />
        </div>
      </Form>
      {isError && error && error.data && (
        <div className="px-4 bg-white">
          {Object.entries(error.data).map(([key, value]) => (
            <ErrorMessage key={key} title={key} message={value} />
          ))}
        </div>
      )}
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          disabled={isPending}
          type="button"
          className={`${
            isPending ? "bg-gray-200 text-gray-500" : "bg-blue-600 text-white"
          } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
            !isPending && "hover:bg-blue-500"
          } sm:ml-3 sm:w-auto`}
          onClick={() => {
            if (submitButtonRef.current) {
              submitButtonRef.current.click();
            }
          }}
        >
          {isPending ? "Loading..." : "Add Equipment"}
        </button>
        <button
          disabled={isPending}
          type="button"
          className={`outline-none mt-3 inline-flex w-full justify-center rounded-md ${
            isPending ? "bg-gray-100 text-gray-400" : "bg-white text-gray-900"
          } px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      {content}
    </div>
  );
}
export const categories = [
  { value: "kickboxing", label: "Kickboxing" },
  { value: "fitness", label: "Fitness" },
  { value: "cardio", label: "Cardio" },
  { value: "bodybuilding", label: "Bodybuilding" },
];
