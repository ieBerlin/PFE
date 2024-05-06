import { CameraIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import defaultEquipmentImage from "../../assets/default-equipment.webp";
import Input from "../Input";
import TextAreaInput from "../TextAreaInput";
import PriceInput from "../PriceInput";
import ErrorMessage from "../ErrorMessage";
import SelectInput from "../SelectInput";
import { fetchFunction, getToken } from "../../hooks/http.js";
import { Form, json } from "react-router-dom";
import { categories } from "./AddEquipmentModal.jsx";

export default function EditEquipmentModal({ onClose, equipmentData: data }) {
  console.log(data);
  const submitButtonRef = useRef();
  const [previewImageSrc, setPreviewImageSrc] = useState(defaultEquipmentImage);
  const imageInputRef = useRef();

  const { isPending, isError, error, mutate } = useMutation({
    mutationKey: ["equipments"],
    mutationFn: async (equipmentData) => {
      const token = getToken();
      if (!token) {
        return json({ status: 403 });
      }

      const response = await fetchFunction({
        url: `${"http://localhost:8081/equipments/" + data.id}`,
        options: {
          method: "PUT",
          body: JSON.stringify(equipmentData),
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        },
      });
      if (response.status > 399) {
        throw response;
      }
    },
    onSuccess: () => {
      onClose();
      window.location.reload();
    },
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
      category: fd.get("equipment-category"),
    };
    mutate(equipmentData);
  }

  const pickImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

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

  return (
    <div>
      <Form
        onSubmit={submitForm}
        method="post"
        className="px-8 pb-4 pt-5 rounded-md bg-white"
      >
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
            defaultValue={(data && data.name) ?? ""}
            name="equipment-name"
            label="Equipment Name"
            placeholder="Enter Equipment Name"
            type="text"
          />
          <TextAreaInput
            defaultValue={(data && data.description) ?? ""}
            name="equipment-description"
            label="Equipment Description"
          />
          <PriceInput
            name="equipment-price"
            defaultValue={(data && data.price) ?? ""}
          />
          <Input
            defaultValue={(data && data.availableQuantity) ?? ""}
            label="Available Quantity"
            placeholder="Enter Equipment's Available Quantity"
            type="number"
            name="equipment-available-quantity"
          />
          <Input
            defaultValue={(data && data.max_quantity) ?? ""}
            label="Max Quantity"
            placeholder="Enter Equipment's Max Quantity"
            type="number"
            name="equipment-max-quantity"
          />
          <SelectInput
            data={categories}
            name="equipment-category"
            selectedField={data && data.category}
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
          {isPending ? "Loading..." : "Edit Equipment"}
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
    </div>
  );
}
