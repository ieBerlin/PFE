import Announce from "./Announce";
import { useEffect, useRef, useState } from "react";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import ForbiddenPage from "../../../components/ForbiddenPage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchFun, getToken, queryClient } from "../../../hooks/http";
import { useParams } from "react-router-dom";
import FallbackText from "../../../components/FallbackText";
import ItemNotFound from "../../../components/ItemNotFound";
import ErrorMessage from "../../../components/ErrorMessage";
export default function CoachingPage() {
  useEffect(
    () =>
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      }),
    []
  );
  const userRole = useSelector((state) => {
    const userRole = state?.userRole?.userRole?.toLowerCase();
    return ["member", "coach"].some((role) => userRole === role);
  });
  const isCoach = useSelector(
    (state) => state.userRole.userRole?.toLowerCase() === "coach"
  );
  let userId;
  const params = useParams();
  if (params.userId) {
    userId = params.userId;
  } else {
    userId = params.coachId;
  }

  const {
    data: messages,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await fetchFun({
        url: `http://localhost:8081/messages/${userId}`,
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      });
      return response;
    },
    retry: 2,
  });
  const { mutate } = useMutation({
    mutationKey: ["message"],
    mutationFn: async (data) => {
      return await fetchFun({
        url: `http://localhost:8081/messages/${userId}`,
        options: {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "x-access-token": getToken(),
            "Content-Type": "application/json",
          },
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fd = {
      message: formData.get("message"),
    };
    mutate(fd);
  };

  if (!userRole) {
    return (
      <ForbiddenPage
        title="Members Only && Coaches Only"
        message="This section is restricted to members and coaches only. Please log in with your member credentials to proceed."
      />
    );
  }

  if (isPending) {
    return <FallbackText title="Fetching Available messages..." />;
  }
  if (isError) {
    if (error?.code === 404) {
      return <ItemNotFound title="There're no messages." />;
    } else {
      return (
        <div className="">
          <h1 className="font-medium text-lg text-red-500">Errors </h1>
          {error
            ? Object.entries(error.info).map(([key, value]) => (
                <ErrorMessage key={key} title={key} message={value} />
              ))
            : "An error occured!"}
        </div>
      );
    }
  }
  console.log(messages);

  return (
    <div>
      <div>
        <div
          style={{ minHeight: "calc(100vh - 100px)" }}
          className="mt-4 mb-16 "
        >
          {messages &&
            messages?.length > 0 &&
            messages.map((item) => (
              <Announce
                key={item?.message_id}
                title={item?.message}
                messageDate={item?.created_at}
                coachName={item.name}
              />
            ))}
        </div>
      </div>
      {isCoach && (
        <form onSubmit={handleSubmit} className="fixed bottom-0 right-0">
          <div className="relative border-2 rounded-md mx-3 mb-4">
            <textarea
              name="message"
              id="hs-textarea-ex-1"
              className="p-4 pb-12 w-[300px] border-gray-500 bg-gray-50 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
              placeholder="Type me anything..."
            ></textarea>

            <div className="absolute inset-x-px p-2 rounded-b-md bg-gray-50 bottom-0 right-0">
              <div className="flex justify-end items-center gap-4 ">
                <div className="flex items-center gap-x-1">
                  <button
                    type="submit"
                    className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500"
                  >
                    <PaperAirplaneIcon className="flex-shrink-0 size-3.5 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
