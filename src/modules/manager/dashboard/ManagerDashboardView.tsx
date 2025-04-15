import FormHeader from "@/components/common/FormHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Eye, EyeOff, LucideIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Legend } from "recharts";
import {
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import api from "@/api";
import { differenceInDays, format } from "date-fns";
import { DashboardDataType } from "@/api/manager/types";

const ManagerDashboardView = () => {

  const { data } = api.manager.dashboardData.useQuery();

  type DashboardStatKey = Exclude<keyof DashboardDataType, "setting" | "contributionData" | 'contributionDataByFaculty'>;

const statsData: {
  title: string;
  key: DashboardStatKey;
  icon: LucideIcon;
  color: string;
}[] = [
  { title: "All Submissions", key: "contributions", icon: FileText, color: "text-indigo-600" },
  { title: "Pending", key: "pending", icon: Clock, color: "text-yellow-500" },
  { title: "Approved", key: "approved", icon: CheckCircle, color: "text-emerald-600" },
  { title: "Rejected", key: "rejected", icon: XCircle, color: "text-rose-600" },
  { title: "Reviewed", key: "reviewed", icon: Eye, color: "text-blue-600" },
  { title: "Unreviewed", key: "unreviewed", icon: EyeOff, color: "text-gray-500" },
];

  const academicYear = data?.setting?.academic_year ?? "N/A";

  const closureDate = data?.setting?.closure_date
    ? new Date(data.setting.closure_date)
    : null;

  const finalClosureDate = data?.setting?.final_closure_date
    ? new Date(data.setting.final_closure_date)
    : null;

  const today = new Date();

  const daysToClosure = closureDate ? differenceInDays(closureDate, today) : null;
  const daysToFinalClosure = finalClosureDate ? differenceInDays(finalClosureDate, today) : null;

  return (
    <section className="m-4">
      <FormHeader title="Dashboard" />
      <div className="p-6 bg-white rounded-b-lg min-h-[500px]">
        <h2 className="text-xl font-bold mb-6">WELCOME TO Manager DASHBOARD <span className="text-sm text-gray-600 ms-3">Academic Year ({academicYear})</span></h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statsData.map(({ title, key, icon: Icon, color }, index) => (
            <Card key={index} className="shadow-md p-4">
              <CardContent className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm text-gray-600">{title}</h4>
                  <p className="text-xl font-bold">{data?.[key] ?? 0}</p>
                </div>
                <Icon className={`w-8 h-8 ${color}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Submission Closure */}
          <Card className="shadow-md p-4 bg-white border border-red-300">
            <CardContent className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
                <Clock className="text-red-600 w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600">Submission Closure</p>
                <p className="text-2xl font-bold text-red-700">
                  {closureDate ? format(closureDate, "dd MMMM yyyy") : "N/A"}
                </p>
                {daysToClosure !== null && (
                  <span className="inline-block mt-1 text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {daysToClosure} Days Left
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Final Closure */}
          <Card className="shadow-md p-4 bg-white border border-red-300">
            <CardContent className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
                <Clock className="text-red-600 w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600">Final Closure</p>
                <p className="text-2xl font-bold text-red-700">
                  {finalClosureDate ? format(finalClosureDate, "dd MMMM yyyy") : "N/A"}
                </p>
                {daysToFinalClosure !== null && (
                  <span className="inline-block mt-1 text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {daysToFinalClosure} Days Left
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Line Chart */}
        <Card className="shadow-md p-4 mb-6">
          <CardContent>
            <h4 className="text-lg font-bold mb-2">Total Contributions</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data?.contributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#003fbe" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md p-4 mb-6">
          <CardContent>
            <h4 className="text-lg font-bold mb-2">Contributions by Faculty</h4>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data?.contributionDataByFaculty} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <XAxis type="number" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fontSize: 9 }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ManagerDashboardView;
