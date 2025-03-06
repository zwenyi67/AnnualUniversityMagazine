import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";

// Zod Schema for Validation
const formSchema = z.object({
  article: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Please upload an article file")
    .refine((files) => {
      const allowedTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return files && allowedTypes.includes(files[0].type);
    }, "Only .doc and .docx files are allowed"),

  photos: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "Please upload at least one photo")
    .refine((files) => {
      const allowedTypes = ["image/png", "image/jpeg"];
      return Array.from(files).every((file) =>
        allowedTypes.includes(file.type)
      );
    }, "Only .png, .jpg, and .jpeg files are allowed"),
});

const AddNewArticleView = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      article: undefined,
      photos: undefined,
    },
  });

  // Handle Submit
  const onSubmit = (values: any) => {
    console.log("Submitted Data:", values);
  };

  // Handle Photo Upload and Display
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedPhotos([...uploadedPhotos, ...Array.from(files)]);
      form.setValue("photos", files); // Set form value
    }
  };

  // Remove a Photo
  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Upload Article */}
          {/* <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept=".doc,.docx"
                    onChange={(e) => field.onChange(e.target.files)}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Article</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".doc,.docx"
                    onChange={(e) => field.onChange(e.target.files)}
                    // className="cursor-pointer"
                    // placeholder="shadcn"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Photo */}
          <FormField
            control={form.control}
            name="photos"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    onChange={(e) => handlePhotoUpload(e)}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Upload Photo
          </Button>

          {/* Uploaded Photos List */}
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

          {/* Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white"
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
  );
};

export default AddNewArticleView;
