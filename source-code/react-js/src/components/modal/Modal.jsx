import { createPortal } from "react-dom";
import DeleteUserModal from "./DeleteUserModal.jsx";
import ResetPasswordModal from "./ResetPasswordModal.jsx";
import ConfirmResetPasswordModal from "./ConfirmResetPasswordModal.jsx";
import AddUserModal from "./AddUserModal.jsx";
import { useEffect, useRef } from "react";
export default function Modal({ open, onClose, type, onChangeType }) {
  const dialog = useRef();
  // useEffect(() => {
  //   if (open) {
  //     dialog.current.showModal();
  //   } else {
  //     dialog.current.close();
  //   }
  // }, [open, dialog]);
  let modalContent = (
    <div className="w-full h-full text-center py-10 flex flex-col gap-4 px-10">
      <p className="font-semibold"> Nothing to show !</p>
      <button
        onClick={onClose}
        className=" bg-indigo-700 text-white py-2 rounded-md font-semibold "
      >
        Okay
      </button>
    </div>
  );
  function onConfirm(confirmType) {
    onChangeType(confirmType);
  }
  if (type === "create-user") {
    modalContent = (
      <AddUserModal
        onClose={onClose}
        onConfirm={() => onConfirm("confirm-add-user")}
      />
    );
  } else if (type === "delete-user") {
    modalContent = (
      <DeleteUserModal
        onConfirm={() => onConfirm("confirm-delete-user")}
        onClose={onClose}
      />
    );
  } else if (type === "reset-password") {
    modalContent = (
      <ResetPasswordModal
        onClose={onClose}
        onConfirm={() => onConfirm("confirm-reset-password")}
      />
    );
  } else if (type === "confirm-reset-password") {
    modalContent = (
      <ConfirmResetPasswordModal
        color="green"
        title="Password reset confirmation sent"
        description="The user's password has been successfully reset. An email has been sent to the user with instructions on how to set up a new password"
        onClose={onClose}
      />
    );
  } else if (type === "confirm-delete-user") {
    modalContent = (
      <ConfirmResetPasswordModal
        color="red"
        title="User Deleted Successfully"
        description="User has been successfully deleted."
        onClose={onClose}
      />
    );
  } else if (type === "confirm-add-user") {
    modalContent = (
      <ConfirmResetPasswordModal
        color="blue"
        title="User Added Successfully"
        description="User has been successfully added."
        onClose={onClose}
      />
    );
  }
  return createPortal(
    <dialog
      open={open}
      onClose={onClose}
      style={{
        zIndex: "205",
      }}
      className="fixed overflow-y-scroll bg-transparent w-full min-h-full backdrop-blur-sm top-0 left-0"
    >
      <div className="fixed transform rounded-lg  text-left shadow-xl transition-all  items-center w-full">
        {modalContent}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
