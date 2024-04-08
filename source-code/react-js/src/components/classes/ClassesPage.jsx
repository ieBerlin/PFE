import classes from "./ClassesPage.module.css";
import SportItem from "../sports/SportItem";
import { DUMMY_SPORTS } from "../../dummy_data/dummy_sports";


export default function ClassesPage() {
  return (
    <section className={classes.sectionContainer}>
      <h3>Start exploring sports</h3>
      <ul className={classes.listOfSports}>
        {DUMMY_SPORTS.map((dummy_sport) => (
          <SportItem
            key={dummy_sport.id}
            id={dummy_sport.id}
            name={dummy_sport.name}
            description={dummy_sport.description}
          />
        ))}
      </ul>
    </section>
  );
}
