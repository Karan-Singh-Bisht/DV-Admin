import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import TotalUsers from "../../components/TotalUsers";
import HalfPie from "../../components/HalfPie";
import GradientBarChart from "../../components/GradientBarChart";
import TotalAccounts from "../../components/TotalAccounts";
import MonthlyRevenue from "../../components/MonthlyRevenue";
import DevicePieChart from "../../components/DevicePieChart";

export default function Dashboard() {
  const location = useLocation();
  const pageName = location.pathname.slice(1);

  return (
    <div className="min-h-screen text-white p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <Header
          pageName={pageName}
          title="Dashboard"
          subtitle="Welcome To The DashBoard"
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
        {/* Welcome Card */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-[#0A0F2B] rounded-xl px-6 pt-6 flex justify-between items-center shadow">
          <div>
            <p className="text-sm">Welcome back</p>
            <h2 className="text-2xl font-semibold">Jhon Anderson!</h2>
            <p className="text-xl mt-2">
              $65.4K{" "}
              <span className="text-green-400 text-sm ml-2">Today’s Sales</span>
            </p>
            <p className="text-xl">
              78.4%{" "}
              <span className="text-pink-400 text-sm ml-2">Growth Rate</span>
            </p>
          </div>
          <img
            src="/welcome-back-3.png"
            alt="Illustration"
            className="w-42 h-44 hidden sm:block"
          />
        </div>

        {/* Active Users */}
        <div className="bg-[#0A0F2B] p-4 rounded-xl shadow flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold">42.5K</div>
            <h3 className="text-md font-semibold">Active Users</h3>
          </div>
          <HalfPie />
          <div className={`text-sm text-yellow-400`}>24K ↑ from last month</div>
        </div>

        {/* Total Users */}
        <div className="bg-[#0A0F2B] p-4 rounded-xl shadow flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold">97.4K</div>
            <h3 className="text-md font-semibold">Total Users</h3>
          </div>
          <TotalUsers />
          <div className={`text-sm text-green-400`}>
            12.5% ↑ from last month
          </div>
        </div>

        <div className="bg-[#0A0F2B] flex flex-col relative justify-between p-4 rounded-xl shadow col-span-1 sm:row-span-2">
          <h3 className="text-md font-semibold mb-2">Monthly Revenue</h3>
          <div className="h-40 flex items-center justify-center text-gray-400">
            <MonthlyRevenue />
          </div>
          <p className="text-sm mt-0 absolute bottom-0 sm:mt-2 sm:relative">
            Avg sale: <span className="text-green-400">68.9%</span>
          </p>
        </div>
        <div className="bg-[#0A0F2B] p-4 rounded-xl flex flex-col shadow sm:row-span-2">
          <h3 className="text-md font-semibold mb-2">Device Type</h3>
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <DevicePieChart />
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-[#0A0F2B] p-4 rounded-xl shadow flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold">68.4K</div>
            <h3 className="text-md font-semibold">Total Views</h3>
          </div>
          <GradientBarChart />
          <div className={`text-sm text-purple-400`}>35K from last month</div>
        </div>

        {/* Total Accounts */}
        <div className="bg-[#0A0F2B] p-4 rounded-xl shadow flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold">85,274</div>
            <h3 className="text-md font-semibold">Total Accounts</h3>
          </div>
          <TotalAccounts />
          <div className={`text-sm text-red-400`}>23.7% ↓ from last month</div>
        </div>

        {/* 🟦 Campaign Stats spans 2 rows */}
        <div className="bg-[#0A0F2B] p-4 rounded-xl shadow col-span-1 sm:col-span-2 lg:col-span-2 row-span-2">
          <h3 className="text-md font-semibold mb-2">Recent Orders</h3>
          <div className="h-full flex items-center justify-center text-gray-400">
            [Line Chart]
          </div>
        </div>

        {/* Social Leads */}
        <div className="bg-[#0A0F2B] p-4 rounded-xl shadow col-span-1 sm:col-span-2">
          <h3 className="text-md font-semibold mb-2">Social Leads</h3>
          <div className="h-40 flex items-center justify-center text-gray-400">
            [Graph]
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, change, color }) {
  return (
    <div className="bg-[#0A0F2B] p-4 rounded-xl shadow flex flex-col justify-between">
      <div>
        <div className="text-xl font-bold">{value}</div>
        <h3 className="text-md font-semibold">{title}</h3>
      </div>
      {/* <HalfPie /> */}
      {/* <GradientBarChart /> */}
      <div className={`text-sm ${color}`}>{change} from last month</div>
    </div>
  );
}
