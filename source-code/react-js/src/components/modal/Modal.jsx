import { createPortal } from "react-dom";
import DeleteUserModal from "./DeleteUserModal.jsx";
import ResetPasswordModal from "./ResetPasswordModal.jsx";
import ConfirmResetPasswordModal from "./ConfirmResetPasswordModal.jsx";
import AddUserModal from "./AddUserModal.jsx";
import { useEffect, useRef } from "react";
export default function Modal({ open, onClose, type, onChangeType }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open, dialog]);
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
        color="cyan"
        title="User Added Successfully"
        description="User has been successfully added."
        onClose={onClose}
      />
    );
  }
  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      style={{
        zIndex: "205",
        position: "relative",
      }}
    >
      <div className=" bg-transparent  flex w-full items-center justify-center flex-col overflow-y-auto h-screen backdrop-blur-sm  top-0 fixed transform rounded-lg px-36 py-10 text-left shadow-xl transition-all ">
        <div className="fixed top-1/2 pt-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2   max-h-screen  ">
          {modalContent}
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
