import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import { setModalType } from "../../features/modal/modalSlice";
export default function ProductDetails({ data }) {
  const dispatch = useDispatch();
  const { imageUrl, productName, description, price, availability, colors } =
    data;
  const { Form, state } = useFetcher();
  const isSubmitting = state === "submitting";
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [currentSelectedSize, setCurrentSelectedSize] = useState({
    size: null,
    index: null,
  });
  const { userRole } = useSelector((state) => state.userRole);
  const handleColorChange = (index) => {
    setSelectedColorIndex(index);
    setCurrentSelectedSize({ size: null, index: null });
  };

  const selectedColor = colors[selectedColorIndex];
  const availableSizes = selectedColor ? selectedColor.sizes : [];
  const isBookingValide =
    isSubmitting ||
    (currentSelectedSize.size === null && currentSelectedSize.index === null);
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300  mb-4">
              <img
                loading="lazy"
                className=" rounded-md w-full h-full object-cover"
                src={imageUrl}
                alt={productName}
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                {(userRole.toLowerCase() === "member" ||
                  userRole.toLowerCase() === "coach") && (
                  <Form method="POST">
                    <button
                      disabled={isBookingValide}
                      type="submit"
                      className={`w-full ${
                        !isBookingValide ? "bg-gray-900" : " bg-gray-500"
                      }  text-white py-2 px-4 rounded-full font-bold ${
                        !isBookingValide && " hover:bg-gray-800"
                      } `}
                    >
                      {!isSubmitting
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {productName}
            </h2>
            <p className="text-gray-600  text-sm mb-4">{description}</p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 ">Price: </span>
                <span className="text-gray-600 ">{price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Availability: </span>
                <span className="text-gray-600 ">{availability}</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
