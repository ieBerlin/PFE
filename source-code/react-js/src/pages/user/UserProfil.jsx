import { defer, json } from "react-router-dom";
import UserProfileDetails from "./UserProfileDetails.jsx";
import { useEffect } from "react";
import FallbackText from "../../components/FallbackText.jsx";
import { useMutation } from "@tanstack/react-query";
import { fetchFunction } from "../../hooks/http.js";

export default function UserProfil() {
  const { isPending, error, isError, data, mutate } = useMutation({
    mutationKey: ["user-profile"],
    mutationFn: async ({ token }) => {
      try {
        return await fetchFunction({
          url: "http://localhost:8081/user/profile/",
          options: {
            method: "GET",
            headers: { "x-access-token": token },
          },
        });
      } catch (error) {
        throw new Error("Failed to fetch user profile"); // Throw a custom error message
      }
    },
  });
  // console.log(data);
  useEffect(() => {
    const token = localStorage.getItem("user-token") || undefined;
    if (!token) {
      throw json({ status: 403 });
    }
    mutate({ token });
  }, [mutate]);
  if (isPending) {
    return (
      <div className="px-5 py-7">
        <FallbackText title="Fetching user profile data" />
      </div>
    );
  }

  if (!isPending && data) {
    return <UserProfileDetails data={data} />;
  } else {
    return <p>Nothing to show!</p>;
  }
}

export function loader() {
  return defer({
    // timeOut: timeOut(),
  });
}
