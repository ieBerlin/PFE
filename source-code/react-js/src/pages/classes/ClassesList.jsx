import { useState } from "react";
import FilterDropdown from "../../components/FilterDropdown";
import ClassItem from "../sports/ClassItem.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const selectedClasses = {
  classCategory: {
    yoga: true,
    kickboxing: true,
    fitness: true,
    bodybuilding: true,
  },
};
export default function ClassesList({ data }) {
  const isAdmin =
    useSelector((state) =>
      (state.userRole?.userRole ?? "").trim().toLowerCase()
    ) === "admin";
  const [currentSelectedClasses, setCurrentSelectedClasses] =
    useState(selectedClasses);
  const fiteredClasses = filterClasses(data, currentSelectedClasses);
  return (
    <div className="bg-white rounded-md mt-5">
      <div className="flex flex-row w-full px-4 pt-3 mt-2 justify-between items-center ">
        <div />
        <div className="flex flex-row items-center gap-2">
          {isAdmin && (
            <div className="flex flex-row items-center gap-2">
              <Link
                className="my-2 bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold rounded-md px-3 py-2"
                to="/classes/enrollment-requests"
              >
                Classes Enrollment Requests{" "}
              </Link>
              <Link
                className="my-2 bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold rounded-md px-3 py-2"
                to="/classes/create"
              >
                Add Class
              </Link>
            </div>
          )}
          <FilterDropdown
            currentSelectedData={currentSelectedClasses}
            setData={setCurrentSelectedClasses}
            filterOptionsData={[
              {
                title: "class.Category",
                options: ["kickboxing", "fitness", "yoga", "bodybuilding"],
              },
            ]}
          />
        </div>
      </div>
      <ul
        className="inline-grid "
        style={{
          // maxWidth: "400px",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 400px))",
        }}
      >
        <ClassesItems classes={fiteredClasses} />
      </ul>
    </div>
  );
}
function ClassesItems({ classes }) {
  if (!classes || classes.length === 0) {
    return (
      <div className="mt-4 bg-white px-6 py-4 shadow-md mx-2">
        <p className="text-stone-500 text-center font-bold text-xl">
          No classes found!
        </p>
      </div>
    );
  }
  return classes.map((classItem) => (
    <ClassItem key={classItem.classId} data={classItem} />
  ));
}
const filterClasses = (classes, selectedClasses) => {
  return classes.filter((classItem) => {
    const isClassCategorySelected = Object.entries(
      selectedClasses.classCategory
    ).every(([classCategory, isSelected]) => {
      return (
        isSelected ||
        classItem.category.toLowerCase() !== classCategory.toLowerCase()
      );
    });

    return isClassCategorySelected;
  });
};
