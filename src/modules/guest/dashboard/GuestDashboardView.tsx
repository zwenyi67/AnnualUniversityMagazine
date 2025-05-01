import { Card, CardContent } from "@/components/ui/card";
import { useUserData } from "@/store/AuthContext";

const GuestDashboardView = () => {

  const { userData } = useUserData();

  return (

    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome {userData?.is_login ? " Back" : ""} {userData?.first_name + " " + userData?.last_name} !!!
          </h1>
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
        <h2 className="text-xl font-bold">{userData?.faculty_name} Faculty</h2>
      </div>
      <div>
        <Card className="shadow-lg py-3 rounded-lg">
          <CardContent className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-semibold">Guest Account</h4>
              <p className="text-sm mt-2 text-gray-600">You are just a guest user and can only view the articles within your faculty.</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-4xl text-gray-600">
                <i className="fas fa-eye"></i> {/* Changed icon to an eye, signifying viewing */}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestDashboardView;
