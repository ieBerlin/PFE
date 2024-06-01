import { useRef } from "react";
import { Form, Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http.js";
import FallbackText from "../../components/FallbackText.jsx";
import Input from "../../components/Input.jsx";
import TextAreaInput from "../../components/TextAreaInput.jsx";
import RelatedUsers from "../../components/modal/related-user/RelatedUsers.jsx";
import DatePicker from "../../components/DatePicker.jsx";
import PriceInput from "../../components/PriceInput.jsx";
import SelectInput from "../../components/SelectInput.jsx";
import { categories } from "../../components/modal/AddEquipmentModal.jsx";
import { ActionButton } from "../user/UserPage.jsx";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import Modal from "../../components/modal/Modal.jsx";
import ForbiddenPage from "../../components/ForbiddenPage.jsx";

export default function EditClassPage() {
  const userRole = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "admin"
  );
  const submitButtonRef = useRef();
  const { classId } = useParams();
  const dispatch = useDispatch();
  const {
    isPending: isFetchingClass,
    data: queryData,
    isError: fetchError,
  } = useQuery({
    queryKey: ["classes", `class-${classId}`],
    staleTime: Infinity,
    queryFn: async () => {
      return await fetchFun({
        url: `http://localhost:8081/class/${classId}`,
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      });
    },
  });
  const {
    mutate,
    isPending: isEditingClass,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["classes", `class-${classId}`],
    mutationFn: async (data) => {
      return await fetchFun({
        url: `http://localhost:8081/class/update-class/${classId}`,
        options: {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": getToken(),
          },
        },
      });
    },
  });
  if (!userRole) {
    return (
      <ForbiddenPage
        title=" Access Denied: Admins Only"
        message="You do not have the necessary permissions to view this area. Admin access is required."
      />
    );
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const formData = {
      name: fd.get("class-name"),
      description: fd.get("class-description"),
      category: fd.get("class-category"),
      instructorId: fd.get("related-user"),
      startDate: fd.get("class-start-date"),
      endDate: fd.get("class-end-date"),
      startTime: fd.get("class-start-time"),
      endTime: fd.get("class-end-time"),
      price: fd.get("class-price"),
      maxSize: fd.get("class-max-size"),
    };
    mutate(formData);
  };

  if (isFetchingClass) {
    return <FallbackText title="Fetching class information" />;
  }

  if (
    fetchError ||
    !queryData ||
    !queryData?.instructorData ||
    !queryData?.classData
  ) {
    return (
      <p className="font-semibold text-gray-900 text-xl">Nothing to show!</p>
    );
  }
  let content;
  content = !isEditingClass && isError && (
    <div className="">
      <h1 className="font-medium text-lg text-red-500">Errors </h1>
      {error
        ? Object.entries(error.info).map(([key, value]) => {
            return <ErrorMessage key={key} title={key} message={value} />;
          })
        : "An error occured!"}
    </div>
  );

  if (data && !isEditingClass) {
    dispatch(setModalType("edit-class"));
  }
  const { classData } = queryData;
  return (
    <>
      <Modal classId={classId} />
      <div className="bg-gray-100 p-4">
        <h4 className="font-bold text-xl text-gray-700 mb-4">
          Update Class Information
        </h4>
        <div className="flex flex-col w-full bg-white p-4">
          <div className="items-center flex justify-between">
            <h3 className="font-medium text-black capitalize text-start">
              Basic Information
            </h3>
            <ActionButton
              color="red"
              onClick={() => dispatch(setModalType("delete-class"))}
              classes={"w-min whitespace-nowrap"}
            >
              Delete Class
            </ActionButton>
          </div>
          <hr className="w-full h-1 my-4" />
          <Form onSubmit={handleSubmitForm} method="POST" className="p-2">
            <Input
              defaultValue={classData?.name}
              name="class-name"
              label="Class Name"
            />
            <TextAreaInput
              defaultValue={classData?.description}
              name="class-description"
              label="Class Description"
            />
            <SelectInput
              selectedField={classData?.category}
              label="Category"
              name="class-category"
              data={categories}
            />
            <RelatedUsers
              defaultRelatedUser={[{ ...queryData?.instructorData }]}
              name="class-related-user"
              label="Who will be coaching this class?"
              userType="coach"
            />
            <DatePicker
              label="Start Date and Time"
              dateName="class-start-date"
              timeName="class-start-time"
              defaultDateValue={classData?.startDate}
              defaultTimeValue={classData?.startTime}
            />
            <DatePicker
              label="End Date and Time"
              dateName="class-end-date"
              timeName="class-end-time"
              defaultDateValue={classData?.endDate}
              defaultTimeValue={classData?.endTime}
            />
            <div className="grid grid-cols-2 items-center justify-center">
              <Input
                defaultValue={classData?.maximum_capacity}
                name="class-max-size"
                label="Maximum Class Size"
                type="number"
              />
              <PriceInput defaultValue={classData?.price} name="class-price" />
            </div>
            <input type="submit" value="" hidden ref={submitButtonRef} />
          </Form>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              disabled={isEditingClass}
              type="button"
              className={`${
                isEditingClass ? "bg-gray-400" : "bg-blue-600"
              } text-white outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                !isEditingClass && "hover:bg-blue-500"
              } sm:ml-3 sm:w-auto`}
              onClick={() => {
                if (submitButtonRef.current) {
                  submitButtonRef.current.click();
                }
              }}
            >
              {isEditingClass ? "Loading..." : "Edit Class"}
            </button>
            <Link
              disabled={isEditingClass}
              to="/classes"
              className={`outline-none mt-3 inline-flex w-full justify-center rounded-md ${
                isEditingClass ? "bg-gray-100" : "bg-white"
              } px-3 py-2 text-sm font-semibold ${
                isEditingClass ? "text-gray-400" : "text-gray-900"
              } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
            >
              Cancel
            </Link>
          </div>
          {content}
        </div>
      </div>
    </>
  );
}

function timeOut() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

export async function action() {
  await timeOut();
  return null;
}
