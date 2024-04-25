import { Link, useSearchParams } from "react-router-dom";
import classes from "./EquipmentsPage.module.css";
import EquipmentsPagination from "./EquipmentsPagination";
import {
  AcademicCapIcon,
  ChevronRightIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
export default function EquipmentsList({ data }) {
  const [searchParams] = useSearchParams();
  let content;
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const maxItemsPerPage = 10;
  const maxPage = Math.ceil(data.length / maxItemsPerPage);

  if (currentPage > 0 && currentPage <= maxPage) {
    content = (
      <section className={classes.sectionContainer}>
        <div className="bg-gray-100 py-4 px-10">
          <div
            className="grid mt-4"
            style={{
              gridTemplateColumns: "auto 1fr",
            }}
          >
            <EquipmentItem />
          </div>
        </div>
        <EquipmentsPagination
          currentPage={currentPage}
          maxItems={data.length}
          maxPage={maxPage}
        />
      </section>
    );
  } else {
    content = <p>Sorry, nothing found.</p>;
  }

  return content;
}

function EquipmentItem() {
  return (
    <li
      key={"coach.coachId"}
      className="relative my-4 mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-red-500">
        <img
          className="object-cover flex w-full h-full"
          src="https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM1OTAwNDIyMzUwMzQx/main2-trainer2.jpg"
          alt="Coach"
        />
        <span className="absolute top-0 left-0 m-2 rounded-xl  p-[4px] text-center text-sm  bg-amber-300 text-white font-semibold">
          {equipmentCategory}
        </span>
      </div>
      <div className="mt-4 px-5 pb-5">
        <div className="mt-2 mb-5 flex items-center justify-between">
          <h5 className="text-xl tracking-tight text-purple-900">
            {equipmentName}
          </h5>
          <div className="flex items-center gap-1">
            <span className=" rounded bg-amber-400 text-white  px-2.5 py-0.5 text-xs font-semibold">
              {equipmentRating}
            </span>
            <span className="text-gray-500 text-sm">({equipmentReviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <h2 className="text-purple-800 font-semibold text-xl">$21</h2>
          <Link
            to={`${"coach.coachId"}`}
            className="w-full flex items-center justify-center rounded-md bg-purple-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            See more <ChevronRightIcon className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>
    </li>
  );
}
const equipmentName = "Treadmill";
const equipmentCategory = "Cardio Equipment";
const equipmentRating = 4.2;
const equipmentReviews = 28;
const totalAvailable = 10;
const equipmentCondition = "New";
const supplierEmail = "supplier@example.com";
const supplierContact = {
  phone: "+1234567890",
  website: "https://example.com",
};
