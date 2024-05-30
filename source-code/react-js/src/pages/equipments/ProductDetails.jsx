import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useParams } from "react-router-dom";
import { setModalType } from "../../features/modal/modalSlice";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { fetchFun, getToken, queryClient } from "../../hooks/http";
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
        retryDelay: 3,
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
    onSuccess: () => {
      queryClient.invalidateQueries([
        "equipments-" + equipmentId,
        "bookings-" + equipmentId,
      ]);
    },
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
                  "http://localhost:8081/uploads/images/equipment/default-equipment-image.jpg"
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
