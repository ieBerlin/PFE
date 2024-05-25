import ProductDetails from "./ProductDetails.jsx";
export default function BookEquipmentPage() {
  return <ProductDetails />;
}

const productDetails = {
  imageUrl:
    "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
  productName: "Product Name",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt.",
  price: "$29.99",
  availability: "In Stock",
  colors: [
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
  ],
};
