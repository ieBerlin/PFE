export default function ChartBar({
  dates,
  data: chatData,
  maxYValue,
  color = "blue-500",
  label,
}) {
  const total = chatData.reduce((acc, curr) => acc + curr, 0);
  return (
    <div className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg px-5 py-4 rounded-lg">
      <div className="flex flex-row justify-between items-center mb-3">
        <strong className="font-bold text-xl">{label}</strong>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div />
        <h1 className="text-2xl font-bold">
          {isNaN(total) ? 0 : total.toFixed(2)}{" "}DZD
        </h1>
      </div>
      <div>
        <div className="flex flex-row mt-2 text-stone-500 font-medium text-sm">
          <div className="grid grid-rows-5 w-14 text-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <h1 key={index}>{Math.ceil((maxYValue * (5 - index)) / 5)}</h1>
            ))}
          </div>
          <div
            className="grid grid-cols-7 items-end w-full"
            style={{
              height: "250px",
            }}
          >
            {chatData.map((dataItem) => {
             
              return (
                <div
                  key={`label-${dataItem.transactionId}`}
                  className={`w-10 bg-${color} mx-auto my-0 rounded-t-md text-center text-sm text-white`}
                  style={{
                    height: `${Math.ceil((250 * dataItem) / maxYValue)}px`,
                    verticalAlign: "middle",
                    lineHeight: `${Math.ceil((250 * dataItem) / maxYValue)}px`,
                  }}
                >
                  {dataItem}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center py-2 text-black font-medium text-sm ml-14">
        {dates.map((date) => (
          <h2 key={date}>
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
            })}
          </h2>
        ))}
      </div>
    </div>
  );
}
