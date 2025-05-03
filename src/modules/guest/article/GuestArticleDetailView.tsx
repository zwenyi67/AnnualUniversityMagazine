import { Link, useLocation } from "react-router-dom";
import {
  CircleChevronLeft,
} from "lucide-react";
import FormHeader from "@/components/common/FormHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const GuestArticleDetailView = () => {
  const location = useLocation();
  const passedData = location.state?.data;

  if (!passedData) {
    return (
      <div className="p-4 text-red-500">
        No data provided. Please access this page via the article list.
      </div>
    );
  }

  const { article_path, image_paths, description, updated_at } = passedData;

  let imagePaths: string[] = [];
  try {
    imagePaths = JSON.parse(image_paths);
  } catch (err) {
    console.error("Invalid image_paths format:", err);
  }

  return (
    <section className="m-4">
      <FormHeader title="Selected Articles" />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex mb-6 items-center">
          <Link to="/guest/articles" className="me-4">
            <CircleChevronLeft className="w-8 h-8 text-secondary hover:text-blue-500" />
          </Link>
          <h2 className="text-lg font-semibold text-secondary">Article Detail</h2>
          <span className="text-sm text-gray-500 ms-auto">
            Last updated: {updated_at ? new Date(updated_at).toLocaleDateString() : "N/A"}
          </span>
        </div>

        <div className="space-y-4">

          <p className="text-gray-600">{description}</p>

          <Tabs defaultValue="article" className="w-full mt-6">
            <TabsList className="inline-flex bg-gray-100 p-1 rounded-lg shadow-inner mb-6">
              <TabsTrigger
                value="article"
                className="px-5 py-2 text-sm font-medium rounded-md transition-colors duration-200
               data-[state=active]:bg-white data-[state=active]:text-secondary
               data-[state=inactive]:text-gray-600 hover:bg-white"
              >
                Article Document
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="px-5 py-2 text-sm font-medium rounded-md transition-colors duration-200
               data-[state=active]:bg-white data-[state=active]:text-secondary
               data-[state=inactive]:text-gray-600 hover:bg-white"
              >
                Images
              </TabsTrigger>
            </TabsList>
            <TabsContent value="article">
              <p className="font-semibold text-gray-700 mb-2">Document:</p>
              <a
                href={article_path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mb-3"
              >
                View Article Document
              </a>
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(article_path)}&embedded=true`}
                className="w-full h-[600px] border rounded-md shadow-lg"
                title="Document Preview"
              />
            </TabsContent>

            <TabsContent value="images">
              <p className="font-semibold text-gray-700 mb-2">Images:</p>
              <div className="flex flex-wrap gap-4">
                {imagePaths.length > 0 ? (
                  imagePaths.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Article Image ${index + 1}`}
                      className="w-[20%] rounded-md shadow"
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No images available.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default GuestArticleDetailView;
