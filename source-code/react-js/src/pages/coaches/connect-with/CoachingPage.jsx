import Announce from "./Announce";
import { useRef, useState } from "react";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function CoachingPage() {
  const [fileName, setFileName] = useState(null);
  const imageRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const message = formData.get("message");
    const image = fileName?.name;
    if (message?.trim() === "") return;
    const fd = {
      message,
      image,
    };
    console.log(fd);
  };
  function handleSelectImage() {
    imageRef.current.click();
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file);
    }
  };

  return (
    <div className="relative">
      <div className="mb-20">
        <div style={{ height: "calc(100vh - 100px)" }} className="mt-4 mb-8 ">
          <Announce />
          <Announce />
          <Announce />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="fixed bottom-0 right-0">
        <div className="relative border-2 rounded-md mx-3 mb-4">
          <textarea
            name="message"
            id="hs-textarea-ex-1"
            className="p-4 pb-12 w-full border-gray-500 bg-gray-50 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
            placeholder="Type me anything..."
          ></textarea>
          <input
            defaultValue={(fileName && fileName.name) ?? ""}
            type="file"
            ref={imageRef}
            name="file"
            onChange={handleFileChange}
          />

          <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-gray-50">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center truncate">
                <button
                  onClick={handleSelectImage}
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 "
                >
                  <PaperClipIcon className="flex-shrink-0 size-4 w-4 h-4" />
                </button>
                {fileName && fileName.name && (
                  <p className=" text-sm text-gray-500 ">
                    File name :{" "}
                    <span className="text-black ">{fileName.name}</span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-x-1">
                {fileName && fileName.name && (
                  <button
                    onClick={() => {
                      imageRef.current.value = "";
                      setFileName(null);
                    }}
                    type="button"
                    className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-red-500 hover:bg-red-400"
                  >
                    <XMarkIcon className="flex-shrink-0 size-3.5 w-4 h-4" />
                  </button>
                )}
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
    </div>
  );
}
