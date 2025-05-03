import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const WordViewer = ({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName?: string;
}) => {
  const googleDocsViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    fileUrl
  )}&embedded=true`;

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-[#4169E1] text-white px-4 py-3">
        <span className="text-lg font-semibold truncate">
          {fileName || "Word Document"}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Download />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-500">
              <p>Download Word Document</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-[500px] w-full">
        <iframe
          src={googleDocsViewerUrl}
          className="w-full h-full"
          frameBorder="0"
          title="Word Document Viewer"
        />
      </div>
    </div>
  );
};

export default WordViewer;
