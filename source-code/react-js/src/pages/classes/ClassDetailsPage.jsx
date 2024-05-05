import { Await, defer, json, Link, useLoaderData } from "react-router-dom";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { fetchFunction, getToken } from "../../hooks/http.js";
import FallbackText from "../../components/FallbackText.jsx";
import { Suspense } from "react";
import SuggestedClassItem from "./SuggestedClassItem.jsx";
import classes from "./ClassDetailPage.module.css";
import brokenLinkSvg from "../../assets/broken-link-svgrepo-com.svg";

export default function ClassDetailsPage() {
  const loaderData = useLoaderData();

  return (
    <section className={classes.sectionContainer}>
      <Suspense
        fallback={
          <FallbackText title="Fetching available class information..." />
        }
      >
        <Await resolve={loaderData}>
          {(resolvedData) => {
            console.log(resolvedData);
            if (!resolvedData || resolvedData.status !== 200) {
              return <NotFoundMessage />;
            } else {
              const { data } = resolvedData;
              console.log(data)
              return (
                <ClassInformations
                  title={data.name}
                  description={data.description}
                  date={data.date}
                  time={data.time}
                  instructor={data.instructor_name}
                  currentEnrollementCount={data.current_enrollement_count}
                  maximumCapacity={data.maximum_capacity}
                  status={data.status}
                  
                />
              );
            }
          }}
        </Await>
      </Suspense>
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

function ClassInformations({ title, description, date, time }) {
  return (
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
          <div className="flex flex-row justify-between items-center my-2 gap-1 text-center">
            <div className="w-full flex flex-row items-center gap-2 justify-center bg-gray-100 p-2 rounded-md">
              <CalendarIcon className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600 text-sm font-medium">{date}</p>
            </div>
            <div className="flex flex-row items-center gap-2 justify-center bg-gray-100 p-2 rounded-md whitespace-nowrap">
              <ClockIcon className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600 text-sm font-medium">{time}</p>
            </div>
          </div>
          <div>
            <span className="font-medium text-lg text-gray-900">With: </span>
            <a href="" className="font-medium text-md text-gray-700">
              {" "}
              ieBerlin
            </a>
          </div>
        </div>
      </div>
      <div className="my-3 w-full flex justify-center">
        <button
          type="submit"
          className={`my-3 mx-auto w-min whitespace-nowrap  bg-blue-600
                text-white py-2 px-8 rounded-lg font-bold
                hover:bg-blue-500
           `}
        >
          Enroll Now
        </button>
      </div>
      {/* <RelatedItems title="Related Classes" items={DUMMY_SUGGESTED_CLASSES} /> */}
      {/* <RelatedItems title="Related Coaches" items={DUMMY_SUGGESTED_CLASSES} /> */}
    </div>
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
  const token = getToken();
  if (!token) {
    return json({ status: 403 });
  }
  return await fetchFunction({
    url: `http://localhost:8081/class/${classId}`,
    options: {
      headers: { "x-access-token": token, method: "GET" },
    },
  });
}