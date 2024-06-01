import { TrashIcon } from "@heroicons/react/24/outline";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchFun, getToken, queryClient } from "../../hooks/http";
import ItemNotFound from "../../components/ItemNotFound";
import { useRef } from "react";
import { setModalType } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import Modal from "../../components/modal/Modal";

export default function CoachAdditionalInformations() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["certifications"],
    queryFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/certification",
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
  });

  const { mutate } = useMutation({
    mutationKey: ["add"],
    mutationFn: async (data) =>
      await fetchFun({
        url: "http://localhost:8081/certification",
        options: {
          method: "POST",
          body: data,
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(["certifications"]),
  });

  const imagePickerButtonRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fd = new FormData();
      fd.append("image", file);
      mutate(fd);
    }
  };

  return (
    <>
      <p className="block text-sm font-medium my-3">Certifications</p>
      {isError ? (
        <div className="my-2">
          <ItemNotFound title="Failed to fetch certifications." />
        </div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : data && data.length > 0 ? (
        <div
          className="w-full grid gap-2"
          style={{
            gridTemplateColumns: "repeat(auto-fit , minmax(250px , 1fr))",
          }}
        >
          {data.map((certification, index) => (
            <AddImage
              key={index}
              src={certification}
              certification={certification}
            />
          ))}
        </div>
      ) : (
        <div className="my-2">
          <ItemNotFound title="No certifications were discovered." />
        </div>
      )}
      <div className="flex justify-end w-full">
        <input
          ref={imagePickerButtonRef}
          type="file"
          name="avatar"
          id="avatar"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          onClick={() => imagePickerButtonRef.current.click()}
          type="button"
          className="font-medium rounded-md bg-orange-500 px-3 py-2 text-white hover:bg-orange-400"
        >
          Add Certification
        </button>
      </div>
    </>
  );
}

function AddImage({ certification }) {
  const dispatch = useDispatch();

  const handleView = () => {
    dispatch(setModalType("view-certification"));
  };
  return (
    <>
      <Modal
        certificationId={certification?.id}
        imageSrc={`http://localhost:8081/uploads/images/certifications/${certification?.image}`}
      />
      <div className="relative flex max-w-fit">
        <button type="button" onClick={handleView}>
          <img
            className="rounded-md"
            src={`http://localhost:8081/uploads/images/certifications/${certification?.image}`}
            alt={certification?.name}
          />
        </button>
        <button
          type="button"
          onClick={() => dispatch(setModalType("delete-certification"))}
        >
          <TrashIcon className="bg-gray-200 p-1 rounded-full w-7 h-7 absolute right-2 top-2" />
        </button>
      </div>
    </>
  );
}
