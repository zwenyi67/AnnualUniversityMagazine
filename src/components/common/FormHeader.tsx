import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CircleChevronLeft, RefreshCw } from "lucide-react";

interface FormHeaderProps {
  title: string;
  onRefresh?: () => void;
  isLoading?: boolean;
  isShowBackButton?: boolean;
}

const FormHeader = ({
  title,
  onRefresh,
  isLoading,
  isShowBackButton = false,
}: FormHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="border px-4 py-3 bg-secondary rounded-t-lg text-white font-semibold flex justify-between items-center">
      <div className="flex flex-wrap items-center">
        {isShowBackButton && (
          <CircleChevronLeft
            className="w-7 h-7 mr-3"
            onClick={() => navigate(-1)}
          />
        )}

        {title}
      </div>
      <Button
        disabled={isLoading}
        variant={"secondary"}
        onClick={onRefresh}
        className="text-xs"
      >
        <span className="text-xs">Refresh</span>
        <RefreshCw className={`h-2 w-2 ${isLoading && "animate-spin"}`} />
      </Button>
    </div>
  );
};

export default FormHeader;
