import { createPortal } from "react-dom";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice.js";
import ModalContent from "./ModalContent.jsx";
export default function Modal({ remainingDay, imageSrc }) {
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
          <ModalContent remainingDay={remainingDay} imageSrc={imageSrc} />
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
