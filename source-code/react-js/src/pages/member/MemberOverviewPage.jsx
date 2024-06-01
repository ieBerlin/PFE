import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import BillingHistory from "../../components/BillingHistory.jsx";
import { Link } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http.js";
import { useSelector } from "react-redux";
export default function MemberOverviewPage() {
  const isMember = useSelector(
    (state) => state?.userRole?.userRole?.toLowerCase() === "member"
  );

  const results = useQueries({
    queries: [
      {
        queryKey: ["membership"],
        queryFn: async () => {
          try {
            const data = await fetchFun({
              url: "http://localhost:8081/membership/membership-status",
              options: {
                method: "GET",
                headers: {
                  "x-access-token": getToken(),
                },
              },
            });
            return data;
          } catch (error) {
            return { status: false };
          }
        },
        enabled: isMember,
      },
      {
        queryKey: ["bookings"],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/booking/getUserEquipments",
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
        enabled: isMember,
      },
      {
        queryKey: ["billing"],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/transactions/user-transactions",
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },

      {
        queryKey: ["classes"],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/enrollements",
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },
      {
        queryKey: ["my-coaches"],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/coaches/get-user-coaches",
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
        enabled: isMember,
      },
    ],
  });
  const membershipStatusData = results[0].data;
  const equipmentsData = results[1].data || [];
  console.log(equipmentsData)
  const billingHistoryData = results[2].data || [];
  const upcomingClasses = results[3].data || [];
  const coachesData = results[4].data || [];
  console.log(coachesData)
  let membershipStatus;
  if (membershipStatusData && membershipStatusData.status) {
    membershipStatus = "active";
  } else {
    membershipStatus = "end";
  }
  const membershipStatusStyle =
    membershipStatus === "active"
      ? "emerald"
      : membershipStatus === "end"
      ? "red"
      : "blue";

  return (
    <div className="bg-gray-100 w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl mb-5">Overview</h1>
      <div className="px-5">
        {isMember && (
          <>
            <h3 className="text-gray-700 font-semibold text-xl">
              Membership Status
            </h3>
            <div className="flex flex-row gap-3 w-min whitespace-nowrap bg-blue-100 my-3 px-3 py-2 rounded-md items-center">
              <h3 className="text-gray-900 font-medium">Membership status :</h3>
              <p
                className={`text-${membershipStatusStyle}-500 capitalize font-semibold`}
              >
                {results[0].isPending ? (
                  <h1 className=" text-blue-700 px-3 py-2 rounded">
                    Loading...
                  </h1>
                ) : (
                  membershipStatus
                )}
              </p>
              {membershipStatus === "active" && (
                <div className=" flex flex-row gap-2 items-center px-3 py-1">
                  <h4 className="font-medium">From</h4>
                  <DateComponent data={membershipStatusData.from} />
                  <h4 className="font-medium">To</h4>
                  <DateComponent data={membershipStatusData.to} />
                </div>
              )}{" "}
            </div>
          </>
        )}

        <h3 className="text-gray-700 font-semibold text-xl mb-3">
          Upcoming Classes{" "}
          {isMember ? "You've Signed Up For" : "You're Coaching"}
        </h3>

        {upcomingClasses && upcomingClasses.length > 0 ? (
          <div
            className="grid gap-3 bg-white p-2 rounded-md mb-3 justify-center"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(auto,250px))",
            }}
          >
            {upcomingClasses.map((classItem) => (
              <ClassItem key={classItem.id} data={classItem} />
            ))}
          </div>
        ) : (
          <EmptyComponent title="There's no classes!" />
        )}
        {isMember && (
          <>
            {" "}
            <h3 className="text-gray-700 font-semibold text-xl">
              Coaches You're Training With
            </h3>
            {coachesData && coachesData.length > 0 ? (
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(auto,250px))",
                }}
              >
                {coachesData.map((coach) => (
                  <Card
                    key={coach.userId}
                    data={coach}
                    href={`/coaches/${coach.userId}`}
                  >
                    <img
                      className="object-cover flex w-full h-full"
                      src={
                        coach.image
                          ? "http://localhost:8081/uploads/images/profile/" +
                            coach.image
                          : "http://localhost:8081/uploads/images/sport/coach.jpg"
                      }
                      alt="Coach"
                    />
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyComponent title="There's no coaches to show !" />
            )}
          </>
        )}
        {isMember && (
          <>
            <h3 className="text-gray-700 font-semibold text-xl">
              Equipment Already Booked
            </h3>
            {equipmentsData && equipmentsData.length > 0 ? (
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(auto,250px))",
                }}
              >
                {equipmentsData.map((equipment) => (
                  <Card
                    key={equipment.id}
                    data={equipment}
                    href={`/equipments/book/${equipment.id}`}
                  >
                    <img
                      className="object-cover flex w-full h-full"
                      src={
                        equipment.image
                          ? "http://localhost:8081/uploads/images/equipment/" +
                            equipment.image
                          : "http://localhost:8081/uploads/images/equipment/default-equipment-image.jpg"
                      }
                      alt="Coach"
                    />
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyComponent title="There's no equipments to show !" />
            )}
          </>
        )}
        {isMember && (
          <>
            {" "}
            <h3 className="text-gray-700 font-semibold text-xl">
              Billing History
            </h3>
            <BillingHistory data={billingHistoryData} />
          </>
        )}
      </div>
    </div>
  );
}

function DateComponent({ data }) {
  const date = new Date(data).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="rounded-lg flex flex-row items-center gap-2 justify-center p-2  whitespace-nowrap">
      <CalendarIcon className="w-5 h-5 text-blue-600" />
      <p className="text-blue-800 font-medium text-sm">{date}</p>
    </div>
  );
}

function Card({ data, children, href }) {
  return (
    <li className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
        {children}
      </div>
      <div className="mt-2 px-5 pb-5">
        <Link to={href}>
          <h5 className="text-xl tracking-tight text-center text-slate-900">
            {data.name}
          </h5>
        </Link>

        <Link
          to={href}
          className="mt-2 flex items-center justify-center rounded-md bg-amber-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          See Progress <ChevronRightIcon className="ml-2 h-6 w-6" />
        </Link>
      </div>
    </li>
  );
}
function EmptyComponent({ title }) {
  return (
    <h3 className="text-black text-xl my-3 bg-white py-3 rounded-md text-center font-semibold">
      {title}
    </h3>
  );
}
function ClassItem({ data }) {
  const date = new Date(data.startDate);
  const formattedDate = date.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedStartTime = formatTime(data.startDate, data.startTime);

  function formatTime(dateString, timeString) {
    const combinedString = `${dateString.split("T")[0]}T${timeString}`;

    const dateObj = new Date(combinedString);

    return dateObj.toLocaleTimeString("en-US");
  }
  return (
    <Link to={"/classes/" + data.classId}>
      <div className="p-3 bg-slate-200 rounded md">
        <h1 className="font-semibold">
          Name :<span className="text-blue-700">{data.name}</span>
        </h1>
        <h1 className="font-semibold">
          Status :{" "}
          <span
            className={
              data.status === "pending" ? "text-amber-500" : "text-emerald-500"
            }
          >
            {data.status}
          </span>
        </h1>
        <h1 className="font-semibold">
          Date : <span className="text-blue-700">{formattedDate}</span>
        </h1>

        <h1 className="font-semibold">
          At <span className="text-blue-700">{formattedStartTime}</span>
        </h1>
      </div>
    </Link>
  );
}
