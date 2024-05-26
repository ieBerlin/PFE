import {
  ChartBarIcon,
  Cog8ToothIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import BillingHistory from "../../components/BillingHistory.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
import { useQueries } from "@tanstack/react-query";
import FallbackText from "../../components/FallbackText.jsx"
import { useState } from "react";
import { useSelector } from "react-redux";
// Dashboard component
export default function Dashboard() {
  const userRole = useSelector(state=>state.userRole?.userRole?.toLowerCase()==='admin');
  
  if(!userRole){
    throw {status:403}
  }
  const data = useQueries({
    queries: [
      {
        staleTime: 0,
        queryKey: ["dashboard"],
        queryFn: async () => {
          try {
            const response = await fetchFun({
              url: "http://localhost:8081/dashboard",
              options: {
                method: "GET",
                headers: {
                  "x-access-token": getToken(),
                },
              },
            });

            return response;
          } catch (error) {
            return false;
          }
        },
      },
      {
        staleTime: 0,
        queryKey: ["transactions"],
        queryFn: async () => {
          try {
            const response = await fetchFun({
              url: "http://localhost:8081/dashboard/transactions", // Update the URL to your backend endpoint
              options: {
                method: "GET",
                headers: {
                  "x-access-token": getToken(),
                },
              },
            });
            return response;
          } catch (error) {
            return false;
          }
        },
      },
    ],
  });
  let basicInformations = [];
  let transactionsData = [];
  if (!data[0].isPending && !data[0].isError && data[0].data) {
    basicInformations = data[0].data;
  }
  if (!data[1].isError && data[1].data) {
    transactionsData = data[1].data;
  }

  const cardData = basicInformations
    ? [
        {
          label: "New Users",
          value: `$${basicInformations?.newUsers?.currentMonth ?? 0}`, // Update value based on fetched data
          icon: (
            <ChartBarIcon className="w-10 h-10 text-blue-800 bg-blue-100 rounded-full p-2" />
          ),
          href: "/users",
          statistics: {
            title: "User Growth",
            value: `+${basicInformations?.newUsers?.growth ?? 0}%`, // Update growth percentage based on fetched data
            color: "blue-500",
          },
        },
        {
          label: "Spend this month",
          value: `$${
            basicInformations?.transactions?.expense?.currentMonth ?? 0
          }`, // Update value based on fetched data
          icon: (
            <ArrowTrendingDownIcon className="w-10 h-10 text-blue-800 bg-blue-100 rounded-full p-2" />
          ),
          href: "/reports",
          statistics: {
            title: "Sales This Month",
            value: `+${basicInformations?.transactions?.expense?.growth ?? 0}%`, // Update growth percentage based on fetched data
            color: "red-500",
          },
        },
        {
          label: "Earn this month",
          value: `$${
            basicInformations?.transactions?.income?.currentMonth ?? 0
          }`, // Update value based on fetched data
          icon: (
            <ArrowTrendingUpIcon className="w-10 h-10 text-blue-800 bg-blue-100 rounded-full p-2" />
          ),
          href: "/reports",
          statistics: {
            title: "Earnings This Month",
            value: `+${basicInformations?.transactions?.income?.growth ?? 0}%`, // Update growth percentage based on fetched data
            color: "emerald-500",
          },
        },
        {
          label: "Reserved Equipment",
          value: `$${basicInformations?.reservedEquipments?.currentMonth ?? 0}`, // Update value based on fetched data
          icon: (
            <Cog8ToothIcon className="w-10 h-10 text-blue-800 bg-blue-100 rounded-full p-2" />
          ),
          href: "/equipments",
          statistics: {
            title: "Reserved Items",
            value: `${basicInformations?.reservedEquipments?.growth ?? 0} %`, // Update growth percentage based on fetched data
            color: "amber-500",
          },
        },
      ]
    : [];

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
          {cardData.map((item, index) => (
            <CardComponent
              key={index}
              label={item.label}
              value={item.value}
              icon={item.icon}
              href={item.href}
              statistics={item.statistics}
            />
          ))}
        </div>
        <div className="flex gap-2 flex-col bg-white mt-2 rounded-md hover:shadow-md">
          {data[1].isPending ? (
            <FallbackText title={"Fetching billing data"} />
          ) : (
            <BillingHistory data={transactionsData} />
          )}
          <hr className="border-t-1 border-gray-300  h-2 mx-3" />
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
