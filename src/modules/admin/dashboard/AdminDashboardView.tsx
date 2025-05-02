import { Card, CardContent } from "@/components/ui/card";
import { Clock, LucideIcon } from "lucide-react";
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
  UserCog,
  Users,
  GraduationCap,
  User,
  Building,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import api from "@/api";
import { differenceInDays, format } from "date-fns";
import { DashboardDataType } from "@/api/admin/types";
import { useState } from "react";
import { useUserData } from "@/store/AuthContext";
import { formatDate } from "date-fns";
import { ChartLine, Globe, UserCheck } from "lucide-react"

const AdminDashboardView = () => {

  const { data } = api.admin.dashboard.dashboardData.useQuery();

  type DashboardStatKey = Exclude<keyof DashboardDataType, "setting" | "contributionData" | 'contributionDataByFaculty' | 'contributionWithoutComment' | 'contributionWithoutCommentAfter14'>;

  const { userData } = useUserData();

  const statsData: {
    title: string;
    key: DashboardStatKey;
    icon: LucideIcon;
    color: string;
  }[] = [
      { title: "Manager", key: "managers", icon: UserCog, color: "text-blue-600" },
      { title: "Coordinator", key: "coordinators", icon: Users, color: "text-purple-600" },
      { title: "Student", key: "students", icon: GraduationCap, color: "text-green-600" },
      { title: "Guest", key: "guests", icon: User, color: "text-gray-500" },
      { title: "Faculty", key: "faculties", icon: Building, color: "text-yellow-600" },
      { title: "All Submissions", key: "contributions", icon: FileText, color: "text-indigo-600" },
      { title: "Approved", key: "approved", icon: CheckCircle, color: "text-emerald-600" },
      { title: "Rejected", key: "rejected", icon: XCircle, color: "text-rose-600" },
    ];

  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const filteredFacultyData = data?.contributionDataByFaculty?.filter(item => item.year === selectedYear) ?? [];

  const years = Array.from(
    new Set(data?.contributionDataByFaculty.map((item) => item.year))
  ).sort();

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

    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome {userData?.is_login ? " Back" : ""} {userData?.first_name + " " + userData?.last_name} !!!
          </h1>
        </div>
        <div className="text-right text-sm text-gray-600">
          <span className="font-medium">Last login:</span>{" "}
          {userData?.last_login_at
            ? formatDate(new Date(userData.last_login_at), "dd MMM yyyy hh:mm:ss a")
            : "First time"}
        </div>
      </div>
      <div>
        {!userData?.is_login && (
          <p className="mt-2 rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            We're excited to have you here for the first time. Start contributing and exploring ContributeX!
          </p>
        )}
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Dashboard <span className="text-sm text-gray-600 ms-3">Academic Year ({academicYear})</span></h2>
      </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Most Viewed Page */}
        <Card className="shadow-lg p-5 rounded-lg bg-white">
          <CardContent className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 text-xl">
            <ChartLine className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Most Viewed Page</h4>
              <p className="text-lg font-semibold">
                {data?.most_used_table
                  ? `${data.most_used_table.replace(/s$/, '').replace(/^./, c => c.toUpperCase())} Management`
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Most Used Browser */}
        <Card className="shadow-lg p-5 rounded-lg bg-white">
          <CardContent className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600 text-xl">
            <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Most Used Browser</h4>
              <p className="text-lg font-semibold">
                {data?.most_used_browser || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Most Active User */}
        <Card className="shadow-lg p-5 rounded-lg bg-white">
          <CardContent className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 text-xl">
            <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Most Active User</h4>
              <p className="text-lg font-semibold">
                {data?.most_active_user || "No one"}
              </p>
            </div>
          </CardContent>
        </Card>
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

      {/* Contributions without comment */}
      <Card className="shadow-md p-4 mb-6">
        <CardContent>
          <h4 className="text-lg font-bold mb-4">Contribution Without Comments</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Faculty</th>
                  <th className="px-4 py-3 text-left">Contributor</th>
                  <th className="px-4 py-3 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {data?.contributionWithoutComment.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      No data available.
                    </td>
                  </tr>
                ) : (
                  data?.contributionWithoutComment.map((item, index) => (
                    <tr key={item.id} className="border-t hover:bg-gray-100 transition">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3">{item.faculty}</td>
                      <td className="px-4 py-3">{item.contributor}</td>
                      <td className="px-4 py-3">
                        {item.created_at ? format(new Date(item.created_at), "dd MMMM yyyy hh:mm:ss") : "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Contributions without comment After 14 days */}
      <Card className="shadow-md p-4 mb-6">
        <CardContent>
          <h4 className="text-lg font-bold mb-4">Contribution Without Comments After 14 days of Submission</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Faculty</th>
                  <th className="px-4 py-3 text-left">Contributor</th>
                  <th className="px-4 py-3 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {data?.contributionWithoutCommentAfter14.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      No data available.
                    </td>
                  </tr>
                ) : (
                  data?.contributionWithoutCommentAfter14.map((item, index) => (
                    <tr key={item.id} className="border-t hover:bg-gray-100 transition">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3">{item.faculty}</td>
                      <td className="px-4 py-3">{item.contributor}</td>
                      <td className="px-4 py-3">
                        {item.created_at ? format(new Date(item.created_at), "dd MMMM yyyy hh:mm:ss") : "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="shadow-md p-4 mb-6">
        <CardContent>
          <h4 className="text-lg font-bold mb-2">Total Contributions By Month (Current Year)</h4>
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
          {/* Year Tabs */}
          <div className="flex gap-4 mb-6">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-md font-semibold transition ${selectedYear === year ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={filteredFacultyData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="faculty"
                width={100}
                tick={{ fontSize: 10 }}
              />
              <Tooltip formatter={(value: number, name: string) => name === 'percentage' ? `${value}%` : value} />
              <Legend />
              <Bar dataKey="value" name="Count" fill="#4d80f7" />         // Blue
              <Bar dataKey="percentage" name="Percentage" fill="#25a6eb" /> // Green
              <Bar dataKey="contributors" name="Contributors" fill="#2411f2" /> // Orange
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardView;
