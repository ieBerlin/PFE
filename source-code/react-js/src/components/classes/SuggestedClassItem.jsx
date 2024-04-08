import classes from "./SuggestedClassItem.module.css";
export default function SuggestedClassItem({ title, description, image }) {
  return (
    <div className={classes.classContainer}>
      <img
        src="https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2021-08/jon-jones_b9l28jtdgkg515eon46xb68mg.jpg?itok=Na9XEn4u"
        alt=""
      />
      <h1>{title}</h1>
    </div>
  );
}
