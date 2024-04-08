import classes from "./ClassesPage.module.css";
import arrowSvg from "../../assets/arrow-ios-forward-svgrepo-com.svg";
const DUMMY_SPORTS = [
  {
    id: 1,
    name: "Fitness",
    description:
      "Fitness encompasses various physical activities aimed at improving overall health, strength, flexibility, and endurance. It includes exercises such as cardio, strength training, and flexibility workouts.",
  },
  {
    id: 2,
    name: "Cardio",
    description:
      "Cardiovascular exercise, commonly referred to as cardio, is any activity that increases your heart rate and helps improve the efficiency of your cardiovascular system. It includes activities like running, cycling, swimming, and aerobics.",
  },
  {
    id: 3,
    name: "Kickboxing",
    description:
      "Kickboxing is a high-intensity combat sport that combines elements of boxing and martial arts techniques. It involves punching, kicking, knee strikes, and elbow strikes, often performed in a structured class format or as part of martial arts training.",
  },
  {
    id: 4,
    name: "Bodybuilding",
    description:
      "Bodybuilding is a form of weight training focused on building and sculpting muscle mass. It involves exercises such as weightlifting, resistance training, and specific isolation exercises aimed at targeting individual muscle groups.",
  },
];

export default function ClassesPage() {
  return (
    <section className={classes.sectionContainer}>
      <h3>Start exploring sports</h3>
      <ul className={classes.listOfSports}>
        {DUMMY_SPORTS.map((dummy_sport) => (
          <li key={dummy_sport.id}>
            <img
            className={classes.sportImg}
              src="https://cdn.onefc.com/wp-content/uploads/2022/10/Zhang-Peimian-Jonathan-Di-Bella-ONE162-1920X1280-15.jpg"
              alt=""
            />
            <div className={classes.sportItemDetails}>
              <div className={classes.itemTitle}>
                {dummy_sport.name}

                <img src={arrowSvg} alt="" />
              </div>
              <p>{dummy_sport.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
