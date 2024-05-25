export default function BillingHistory({ data }) {
  let content;
  if (data && data.length > 0) {
    // const formattedDate = new Date( {item.date}).toLocaleDateString("en-us", {
    //   month: "short",
    //   day: "numeric",
    //   year: "numeric",
    // });

    // const formattedTime = String(time).split(":").slice(0,2).join(':')
    content = (
      <ol className="relative border-s border-gray-400">
        {data.map((item, index) => {
          console.log(item.date)
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          const formattedTime = date.toLocaleTimeString("en-US");

          return (
            <li key={index} className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white "></div>
              <div className="mb-1 text-sm font-normal leading-none text-gray-500 ">
                <h2 className="text-gray-800 font-semibold">
                  In{" "}
                  <span className="text-blue-600 font-semibold">
                    {formattedDate}
                  </span>
                  , At{" "}
                  <span className="text-blue-600 font-semibold">
                    {formattedTime}
                  </span>
                </h2>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ">
                {item.title}
              </h3>
              <p className="text-base font-normal text-gray-500 ">
                {item.description}
              </p>
            </li>
          );
        })}
      </ol>
    );
  } else {
    content = (
      <h3 className="text-black text-xl bg-white rounded-md text-center font-semibold">
        Billing history is Empty !
      </h3>
    );
  }

  return <div className="bg-white px-3 py-3 my-3">{content}</div>;
}
