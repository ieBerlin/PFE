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
import { useNavigate, useParams } from "react-router-dom";
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
  function onClose() {
    dispatch(setModalType());
  }
  const { userId, coachId, classId: classID } = useParams();
  const navigate = useNavigate();
  function handleConfirmSignOut() {
    queryClient.cancelQueries();
    queryClient.clear();
    localStorage.removeItem("user-token");
    navigate("/auth");
    onClose();
  }

  if (type === "create-user") {
    return (
      <AddUserModal
        onClose={onClose}
        onConfirm={() => onConfirm("confirm-add-user")}
      />
    );
  } else if (type === "delete-user") {
    return (
      <ConfirmationModal
        title="Delete User"
        description=" Are you sure you want to delete this account? All of the data will be permanently removed. This action cannot be undone."
        confirmActionLabel="Delete"
        onConfirm={() => onConfirm("confirm-delete-user")}
        mutationFn={async () =>
          await fetchFun({
            url: "http://localhost:8081/user/profile/" + userId,
            options: {
              method: "DELETE",
              headers: {
                "x-access-token": getToken(),
              },
            },
          })
        }
      />
    );
  } else if (type === "delete-request") {
    return (
      <ConfirmationModal
        title="Delete Request"
        description="Are you certain you want to delete this coaching request? This action is irreversible."
        confirmActionLabel="Delete"
        onConfirm={() => onConfirm("confirm-delete-request")}
        mutationFn={async () =>
          await fetchFun({
            url: "http://localhost:8081/clients/delete-coach/" + coachId,
            options: {
              method: "DELETE",
              headers: {
                "x-access-token": getToken(),
              },
            },
          })
        }
      />
    );
  } else if (type === "delete-class-request") {
    return (
      <ConfirmationModal
        title="Delete Class Request"
        description="Are you certain you want to delete this joing to class request? This action is irreversible."
        confirmActionLabel="Delete"
        onConfirm={() => onConfirm("confirm-delete-request-class")}
        mutationFn={async () =>
          await fetchFun({
            url: "http://localhost:8081/enrollements/" + classID,
            options: {
              method: "DELETE",
              headers: {
                "x-access-token": getToken(),
              },
            },
          })
        }
      />
    );
  } else if (type === "block-user") {
    return (
      <ConfirmationModal
        title="Block User"
        description=" Are you sure you want to block this account?"
        confirmActionLabel="Block"
        onConfirm={() => {
          onConfirm("confirm-block-user");
          queryClient.invalidateQueries([["user-" + userId]]);
        }}
        mutationFn={async () =>
          await fetchFun({
            url: "http://localhost:8081/users/user-status/" + userId,
            options: {
              method: "PUT",
              body: JSON.stringify({ status: "blocked" }),
              headers: {
                "x-access-token": getToken(),
                "Content-Type": "application/json",
              },
            },
          })
        }
      />
    );
  } else if (type === "activate-user") {
    return (
      <ConfirmationModal
        title="Activate User"
        description=" Are you sure you want to activate this account?"
        confirmActionLabel="Activate"
        onConfirm={() => {
          onConfirm("confirm-activate-user");
          queryClient.invalidateQueries([["user-" + userId]]);
        }}
        mutationFn={async () =>
          await fetchFun({
            url: "http://localhost:8081/users/user-status/" + userId,
            options: {
              method: "PUT",
              body: JSON.stringify({ status: "active" }),
              headers: {
                "x-access-token": getToken(),
                "Content-Type": "application/json",
              },
            },
          })
        }
      />
    );
  } else if (type === "reset-password") {
    return <ResetPasswordModal />;
  } else if (type === "confirm-reset-password") {
    return (
      <ConfirmModal
        color="green"
        title="Password reset confirmation sent"
        description="The user's password has been successfully reset. An email has been sent to the user with instructions on how to set up a new password"
      />
    );
  } else if (type === "custom-message") {
    return (
      <SendCustomMessage
        title="Notify User of Custom Message"
        onConfirm={() => onConfirm("confirm-custom-message")}
      />
    );
  } else if (type === "send-message-to-users") {
    return (
      <SendCustomMessage
        title="Notify All Users with a notification"
        onConfirm={() => onConfirm("confirm-custom-message")}
        href={`${"http://localhost:8081/notification/all-users"}`}
      />
    );
  } else if (type === "send-message-to-admin") {
    return (
      <SendCustomMessage
        title="Send Message to Admin"
        onConfirm={() => onConfirm("confirm-custom-message")}
        href={`${"http://localhost:8081/notification/text-admin"}`}
      />
    );
  } else if (type === "delete-notification") {
    return (
      <ConfirmationModal
        title="Delete Notification"
        description="Are you sure you want to delete this notification? Once deleted, it cannot be recovered."
        confirmActionLabel="Delete"
        onConfirm={() => {}}
      />
    );
  } else if (type === "add-equipment") {
    return <AddEquipmentModal onClose={onClose} />;
  } else if (type === "edit-equipment") {
    return (
      <EditEquipmentModal equipmentData={equipmentData} onClose={onClose} />
    );
  } else if (type === "delete-class") {
    return (
      <ConfirmationModal
        title="Delete Class"
        description=" Are you sure you want to delete this class? All of the data will be permanently removed. This action cannot be undone."
        confirmActionLabel="Delete"
        onConfirm={() => onConfirm("confirm-delete-class")}
        mutationFn={async () =>
          await fetchFun({
            url: "http://localhost:8081/class/" + classId,
            options: {
              method: "DELETE",
              headers: {
                "x-access-token": getToken(),
              },
            },
          })
        }
      />
    );
  } else if (type === "confirm-delete-user") {
    return (
      <ConfirmModal
        color="red"
        title="User Deleted Successfully"
        description="User has been successfully deleted."
        onConfirm={() => {
          navigate("/users");
          dispatch(setModalType());
        }}
      />
    );
  } else if (type === "confirm-delete-request") {
    return (
      <ConfirmModal
        color="red"
        title="Request Deleted Successfully"
        description="The request has been deleted successfully."
        onConfirm={() => {
          dispatch(setModalType());
          queryClient.invalidateQueries(["clients", "clients-" + userId]);
        }}
      />
    );
  } else if (type === "confirm-delete-request-class") {
    return (
      <ConfirmModal
        color="red"
        title="Request Deleted Successfully"
        description="The request has been deleted successfully."
        onConfirm={() => {
          dispatch(setModalType());
          queryClient.invalidateQueries(["classes"]);
        }}
      />
    );
  } else if (type === "confirm-enroll-in-class") {
    return (
      <ConfirmModal
        color="red"
        title="Class Enrollment Request Submitted Successfully"
        description="The class enrollment request has been successfully made."
        onConfirm={() => {
          dispatch(setModalType());
        }}
      />
    );
  } else if (type === "confirm-update-equipment") {
    return (
      <ConfirmModal
        color="green"
        title="Equipment updated Successfully"
        description="Equipment has been successfully updated."
        onConfirm={() => {
          queryClient.invalidateQueries(["equipments"]);
          dispatch(setModalType());
        }}
      />
    );
  } else if (type === "confirm-add-transaction") {
    return (
      <ConfirmModal
        color="green"
        title="Transaction added Successfully"
        description="Transaction has been successfully added."
        onConfirm={() => {
          queryClient.invalidateQueries(["transactions"]);
          dispatch(setModalType());
        }}
      />
    );
  } else if (type === "confirm-add-equipment") {
    return (
      <ConfirmModal
        color="amber"
        title="Equipment added Successfully"
        description="Equipment has been successfully added."
        onConfirm={() => {
          queryClient.invalidateQueries(["equipments"]);
          dispatch(setModalType());
        }}
      />
    );
  } else if (type === "confirm-block-class") {
    return (
      <ConfirmModal
        color="red"
        title="Class Blocked Successfully"
        description="Class has been successfully blocked."
        onConfirm={() => {
          navigate("/classes");
          dispatch(setModalType());
        }}
      />
    );
  } else if (type === "confirm-activate-user") {
    return (
      <ConfirmModal
        color="green"
        title="User activated Successfully"
        description="User has been successfully activated."
      />
    );
  } else if (type === "confirm-block-user") {
    return (
      <ConfirmModal
        color="red"
        title="User blocked Successfully"
        description="User has been successfully blocked."
      />
    );
  } else if (type === "confirm-notify-membership-user") {
    return (
      <ConfirmModal
        color="green"
        title="User Membership Notification Sent Successfully"
        description="A membership notification has been successfully sent to the user."
        onConfirm={() => dispatch(setModalType())}
      />
    );
  } else if (type === "confirm-custom-message") {
    return (
      <ConfirmModal
        color="green"
        title="The Custom Message Has Been Sent Successfully"
        description="The custom message has been successfully sent to the user."
      />
    );
  } else if (type === "confirm-add-user") {
    return (
      <ConfirmModal
        color="blue"
        title="User Added Successfully"
        description="User has been successfully added."
      />
    );
  } else if (type === "create-class") {
    return (
      <ConfirmModal
        color="blue"
        title="Class Created Successfully"
        description="Class has been successfully created."
        onConfirm={() => {
          dispatch(setModalType());
          navigate("/classes");
        }}
      />
    );
  }
  if (type === "edit-class") {
    return (
      <ConfirmModal
        color="blue"
        title="Class updated Successfully"
        description="Class has been successfully updated."
        onConfirm={() => dispatch(setModalType())}
      />
    );
  } else if (type === "confirm-sign-out") {
    return (
      <ConfirmModal
        title="Are You Sure You Want to Sign Out?"
        description="Are you sure you want to sign out of your account? Click 'Confirm' to sign out."
        confirmButtonLabel="Sign Out"
        onConfirm={handleConfirmSignOut}
      />
    );
  } else if (type === "view-certification") {
    return <CertificationModal imageSrc={imageSrc} />;
  } else if (type === "add-transaction") {
    return <AddTransactionModal />;
  } else if (type === "recharge-user-membership") {
    return <RechargeUserMembership remainingDay={remainingDay} />;
  } else if (type === "notify-membership-end") {
    return (
      <NotifyMembershipEnd
        onConfirm={() => onConfirm("confirm-notify-membership-user")}
      />
    );
  } else if (type === "confirm-delete-class") {
    return (
      <ConfirmModal
        color="red"
        title="Class Deleted Successfully"
        description="Class has been successfully deleted."
        onConfirm={() => {
          navigate("/classes");
          dispatch(setModalType());
        }}
      />
    );
  } else if (type === "confirm-recharge-membership") {
    return (
      <ConfirmModal
        color="blue"
        title="Memberhsip recharged Successfully"
        description="Memberhsip has been successfully recharged."
        onConfirm={() => {
          queryClient.invalidateQueries(["membership"]);
          dispatch(setModalType());
        }}
      />
    );
  } else {
    return (
      <div className="w-full h-full text-center py-10 flex flex-col gap-4 px-20 bg-white rounded-md">
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
}
