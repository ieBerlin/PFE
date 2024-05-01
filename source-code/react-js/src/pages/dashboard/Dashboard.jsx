import React from "react";
import {
  ChartBarIcon,
  Cog8ToothIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import BillingHistory from "../../components/BillingHistory.jsx";
import { billingItems } from "../../dummy_data/dummy_users.js";

// Dashboard component
export default function Dashboard() {
  // Card data
  const cardData = [
    {
      label: "New Users",
      value: "$600",
      icon: (
        <ChartBarIcon className="w-10 h-10 text-blue-800 bg-blue-100 rounded-full p-2" />
      ),
      href: "/users",
      statistics: {
        title: "User Growth",
        value: "+23%",
        color: "blue-500",
      },
    },
    {
      label: "Spend this month",
      value: "$600",
      icon: (
        <ArrowTrendingDownIcon className="w-10 h-10 text-blue-800 bg-blue-100 rounded-full p-2" />
      ),
      href: "/reports",
      statistics: {
        title: "Sales This Month",
        value: "+23%",
        color: "red-500",
      },
    },
    {
      label: "Earn this month",
      value: "$600",
      icon: (
        <ArrowTrendingUpIcon className="w-10 h-10 text-blue-800 bg-blue-100 rounded-full p-2" />
      ),
      href: "/reports",
      statistics: {
        title: "Earnings This Month",
        value: "+23%",
        color: "emerald-500",
      },
    },
    {
      label: "Reserved Equipment",
      value: "$600",
      icon: (
        <Cog8ToothIcon className="w-10 h-10 text-blue-800 bg-blue-100 rounded-full p-2" />
      ),
      href: "/equipments",
      statistics: {
        title: "Reserved Items",
        value: "+23%",
        color: "amber-500",
      },
    },
  ];

  return (
    <div className="bg-gray-100 w-full px-5 pt-4 pb-10">
      <h1 className="text-4xl mb-3">Dashboard</h1>
      <div className="my-4 px-5">
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
          className="grid gap-4"
        >
          {cardData.map((data, index) => (
            <CardComponent
              key={index}
              label={data.label}
              value={data.value}
              icon={data.icon}
              href={data.href}
              statistics={data.statistics} 
            />
          ))}
        </div>
        <div className="flex gap-4 flex-col bg-white mt-4 rounded-md pb-4 hover:shadow-md">
          <BillingHistory data={billingItems} />
          <hr className="border-t-1 border-gray-300  h-2 mx-3"/>
          <Link
            to="/payments"
            className="text-center font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md mx-auto py-2 px-5"
          >
            See All
          </Link>
        </div>
      </div>
    </div>
  );
}

// CardComponent component
function CardComponent({ label, value, icon, href, statistics }) {
  return (
    <Link to={href} className="flex items-center">
      <div className="h-full w-full bg-white shadow-sm border-1 border-transparent hover:border-gray-900 hover:shadow-md px-4 py-3 rounded-md">
        <div className="flex items-center gap-2">
          {icon}
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-400 font-semibold text-md">{label}</h1>
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold text-blue-800 text-lg">{value}</h3>
              {statistics && (
                <div className={`font-bold text-${statistics.color}`}>
                  {statistics.value}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
