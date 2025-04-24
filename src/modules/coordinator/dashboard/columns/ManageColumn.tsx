import { CoordinatorsType } from "@/api/coordinator/types";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button"; // Updated import
import { useNavigate } from "react-router-dom";

const DashboardManageColumn = ({ data }: { data: CoordinatorsType }) => {
  const navigate = useNavigate();
  const status = data.status;
  const isPending = status === "pending";

  return (
    <Button
      variant="outline"
      className={`flex items-center gap-1 ${
        isPending
          ? "text-blue-600 border-blue-200 hover:bg-blue-50"
          : "text-gray-600 border-gray-200 hover:bg-gray-50"
      }`}
      onClick={() => navigate(`/coordinator/articles/${data.id}`)}
    >
      {isPending ? (
        "Review"
      ) : (
        <>
          <Eye size={14} />
          <span>View</span>
        </>
      )}
    </Button>
  );
};

export default DashboardManageColumn;
