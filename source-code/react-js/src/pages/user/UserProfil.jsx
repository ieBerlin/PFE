import UserProfileDetails from "./UserProfileDetails";
import FallbackText from "../../components/FallbackText";
import { useQuery } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http";

export default function UserProfile() {
  const { isPending, error, data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const token = getToken();

      try {
        const response = await fetchFun({
          url: "http://localhost:8081/user/profile",
          options: {
            method: "GET",
            headers: { "x-access-token": token },
          },
        });
        return response
      } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
    },
  });
  if (isPending) {
    return <FallbackText title="Fetching user profile data" />;
  }

  if (error || !data) {
    const errorMessage =
      error?.info || "Error fetching user profile data. Please try again later";
    return (
      <h1 className="font-medium text-gray-900 text-xl px-6 py-3 text-center">
        {errorMessage}.
      </h1>
    );
  }

  return <UserProfileDetails data={data} />;
}
