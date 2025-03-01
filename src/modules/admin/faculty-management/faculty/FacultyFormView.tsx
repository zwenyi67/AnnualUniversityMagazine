import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CircleChevronLeft } from 'lucide-react';
import api from '@/api';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { hideLoader, openLoader } from '@/store/features/loaderSlice';
import FormHeader from '@/components/common/FormHeader';
import { AddFacultyPayloadType, UpdateFacultyPayloadType } from '@/api/admin/types';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  createby: z.number().optional(), // Assuming this is optional for the form
});

export default function FacultyFormView() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();
  const { id } = useParams();

  const passedData = location.state?.data;

  const item: AddFacultyPayloadType = id
    ? { ...passedData }
    : {
      name: "",
      description: "",
      createby: 1,
    };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      description: item?.description || "",
      createby: item?.createby || 1,
    },
  });

  const { mutate: addFaculty } =
    api.admin.faculties.addFaculty.useMutation({
      onMutate: () => {
        dispatch(openLoader());
      },
      onSuccess: () => {
        toast({
          title: "New Faculty added successfully",
          variant: "success",
        });
        navigate("/admin/faculty-management/faculties");
      },
      onError: (error) => {
        form.setError("name", { type: "custom", message: error.message });
        toast({
          title: error.message,
          variant: "destructive",
        });
      },
      onSettled: () => {
        dispatch(hideLoader());
      },
    });

  const { mutate: updateFaculty } =
    api.admin.faculties.updateFaculty.useMutation({
      onMutate: () => {
        dispatch(openLoader());
      },
      onSuccess: () => {
        toast({
          title: "Faculty updated successfully",
          variant: "success",
        });
        navigate("/admin/faculty-management/faculties");
      },
      onError: (error) => {
        form.setError("name", { type: "custom", message: error.message });
        toast({
          title: error.message,
          variant: "destructive",
        });
      },
      onSettled: () => {
        dispatch(hideLoader());
      },
    });


  const onSubmit = async (item: z.infer<typeof formSchema>) => {
    try {
      // Format dates and create FormData
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("description", item.description || '');

      if (id) {
        // For edit form
        formData.append("updateby", (item.createby || 1).toString());
        formData.append("id", id);

        // Call update API
        await updateFaculty(formData as unknown as UpdateFacultyPayloadType);
      } else {
        // For add form
        formData.append("createby", (item.createby || 1).toString());

        // Call add API
        await addFaculty(formData as unknown as AddFacultyPayloadType);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="m-4">
      <FormHeader
				title="Facutly Management"
			/>
      <div className="p-6 bg-white rounded-lg">
        <div className='flex mb-8'>
          <div className='me-5'>
            <Link to={'/admin/faculty-management/faculties'}>
              <CircleChevronLeft className='w-8 h-8 text-secondary hover:text-blue-500' />
            </Link>
          </div>
          <div className='text-base font-semibold mt-1 text-secondary'>
            {id ? "Edit Faculty" : "Add New Faculty"}
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-6 mt-5'>
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Faculty Name <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Faculty Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <button type="submit" className="bg-secondary rounded-sm p-2 px-6 text-white mt-7">
                {id ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </section >
  )
}
