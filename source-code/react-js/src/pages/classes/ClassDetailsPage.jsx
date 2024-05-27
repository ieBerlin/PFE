import {
  Await,
  Form,
  json,
  Link,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { fetchFun, getToken, queryClient } from "../../hooks/http.js";
import FallbackText from "../../components/FallbackText.jsx";
import { Suspense } from "react";
import SuggestedClassItem from "./SuggestedClassItem.jsx";
import classes from "./ClassDetailPage.module.css";
import brokenLinkSvg from "../../assets/broken-link-svgrepo-com.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
export default function ClassDetailsPage() {
  const { classId } = useParams();

  const {
    isPending,
    isError,
    error,
    data: loaderData,
  } = useQuery({
    queryKey: ["enrollments-requests"],
    queryFn: async () =>
      await fetchFun({
        url: `http://localhost:8081/class/${classId}`,
        options: {
          headers: { "x-access-token": getToken(), method: "GET" },
        },
      }),
  });
  if (isPending) {
    return <FallbackText title="Fetching enrollement requests" />;
  }
  if (isError) {
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
    classData.startDate,
    classData.startTime
  );
  const formattedEndTime = formatTime(classData.endDate, classData.endTime);
  return (
    <section className={classes.sectionContainer}>
      <ClassInformations
        instructorData={instructorData}
        title={classData.name}
        description={classData.description}
        date={formattedDate}
        startTime={formattedStartTime}
        endTime={formattedEndTime}
        maximumCapacity={classData.maximum_capacity}
        instructor={classData.instructor_name}
        currentEnrollementCount={classData.current_enrollment_count}
        status={classData.status}
        classId={classData.classId}
        enrollmentResult={enrollmentResult}
      />
    </section>
  );
}

function NotFoundMessage() {
  return (
    <div className={classes.notFoundContainer}>
      <img src={brokenLinkSvg} alt="" />
      <p>Sorry, the sport you are looking for cannot be found.</p>
      <p>Please check the URL or try navigating back to the classes page.</p>
      <Link to="/classes" className={classes.backButton}>
        Go back to classes page
      </Link>
    </div>
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
  const { isPending, isError, error, mutate, data } = useMutation({
    mutationKey: ["classes"],
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
    onSuccess: () => queryClient.invalidateQueries(["enrollments-requests"]),
  });
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const transactionData = {
      // applicant_user_id:,
      // class_id:,
    };
    mutate(transactionData);
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

  if (data && !isPending) {
    dispatch(setModalType("confirm-add-equipment"));
  }
  let buttonLabel;
  if (enrollmentResult && enrollmentResult.status === "pending") {
    buttonLabel = "Pending";
  } else if (currentEnrollementCount >= maximumCapacity) {
    buttonLabel = "Full";
  } else {
    buttonLabel = "Enroll now";
  }

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
              src="https://cdn.onefc.com/wp-content/uploads/2022/10/Zhang-Peimian-Jonathan-Di-Bella-ONE162-1920X1280-15.jpg"
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
                to={`/coaches/${instructorData.userId}`}
                className="font-medium text-md text-gray-700 bg-blue-100 px-3 py-1 rounded-md"
              >
                {" "}
                {instructorData.name}
              </Link>
            </div>
            <div className=" my-2">
              <h3 className="text-gray-700 font-semibold text-lg capitalize">
                Category : {category}
                <span className="text-red-500 bg-red-100 rounded-md px-3 py-1">
                  Kickboxing
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
        <div className="my-3 w-full flex justify-center">
          <button
            disabled={enrollmentResult.status}
            type="submit"
            className={`my-3 mx-auto w-min whitespace-nowrap rounded-lg font-bold py-2 px-8 
              ${
                enrollmentResult && enrollmentResult.status === "pending"
                  ? "bg-yellow-500 text-white"
                  : currentEnrollementCount >= maximumCapacity
                  ? "bg-red-600 text-white"
                  : "bg-cyan-600 text-white hover:bg-cyan-400  hover:scale-105 "
              }
               hover:shadow-lgtransition duration-300`}
          >
            {buttonLabel}
          </button>
        </div>
        {content}
        {/* <RelatedItems title="Related Classes" items={DUMMY_SUGGESTED_CLASSES} /> */}
        {/* <RelatedItems title="Related Coaches" items={DUMMY_SUGGESTED_CLASSES} /> */}
      </div>
    </Form>
  );
}

function RelatedItems({ title, items }) {
  return (
    <div className={classes.relatedClasses}>
      <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
      <ul>
        {items.map((item) => (
          <SuggestedClassItem
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>
      <div className={classes.allClassesButton}>
        <Link to={`/all-${title.toLowerCase().replace(" ", "-")}`}>
          See all {title.toLowerCase()}
        </Link>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const { classId } = params;
  if (Number.isNaN(+classId)) {
    return json({ status: 300 });
  }

  const data = await fetchFun({
    url: `http://localhost:8081/class/${classId}`,
    options: {
      headers: { "x-access-token": getToken(), method: "GET" },
    },
  });
  return data;
}
function formatTime(dateString, timeString) {
  // Combine date and time into a single string
  const combinedString = `${dateString.split("T")[0]}T${timeString}`;

  // Create a new Date object
  const dateObj = new Date(combinedString);

  // Format the time in 'en-US' locale
  return dateObj.toLocaleTimeString("en-US");
}
