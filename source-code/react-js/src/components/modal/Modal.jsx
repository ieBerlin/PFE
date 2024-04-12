import { Fragment } from "react";
import { createPortal } from "react-dom";
import { Dialog, Transition } from "@headlessui/react";
import DeleteUserModal from "./DeleteUserModal.jsx";

export default function Modal({ open, onClose, type }) {
  let modalContent;

  if (type === "delete-user") {
    modalContent = <DeleteUserModal onClose={onClose} />;
  }

  return createPortal(
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative bg-white rounded-lg w-full sm:max-w-lg">
              {modalContent}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>,
    document.getElementById("modal")
  );
}
