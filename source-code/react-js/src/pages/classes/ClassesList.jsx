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
    useSelector((state) => state.userRole.userRole).toLowerCase() === "admin";
  const [currentSelectedClasses, setCurrentSelectedClasses] =
    useState(selectedClasses);
  const fiteredClasses = filterClasses(data, currentSelectedClasses);
  console.log(fiteredClasses);
  return (
    <>
      <div className="flex flex-row w-full px-4 pt-2 mt-2 justify-between items-center ">
        <div />
        <div className="flex flex-row items-center gap-2">
          {isAdmin && (
            <Link
              className="my-2 bg-blue-600 hover:bg-blue-500 text-white capitalize font-semibold rounded-md px-3 py-2"
              to="/classes/create"
            >
              Add Class
            </Link>
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
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <ClassesItems classes={fiteredClasses} />
      </ul>
    </>
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
    <ClassItem
      key={classItem.id}
      id={classItem.id}
      title={classItem.title}
      description={classItem.description}
      coachName={classItem.coachName}
      coachEmail={classItem.coachEmail}
      date={classItem.date}
      time={classItem.time}
      totalMembers={classItem.totalMembers}
      classCategory={classItem.classCategory}
    />
  ));
}
const filterClasses = (classes, selectedClasses) => {
  return classes.filter((classItem) => {
    const isClassCategorySelected = Object.entries(
      selectedClasses.classCategory
    ).every(([classCategory, isSelected]) => {
      return (
        isSelected ||
        classItem.classCategory.toLowerCase() !== classCategory.toLowerCase()
      );
    });

    return isClassCategorySelected;
  });
};