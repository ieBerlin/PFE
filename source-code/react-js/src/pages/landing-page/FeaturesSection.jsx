import classes from "./FeaturesSection.module.css";
import FeaturesSectionItem from "./FeaturesSectionItem";
export default function FeaturesSection() {
  const landingPageSections = [
    {
      title: "Book Your Workout Essentials",
      message:
        "Take control of your fitness journey by reserving your preferred equipment in advance. Whether it's free weights, cardio machines, or specialized gear, secure your spot for a seamless workout experience.",
    },
    {
      title: "Meet Our Expert Team",
      message:
        "Unlock your full potential with guidance from our certified coaches. From personalized training plans to expert advice, our team is dedicated to helping you achieve your fitness goals. Get to know them and elevate your workout sessions.",
    },
    {
      title: "Sweat Together, Thrive Together",
      message:
        "Experience the energy of our in-person fitness classes designed to challenge and inspire you. From high-intensity interval training to yoga and everything in between, join a community of like-minded individuals and push your limits in a supportive environment.",
    },
  ];
  const memberships = [
    {
      type: "Basic",
      benefits: [
        "Access to gym facilities during standard hours",
        "Use of basic equipment like cardio machines, free weights, and strength training machines",
      ],
      price: 2000,
    },
    {
      type: "Standard",
      benefits: [
        "All benefits of the Basic membership",
        "Access to group fitness classes (yoga, Pilates, spinning, aerobics)",
        "Possibly some additional amenities like saunas, steam rooms, and pools",
      ],
      price: 3000,
    },
    {
      type: "Premium",
      benefits: [
        "All benefits of the Standard membership",
        "Extended hours or 24/7 access",
        "Additional services (personal training sessions, nutritional counseling, advanced fitness classes)",
        "Access to premium equipment and facilities (exclusive locker rooms, lounges)",
      ],
      price: 18000,
    },
  ];

  return (
    <div>
      <section className={classes.featuresSectionContainer}>
        <h3>Why Choose Us</h3>
        <h1>What makes us different</h1>
        <p>
          Experience the power of our Gym Management System and unlock new
          possibilities for success in the fitness industry. Start your journey
          towards operational excellence and member satisfaction today.
        </p>
        <ul>
          {landingPageSections.map((item, index) => (
            <FeaturesSectionItem
              key={index}
              title={item.title}
              description={item.message}
            />
          ))}
        </ul>
      </section>
      <section className="flex gap-5 mt-5 justify-center">
        {memberships.map((item) => (
          <>
            <div className=" w-60 bg-indigo-200 rounded-lg p-4 text-center">
              <h2 className="text-orange-600 capitalize font-semibold text-xl mb-2">
                {item.type}
              </h2>
              {item.benefits.map((benefit, index) => (
                <p key={index} className="text-gray-800 font-medium capitalize">
                  + {benefit}
                </p>
              ))}
              <div className="flex h-max" />
              <h2 className="text-red-500 font-medium mt-2">{item.price} DZD</h2>
            </div>
          </>
        ))}
      </section>
    </div>
  );
}
