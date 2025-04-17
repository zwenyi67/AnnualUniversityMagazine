import { useState } from "react";
import {
  ClipboardCheck,
  Clock,
  FileCheck,
  FileX,
  CalendarClock,
  Bell,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { TableUI } from "@/components/table/TableUI";
import { columns } from "../dashboard/columns";
import { SubmissionType } from "@/api/coordinator/types";

// Color scheme constants for better consistency
const COLORS = {
  primary: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    hover: "hover:bg-indigo-200",
    border: "border-indigo-200",
  },
  pending: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    hover: "hover:bg-amber-200",
    border: "border-amber-200",
  },
  approved: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    hover: "hover:bg-emerald-200",
    border: "border-emerald-200",
  },
  rejected: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    hover: "hover:bg-rose-200",
    border: "border-rose-200",
  },
  neutral: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    hover: "hover:bg-slate-200",
    border: "border-slate-200",
  },
};

const mockSubmissions: SubmissionType[] = [
  {
    id: 1,
    student_name: "John Modulela",
    title: "Renewable Energy Innovation",
    submitted_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "pending",
  },
  {
    id: 2,
    student_name: "Emma",
    title: "AI in Healthcare Systems",
    submitted_at: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    status: "approved",
  },
  {
    id: 3,
    student_name: "Michael",
    title: "Smart Cities Development",
    submitted_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "rejected",
  },
  {
    id: 4,
    student_name: "Sarah Johnson",
    title: "Sustainable Materials Research",
    submitted_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: "pending",
  },
  {
    id: 5,
    student_name: "David Chen",
    title: "Quantum Computing Applications",
    submitted_at: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: "approved",
  },
];

const statsInfo = [
  {
    title: "Total Submissions",
    count: 147,
    icon: ClipboardCheck,
    colorScheme: COLORS.primary,
    change: 12,
    direction: "up",
  },
  {
    title: "Pending Review",
    count: 24,
    icon: Clock,
    colorScheme: COLORS.pending,
    change: 8,
    direction: "down",
  },
  {
    title: "Approved",
    count: 98,
    icon: FileCheck,
    colorScheme: COLORS.approved,
    change: 24,
    direction: "up",
  },
  {
    title: "Rejected",
    count: 25,
    icon: FileX,
    colorScheme: COLORS.rejected,
    change: 0,
    direction: "neutral",
  },
];

export default function CoordinatorDashboardView() {
  const [notifications] = useState(3);

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Faculty of Engineering Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell
              size={24}
              className="text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {notifications}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${COLORS.pending.bg} border ${COLORS.pending.border} rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300`}
      >
        <div className="flex gap-4 items-center">
          <div
            className={`${COLORS.pending.bg} p-3 rounded-full transition-all duration-300 hover:scale-110 border ${COLORS.pending.border}`}
          >
            <CalendarClock className={COLORS.pending.text} size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 text-lg">
              Submission Deadline Approaching
            </h3>
            <p className="text-amber-700">
              New submissions will be disabled in 5 days. Make sure to review
              all pending contributions before deadline.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
        {statsInfo.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 border border-slate-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-600 mb-1 font-medium">{stat.title}</p>
                <h2 className="text-3xl font-bold text-slate-800">
                  {stat.count}
                </h2>
              </div>
              <div
                className={`${stat.colorScheme.bg} p-3 rounded-md transition-all duration-300 hover:scale-110`}
              >
                <stat.icon className={stat.colorScheme.text} size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.direction === "up" && (
                <span className="text-emerald-600 flex items-center text-sm">
                  <TrendingUp size={16} className="mr-1" />
                  {stat.change}% vs last month
                </span>
              )}
              {stat.direction === "down" && (
                <span className="text-rose-600 flex items-center text-sm">
                  <TrendingDown size={16} className="mr-1" />
                  {stat.change}% vs last month
                </span>
              )}
              {stat.direction === "neutral" && (
                <span className="text-slate-500 flex items-center text-sm">
                  <Minus size={16} className="mr-1" />
                  {stat.change}% vs last month
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300 border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-md transition-all duration-200 hover:bg-blue-700">
              <ClipboardCheck className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">
              Recent Submissions
            </h2>
          </div>
        </div>

        <TableUI
          data={mockSubmissions}
          columns={columns}
          columnVisibility={{ id: false }}
          filterColumns={["student_name", "title"]}
          sortColumn="submitted_at"
          allowAdd={false}
          tableHeaderClass="bg-blue-600"
          tableRowClass="hover:bg-slate-100 transition-colors"
          tableCellClass="text-sm"
        />
      </div>
    </div>
  );
}
