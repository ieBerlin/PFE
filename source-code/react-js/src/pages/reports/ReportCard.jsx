import { Link } from "react-router-dom";

export default function ReportCard({ clubMembers, newCoaches, newMembers }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <CardComponent
        label="Club Members"
        description="Total number of gym users"
        number={clubMembers}
        link="/users"
        linkText="View Users"
      />
      <CardComponent
        label="New Members"
        description="Number of new members in the last month"
        number={newMembers}
        link="/new-members"
        linkText="View New Members"
      />
      <CardComponent
        label="New Coaches"
        description="Number of new coaches in the last month"
        number={newCoaches}
        link="/new-coaches"
        linkText="View New Coaches"
      />
    </div>
  );
}

function CardComponent({ label, description, number, link, linkText }) {
  return (
    <div className="bg-white border border-gray-200 hover:border-gray-300 p-4 rounded-md hover:shadow-lg">
      <h2 className="text-gray-700 text-lg font-semibold ">{label}</h2>
      <div className="flex items-center mt-4 gap-3 text-center">
        <div className="text-blue-900 text-2xl font-bold bg-blue-100 rounded-md p-2 inline-block ">
          {number}
        </div>
        <div className="flex flex-col ">
          <p className="text-sm text-gray-600">{description}</p>
          <Link
            to={link}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
