import { createPortal } from "react-dom";
import DeleteUserModal from "./DeleteUserModal.jsx";
import ResetPasswordModal from "./ResetPasswordModal.jsx";
import ConfirmResetPasswordModal from "./ConfirmResetPasswordModal.jsx";
import AddUserModal from "./AddUserModal.jsx";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice.js";
export default function Modal() {
  const dialog = useRef();
  const modalContentRef = useRef();

  const type = useSelector((state) => state.modal.type);
  const dispatch = useDispatch();
  useEffect(() => {
    if (type) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [type, dialog]);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !modalContentRef.current ||
        modalContentRef.current.contains(e.target)
      ) {
        return;
      } else {
        // dispatch(setModalType());
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dispatch]);
  function closeModal() {
    dispatch(setModalType());
  }
  let modalContent = (
    <div className="w-full h-full text-center py-10 flex flex-col gap-4 px-10">
      <p className="font-semibold"> Nothing to show !</p>
      <button
        onClick={() => dispatch(setModalType())}
        className=" bg-indigo-700 text-white py-2 rounded-md font-semibold "
      >
        Okay
      </button>
    </div>
  );

  if (type === "create-user") {
    modalContent = (
      <AddUserModal
        onClose={closeModal}
        onConfirm={() => onConfirm("confirm-add-user")}
      />
    );
  } else if (type === "delete-user") {
    modalContent = (
      <DeleteUserModal
        onConfirm={() => onConfirm("confirm-delete-user")}
        onClose={closeModal}
      />
    );
  } else if (type === "reset-password") {
    modalContent = (
      <ResetPasswordModal
        onClose={closeModal}
        onConfirm={() => onConfirm("confirm-reset-password")}
      />
    );
  } else if (type === "confirm-reset-password") {
    modalContent = (
      <ConfirmResetPasswordModal
        color="green"
        title="Password reset confirmation sent"
        description="The user's password has been successfully reset. An email has been sent to the user with instructions on how to set up a new password"
        onClose={closeModal}

      />
    );
  } else if (type === "confirm-delete-user") {
    modalContent = (
      <ConfirmResetPasswordModal
        color="red"
        title="User Deleted Successfully"
        description="User has been successfully deleted."
        onClose={closeModal}

      />
    );
  } else if (type === "confirm-add-user") {
    modalContent = (
      <ConfirmResetPasswordModal
        color="blue"
        title="User Added Successfully"
        description="User has been successfully added."
        onClose={closeModal}

      />
    );
  } else if (type === "confirm-sign-out") {
    modalContent = (
      <ConfirmResetPasswordModal
        color="blue"
        title="Are You Sure You Want to Sign Out?"
        description="Are you sure you want to sign out of your account? Click 'Confirm' to sign out."
        onClose={closeModal}
        confirmButtonLabel="Sign Out"
      />
    );
  }
  function onConfirm(confirmType) {
    dispatch(setModalType(confirmType));
  }
  return createPortal(
    <dialog
      ref={dialog}
      onClose={closeModal}
      style={{
        zIndex: "205",
      }}
      className="relative "
    >
      <div className=" bg-transparent  flex w-full items-center justify-center flex-col overflow-y-auto h-screen backdrop-blur-sm  top-0 fixed transform rounded-lg px-36 py-10 text-left shadow-xl transition-all ">
        <div
          ref={modalContentRef}
          className="fixed top-1/2 left-1/2 pt-6 transform -translate-x-1/2 -translate-y-1/2   max-h-screen  "
        >
          {modalContent}
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
