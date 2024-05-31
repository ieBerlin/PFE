import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useParams } from "react-router-dom";
import { setModalType } from "../../features/modal/modalSlice";
import { useMutation, useQueries } from "@tanstack/react-query";
import { fetchFun, getToken, queryClient } from "../../hooks/http";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import SuccessMessage from "../../components/SuccessMessage.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import { BellAlertIcon } from "@heroicons/react/20/solid";
import ItemNotFound from "../../components/ItemNotFound.jsx";
export default function ProductDetails() {
  const dispatch = useDispatch();
  const { equipmentId } = useParams();
  const results = useQueries({
    queries: [
      {
        queryKey: [
          "equipments",
          "equipments-" + equipmentId,
          "bookings-" + equipmentId,
        ],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/equipments/" + equipmentId,
            options: {
              method: "GET",

              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
        retry: 2,
      },
      {
        queryKey: ["bookings", "bookings-" + equipmentId],
        queryFn: async () =>
          await fetchFun({
            url:
              "http://localhost:8081/equipments/check-availability/" +
              equipmentId,
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
        retry: 2,
      },
    ],
  });

  let availability;
  const availabilityData = results[1];
  if (
    availabilityData.isError &&
    availabilityData.error &&
    availabilityData.error.info?.unavailability
  ) {
    availability = availabilityData.error.info.unavailability;
  }
  if (availabilityData.data && availabilityData.data.availability) {
    availability = "Available";
  }
  const {
    mutate,
    data: serverSideData,
    isPending: isFetching,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationKey: ["equipments", "equipments-" + equipmentId],
    mutationFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/booking",
        options: {
          method: "POST",
          body: JSON.stringify({ equipmentId }),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": getToken(),
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "equipments-" + equipmentId,
        "bookings-" + equipmentId,
      ]);
    },
  });
  const { Form, state } = useFetcher();
  const isSubmitting = state === "submitting";
  const userRole = useSelector((state) => state.userRole?.userRole);
  if (results[0].isPending) {
    return <FallbackText title="Fetching equipment details" />;
  }
  if (!results[0].data) {
    <FallbackText title="Nothing to show!" />;
  }
  if (results[0].isError && results[0].error?.code === 404) {
    return (
      <ItemNotFound title="The equipment information could not be retrieved." />
    );
  }
  const { name, description, price } = results[0].data;

  let content;
  content = !isFetching && isMutationError && (
    <div className="">
      <h1 className="font-medium text-lg text-red-500">Errors </h1>
      {mutationError
        ? Object.entries(mutationError.info).map(([key, value]) => (
            <ErrorMessage key={key} title={key} message={value} />
          ))
        : "An error occured!"}
    </div>
  );

  if (serverSideData && !isFetching) {
    content = (
      <div className="">
        <h1 className="font-medium text-lg text-emerald-500">
          Server feedback{" "}
        </h1>
        <SuccessMessage
          title="Request Successful"
          message="Your request has been processed successfully."
        />
      </div>
    );
  }

  const isBookingValide =
    availabilityData.error?.info.unavailability ||
    availabilityData.isPending ||
    isSubmitting;

  function handleSubmit(e) {
    e.preventDefault();
    mutate();
  }
  const quantity = results[0].data?.availableQuantity;
  const image = results[0].data.image
    ? "http://localhost:8081/uploads/images/equipment/" + results[0].data.image
    : "http://localhost:8081/uploads/images/equipment/default-equipment-image.jpg";
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300  mb-4">
              <img
                loading="lazy"
                className=" rounded-md w-full h-full object-cover"
                src={image}
                alt={name}
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                {(userRole.toLowerCase() === "member" ||
                  userRole.toLowerCase() === "coach") && (
                  <Form onSubmit={handleSubmit}>
                    <button
                      disabled={isBookingValide}
                      type="submit"
                      className={`w-full  capitalize ${
                        !isBookingValide ? "bg-gray-900" : " bg-gray-500"
                      }  text-white py-2 px-4 rounded-full font-bold ${
                        !isBookingValide && " hover:bg-gray-800"
                      } `}
                    >
                      {availabilityData?.error?.info.unavailability
                        ? availabilityData?.error?.info.unavailability
                        : !isSubmitting && !availabilityData.isPending
                        ? "Book Now"
                        : "Processing..."}
                    </button>
                  </Form>
                )}
                {userRole.toLowerCase() === "admin" && (
                  <button
                    onClick={() =>
                      dispatch(setModalType("edit-equipment-informations"))
                    }
                    type="submit"
                    className={`w-full ${"bg-gray-900"}  text-white py-2 px-4 rounded-full font-bold ${" hover:bg-gray-800"} `}
                  >
                    Edit Informations
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-gray-600  text-sm mb-4">{description}</p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 ">Price: </span>
                <span className="text-gray-600 ">{price} DZD</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Availability: </span>
                <span className="text-blue-600 font-semibold ">
                  {quantity + " left" ?? "unknown"}
                </span>
              </div>
            </div>

            <h1 className="text-red-500 font-semibold">
              Note : <br />{" "}
              <span className="text-gray-700">
                If you've reserved this item, please ensure it is returned
                within 10 days, or you will receive a ban.
              </span>
            </h1>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
