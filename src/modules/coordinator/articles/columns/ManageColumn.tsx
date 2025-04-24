import api from "@/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { CoordinatorsType } from "@/api/coordinator/types";
import { Check, Info, FileEdit, CheckSquare } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const ArticleManageColumn = ({ data }: { data: CoordinatorsType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"review" | "select">(
    "review"
  );
  const [reviewState, setReviewState] = useState<
    "pending" | "reviewed" | "selected"
  >("pending");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setReviewState(data.status);
  }, [data]);

  // Initialize the review mutation
  const reviewMutation = api.coordinator.reviewContribution.useMutation({
    onSuccess: () => {
      // Update local state
      setReviewState("reviewed");
      setIsDialogOpen(false);

      // Invalidate and refetch contributions
      queryClient.invalidateQueries({ queryKey: ["getContributions"] });

      // Show success message
      toast({
        title: "Article reviewed successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to review article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Initialize the select mutation
  const selectMutation = api.coordinator.selectContribution.useMutation({
    onSuccess: () => {
      // Update local state
      setReviewState("selected");
      setIsDialogOpen(false);

      // Invalidate and refetch contributions
      queryClient.invalidateQueries({ queryKey: ["getContributions"] });

      // Show success message
      toast({
        title: "Article selected successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to select article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleReview = () => {
    setDialogAction("review");
    setIsDialogOpen(true);
  };

  const handleSelect = () => {
    setDialogAction("select");
    setIsDialogOpen(true);
  };

  const confirmAction = () => {
    if (dialogAction === "review") {
      // Call the review API
      reviewMutation.mutate({ contribution_id: data.id });
    } else {
      // Call the select API
      selectMutation.mutate({ contribution_id: data.id });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="columnIcon"
        size="icon"
        onClick={() =>
          navigate(`/coordinator/articles/${data.id}`)
        }
        className="hover:bg-blue-100"
      >
        <Info className="h-4 w-4 text-blue-500" />
      </Button>

      {reviewState === "pending" && (
        <Button
          variant="columnIcon"
          size="icon"
          onClick={handleReview}
          className="hover:bg-orange-100"
          disabled={reviewMutation.isPending}
        >
          <FileEdit className="h-4 w-4 text-orange-500" />
        </Button>
      )}

      {reviewState === "reviewed" && (
        <Button
          variant="columnIcon"
          size="icon"
          onClick={handleSelect}
          className="hover:bg-green-100"
          disabled={selectMutation.isPending}
        >
          <CheckSquare className="h-4 w-4 text-green-500" />
        </Button>
      )}

      {reviewState === "selected" && (
        <Button
          variant="columnIcon"
          size="icon"
          disabled
          className="bg-green-50"
        >
          <Check className="h-4 w-4 text-green-700" />
        </Button>
      )}

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              {dialogAction === "review"
                ? "Are you sure you want to review this article?"
                : "Are you sure you want to select this article?"}
            </h2>
            <div className="flex justify-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
                disabled={reviewMutation.isPending || selectMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmAction}
                disabled={reviewMutation.isPending || selectMutation.isPending}
              >
                {reviewMutation.isPending || selectMutation.isPending
                  ? "Processing..."
                  : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManageColumn;
