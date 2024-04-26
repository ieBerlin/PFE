export default function BillingHistory() {
  // Dummy billing items
  const billingItems = [
    {
      date: "21 March 2022",
      title: "Marketing UI design in Figma",
      description:
        "All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.",
    },
    {
      date: "10 March 2022",
      title: "Marketing UI design in Figma",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate aliquid, temporibus quaerat eius nobis dicta impedit officia repudiandae cumque deserunt ad sunt nam asperiores beatae quidem non nulla consectetur velit?",
    },
  ];

  return (
    <div className="bg-white px-3 py-2">
      <h1 className="font-bold text-xl text-blue-700 mb-2">Billing History</h1>
      <ol className="relative border-s border-gray-400">
        {billingItems.map((item, index) => (
          <li key={index} className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white "></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-500 ">
              {item.date}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 ">
              {item.title}
            </h3>
            <p className="text-base font-normal text-gray-500 ">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
