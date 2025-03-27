import FormHeader from "@/components/common/FormHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Jan", value: 500 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 1000 },
  { name: "Apr", value: 1500 },
  { name: "May", value: 1300 },
  { name: "Jun", value: 700 },
  { name: "Jul", value: 900 },
  { name: "Aug", value: 1100 },
  { name: "Sep", value: 800 },
  { name: "Oct", value: 1200 },
  { name: "Nov", value: 1500 },
  { name: "Dec", value: 1400 },
];

const pieData = [
  { name: "Faculty 1", value: 50 },
  { name: "Faculty 2", value: 34 },
  { name: "Faculty 3", value: 34 },
];

const COLORS = ["#003fbe", "#f4c542", "#f34542"];

const AdminDashboardView = () => {
  return (
    <section className="m-4">
      <FormHeader title="Dashboard" />
      <div className="p-6 bg-white rounded-b-lg min-h-[500px]">
        <h2 className="text-xl font-bold mb-4">WELCOME TO ADMIN DASHBOARD</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {["Views", "Visits", "New Users", "Active Contributors"].map(
            (title, index) => (
              <Card key={index} className="shadow-md p-4">
                <CardContent>
                  <h4 className="text-gray-600">{title}</h4>
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 2000)}</p>
                  <p className="text-sm text-green-500">+{(Math.random() * 10).toFixed(2)}%</p>
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Pie Chart and Countdown Timer */}
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4">

          {/* Line Chart (70%) */}
          <Card className="shadow-md p-4 mb-6">
            <CardContent>
              <h4 className="text-lg font-bold mb-2">Total Contributions</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#003fbe" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart (30%) */}
          <Card className="shadow-md p-4">
            <CardContent>
              <h4 className="text-lg font-bold mb-2">Contributions by Faculty</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}-${entry}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>


        <Card className="shadow-md p-4">
          <CardContent className="flex flex-col items-center text-center">
            <Clock className="text-red-500 w-10 h-10 mb-2" />
            <p className="text-xl font-bold text-red-500">10 days remaining</p>
            <p className="text-3xl font-bold text-red-600">10:04:15</p>
            <p className="text-sm text-gray-500">Days Hours Mins</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminDashboardView;
