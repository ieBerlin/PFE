import ClassItem from "../sports/ClassItem.jsx";
import { DUMMY_CLASSES } from "../../dummy_data/dummy_classes.js";

export default function ClassesPage() {
  return (
    <section className="bg-white min-h-[calc(100vh-60px)] px-4 pb-4 pt-5 sm:px-6">
      <h3 className="font-bold text-xl">Start exploring classes</h3>
      <ul
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {DUMMY_CLASSES.map((classItem) => (
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
          />
        ))}
      </ul>
    </section>
  );
}
