import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Image,
  Info,
  RefreshCw,
} from "lucide-react";
import FormHeader from "@/components/common/FormHeader";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const ManagerArticleDetailView = () => {
  const location = useLocation();
  const passedData = location.state?.data;
  const [activeTab, setActiveTab] = useState("description");
  const [docLoading, setDocLoading] = useState(true);
  const [docError, setDocError] = useState(false);
  const navigate = useNavigate();

  if (!passedData) {
    return (
      <div className="p-4 text-red-500">
        No data provided. Please access this page via the article list.
      </div>
    );
  }

  const {
    article_path,
    image_paths,
    title,
    description,
    first_name,
    last_name,
    faculty_name,
    updated_at,
  } = passedData;

  let imagePaths: string[] = [];
  try {
    imagePaths = JSON.parse(image_paths);
  } catch (err) {
    console.error("Invalid image_paths format:", err);
  }

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    try {
      const articleResponse = await fetch(article_path);
      const articleBlob = await articleResponse.blob();
      const articleName = article_path.split("/").pop() || "article.docx";
      zip.file(articleName, articleBlob);

      for (let i = 0; i < imagePaths.length; i++) {
        const imgUrl = imagePaths[i];
        const imgResponse = await fetch(imgUrl);
        const imgBlob = await imgResponse.blob();
        const imgName = `image_${i + 1}.${
          imgUrl.split(".").pop()?.split("?")[0]
        }`;
        zip.file(imgName, imgBlob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `${title.replace(/\s+/g, "_")}_ZIP.zip`);
    } catch (error) {
      console.error("Error creating ZIP:", error);
    }
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

  const openFileInNewTab = () => {
    const fileUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
      article_path
    )}&embedded=true`;
    window.open(fileUrl, "_blank");
  };

  const handleDocFrameLoad = () => {
    setDocLoading(false);
    setDocError(false);
  };

  const handleDocFrameError = () => {
    setDocLoading(false);
    setDocError(true);
  };

  const parseImagePaths = (imagePaths: string | undefined): string[] => {
    if (!imagePaths) return [];
    try {
      const parsed = JSON.parse(imagePaths);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const handleBackClick = () => {
    navigate("/manager/articles");
  };

  return (
    <section className="m-4">
      <FormHeader title="Selected Articles" />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleBackClick}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
            <h1 className="text-xl font-semibold">{title}</h1>

            <Button
              size="sm"
              onClick={handleDownloadZip}
              className="bg-secondary hover:bg-secondary/80 text-white ml-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              Download ZIP
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            Last updated:{" "}
            {updated_at ? new Date(updated_at).toLocaleDateString() : "N/A"}
          </div>
        </div>
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
                  <h2 className="text-lg font-semibold mb-2">{title}</h2>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">
                      Contributor:
                    </span>
                    <span className="text-sm ml-2">
                      {first_name + " " + last_name || "Unknown"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">
                      Faculty:
                    </span>
                    <span className="text-sm ml-2">{faculty_name}</span>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="text-md font-medium mb-2">Abstract</h3>
                    <p className="text-sm">{description}</p>
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
                {(() => {
                  const images = parseImagePaths(image_paths);
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
                        Figure {index + 1}: {title || "Article"} - Visual{" "}
                        {index + 1}
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
                        <Button onClick={retryDocumentLoad} variant="secondary">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Iframe */}
                  <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(
                      article_path || ""
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
    </section>
  );
};

export default ManagerArticleDetailView;
