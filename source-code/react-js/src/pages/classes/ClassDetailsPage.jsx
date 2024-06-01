import { Form, json, Link, useParams } from "react-router-dom";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { fetchFun, getToken, queryClient } from "../../hooks/http.js";
import FallbackText from "../../components/FallbackText.jsx";
import SuggestedClassItem from "./SuggestedClassItem.jsx";
import classes from "./ClassDetailPage.module.css";
import brokenLinkSvg from "../../assets/broken-link-svgrepo-com.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ItemNotFound from "../../components/ItemNotFound.jsx";
export default function ClassDetailsPage() {
  const { classId } = useParams();

  const {
    isPending,
    isError,
    error,
    data: loaderData,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () =>
      await fetchFun({
        url: `http://localhost:8081/class/${classId}`,
        options: {
          headers: { "x-access-token": getToken(), method: "GET" },
        },
      }),
  });
  console.log(loaderData)

  if (isPending) {
    return <FallbackText title="Fetching class data..." />;
  }
  if (isError) {
    if (error?.code === 404) {
      return (
        <ItemNotFound title="The class information could not be retrieved." />
      );
    } else {
      return (
        <div className="">
          <h1 className="font-medium text-lg text-red-500">Errors </h1>
          {error
            ? Object.entries(error.info).map(([key, value]) => (
                <ErrorMessage key={key} title={key} message={value} />
              ))
            : "An error occured!"}
        </div>
      );
    }
  }
  if (!loaderData) {
    return (
      <h3 className="text-black text-xl my-5 text-center font-semibold">
        Nothing to show!
      </h3>
    );
  }
  const { classData, instructorData, enrollmentResult } = loaderData;

  const date = new Date(classData?.startDate);
  const formattedDate = date.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedStartTime = formatTime(
    classData?.startDate,
    classData?.startTime
  );
  const formattedEndTime = formatTime(classData?.endDate, classData?.endTime);
  return (
    <section className={classes.sectionContainer}>
      <ClassInformations
        category={classData?.category}
        instructorData={instructorData}
        title={classData?.name}
        description={classData?.description}
        date={formattedDate}
        startTime={formattedStartTime}
        endTime={formattedEndTime}
        maximumCapacity={classData?.maximum_capacity}
        instructor={classData?.instructor_name}
        currentEnrollementCount={classData?.current_enrollment_count}
        status={classData?.status}
        classId={classData?.classId}
        enrollmentResult={enrollmentResult}
      />
    </section>
  );
}

function ClassInformations({
  title,
  description,
  date,
  endTime,
  startTime,
  instructorData,
  maximumCapacity,
  currentEnrollementCount,
  category,
  classId,
  enrollmentResult,
}) {
  const dispatch = useDispatch();
  const { isPending, isError, error, mutate } = useMutation({
    mutationKey: ["class"],
    mutationFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/class/enrollment-requests",
        options: {
          method: "POST",
          body: JSON.stringify({ class_id: classId }),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      dispatch(setModalType("confirm-enroll-in-class"));
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (enrollmentResult?.status === "pending") {
      dispatch(setModalType("delete-class-request"));
    } else {
      mutate();
    }
  }
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

  let buttonLabel;
  if (enrollmentResult && enrollmentResult?.status === "pending") {
    buttonLabel = "Pending";
  } else if (enrollmentResult && enrollmentResult?.status === "confirmed") {
    buttonLabel = "Enrolled";
  } else if (currentEnrollementCount >= maximumCapacity) {
    buttonLabel = "Full";
  } else {
    buttonLabel = "Enroll now";
  }
  const isMember = useSelector(
    (state) => state?.userRole?.userRole?.toLowerCase() === "member"
  );
  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.sportContainer}>
        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr auto" }}>
          <div className="">
            <h1 className="text-black font-semibold text-xl tracking-wider capitalize mb-4">
              {title}
            </h1>
            <p className="text-gray-800 font-medium text-lg">{description}</p>
          </div>
          <div>
            <img
              src={`http://localhost:8081/uploads/images/sport/${category}.jpg`}
              alt=""
            />
            <div className="my-2">
              <div className="w-full flex flex-row items-center gap-2 justify-center bg-gray-100 p-2 rounded-md">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
                <p className="text-gray-600 text-sm font-medium">{date}</p>
              </div>

              <div className="flex flex-row justify-between items-center  gap-1 text-center mt-2">
                <div className="flex flex-row items-center gap-2 justify-center bg-gray-100 p-2 rounded-md whitespace-nowrap w-full">
                  <ClockIcon className="w-5 h-5 text-gray-600" />
                  <p className="text-gray-600 text-sm font-medium">
                    {startTime}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-2 justify-center bg-gray-100 p-2 rounded-md whitespace-nowrap  w-full">
                  <ClockIcon className="w-5 h-5 text-gray-600" />
                  <p className="text-gray-600 text-sm font-medium">{endTime}</p>
                </div>
              </div>
            </div>
            <div className="my-2">
              <h3 className="text-gray-700 font-semibold text-lg inline-block">
                With :{" "}
              </h3>
              <Link
                to={`/coaches/${instructorData?.userId}`}
                className="font-medium text-md text-gray-700 bg-blue-100 px-3 py-1 rounded-md"
              >
                {" "}
                {instructorData?.name}
              </Link>
            </div>
            <div className=" my-2">
              <h3 className="text-gray-700 font-semibold text-lg capitalize">
                Category :
                <span className="text-red-500 bg-red-100 rounded-md px-3 py-1">
                  {category}
                </span>
              </h3>
            </div>
            <div className=" my-2">
              <h3 className="text-gray-700 font-semibold text-lg capitalize">
                current enrollment members :
                <span className="text-amber-500 bg-amber-100 rounded-md px-3 py-1">
                  {currentEnrollementCount}
                </span>
              </h3>
            </div>
            <div className="mt-2">
              <h3 className="text-gray-700 font-semibold text-lg capitalize">
                Total left places :
                <span className="text-amber-500 bg-amber-100 rounded-md px-3 py-1">
                  {maximumCapacity - currentEnrollementCount}
                </span>
              </h3>
            </div>
          </div>
        </div>
        {isMember && (
          <div className="my-3 w-full flex justify-center">
            <button
              disabled={status}
              type="submit"
              className={`my-3 mx-auto w-min whitespace-nowrap rounded-lg font-bold py-2 px-8 
              ${
                enrollmentResult && enrollmentResult?.status === "pending"
                  ? "bg-yellow-500 text-white"
                  : enrollmentResult && enrollmentResult?.status === "confirmed"
                  ? "bg-green-500 text-white"
                  : currentEnrollementCount >= maximumCapacity
                  ? "bg-red-600 text-white"
                  : "bg-cyan-600 text-white hover:bg-cyan-400 hover:scale-105"
              } hover:shadow-lgtransition duration-300`}
            >
              {buttonLabel}
            </button>
          </div>
        )}
        {content}
        {/* <RelatedItems title="Related Classes" items={DUMMY_SUGGESTED_CLASSES} /> */}
        {/* <RelatedItems title="Related Coaches" items={DUMMY_SUGGESTED_CLASSES} /> */}
      </div>
    </Form>
  );
}

function formatTime(dateString, timeString) {
  // Combine date and time into a single string
  const combinedString = `${dateString?.split("T")[0]}T${timeString}`;

  // Create a new Date object
  const dateObj = new Date(combinedString);

  // Format the time in 'en-US' locale
  return dateObj.toLocaleTimeString("en-US");
}
