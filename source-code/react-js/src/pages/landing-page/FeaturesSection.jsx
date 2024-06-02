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
          {`Experience the power of our Gym Management System and unlock new possibilities for success in the fitness industry. Start your journey towards operational excellence and member satisfaction today.`}
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
      <section className="bg-gray-50 m-5 rounded-lg">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-gray-400"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl">
                {`"Transform your gym operations with our cutting-edge management system—streamline tasks, enhance member experiences, and focus on what matters most: building a healthier community."`}
              </p>
            </blockquote>
          </figure>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
              Why Our System Stands Out
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl">
              Our gym management system is designed with the unique needs of
              fitness businesses in mind. We leverage cutting-edge technology to
              streamline operations, improve member engagement, and drive
              growth. Join us in revolutionizing the fitness industry.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/* Pricing Card */}
            {memberships.map((item, index) => (
              <div
                key={index}
                className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow xl:p-8"
              >
                <h3 className="mb-4 text-2xl font-semibold">{item.type}</h3>
                <p className="font-light text-gray-500 sm:text-lg">
                  {`Best option for personal use & for your next project.`}
                </p>
                <div className="flex items-baseline justify-center my-8">
                  <span className="mr-2 text-5xl font-extrabold">
                    {item.price}
                  </span>
                  <span className="text-gray-500">
                    {`/${item.type === "Premium" ? "year" : "month"}`}
                  </span>
                </div>
                {/* List */}
                <ul role="list" className="mb-8 space-y-4 text-left">
                  {item.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      {/* Icon */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {`Get started`}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
