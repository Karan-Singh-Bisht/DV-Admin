import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getReportedPage,
  deleteReportedPage,
} from "../../state/Report/PageReportSlice";
import Loader from "../../components/Loader";

const PageReportDetails = () => {
  const navigate = useNavigate();
  const { reportId } = useParams();
  const dispatch = useDispatch();
  const [dismissModal, setDismissModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [resolverComments, setResolverComments] = useState("");
  const [actionTaken, setActionTaken] = useState("none");

  const report = useSelector((state) => state.pageReport?.pageReport);
  const loading = useSelector((state) => state.pageReport?.loading);

  useEffect(() => {
    const getUserReport = async () => {
      if (reportId) {
        await dispatch(getReportedPage(reportId));
      }
    };
    getUserReport();
  }, [dispatch, reportId]);

  const handleReportDelete = async (reportId) => {
    try {
      const response = await dispatch(deleteReportedPage(reportId));
      if (response.meta?.requestStatus === "fulfilled") {
        navigate("/page/report");
      }
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  //   const handleReportDismiss = async (
  //     reportId,
  //     actionTaken,
  //     resolverComments
  //   ) => {
  //     try {
  //       const response = await dispatch(
  //         rejectReport(reportId, actionTaken, resolverComments)
  //       );

  //       if (response.meta?.requestStatus === "fulfilled") {
  //         alert("User Report Updated!!");
  //         setDismissModal(false);
  //         setResolverComments("");
  //         setActionTaken("none");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       alert("Cannot dismiss report!!");
  //     }
  //   };

  //   const handleReportResolve = async ({
  //     reportId,
  //     actionTaken,
  //     resolverComments,
  //   }) => {
  //     try {
  //       const response = await dispatch(
  //         resolveReport({ reportId, actionTaken, resolverComments })
  //       );
  //       if (response.meta?.requestStatus === "fulfilled") {
  //         alert("User Report Updated");
  //         setModal(false);
  //         setResolverComments("");
  //         setActionTaken("none");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       alert("Report not resolved!!");
  //     }
  //   };

  const reportDetails = [
    { label: "Report ID", value: report?._id || reportId },
    { label: "Reason", value: report?.reason || "N/A" },
    { label: "Details", value: report?.details || "N/A" },
    { label: "Reported By", value: report?.reportedBy?.name || "Unknown" },
    { label: "Reported Page", value: report?.pageId?.pageName || "Unknown" },
    {
      label: "Status",
      value: report?.resolved === true ? "Resolved" : "Pending",
    },
    ...(report?.resolved
      ? [
          {
            label: "Resolver Email",
            value: report?.resolvedBy?.username || "N/A",
          },
          { label: "Resolver Comments", value: report?.resolverComments },
          { label: "Action Taken", value: report?.actionTaken },
        ]
      : []),
    {
      label: "Reported Page Email",
      value: report?.pageId?.email || "N/A",
    },
    {
      label: "Reporter Email",
      value: report?.reportedBy?.mailAddress || "N/A",
    },
    {
      label: "Created at",
      value: report?.createdAt
        ? new Date(report.createdAt).toLocaleDateString()
        : "N/A",
    },
    {
      label: "Updated at",
      value: report?.updatedAt
        ? new Date(report.updatedAt).toLocaleDateString()
        : "N/A",
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center p-4">
      <div className="w-full max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
          <div className="flex items-center gap-3">
            <IoMdArrowBack
              className="text-2xl hover:cursor-pointer hover:text-gray-800"
              onClick={() => navigate(-1)}
            />
            <span className="text-lg font-semibold">Report Status</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {report?.reportedBy?.name || "Unknown"}
          </span>
        </div>

        {/* Image & Stats */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1 flex justify-center">
            <img
              src={report?.pageId?.profileImg || "/vite.svg"}
              alt="report"
              className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 gap-4 mt-4 text-gray-800">
              {reportDetails.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between border-b pb-3"
                >
                  <div className="font-semibold w-1/2">{item.label}</div>
                  <div className="w-full sm:w-1/2 text-gray-700">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-4 mt-8 border-t pt-6">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Delete Report:</h2>
            <button
              onClick={() => handleReportDelete(reportId)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>

          {!report?.resolved ? (
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Dismiss Report:</h2>
                <button
                  onClick={() => setDismissModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Dismiss
                </button>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Take Action:</h2>
                <button
                  onClick={() => {
                    setModal(true), setActionTaken("warning");
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Action
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {modal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Take Action Against User
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Action Taken
                </label>
                <select
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="warning">Warning</option>
                  <option value="suspended">Suspend For A Week</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolver Comments
                </label>
                <textarea
                  value={resolverComments}
                  onChange={(e) => setResolverComments(e.target.value)}
                  placeholder="Enter your comments..."
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setModal(false);
                    setResolverComments("");
                    setActionTaken("");
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  //   onClick={() =>
                  //     handleReportResolve({
                  //       reportId,
                  //       actionTaken,
                  //       resolverComments,
                  //     })
                  //   }
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Take Action
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {dismissModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Dismiss Report
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Taken
              </label>
              <select
                value={actionTaken}
                onChange={(e) => setActionTaken(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="none">None</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolver Comments
              </label>
              <textarea
                value={resolverComments}
                onChange={(e) => setResolverComments(e.target.value)}
                placeholder="Enter your comments..."
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setDismissModal(false);
                  setResolverComments("");
                  setActionTaken("");
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                // onClick={() =>
                //   handleReportDismiss({
                //     reportId,
                //     resolverComments,
                //     actionTaken,
                //   })
                // }
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Dismiss Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageReportDetails;
