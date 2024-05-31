export default function Announce({ title, messageDate, coachName }) {
  const date = new Date(messageDate).toLocaleTimeString();
  return (
    <div className="bg-white rounded-md ring-1 ring-gray-300 p-3 m-4">
      <div className="flex flex-row gap-5 items-center">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={"http://localhost:8081/uploads/images/sport/coach.jpg"}
          alt="Bonnie Green image"
        />
        <div>
          <h1 className="font-semibold text-gray-950 capitalize">
            {coachName}
          </h1>
          <p className=" font-medium text-sm  text-gray-500">{date}</p>
        </div>
      </div>
      <div>
        <h4
          className="text-gray-700
      my-3"
        >
          {title}
        </h4>
      </div>
    </div>
  );
}
