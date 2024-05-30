import Message from "./Message";

export default function Announce({ isFile }) {
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
        {isFile && <Message />}
      </div>
    </div>
  );
}

const dummyChats = [
  {
    sender: 0,
    date: "2024-05-09T11:46:00",
    message: "Hey, how are you?",
    isMessage: true,
  },
  {
    sender: 1,
    date: "2024-05-09T11:48:00",
    message: "I'm doing great, thanks!",
    isMessage: true,
  },
  {
    sender: 0,
    date: "2024-05-09T11:50:00",
    message: "That's good to hear!",
    isMessage: true,
  },
  {
    sender: 0,
    date: "2024-05-09T11:52:00",
    message: "By the way, here's the latest report:",
    isMessage: false,
    file: {
      name: "Latest_Report.pdf",
      size: "5 MB",
      link: "https://example.com/downloads/Latest_Report.pdf",
    },
  },
  {
    sender: 1,
    date: "2024-05-09T11:54:00",
    message: "Thanks! I'll take a look.",
    isMessage: true,
  },
];
