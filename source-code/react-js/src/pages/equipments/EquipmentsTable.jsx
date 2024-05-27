import {
  ChevronDownIcon,
  CalendarDaysIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import SuccessMessage from "../../components/SuccessMessage.jsx";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import FilterDropdown from "../../components/FilterDropdown";
import { fetchFun, getToken, queryClient } from "../../hooks/http";
const selectedBookings = {
  userType: {
    coach: true,
    member: true,
  },
  status: {
    rejected: true,
    pending: true,
    approved: true,
  },
};
export default function EquipmentsTable({ data }) {
  const [currentSelectedBookings, setCurrentSelectedBookings] =
    useState(selectedBookings);

  const filteredBookings = filterBookings(data, currentSelectedBookings);

  return (
    <>
      <div className="flex flex-row w-full px-4 pt-2 mt-2 justify-between items-center">
        <div className="font-semibold text-2xl">
          All Reservations{" "}
          <span className="text-gray-600 text-lg">
            ({filteredBookings.length})
          </span>
        </div>
        <FilterDropdown
          currentSelectedData={currentSelectedBookings}
          setData={setCurrentSelectedBookings}
          filterOptionsData={[
            {
              title: "user.Type",
              options: ["member", "coach"],
            },
            {
              title: "status",
              options: ["pending", "approved", "rejected"],
            },
          ]}
        />
      </div>
      {!filteredBookings || filteredBookings.length === 0 ? (
        <div className="mt-4 bg-white px-6 py-4 shadow-md mx-2">
          <p className="text-stone-500 text-center font-bold text-xl">
            No Bookings found!
          </p>
        </div>
      ) : (
        <div className="flex flex-col bg-white shadow-sm px-2 mt-7">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                      >
                        Booking ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Booking Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                      >
                        Staff
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                      >
                        User Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    {filteredBookings.map((booking, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                            {booking.bookingId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium ">
                            {booking.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                            {booking.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                            <Link to={`/users/${booking.userId}`}>
                              {booking.staff}
                            </Link>
                          </td>
                          <UserTypeData type={booking.staff} />
                          <StatusTableData
                            status={booking.status}
                            data={booking}
                          />
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                            ${booking.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function StatusTableData({ status, data }) {
  const {
    mutate,
    isPending: isSubmitting,
    isError,
    error,
    data: responseData,
  } = useMutation({
    mutationKey: ["equipments", "bookings"],
    mutationFn: async (data) =>
      await fetchFun({
        url: `${"http://localhost:8081/booking/" + data.bookingId}`,
        options: {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      }),
    onSuccess: async (data) =>
      await queryClient.invalidateQueries([
        "equipments",
        "bookings",
        "equipments-" + data.bookingId,
      ]),
  });
  let content;
  if (isError) {
    content = (
      <div className="">
        <h1 className="font-medium text-lg text-red-500">Errors </h1>
        {error
          ? Object.entries(error.info).map(([key, value]) => (
              <ErrorMessage key={key} title={key} message={value} />
            ))
          : "An error occured!"}
      </div>
    );
  } else if (responseData) {
    content = (
      <div>
        <h1 className="font-medium text-lg text-emerald-500">
          Server feedback{" "}
        </h1>
        <div className="flex flex-row">
          <SuccessMessage
            title="Request Successful"
            message="Your request has been processed successfully."
          />
        </div>
      </div>
    );
  }

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const fd = {
      bookingId: data.bookingId,
      status: formData.get("status"),
    };
    mutate(fd);
  }
  let textStyle;
  if (status.toLowerCase() === "pending") {
    textStyle = " text-amber-500";
  } else if (status.toLowerCase() === "approved") {
    textStyle = " text-green-500";
  } else if (status.toLowerCase() === "rejected") {
    textStyle = " text-red-500";
  } else {
    textStyle = " text-gray-800";
  }

  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm ${textStyle} font-medium`}
    >
      {status.toLowerCase() === "pending" ? (
        <Popover>
          <PopoverHandler>
            <Button className="p-0 shadow-none flex items-center flex-row bg-white">
              <span className="text-amber-500 ">Pending</span>
              <ChevronDownIcon className="text-amber-500 w-4 h-4 ml-2" />
            </Button>
          </PopoverHandler>
          <PopoverContent className="z-[999] overflow-hidden p-0">
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-row items-center justify-start px-8 bg-gray-100 gap-3 w-full  py-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg"
                  alt=""
                />
                <h1 className="font-bold tracking-wide">{data.staff}</h1>
              </div>
              <div className="grid grid-cols-2 justify-center">
                <div className="flex flex-row items-center  justify-center  m-2 gap-2">
                  <h3 className="text-gray-700">From </h3>
                  <h1 className="text-black font-semibold px-2 py-2 bg-gray-100 flex flex-row items-center gap-2 text-nowrap rounded-sm">
                    <CalendarDaysIcon className="w-4 h-4 text-gray-600" />
                    {data.date}
                  </h1>
                </div>
                <div className="flex flex-row items-center   justify-center m-2 gap-2">
                  <h3 className="text-gray-700">To </h3>
                  <h1 className="text-black font-semibold px-2 py-2 bg-gray-100 flex flex-row items-center gap-2 text-nowrap rounded-sm">
                    <CalendarDaysIcon className="w-4 h-4 text-gray-600" />
                    {data.time}
                  </h1>
                </div>
              </div>
              <div className="bg-gray-100 px-10 py-2 flex flex-row items-center justify-between">
                <h1 className="font-semibold text-black">Status</h1>
                <select
                  name="status"
                  className="py-2 outline-none px-4 pe-9  border-gray-200 rounded-lg text-sm border-1 focus:border-blue-500 ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <option value="pending">pending</option>
                  <option value="rejected">rejected</option>
                  <option value="approved">approved</option>
                </select>

                {/* <Button
                  onClick={handlePendingButtonClick}
                  className="flex flex-row items-center gap-2 w-min p-2 text-blue-600 shadow-none bg-blue-200"
                >
                  Pending <PencilIcon className=" text-blue-600 w-5 h-5" />
                </Button> */}
              </div>
              {/* {isStatusChanged && (
                <div className="flex gap-x-6 justify-center my-2">
                  <div className="flex">
                    <input
                      onChange={(e) => setIsPendingChanged(e.target.checked)}
                      type="radio"
                      name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600"
                      id="hs-radio-group-1"
                      defaultChecked
                    />
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ms-2"
                    >
                      Pending
                    </label>
                  </div>

                  <div className="flex">
                    <input
                      onChange={(e) => setIsPendingChanged(!e.target.checked)}
                      type="radio"
                      name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 "
                      id="hs-radio-group-2"
                    />
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ms-2"
                    >
                      Rejected
                    </label>
                  </div>

                  <div className="flex">
                    <input
                      onChange={(e) => setIsPendingChanged(!e.target.checked)}
                      type="radio"
                      name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 "
                      id="hs-radio-group-3"
                    />
                    <label
                      htmlFor="hs-radio-group-3"
                      className="text-sm text-gray-500 ms-2"
                    >
                      Approved
                    </label>
                  </div>
                </div>
              )} */}
              <div className="px-10 py-4">
                <h3 className="font-medium text-black pt-1">Booking Details</h3>
                <div className="bg-gray-100 mt-2">
                  <div>
                    <h2 className="min-w-40 font-semibold inline-block  px-4 py-2">
                      Booking ID{" "}
                    </h2>
                    <p className="inline">{data.bookingId}</p>
                  </div>
                  <div>
                    <h2 className="min-w-40 font-semibold inline-block  px-4 py-2">
                      User Type{" "}
                    </h2>
                    <p className="inline">{data.staff}</p>
                  </div>
                  <div>
                    <h2 className="min-w-40 font-semibold inline-block  px-4 py-2">
                      Price{" "}
                    </h2>
                    <p className="inline">{data.price}</p>
                  </div>
                </div>
              </div>{" "}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={`${
                    isSubmitting ? "bg-gray-200" : "bg-blue-600 "
                  }   ${
                    isSubmitting ? "text-gray-500 " : "text-white"
                  } outline-none inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                    !isSubmitting && "hover:bg-blue-500"
                  } sm:ml-3 sm:w-auto`}
                  // onClick={() => }
                >
                  {isSubmitting ? "Loading..." : "Edit"}
                </button>
              </div>
              <div className="flex w-full justify-center px-3 py-2">
                {content}
              </div>
            </Form>
          </PopoverContent>
        </Popover>
      ) : (
        status
      )}
    </td>
  );
}
function UserTypeData({ type }) {
  let styles;
  if (type?.toLowerCase() === "coach") {
    styles = " text-blue-700 bg-blue-200";
  } else if (type?.toLowerCase() === "member") {
    styles = " text-emerald-700 bg-emerald-200";
  } else {
    styles = " text-gray-900 bg-gray-200";
  }
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm  font-medium">
      <div className={`${styles} text-center rounded-md`}>{type}</div>
    </td>
  );
}

const filterBookings = (data, selectedBookings) => {
  return data.filter((booking) => {
    console.log(booking)
    const isUserTypeSelected = Object.entries(selectedBookings.userType).every(
      ([userType, isSelected]) =>
        isSelected || booking?.staff?.toLowerCase() !== userType
    );
    const isStatusSelected = Object.entries(selectedBookings.status).every(
      ([status, isSelected]) =>
        isSelected || booking.status.toLowerCase() !== status
    );

    return isUserTypeSelected && isStatusSelected;
  });
};
