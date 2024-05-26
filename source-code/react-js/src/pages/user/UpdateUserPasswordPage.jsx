import { LockClosedIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Form, json } from "react-router-dom";
import PasswordInput from "../../components/modal/PasswordInput.jsx";
import { useRef } from "react";
import { fetchFun, fetchFunction, getToken } from "../../hooks/http.js";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import SuccessMessage from "../../components/SuccessMessage.jsx";
const token = getToken();
export default function UpdateUserPasswordPage() {
  const submitButtonRef = useRef();
  const { isPending, data, mutate, isError, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (userData) => {
      if (userData.newPassword !== userData.confirmNewPassword) {
        throw {
          info: {
            "Unmatched passwords":
              "The new and the confirm new passwords  aren' matched",
          },
        };
      }
      return await fetchFun({
        url: "http://localhost:8081/user/profile/update-password",
        options: {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        },
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      currentPassword: formData.get("current-password"),
      newPassword: formData.get("new-password"),
      confirmNewPassword: formData.get("confirm-new-password"),
    };
    mutate(data);
  };
  let content;
  content =
    !isPending &&
    isError &&
    (error
      ? Object.entries(error.info).map(([key, value]) => {
          if (key !== "status") {
            return <ErrorMessage key={key} title={key} message={value} />;
          }
        })
      : "An error occured!");
      if (data  && !isPending) {
        content = (
          <SuccessMessage
            title="Request Successful"
            message="Your request has been processed successfully."
          />
        );
      }
    
  return (
    <section className="py-4 px-6 bg-gray-100 flex h-full w-full flex-col">
      <h1 className="font-bold text-2xl mb-3">Update Password</h1>
      <div className="bg-white shadow-lg flex h-full w-full flex-col justify-center items-center py-10">
        <div className="rounded-full bg-blue-100 p-3 w-min h-min ml-2">
          <LockClosedIcon className="w-8 h-8 text-blue-700" />
        </div>
        <h1 className="text-black font-bold text-2xl mt-2">Change Password</h1>
        <p className="text-gray-400 mt-2">
          To update your password, please fill out the following fields.
        </p>
        <div className="font-semibold flex justify-end w-[600px]">
          <button
            disabled={isPending}
            onClick={() => submitButtonRef.current.click()}
            className={`${
              isPending ? "bg-gray-200" : "bg-blue-600 "
            }  flex flex-row items-center gap-2 border border-gray-300 p-2 rounded-lg text-white`}
          >
            {!isPending && <PencilIcon className="w-4 h-4" />}
            <p className={`${isPending ? "text-gray-500 " : "text-white"}`}>
              {isPending ? "Loading..." : "Save"}
            </p>
          </button>
        </div>

        <Form className="mt-4 w-[600px]" onSubmit={handleSubmit}>
          <PasswordInput
            name="current-password"
            label="Current Password"
            placeholder="Please enter your current password"
          />
          <PasswordInput
            name="new-password"
            label="New Password"
            placeholder="Enter new password"
          />
          <PasswordInput
            name="confirm-new-password"
            label="Confirm Password"
            placeholder="Confirm password"
          />
          <button type="submit" className="hidden" ref={submitButtonRef} />
        </Form>
        <div>{content}</div>
      </div>
    </section>
  );
}
