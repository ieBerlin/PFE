import classes from "./ClassesPage.module.css";
import ClassItem from "../sports/ClassItem";
import { DUMMY_CLASSES } from "../../dummy_data/dummy_classes.js";

export default function ClassesPage() {
  return (
    <section className="bg-white min-h-[calc(100vh-60px)] px-4 pb-4 pt-5 sm:px-6">
      <h3>Start exploring classes</h3>
      <ul className="grid grid-cols-4 gap-4 mt-4">
        {DUMMY_CLASSES.map((dummy_class) => (
          <ClassItem
            key={dummy_class.id}
            id={dummy_class.id}
            name={dummy_class.name}
            description={dummy_class.description}
          />
        ))}
      </ul>
    </section>
  );
}
