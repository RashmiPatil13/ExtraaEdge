import React from "react";
import { MOCK_CALL_HISTORY, STATUS_COLORS } from "../constants";

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Call History Log
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Lead Name</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Outcome Status</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {MOCK_CALL_HISTORY.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {log.leadName}
                  </td>
                  <td className="px-6 py-4">{log.duration}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${STATUS_COLORS[log.status]}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
