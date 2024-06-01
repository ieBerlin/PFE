import { useState } from "react";

import { UserGroupIcon } from "@heroicons/react/24/solid";
import Modal from "../../components/modal/Modal.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import CoachBio from "./CoachBio.jsx";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueries } from "@tanstack/react-query";
import { fetchFun, getToken, queryClient } from "../../hooks/http.js";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import ForbiddenPage from "../../components/ForbiddenPage.jsx";
import ItemNotFound from "../../components/ItemNotFound.jsx";
import { setModalType } from "../../features/modal/modalSlice.js";

export default function CoachesList() {
  const userRole = useSelector((state) => {
    const userRole = state?.userRole?.userRole?.toLowerCase();
    return ["member", "admin"].some((role) => userRole === role);
  });
  if (!userRole) {
    return (
      <ForbiddenPage
        title="Members Only"
        message="This section is restricted to members only. Please log in with your member credentials to proceed."
      />
    );
  }
  const { coachId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const isUserMember = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "member"
  );
  const results = useQueries({
    queries: [
      {
        queryKey: ["coaches", "coaches-" + coachId],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/coaches/" + coachId,
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },

      {
        queryKey: ["clients", "clients-" + coachId],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/clients/get-coach/" + coachId,
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },
    ],
  });
  console.log(results[0].data);

  if (results[0].isError) {
    if (results[0].error?.code === 404) {
      return (
        <ItemNotFound title="The coach you're searching for couldn't be located." />
      );
    } else {
      return (
        <div className="">
          <h1 className="font-medium text-lg text-red-500">Errors </h1>
          {coachDataError
            ? Object.entries(coachDataError.info).map(([key, value]) => {
                return <ErrorMessage key={key} title={key} message={value} />;
              })
            : "An error occurred!"}
        </div>
      );
    }
  }
  const dispatch = useDispatch();
  const { isPending, mutate, isError, error } = useMutation({
    mutationKey: ["client"],
    mutationFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/clients/enroll/" + coachId,
        options: {
          method: "POST",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
    // onMutate: (data) =>data,
    onSuccess: () => {
      queryClient.invalidateQueries(["clients", "clients-" + coachId]);
    },
  });
  let content;
  content = !isPending && isError && (
    <div className="">
      <h1 className="font-medium text-lg text-red-500">Errors </h1>
      {error
        ? Object.entries(error.info).map(([key, value]) => {
            return <ErrorMessage key={key} title={key} message={value} />;
          })
        : "An error occured!"}
    </div>
  );

  const {
    isPending: isCoachDataLoading,
    data: coachDetails,
    error: coachDataError,
  } = results[0];
  const { data: clientStatus } = results[1];

  if (isCoachDataLoading) {
    return <FallbackText title="Fetching coach data..." />;
  }
  if (!coachDetails || coachDetails.length === 0) {
    return (
      <ItemNotFound title="The coach you're searching for couldn't be located." />
    );
  }

  const { first_name, last_name, email: coachEmail } = coachDetails;
  const coachSpecialization = coachDetails?.specialization ?? "not set yet";
  const totalMembersTrained = coachDetails?.totalTrainedMembers ?? 0;
  const contactDetails = coachDetails?.contact ?? "[]";
  const certificationList = coachDetails?.certifications ?? [];
  const coachImage = coachDetails?.image
    ? "http://localhost:8081/uploads/images/profile/" + coachDetails.image
    : "http://localhost:8081/uploads/images/sport/coach.jpg";
  const classes = coachDetails?.classes ?? [];
  const coachBioText = coachDetails?.bio ?? "";
  const contactLinks = JSON.parse(contactDetails);
  const coachBioData = {
    bio: coachBioText,
    certifications: certificationList,
    classes,
  };
  const coachFullName = first_name + " " + last_name;
  const getStatusClass = () => {
    if (clientStatus?.status === "pending") {
      return "bg-amber-500 cursor-pointer";
    } else if (clientStatus?.status === "contacted") {
      return "bg-emerald-600 hover:bg-emerald-500";
    } else {
      return "bg-blue-600 hover:bg-blue-500";
    }
  };

  const getStatusLabel = () => {
    if (clientStatus?.status === "pending") {
      return "Pending";
    } else if (clientStatus?.status === "contacted") {
      return isPending ? "Processing" : "Contacted";
    } else {
      return "Send Request";
    }
  };

  return (
    <>
      <Modal imageSrc={selectedImage} />
      <div className="bg-gray-100 py-4 px-10">
        <div className="py-2 pl-5">
          <img
            className="rounded-full w-32 h-32 object-cover"
            src={coachImage}
            alt=""
          />
        </div>
        <div
          className="grid mt-4 gap-2"
          style={{
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <div className="bg-white shadow-md px-4 py-6 rounded-md">
            <div className="flex flex-row justify-between gap-3">
              <h1 className="font-bold text-2xl">{coachFullName}</h1>
              {isUserMember &&
                (clientStatus?.status === "contacted" ? (
                  <Link
                    to={"connect"}
                    className={
                      "px-3 py-2 font-medium rounded-lg text-white " +
                      getStatusClass()
                    }
                  >
                    {getStatusLabel()}
                  </Link>
                ) : (
                  <button
                    disabled={isPending}
                    onClick={
                      clientStatus?.status === "pending"
                        ? () => dispatch(setModalType("delete-request"))
                        : () => mutate()
                    }
                    className={
                      "px-3 py-2 font-medium rounded-lg text-white " +
                      getStatusClass()
                    }
                  >
                    {getStatusLabel()}
                  </button>
                ))}
            </div>
            <h1>{content}</h1>
            <h3 className="text-sm text-blue-900 font-semibold bg-blue-100 px-3 py-1 inline-block rounded-md my-2">
              {coachSpecialization}
            </h3>

            <h1 className="flex items-center gap-2">
              <UserGroupIcon className="w-6 h-6 text-gray-500" />
              <p className=" text-gray-500 font-medium text-sm">
                {totalMembersTrained} Total Trained Members
              </p>
            </h1>
            <div className="mt-4">
              <h1 className="font-semibold my-2">Connect With Me</h1>

              <a
                href={`mailto:${coachEmail}`}
                className="text-gray-600 font-medium inline"
              >
                {coachEmail}
              </a>

              {contactLinks.map((item) => (
                <a
                  href={Object.values(item)[0]}
                  className="block cursor-pointer text-gray-600 font-medium my-1"
                  target="_blank"
                  key={Object.keys(item)[0]}
                >
                  {Object.values(item)[0]}
                </a>
              ))}
            </div>
          </div>

          <CoachBio coachData={coachBioData} setImage={setSelectedImage} />
        </div>
      </div>
    </>
  );
}
