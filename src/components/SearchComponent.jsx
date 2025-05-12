import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";

const SearchComponent = ({
  datas = [],
  placeholder = "Search Pages",
  tableComponent: TableComponent,
  gridComponent: GridComponent,
  dropdowns = [],
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [layout, setLayout] = useState("line");

  return (
    <div>
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row mt-4 items-stretch sm:items-center gap-4 sm:gap-2 justify-between">
        {/* Left side */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search Input */}
          <div className="flex items-center bg-[#0F1535] text-white px-2 py-2 rounded-md border border-gray-700 w-full sm:w-[250px]">
            <IoSearchSharp className="mr-2 text-lg" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder={placeholder}
              className="bg-transparent focus:outline-none w-full text-base"
            />
          </div>

          {/* Dynamic Dropdowns */}
          <div className="flex gap-2">
            {dropdowns.map((dropdown, index) => (
              <select
                key={index}
                defaultValue=""
                className="bg-[#0F1535] text-white p-2 rounded-md border border-gray-700 w-[120px]"
              >
                <option value="" disabled hidden>
                  {dropdown.label}
                </option>
                {dropdown.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Layout toggle */}
        <div className="flex gap-3 text-2xl text-white">
          <CiGrid41
            onClick={() => setLayout("grid")}
            className={`cursor-pointer ${
              layout === "grid" ? "text-blue-400" : "text-white"
            } hover:text-blue-300 transition`}
          />
          <FaGripLines
            onClick={() => setLayout("line")}
            className={`cursor-pointer ${
              layout === "line" ? "text-blue-400" : "text-white"
            } hover:text-blue-300 transition`}
          />
        </div>
      </div>

      {/* Layout View */}
      {layout === "line" ? (
        <div className="mt-6">
          {TableComponent && <TableComponent userDetails={datas} />}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {datas.map((data, index) => (
            <GridComponent key={index} userDetail={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
