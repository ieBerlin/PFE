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
      <div className=" bg-transparent overflow-y-auto  flex w-full items-center justify-center flex-col backdrop-blur-sm  top-0 fixed transform rounded-lg px-36  text-left shadow-xl transition-all ">
        <div
        style={{
          maxHeight:"100vh - 64px"
        }}
          ref={modalContentRef}
          className="py-8"
        >
      </div>
          <ModalContent remainingDay={remainingDay} imageSrc={imageSrc} />
        </div>
    </dialog>,
    document.getElementById("modal")
  );
}
