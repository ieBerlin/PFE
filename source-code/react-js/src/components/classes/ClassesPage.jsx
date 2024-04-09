import classes from "./ClassesPage.module.css";
import ClassItem from "../sports/ClassItem";
import { DUMMY_CLASSES } from "../../dummy_data/dummy_classes.js";


export default function ClassesPage() {
  return (
    <section className={classes.sectionContainer}>
      <h3>Start exploring classes</h3>
      <ul className={classes.listOfClasses}>
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
