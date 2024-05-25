import ConfirmationModal from "./ConfirmationModal.jsx";
import ResetPasswordModal from "./ResetPasswordModal.jsx";
import ConfirmModal from "./ConfirmModal.jsx";
import AddUserModal from "./AddUserModal.jsx";
import CertificationModal from "./CertificationModal.jsx";
import AddTransactionModal from "./AddTransactionModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice";
import RechargeUserMembership from "./RechargeUserMembership.jsx";
import NotifyMembershipEnd from "./NotifyMembershipEnd.jsx";
import SendCustomMessage from "./SendCustomMessage.jsx";
import AddEquipmentModal from "./AddEquipmentModal.jsx";
import { useNavigate } from "react-router-dom";
import EditEquipmentModal from "./EditEquipmentModal.jsx";
import { fetchFun, getToken, queryClient } from "../../hooks/http.js";
export default function ModalContent({
  equipmentData,
  remainingDay,
  imageSrc,
  classId,
}) {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.modal.type);
  function onConfirm(confirmType) {
    dispatch(setModalType(confirmType));
  }
  let modalContent;
  function onClose() {
    dispatch(setModalType());
  }
  const navigate = useNavigate();
  function handleConfirmSignOut() {
    queryClient.clear();
    localStorage.removeItem("user-token");
    navigate("/auth");
    onClose();
  }
  async function handleDeleteClass(url, method) {
    await fetchFun({
      url,
      options: {
        method,
        headers: {
          "x-access-token": getToken(),
        },
      },
    });
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
      <ConfirmationModal
        title="Delete User"
        description=" Are you sure you want to delete this account? All of the data will be permanently removed. This action cannot be undone."
        confirmActionLabel="Delete"
        onConfirm={() => onConfirm("confirm-delete-user")}
      />
    );
  } else if (type === "reset-password") {
    modalContent = <ResetPasswordModal />;
  } else if (type === "confirm-reset-password") {
    modalContent = (
      <ConfirmModal
        color="green"
        title="Password reset confirmation sent"
        description="The user's password has been successfully reset. An email has been sent to the user with instructions on how to set up a new password"
      />
    );
  } else if (type === "confirm-delete-user") {
    modalContent = (
      <ConfirmModal
        color="red"
        title="User Deleted Successfully"
        description="User has been successfully deleted."
      />
    );
  } else if (type === "confirm-add-user") {
    modalContent = (
      <ConfirmModal
        color="blue"
        title="User Added Successfully"
        description="User has been successfully added."
      />
    );
  } else if (type === "confirm-sign-out") {
    modalContent = (
      <ConfirmModal
        title="Are You Sure You Want to Sign Out?"
        description="Are you sure you want to sign out of your account? Click 'Confirm' to sign out."
        confirmButtonLabel="Sign Out"
        onConfirm={handleConfirmSignOut}
      />
    );
  } else if (type === "view-certification") {
    modalContent = <CertificationModal imageSrc={imageSrc} />;
  } else if (type === "delete-notification") {
    modalContent = (
      <ConfirmationModal
        title="Delete Notification"
        description="Are you sure you want to delete this notification? Once deleted, it cannot be recovered."
        confirmActionLabel="Delete"
        onConfirm={() => {}}
      />
    );
  } else if (type === "add-transaction") {
    modalContent = <AddTransactionModal />;
  } else if (type === "recharge-user-membership") {
    return (modalContent = (
      <RechargeUserMembership remainingDay={remainingDay} />
    ));
  } else if (type === "notify-membership-end") {
    return (modalContent = <NotifyMembershipEnd />);
  } else if (type === "custom-message") {
    return (modalContent = <SendCustomMessage />);
  } else if (type === "add-equipment") {
    return (modalContent = <AddEquipmentModal onClose={onClose} />);
  } else if (type === "edit-equipment") {
    return (modalContent = (
      <EditEquipmentModal equipmentData={equipmentData} onClose={onClose} />
    ));
  } else if (type === "delete-class") {
    modalContent = (
      <ConfirmationModal
        title="Delete Class"
        description=" Are you sure you want to delete this class? All of the data will be permanently removed. This action cannot be undone."
        confirmActionLabel="Delete"
        onConfirm={() =>
          handleDeleteClass(`http://localhost:8081/class/${classId}`, "DELETE")
        }
      />
    );
  } else {
    return (
      <div className="w-full h-full text-center py-10 flex flex-col gap-4 px-10">
        <p className="font-semibold"> Nothing to show !</p>
        <button
          onClick={onClose}
          className=" bg-indigo-700 text-white py-2 rounded-md font-semibold "
        >
          Okays
        </button>
      </div>
    );
  }
  return modalContent;
}
