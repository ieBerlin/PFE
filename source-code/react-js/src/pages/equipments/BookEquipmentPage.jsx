import { useSelector } from "react-redux";
import ForbiddenPage from "../../components/ForbiddenPage.jsx";
import ProductDetails from "./ProductDetails.jsx";
export default function BookEquipmentPage() {
  const userRole = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "member"
  );

  if (!userRole) {
    return (
      <ForbiddenPage
        title=" Access Denied: Members Only"
        message="This section is restricted to members only. Please log in with your member credentials to proceed."
      />
    );
  }
  return <ProductDetails />;
}
