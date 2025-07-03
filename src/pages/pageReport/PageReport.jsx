import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { getAllReportedPages } from "../../state/Report/PageReportSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageReport = () => {
  const Location = useLocation();
  const pageName = Location.pathname.slice(1);
  const dispatch = useDispatch();
  const Reports = useSelector((state) => state.pageReport?.pageReports);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        await dispatch(getAllReportedPages());
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };
    fetchReports();
  }, [dispatch]);

  const handleNavigate = (reportId) => {
    navigate(`/page/report/${reportId}`);
  };

  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Reported Pages"}
          subtitle={"List of all reported pages"}
        />
      </div>
      <div className="overflow-x-auto p-4 bg-[#0d1028] relative mt-4 text-white">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-[#101338] text-white text-left">
            <tr>
              <th className="p-3">#</th>
              {/* <th className="p-3 uppercase">Report ID</th> */}
              <th className="p-3 uppercase">Reported Pages</th>
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
                <td className="p-3">{report?.pageId?.pageName || "Unknown"}</td>
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

export default PageReport;
