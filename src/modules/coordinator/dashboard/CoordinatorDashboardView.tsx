import {
  ClipboardCheck,
  Clock,
  FileCheck,
  CalendarClock,
  Bell,
  AlertCircle,
} from "lucide-react";
import { TableUI } from "@/components/table/TableUI";
import { columns } from "../dashboard/columns";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import React from "react";
import { differenceInDays } from "date-fns";
import { SystemSetting } from "@/api/coordinator/types";

export default function CoordinatorDashboardView() {
  const navigate = useNavigate();
  const { data } = api.coordinator.getDashboard.useQuery();

  const { data: notificationData } =
    api.notification.getCoordinatorNotifications.useQuery();
  const notifications =
    notificationData?.filter((notification) => notification.is_read === 0)
      .length ?? 0;

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
    urgent: {
      bg: "bg-red-100",
      text: "text-red-700",
      hover: "hover:bg-red-200",
      border: "border-red-200",
    },
  };

  const statsInfo = [
    {
      title: "Total Submissions",
      // count: 147,
      count: data?.contributionCount ?? 0,
      icon: ClipboardCheck,
      colorScheme: COLORS.primary,
    },
    {
      title: "Pending Review",
      // count: 24,
      count: data?.pendingCount ?? 0,
      icon: Clock,
      colorScheme: COLORS.pending,
    },
    {
      title: "Approved",
      // count: 98,
      count: data?.selectedCount ?? 0,
      icon: FileCheck,
      colorScheme: COLORS.approved,
    },
  ];
  interface DeadlineWarningProps {
    systemSettings?: SystemSetting[];
  }

  const DeadlineWarning: React.FC<DeadlineWarningProps> = ({
    systemSettings,
  }) => {
    // Get the active system setting
    const activeSetting = React.useMemo(() => {
      if (!systemSettings || !Array.isArray(systemSettings)) return null;
      return systemSettings.find((setting) => setting.active_flag === 1);
    }, [systemSettings]);

    // Calculate days remaining until deadline
    const daysRemaining = React.useMemo(() => {
      if (!activeSetting) return null;

      const finalClosureDate = new Date(activeSetting.final_closure_date);
      const currentDate = new Date();

      return differenceInDays(finalClosureDate, currentDate);
    }, [activeSetting]);

    // Don't show anything if no active setting or deadline has passed
    if (!daysRemaining || daysRemaining < 0) {
      return null;
    }

    // Different UI based on days remaining
    if (daysRemaining < 10) {
      return (
        <div
          className={`${COLORS.urgent.bg} border ${COLORS.urgent.border} rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300`}
        >
          <div className="flex gap-4 items-center">
            <div
              className={`${COLORS.urgent.bg} p-3 rounded-full transition-all duration-300 hover:scale-110 border ${COLORS.urgent.border}`}
            >
              <AlertCircle className={COLORS.urgent.text} size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-red-800 text-lg">
                Urgent: Submission Deadline
              </h3>
              <p className="text-red-700">
                {daysRemaining <= 1
                  ? "Submissions close today! Final review required immediately."
                  : `Only ${daysRemaining} days left for submissions. Urgent review required for all pending contributions.`}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (daysRemaining < 20) {
      return (
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
                {`New submissions will be disabled in ${daysRemaining} days. Make sure to review all pending contributions before deadline.`}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // No warning needed if more than 20 days remaining
    return null;
  };

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Faculty of Engineering Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div
            className="relative"
            onClick={() => navigate("/coordinator/notifications")}
          >
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
      <DeadlineWarning systemSettings={data?.systemSettings} />
      {/* <div
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
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-8">
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
          data={data?.contributions ?? []}
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
