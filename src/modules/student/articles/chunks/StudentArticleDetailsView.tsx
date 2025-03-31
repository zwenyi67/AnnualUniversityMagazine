import api from "@/api";
import { Button } from "@/components/ui/button";
import WordViewer from "@/components/word-viewer/WordViewer";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

// Define form schema
const formSchema = z.object({
  comment: z.string(),
});
const StudentArticleDetailsView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  // Replace with your actual Google Drive File ID
  const wordFileUrl =
    "https://drive.google.com/uc?id=1T4M6VIJsgBgYgVmevFScfTGakOXA6pBb&export=download";

  const { id } = useParams();
  const articleId = Number(id);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: comments } = api.student.getCommentsByArticleID.useQuery(
    articleId!
  );
  const { data: article } =
    api.student.getContributionByContributionID.useQuery(articleId!);

  const imagePaths: string[] = article?.image_paths
    ? JSON.parse(article.image_paths)
    : [];

  const { mutate: addComment } = api.student.addComment.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCommentsByArticleID"] });
      toast({
        title: "New Faculty added successfully",
        variant: "success",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
      form.reset();
    },
    onSettled: () => {
      dispatch(hideLoader());
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = { ...values, contribution_id: articleId };
    addComment(payload);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[calc(100vh-6rem)]">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-2">
          <WordViewer fileUrl={wordFileUrl} />
          <div className="grid grid-cols-3 gap-3">
            {imagePaths.map((image, index) => (
              <img
                key={index}
                src={`http://127.0.0.1:8000/storage/${image}`}
                alt={`image-${index}`}
                className="w-20 h-20 object-cover col-span-1"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col border border-gray-200 rounded-lg shadow-sm h-full overflow-hidden">
        {" "}
        <div className="bg-[#4169E1] text-white py-3 w-full rounded-t-lg">
          <p className="text-lg font-semibold px-3">Comment</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex bg-white border border-gray-200 rounded-lg p-3"
              >
                <div className="flex-shrink-0 pr-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://m.media-amazon.com/images/I/61KBNVEfxcL._SY879_.jpg"
                    alt="User Profile"
                  />
                </div>
                <div className="flex-grow">
                  <h5 className="font-semibold">
                    {comment.user.first_name} {comment.user.last_name}
                  </h5>
                  <p className="text-sm text-gray-600">{comment.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(comment.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              There are no comments
            </div>
          )}
        </div>
        <div className="p-3 border-t flex-shrink-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your comment here..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Send
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StudentArticleDetailsView;
