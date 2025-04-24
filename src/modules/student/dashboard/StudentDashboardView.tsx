import { FileText, Image, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import api from "@/api";
import { format } from "date-fns";
import { useUserData } from "@/store/AuthContext";

const StudentDashboardView = () => {
  const { data } = api.student.getStudentDashboardData.useQuery();
  const { userData } = useUserData();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome {userData?.first_name + " " + userData?.last_name}!!!
        </h1>
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700 font-bold">
            Submission deadline :{" "}
            {data?.setting.created_at
              ? format(new Date(data?.setting.created_at), "MMM d, yyyy")
              : "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            Final updates deadline :{" "}
            {data?.setting.final_closure_date
              ? format(
                  new Date(data?.setting.final_closure_date),
                  "MMM d, yyyy"
                )
              : "N/A"}
          </p>
        </div>
        <Link to={"/student/articles/create"}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            + New Submission
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* My Statistics */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">My Statistics</h2>
            <div className="space-y-2 text-sm">
              <p>
                Total Submissions
                <span className="float-right font-medium">
                  {data?.statistics.totalSubmissions}
                </span>
              </p>
              <p>
                Pending Review
                <span className="float-right font-medium">
                  {data?.statistics.pendingReview}
                </span>
              </p>
              <p>
                Approved
                <span className="float-right font-medium text-green-600">
                  {data?.statistics.approved}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Submissions</h2>
            <div className="space-y-3 text-sm">
              {data?.statistics.contributions &&
              data?.statistics.contributions.length > 0 ? (
                data?.statistics.contributions.map((contribution) => (
                  <div>
                    <p className="font-medium">
                      {contribution.title}
                      <span className="ml-2 px-2 py-0.5 bg-yellow-300 text-yellow-800 rounded-full text-xs">
                        {contribution.status}
                      </span>
                    </p>
                    <p className="text-gray-500">
                      Submitted on
                      {format(new Date(contribution.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                ))
              ) : (
                <div>There is no submission</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Feedback</h2>
            <div className="text-sm">
              {data?.latestCoordinatorComment ? (
                <>
                  {" "}
                  <p className="font-semibold text-gray-700">
                    {data?.latestCoordinatorComment &&
                      data?.latestCoordinatorComment.user.first_name +
                        " " +
                        data?.latestCoordinatorComment.user.last_name}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Faculty Coordinator
                  </p>
                  <p className="text-gray-700">
                    {data?.latestCoordinatorComment &&
                      data?.latestCoordinatorComment.comment}
                  </p>
                </>
              ) : (
                <div>There is no recent feedback</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission Guidelines */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Submission Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <FileText className="w-6 h-6 mr-3 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Document Format</p>
                <p className="text-sm text-gray-500">
                  Submit articles in Word format (.docx)
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Image className="w-6 h-6 mr-3 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Image Requirements</p>
                <p className="text-sm text-gray-500">
                  High resolution images (min 300dpi)
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-6 h-6 mr-3 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Review Timeline</p>
                <p className="text-sm text-gray-500">Feedback within 14 days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboardView;
