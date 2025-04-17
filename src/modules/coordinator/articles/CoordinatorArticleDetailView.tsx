import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Send,
  Image,
  FileText,
  Info,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/api";
import { CoordinatorsType, ArticleComment } from "@/api/coordinator/types";
import { toast } from "@/hooks/use-toast";

const CoordinatorArticleDetailView = () => {
  const { id } = useParams();
  const articleId = id ? parseInt(id) : undefined;
  const navigate = useNavigate();

  const {
    data: articleData,
    isFetching,
    refetch,
  } = articleId
    ? api.coordinator.getContributionDetail.useQuery(articleId)
    : { data: null };

  const [article, setArticle] = useState<CoordinatorsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [refreshing, setRefreshing] = useState(false);
  const [docLoading, setDocLoading] = useState(true);
  const [docError, setDocError] = useState(false);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  // Add this function to handle document frame loading
  const handleDocFrameLoad = () => {
    setDocLoading(false);
    setDocError(false);
  };

  const handleDocFrameError = () => {
    setDocLoading(false);
    setDocError(true);
  };

  const retryDocumentLoad = () => {
    setDocLoading(true);
    setDocError(false);
    // Force iframe refresh by updating a timestamp
    const iframe = document.querySelector(
      'iframe[title="Document Preview"]'
    ) as HTMLIFrameElement;
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = "";
      setTimeout(() => {
        iframe.src =
          currentSrc +
          (currentSrc.includes("?") ? "&" : "?") +
          "reload=" +
          Date.now();
      }, 100);
    }
  };

  // Add this function to fetch comments
  const refreshComments = async () => {
    if (refetch) {
      refetch();
    }
    setRefreshing(true);
    try {
      // Simulate a fetch delay for demo purposes
      setTimeout(() => {
        setComments(articleData?.comments || []);
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error("Error refreshing comments:", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        if (!articleId) {
          console.error("Invalid article ID");
          return;
        }
        console.log("Fetching article details", articleData);
        // Use the data from the useQuery hook
        if (articleData) {
          setArticle(articleData);
        }
        setComments(articleData?.comments || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article details:", error);
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [articleId, articleData]);

  const handleBackClick = () => {
    navigate("/coordinator/articles");
  };

  const openFileInNewTab = () => {
    const fileUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
      "https://contributex.nyc3.digitaloceanspaces.com/sample.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00VYQ4M6YJ4XK6VW6D%2F20250401%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250401T150201Z&X-Amz-Expires=360000&X-Amz-Signature=bd7b52f030a6f00ae5e34342de3f8b2540604b15e67c80cce675504c55e1aab6&X-Amz-SignedHeaders=host"
    )}&embedded=true`;
    window.open(fileUrl, "_blank");
  };

  const { mutate: addComment } = api.coordinator.addComment.useMutation({
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      console.log("Comment added successfully:", data);
      // Use the response data directly from the API
      if (data) {
        console.log("Comment added successfully:", data);
        const newCommentObj: ArticleComment = {
          id: data.id,
          comment: data.comment,
          created_at: data.created_at,
          user_id: data.user_id,
          name: data.name || "Coordinator Name",
        };
        // Update the comments state with the new comment
        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment("");
        // Scroll to the bottom of comments container after state update
        setTimeout(() => {
          if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop =
              commentsContainerRef.current.scrollHeight;
          }
        }, 100);
      }
    },
  });

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    addComment({
      contribution_id: articleId || 0,
      comment: newComment,
    });
  };

  if (loading || isFetching) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
          <h1 className="text-xl font-semibold">{article?.title}</h1>
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
                  <Image className="h-4 w-4 mr-2" />
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
                        {article?.title}
                      </h2>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          Contributor:
                        </span>
                        <span className="text-sm ml-2">
                          {article?.first_name + " " + article?.last_name ||
                            "Unknown"}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          Faculty:
                        </span>
                        <span className="text-sm ml-2">
                          {article?.faculty_name}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <h3 className="text-md font-medium mb-2">Abstract</h3>
                        <p className="text-sm">{article?.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent
                  value="images"
                  className="flex-grow h-full overflow-hidden"
                >
                  {/* Added flex-grow and adjusted height */}
                  <div className="space-y-4 overflow-y-auto h-full pr-2">
                    {article?.image_paths && article.image_paths.length > 0 ? (
                      article.image_paths.map((img: string, index: number) => (
                        <div key={index} className="relative">
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md z-0">
                            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                          </div>
                          <img
                            src={img}
                            alt={`Figure ${index + 1}`}
                            className="w-full h-auto rounded-md shadow-sm"
                            onLoad={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.parentElement
                                ?.querySelector("div.absolute")
                                ?.classList.add("hidden");
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/api/placeholder/400/300";
                              target.parentElement
                                ?.querySelector("div.absolute")
                                ?.classList.add("hidden");
                            }}
                          />
                          <div className="mt-2 text-sm text-gray-600">
                            Figure {index + 1}: {article?.title} - Visual{" "}
                            {index + 1}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        No images available for this article.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent
                  value="document"
                  className="flex-grow h-full overflow-hidden"
                >
                  <div className="h-full flex flex-col">
                    {/* Button container */}
                    <div className="flex justify-end p-4 bg-gray-50 border-b shadow-md">
                      <Button
                        onClick={openFileInNewTab}
                        variant="outline"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in New Tab
                      </Button>
                    </div>

                    {/* Document content container */}
                    <div className="relative w-full h-[calc(100vh-160px)]">
                      {/* Loading overlay */}
                      {docLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                          <p className="text-gray-600">Loading document...</p>
                        </div>
                      )}

                      {/* Error overlay */}
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
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12" y2="16"></line>
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

                      {/* Iframe */}
                      <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(
                          articleData?.article_path || ""
                        )}&embedded=true`}
                        className="w-full h-full border-none rounded-md shadow-lg"
                        title="Document Preview"
                        onLoad={handleDocFrameLoad}
                        onError={handleDocFrameError}
                      ></iframe>
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

          {/* Comments list - Fixed with max-height and flex-grow */}
          <div
            ref={commentsContainerRef}
            className="flex-grow overflow-y-auto p-4"
            style={{ maxHeight: "calc(100vh - 250px)" }}
          >
            {comments.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No comments yet. Be the first to comment.
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <img
                          src={"/src/modules/coordinator/articles/avatar1.jpg"}
                          alt={comment.name}
                          onError={(e) => {
                            (
                              e.target as HTMLImageElement
                            ).src = `/src/modules/coordinator/articles/avatar1.jpg`;
                          }}
                        />
                      </Avatar>
                      <div>
                        <div className="font-medium">{comment.name}</div>
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

          {/* Comment input */}
          <div className="p-3 border-t flex-shrink-0">
            <div className="flex items-end space-x-2">
              <Textarea
                placeholder="Add Comment..."
                className="resize-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={2}
              />
              <Button
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
                className="h-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorArticleDetailView;
