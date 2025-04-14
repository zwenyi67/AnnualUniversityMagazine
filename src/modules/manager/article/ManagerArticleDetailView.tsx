import { Link, useLocation } from "react-router-dom";
import {
  CircleChevronLeft,
} from "lucide-react";
import FormHeader from "@/components/common/FormHeader";

const ManagerArticleDetailView = () => {
  const location = useLocation();

  const passedData = location.state?.data;

  if (!passedData) {
    return (
      <div className="p-4 text-red-500">
        No data provided. Please access this page via the article list.
      </div>
    );
  }

  const { article_path, image_paths, title, description, updated_at } = passedData;

  const rawImagePaths = image_paths;
  let imagePaths: string[] = [];

  try {
    imagePaths = JSON.parse(rawImagePaths);
  } catch (err) {
    console.error("Invalid image_paths format:", err);
  }

  return (
    <section className="m-4">
      <FormHeader title="Selected Articles" />
      <div className="p-6 bg-white rounded-lg">
        <div className='flex mb-8'>
          <div className='me-5'>
            <Link to={'/manager/articles'}>
              <CircleChevronLeft className='w-8 h-8 text-secondary hover:text-blue-500' />
            </Link>
          </div>
          <div className='text-base font-semibold mt-1 text-secondary'>
            Article Detail
          </div>
          <div className="text-sm text-gray-500 ms-auto">
            Last updated:{" "}
            {updated_at
              ? new Date(updated_at).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600">{description}</p>

          <div>
            <p className="font-semibold text-gray-700">Document:</p>
            <a
              href={article_path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Article Document
            </a>

            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(article_path)}&embedded=true`}
              className="w-full h-[600px] border rounded-md shadow-lg"
              title="Document Preview"
            ></iframe>

          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Images:</p>
            <div className="flex gap-4 flex-wrap">
              {imagePaths?.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`Article Image ${index + 1}`}
                  className="w-[20%]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagerArticleDetailView;
