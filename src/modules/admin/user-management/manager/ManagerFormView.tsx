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
import { AddManagerPayloadType, UpdateManagerPayloadType } from '@/api/admin/types';

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email(),
  createby: z.number().optional(),
});

export default function ManagerFormView() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();
  const { id } = useParams();

  const passedData = location.state?.data;

  const item: AddManagerPayloadType = id
    ? { ...passedData }
    : {
      first_name: "",
      last_name: "",
      email: "",
      createby: 1,
    };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: item?.first_name || "",
      last_name: item?.last_name || "",
      email: item?.email || "",
      createby: item?.createby || 1,
    },
  });

  const { mutate: addManager } =
    api.admin.managerUsers.addManager.useMutation({
      onMutate: () => {
        dispatch(openLoader());
      },
      onSuccess: () => {
        toast({
          title: "New Manager added successfully",
          variant: "success",
        });
        navigate("/admin/user-management/managers");
      },
      onError: (error) => {
        form.setError("first_name", { type: "custom", message: error.message });
        toast({
          title: error.message,
          variant: "destructive",
        });
      },
      onSettled: () => {
        dispatch(hideLoader());
      },
    });

  const { mutate: updateManager } =
    api.admin.managerUsers.updateManager.useMutation({
      onMutate: () => {
        dispatch(openLoader());
      },
      onSuccess: () => {
        toast({
          title: "Manager updated successfully",
          variant: "success",
        });
        navigate("/admin/admin/user-management/managers");
      },
      onError: (error) => {
        form.setError("first_name", { type: "custom", message: error.message });
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
      formData.append("first_name", item.first_name);
      formData.append("last_name", item.last_name);
      formData.append("email", item.email);

      if (id) {
        // For edit form
        formData.append("updateby", (item.createby || 1).toString());
        formData.append("id", id);

        // Call update API
        await updateManager(formData as unknown as UpdateManagerPayloadType);
      } else {
        // For add form
        formData.append("createby", (item.createby || 1).toString());

        // Call add API
        await addManager(formData as unknown as AddManagerPayloadType);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="m-4">
      <FormHeader
        title="User Management - Manager"
      />
      <div className="p-6 bg-white rounded-lg">
        <div className='flex mb-8'>
          <div className='me-5'>
            <Link to={'/admin/user-management/managers'}>
              <CircleChevronLeft className='w-8 h-8 text-secondary hover:text-blue-500' />
            </Link>
          </div>
          <div className='text-base font-semibold mt-1 text-secondary'>
            {id ? "Edit Manager" : "Add New Manager"}
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-6 mt-5'>
              {/* First Name */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>First Name <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Last Name <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email*/}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Email <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
