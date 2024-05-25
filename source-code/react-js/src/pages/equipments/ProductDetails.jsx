import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useParams } from "react-router-dom";
import { setModalType } from "../../features/modal/modalSlice";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import SuccessMessage from "../../components/SuccessMessage.jsx";
import FallbackText from "../../components/FallbackText.jsx";
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
        retryDelay: 3
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
    mutationFn: async (data) =>
      await fetchFun({
        url: "http://localhost:8081/booking",
        options: {
          method: "POST",
          body: JSON.stringify({ ...data, equipmentId }),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": getToken(),
          },
        },
      }),
  });
  const { Form, state } = useFetcher();
  const isSubmitting = state === "submitting";
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [currentSelectedSize, setCurrentSelectedSize] = useState({
    size: null,
    index: null,
  });
  const userRole = useSelector((state) => state.userRole?.userRole);
  if (results[0].isPending) {
    return <FallbackText title="Fetching equipment details" />;
  }
  if (!results[0].data) {
    <FallbackText title="Nothing to show!" />;
  }
  const { name, description, price } = results[0].data;
  const colors = [
    {
      color: "#000",
      sizes: [
        { size: "S", available: true },
        { size: "M", available: false },
        { size: "L", available: true },
        { size: "XL", available: true },
        { size: "XXL", available: false },
      ],
    },
    {
      color: "#FF0000",
      sizes: [
        { size: "S", available: false },
        { size: "M", available: true },
        { size: "L", available: true },
        { size: "XL", available: false },
        { size: "XXL", available: true },
      ],
    },
  ];
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

  const handleColorChange = (index) => {
    setSelectedColorIndex(index);
    setCurrentSelectedSize({ size: null, index: null });
  };

  const selectedColor = colors[selectedColorIndex];
  const availableSizes = selectedColor ? selectedColor.sizes : [];
  const isBookingValide =
    availabilityData.error?.info.unavailability ||
    availabilityData.isPending ||
    isSubmitting ||
    (currentSelectedSize.size === null && currentSelectedSize.index === null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      size: currentSelectedSize.size,
      color: colors[selectedColorIndex]?.color,
    };
    mutate(formData);
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300  mb-4">
              <img
                loading="lazy"
                className=" rounded-md w-full h-full object-cover"
                src={
                  "data:image/jpeg;base64,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"
                }
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
                      className={`w-full ${
                        !isBookingValide ? "bg-gray-900" : " bg-gray-500"
                      }  text-white py-2 px-4 rounded-full font-bold ${
                        !isBookingValide && " hover:bg-gray-800"
                      } `}
                    >
                      {availabilityData?.error?.info.unavailability
                        ? availabilityData?.error?.info.unavailability
                        : !isSubmitting && !availabilityData.isPending
                        ? currentSelectedSize.size && currentSelectedSize.index
                          ? "Book Now"
                          : "Choose Equipment"
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
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 text-gray-800  py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-gray-600  text-sm mb-4">{description}</p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 ">Price: </span>
                <span className="text-gray-600 ">${price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Availability: </span>
                <span className="text-blue-600 font-semibold ">
                  {availability}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 ">Select Color:</span>
              <div className="flex items-center mt-2 bg-gray-300 w-min p-4 rounded-md">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    style={{ backgroundColor: color.color }}
                    onClick={() => handleColorChange(index)}
                    className={`w-6 h-6 rounded-full mr-2 ${
                      index === selectedColorIndex ? "ring-gray-500 ring-2" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 ">Select Size:</span>
              <div className="flex items-center mt-2 bg-gray-300 w-min p-4 rounded-md">
                {availableSizes.map(({ size, available }, index) => (
                  <button
                    key={index}
                    disabled={!available}
                    className={`${
                      !available
                        ? "bg-red-400 text-black"
                        : index === currentSelectedSize.index
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-400 text-white"
                    } ${
                      available && "hover:bg-emerald-500 hover:text-white"
                    } py-2 px-4 rounded-full font-bold mr-2`}
                    onClick={() => setCurrentSelectedSize({ size, index })}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
