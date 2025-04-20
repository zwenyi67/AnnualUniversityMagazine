import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Info,
  RefreshCw,
  Send,
  Upload,
} from "lucide-react";
import api from "@/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
});

const StudentArticleDetailsView = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [docLoading, setDocLoading] = useState(true);
  const [docError, setDocError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { id } = useParams<{ id: string }>();
  const articleId = Number(id);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: comments, refetch: refreshComment } =
    api.student.getCommentsByArticleID.useQuery(articleId);
  const { data: article } =
    api.student.getContributionByContributionID.useQuery(articleId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { comment: "" },
  });

  const refreshComments = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshComment();
    } catch (error) {
      console.error("Error refreshing comments:", error);
      toast({
        title: "Failed to refresh comments",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  }, [refreshComment]);

  const openFileInNewTab = useCallback(() => {
    if (article?.article_path) {
      const fileUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
        article.article_path
      )}&embedded=true`;
      window.open(fileUrl, "_blank");
    }
  }, [article?.article_path]);

  const handleDocFrameLoad = useCallback(() => {
    setDocLoading(false);
    setDocError(false);
  }, []);

  const handleDocFrameError = useCallback(() => {
    setDocLoading(false);
    setDocError(true);
  }, []);

  const retryDocumentLoad = useCallback(() => {
    setDocLoading(true);
    setDocError(false);
    const iframe = document.querySelector(
      'iframe[title="Document Preview"]'
    ) as HTMLIFrameElement;
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = "";
      setTimeout(() => {
        iframe.src = `${currentSrc}${
          currentSrc.includes("?") ? "&" : "?"
        }reload=${Date.now()}`;
      }, 100);
    }
  }, []);

  const { mutate: addComment } = api.student.addComment.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCommentsByArticleID"] });
      toast({
        title: "Comment added successfully",
        variant: "success",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: error.message || "Failed to add comment",
        variant: "destructive",
      });
    },
    onSettled: () => {
      dispatch(hideLoader());
    },
  });

  const onCommentSubmit = (data: z.infer<typeof formSchema>) => {
    addComment({
      contribution_id: articleId,
      comment: data.comment,
    });
  };

  const handleBackClick = useCallback(() => {
    navigate("/coordinator/articles");
  }, [navigate]);

  const parseImagePaths = (imagePaths: string | undefined): string[] => {
    if (!imagePaths) return [];
    try {
      const parsed = JSON.parse(imagePaths);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
          <h1 className="text-xl font-semibold">
            {article?.title || "Loading..."}
          </h1>
          <Button className="bg-secondary hover:bg-secondary/80">
            Update Article
            <Upload className="h-4 w-4 ml-2" />
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Last updated:{" "}
          {article?.updated_at
            ? new Date(article.updated_at).toLocaleDateString()
            : "N/A"}
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-hidden">
        {/* Content Viewer (Left Side) */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="p-3 bg-gray-50 border-b flex-shrink-0">
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger
                  value="description"
                  className="flex items-center data-[state=active]:bg-secondary data-[state=active]:text-white"
                >
                  <Info className="h-4 w-4 mr-2" />
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="flex items-center data-[state=active]:bg-secondary data-[state=active]:text-white"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Images
                </TabsTrigger>
                <TabsTrigger
                  value="document"
                  className="flex items-center data-[state=active]:bg-secondary data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Document
                </TabsTrigger>
              </TabsList>

              <div className="h-full overflow-hidden flex flex-col mt-4">
                <TabsContent
                  value="description"
                  className="flex-grow overflow-auto h-full"
                >
                  <Card className="h-full">
                    <CardContent className="p-4">
                      <h2 className="text-lg font-semibold mb-2">
                        {article?.title || "Loading..."}
                      </h2>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          Faculty:
                        </span>
                        <span className="text-sm ml-2">
                          {article?.faculty?.name || "Unknown"}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <h3 className="text-md font-medium mb-2">Abstract</h3>
                        <p className="text-sm">
                          {article?.description || "No abstract available"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent
                  value="images"
                  className="flex-grow h-full overflow-hidden"
                >
                  <div className="space-y-4 overflow-y-auto h-full pr-2">
                    {(() => {
                      const images = parseImagePaths(article?.image_paths);
                      if (!images.length) {
                        return (
                          <div className="text-center text-gray-500 py-8">
                            No images available for this article.
                          </div>
                        );
                      }
                      return images.map((img, index) => (
                        <div key={`${img}-${index}`} className="relative">
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md z-0">
                            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                          </div>
                          <img
                            src={img}
                            alt={`Figure ${index + 1}`}
                            className="w-full h-auto rounded-md shadow-sm"
                            onLoad={(e) => {
                              e.currentTarget.parentElement
                                ?.querySelector("div.absolute")
                                ?.classList.add("hidden");
                            }}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/400x300?text=Image+Not+Found";
                              e.currentTarget.parentElement
                                ?.querySelector("div.absolute")
                                ?.classList.add("hidden");
                            }}
                          />
                          <div className="mt-2 text-sm text-gray-600">
                            Figure {index + 1}: {article?.title || "Article"} -
                            Visual {index + 1}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </TabsContent>

                <TabsContent
                  value="document"
                  className="flex-grow h-full overflow-hidden"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex justify-end p-4 bg-gray-50 border-b shadow-md">
                      <Button
                        onClick={openFileInNewTab}
                        variant="outline"
                        size="sm"
                        disabled={!article?.article_path}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in New Tab
                      </Button>
                    </div>
                    <div className="relative w-full h-[calc(100vh-160px)]">
                      {docLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4" />
                          <p className="text-gray-600">Loading document...</p>
                        </div>
                      )}
                      {docError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                          <div className="text-center p-6">
                            <div className="text-red-500 mb-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12" y2="16" />
                              </svg>
                            </div>
                            <p className="mb-4 text-gray-700">
                              Failed to load document.
                            </p>
                            <Button
                              onClick={retryDocumentLoad}
                              variant="secondary"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Retry
                            </Button>
                          </div>
                        </div>
                      )}
                      <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(
                          article?.article_path || ""
                        )}&embedded=true`}
                        className="w-full h-full border-none rounded-md shadow-lg"
                        title="Document Preview"
                        onLoad={handleDocFrameLoad}
                        onError={handleDocFrameError}
                      />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Comments Section (Right Side) */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
          <div className="p-3 bg-gray-50 border-b flex-shrink-0">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">Comments & Feedback</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshComments}
                disabled={refreshing}
                className="p-1 h-8 w-8 bg-secondary text-white rounded-full hover:bg-secondary/70 hover:text-white"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>

          <div
            className="flex-grow overflow-y-auto p-4"
            style={{ maxHeight: "calc(100vh - 250px)" }}
          >
            {comments?.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No comments yet. Be the first to comment.
              </div>
            ) : (
              <div className="space-y-4">
                {comments?.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <img
                          src="/src/modules/coordinator/articles/avatar1.jpg"
                          alt="User avatar"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/40?text=User";
                          }}
                        />
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {comment.user?.first_name || "Anonymous"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t flex-shrink-0">
            <form
              onSubmit={handleSubmit(onCommentSubmit)}
              className="flex items-end space-x-2"
            >
              <div className="flex-grow">
                <Textarea
                  {...register("comment")}
                  placeholder="Add Comment..."
                  className="resize-none"
                  rows={2}
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.comment.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={refreshing}
                className="p-1 h-10 w-10 bg-secondary text-white hover:bg-secondary/70 hover:text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentArticleDetailsView;
