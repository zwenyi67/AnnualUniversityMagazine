import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import api from '@/api'
import { toast } from "@/hooks/use-toast";
// import { useQueryClient } from "@tanstack/react-query";
import { GuestType } from "@/api/guest/types";

const ArticleManageColumn = ({ data }: { data: GuestType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  //   const queryClient = useQueryClient();

  // Update this to match your API structure for articles
  const deleteArticle = (id: number) => {
    // Replace with your actual API call for deleting articles
    // Example:
    // api.coordinator.deleteArticle.useMutation()
    console.log("Deleting article with ID:", id);
    // For now, just close the dialog
    setIsDialogOpen(false);

    // Mock success toast for demonstration
    toast({
      title: "Article Deleted successfully",
      variant: "success",
    });
  };

  const handleDelete = (id: number) => {
    deleteArticle(id);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="default"
        onClick={() => navigate(`/coordinator/articles/1`)}
        className="bg-blue-500 mr-4 hover:bg-transparent hover:text-blue-500 border-2 border-blue-500"
      >
        Info
      </Button>
      <Button
        variant="default"
        onClick={() => setIsDialogOpen(true)}
        className="bg-green-500 hover:bg-transparent hover:text-green-500 border-2 border-green-500"
      >
        Select
      </Button>
      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this article?
            </h2>
            <div className="flex justify-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(data.id)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManageColumn;
