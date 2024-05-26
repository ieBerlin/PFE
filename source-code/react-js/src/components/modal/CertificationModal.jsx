import { ArrowsPointingInIcon } from "@heroicons/react/24/solid";
import { setModalType } from "../../features/modal/modalSlice";
import { useDispatch } from "react-redux";

export default function CertificationModal({ imageSrc }) {
    const dispatch = useDispatch();
  return (
    <div className="relative h-2/3">
      <button onClick={() => dispatch(setModalType())}>
        <ArrowsPointingInIcon className="w-9 h-9 bg-transparent absolute text-gray-700 -right-20 top-0" />
      </button>
      <img className="h-max" src={imageSrc} alt="" />
    </div>
  );
}
