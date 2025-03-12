import WordViewer from "@/components/word-viewer/WordViewer";

const StudentArticleDetailsView = () => {
  // Replace with your actual Google Drive File ID
  const wordFileUrl =
    "https://drive.google.com/uc?id=1T4M6VIJsgBgYgVmevFScfTGakOXA6pBb&export=download";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <WordViewer fileUrl={wordFileUrl} />
      <div className="flex flex-col items-center justify-between h-full">
        <div className="bg-[#4169E1] text-white py-3 w-full rounded-t-lg">
          <p className="text-lg font-semibold">Comment</p>
        </div>
        <div className="flex-1 py-3"></div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default StudentArticleDetailsView;
