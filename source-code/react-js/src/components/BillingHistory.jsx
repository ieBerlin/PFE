export default function BillingHistory({ data }) {
  let content;
  if (data && data.length > 0) {
    content = (
      <ol className="relative border-s border-gray-400">
        {data.map((item, index) => (
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
