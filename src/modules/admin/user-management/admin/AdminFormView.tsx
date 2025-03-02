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
import { AddAdminPayloadType, UpdateAdminPayloadType } from '@/api/admin/types';

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters.",
  }),
  createby: z.number().optional(),
});

export default function AdminFormView() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();
  const { id } = useParams();

  const passedData = location.state?.data;

  const item: AddAdminPayloadType = id
    ? { ...passedData }
    : {
      name: "",
      description: "",
      createby: 1,
    };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: item?.first_name || "",
      last_name: item?.last_name || "",
      createby: item?.createby || 1,
    },
  });

  const { mutate: addAdmin } =
    api.admin.adminUsers.addAdmin.useMutation({
      onMutate: () => {
        dispatch(openLoader());
      },
      onSuccess: () => {
        toast({
          title: "New Admin added successfully",
          variant: "success",
        });
        navigate("/admin/user-management/admins");
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

  const { mutate: updateAdmin } =
    api.admin.adminUsers.updateAdmin.useMutation({
      onMutate: () => {
        dispatch(openLoader());
      },
      onSuccess: () => {
        toast({
          title: "Admin updated successfully",
          variant: "success",
        });
        navigate("/admin/admin/user-management/admins");
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
      formData.append("password", item.password);

      if (id) {
        // For edit form
        formData.append("updateby", (item.createby || 1).toString());
        formData.append("id", id);

        // Call update API
        await updateAdmin(formData as unknown as UpdateAdminPayloadType);
      } else {
        // For add form
        formData.append("createby", (item.createby || 1).toString());

        // Call add API
        await addAdmin(formData as unknown as AddAdminPayloadType);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="m-4">
      <FormHeader
				title="User Management - Admin"
			/>
      <div className="p-6 bg-white rounded-lg">
        <div className='flex mb-8'>
          <div className='me-5'>
            <Link to={'/admin/user-management/admins'}>
              <CircleChevronLeft className='w-8 h-8 text-secondary hover:text-blue-500' />
            </Link>
          </div>
          <div className='text-base font-semibold mt-1 text-secondary'>
            {id ? "Edit Admin" : "Add New Admin"}
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
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Password <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
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
