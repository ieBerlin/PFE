export default function Announce() {
  const date = new Date().toLocaleTimeString();
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
            Rafik coach
          </h1>
          <p className=" font-medium text-sm  text-gray-500">{date}</p>
        </div>
      </div>
      <div>
        <h4
          className="text-gray-700
      my-3"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit a quam
          est reiciendis, soluta dolor repellat asperiores totam, corporis
          tenetur nihil aliquam rerum facilis iusto? Nesciunt consectetur facere
          quos illo.
        </h4>
      
      </div>
    </div>
  );
}
