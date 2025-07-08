import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { getAllReports } from "../../state/Report/ReportSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Report = () => {
  const Location = useLocation();
  const pageName = Location.pathname.slice(1);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userReport);
  const Reports = useSelector((state) => state.userReport?.reports);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        await dispatch(getAllReports());
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };
    fetchReports();
  }, [dispatch]);

  const handleNavigate = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Reported Users"}
          subtitle={"List of all user reports"}
        />
      </div>
      <div className="overflow-x-auto p-4 bg-[#0d1028] relative mt-4 text-white">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-[#101338] text-white text-left">
            <tr>
              <th className="p-3">#</th>
              {/* <th className="p-3 uppercase">Report ID</th> */}
              <th className="p-3 uppercase">Reported User</th>
              <th className="p-3 uppercase">Reason</th>
              <th className="p-3 uppercase">Reported By</th>
            </tr>
          </thead>
          <tbody>
            {Reports.map((report, index) => (
              <tr
                key={report._id}
                onClick={() => handleNavigate(report._id)}
                className="border-b hover:cursor-pointer border-[#1a1e3f] hover:bg-[#1c2045] transition"
              >
                <td className="p-3">{index + 1}</td>
                {/* <td className="p-3">{report._id}</td> */}
                <td className="p-3">{report?.userId?.name || "Unknown"}</td>
                <td className="p-3">{report.reason}</td>
                <td className="p-3">{report?.reportedBy?.name || "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {Reports.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default Report;
