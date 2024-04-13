import { createPortal } from "react-dom";
import DeleteUserModal from "./DeleteUserModal.jsx";
import ResetPasswordModal from "./ResetPasswordModal.jsx";
import ConfirmResetPasswordModal from "./ConfirmResetPasswordModal.jsx";
import CreateUserModal from "./CreateUserModal.jsx";
export default function Modal({ open, onClose, type, onChangeType }) {
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
    modalContent = <CreateUserModal />;
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
        title="Password reset confirmation sent"
        description="The user's password has been successfully reset. An email has been sent to the user with instructions on how to set up a new password"
        onClose={onClose}
      />
    );
  } else if (type === "confirm-delete-user") {
    modalContent = (
      <ConfirmResetPasswordModal
        title="User Deleted Successfully"
        description="User has been successfully deleted."
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
      className=" bg-transparent fixed top-0 left-0 w-full h-screen backdrop-blur-sm"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {modalContent}
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
