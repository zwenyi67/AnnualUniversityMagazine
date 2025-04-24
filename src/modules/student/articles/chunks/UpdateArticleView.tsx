import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import FormHeader from "@/components/common/FormHeader";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api";
import { useDispatch } from "react-redux";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  article: z
    .custom<File>()
    .optional()
    .refine(
      (file) =>
        !file ||
        [
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      { message: "Only .doc and .docx files are allowed" }
    ),
  photos: z
    .array(z.custom<File>())
    .optional()
    .refine(
      (files) =>
        !files ||
        files.every((file) => ["image/png", "image/jpeg"].includes(file.type)),
      { message: "Only .png, .jpg, and .jpeg files are allowed" }
    ),
});

type FormData = z.infer<typeof formSchema>;

const UpdateArticleView = () => {
  const { id } = useParams();
  const contributionId = id ? parseInt(id, 10) : undefined;
  const [uploadedArticle, setUploadedArticle] = useState<File | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [existingArticleUrl, setExistingArticleUrl] = useState<string | null>(
    null
  );
  const [existingPhotoUrls, setExistingPhotoUrls] = useState<string[]>([]);

  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const faculty_id = userData?.faculty_id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, refetch, isFetching, isRefetching } =
    api.student.getContributionByContributionID.useQuery(
      contributionId as number
    );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      article: undefined,
      photos: [],
    },
  });

  // Update form values when API data loads
  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title || "",
        description: data.description || "",
        article: undefined,
        photos: [],
      });
      setExistingArticleUrl(data.article_path || null);
      // Parse image_paths if it's a stringified JSON array
      let parsedPhotoUrls: string[] = [];
      if (typeof data.image_paths === "string") {
        try {
          parsedPhotoUrls = JSON.parse(data.image_paths);
        } catch (error) {
          console.error("Error parsing image_paths:", error);
          parsedPhotoUrls = [];
        }
      } else if (Array.isArray(data.image_paths)) {
        parsedPhotoUrls = data.image_paths;
      }
      setExistingPhotoUrls(parsedPhotoUrls);
    }
  }, [data, form]);

  const handleUploadArticle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedArticle(file);
      form.setValue("article", file);
      setExistingArticleUrl(null);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > 0) {
      setUploadedPhotos((prev) => [...prev, ...files]);
      form.setValue("photos", [...uploadedPhotos, ...files]);
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => {
      const updatedPhotos = prev.filter((_, i) => i !== index);
      form.setValue("photos", updatedPhotos);
      return updatedPhotos;
    });
  };

  const removeExistingPhoto = (index: number) => {
    setExistingPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const refreshForm = () => {
    form.reset({
      title: "",
      description: "",
      article: undefined,
      photos: [],
    });
    setUploadedArticle(null);
    setUploadedPhotos([]);
    setExistingArticleUrl(null);
    setExistingPhotoUrls([]);
  };

  const { mutate: updateContribution } = api.student.uploadArticle.useMutation({
    onMutate: () => {
      dispatch(openLoader());
    },
    onSuccess: () => {
      toast({
        title: "Article updated successfully",
        variant: "success",
      });
      navigate("/student/articles");
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      dispatch(hideLoader());
    },
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {
    const payload = {
      ...values,
      faculty_id: faculty_id,
      contribution_id: contributionId,
      existingArticleUrl: existingArticleUrl,
      existingPhotoUrls: existingPhotoUrls,
    };
    updateContribution(payload);
  };

  if (!id || isNaN(contributionId as number)) {
    return <div>Invalid article ID</div>;
  }

  return (
    <section className="m-4">
      <FormHeader
        title="Update Article"
        onRefresh={refetch}
        isShowBackButton={true}
        isLoading={isFetching || isRefetching}
      />
      <div className="p-6 bg-white rounded-b-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700 font-medium">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Title" {...field} />
                  </FormControl>
                  <div className="h-[16px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700 font-medium">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="h-[16px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="article"
              render={() => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700 font-medium">
                    Upload Article
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center w-full border border-gray-300 bg-gray-200 text-gray-400 rounded-lg px-4 py-2">
                      <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition">
                        Choose File
                        <input
                          type="file"
                          accept=".doc,.docx"
                          className="hidden"
                          onChange={handleUploadArticle}
                        />
                      </label>
                      <span
                        className={cn(
                          (uploadedArticle || existingArticleUrl) &&
                            "text-gray-900",
                          "ml-3 flex-1 text-sm truncate"
                        )}
                      >
                        {uploadedArticle?.name ||
                          (existingArticleUrl
                            ? existingArticleUrl.split("/").pop()
                            : "Upload article as Word file")}
                      </span>
                    </div>
                  </FormControl>
                  <div className="h-[16px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photos"
              render={() => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700 font-medium">
                    Upload Photos
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center w-full border border-gray-300 bg-gray-200 text-gray-400 rounded-lg px-4 py-2">
                      <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition">
                        Choose File
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          multiple
                          onChange={handlePhotoUpload}
                          hidden
                          className="cursor-pointer"
                        />
                      </label>
                      <span className="ml-3 flex-1 text-sm truncate">
                        Upload photos as PNG, JPG, or JPEG
                      </span>
                    </div>
                  </FormControl>
                  <div className="h-[16px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Display existing photos (URLs) */}
            {Array.isArray(existingPhotoUrls) &&
              existingPhotoUrls.length > 0 && (
                <div>
                  {existingPhotoUrls.map((photoUrl, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-200 rounded mb-2"
                    >
                      <span className="text-gray-700 text-sm">
                        {photoUrl.split("/").pop()}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExistingPhoto(index)}
                        className="text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            {/* Display newly uploaded photos */}
            {uploadedPhotos.length > 0 && (
              <div>
                {uploadedPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-200 rounded mb-2"
                  >
                    <span className="text-gray-700 text-sm">{photo.name}</span>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default UpdateArticleView;
