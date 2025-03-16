import { Button } from "@/components/ui/button";
import WordViewer from "@/components/word-viewer/WordViewer";

const StudentArticleDetailsView = () => {
  // Replace with your actual Google Drive File ID
  const wordFileUrl =
    "https://drive.google.com/uc?id=1T4M6VIJsgBgYgVmevFScfTGakOXA6pBb&export=download";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <WordViewer fileUrl={wordFileUrl} />
      <div className="flex flex-col items-center justify-between h-full border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-[#4169E1] text-white py-3 w-full rounded-t-lg">
          <p className="text-lg font-semibold px-3">Comment</p>
        </div>
        <div className="flex-1 py-3 overflow-y-hidden">
          <div className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-xl hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out">
            <div className="flex-shrink-0 p-4">
              <img
                className="object-cover w-10 h-10 rounded-full shadow-md"
                src="https://m.media-amazon.com/images/I/61KBNVEfxcL._SY879_.jpg"
                alt="User Profile"
              />
            </div>

            <div className="flex flex-col p-4 pt-2 md:pt-4">
              <h5 className="mb-2 text-md font-semibold text-gray-900 dark:text-white">
                John Doe
              </h5>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                2 hours ago
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-3">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type your comment here..."
            required
          />
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentArticleDetailsView;
