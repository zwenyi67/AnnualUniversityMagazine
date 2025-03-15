import { useState } from "react";
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
import { Link } from "react-router-dom";

type FormData = {
  article: File | null;
  photos: File[];
};

const formSchema = z.object({
  article: z
    .custom<File>()
    .refine((file) => file !== null, "Please upload an article file")
    .refine(
      (file) =>
        [
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Only .doc and .docx files are allowed"
    ),

  photos: z
    .array(z.custom<File>())
    .min(1, "Please upload at least one photo")
    .refine(
      (files) =>
        files.every((file) => ["image/png", "image/jpeg"].includes(file.type)),
      "Only .png, .jpg, and .jpeg files are allowed"
    ),
});

const AddNewArticleView = () => {
  const [uploadedArticle, setUploadedArticle] = useState<File | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      article: null,
      photos: [],
    },
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {
    console.log("Submitted Data:", values);
  };

  const handleUploadArticle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setUploadedArticle(file);
      form.setValue("article", file);
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

  return (
    <section className="m-4">
      <FormHeader
        title="Add Article"
        // onRefresh={() => refetch()}
        // isLoading={isFetching || isRefetching}
      />
      <div className="p-6 bg-white rounded-b-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          uploadedArticle && "text-gray-900",
                          "ml-3 flex-1 text-sm truncate"
                        )}
                      >
                        {uploadedArticle?.name || "Upload article as Word file"}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

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
              >
                <Link to="/student/articles">Cancel</Link>
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

export default AddNewArticleView;
