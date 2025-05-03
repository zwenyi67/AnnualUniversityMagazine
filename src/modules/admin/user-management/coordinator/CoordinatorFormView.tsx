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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddCoordinatorPayloadType, GetFacultiesType, UpdateCoordinatorPayloadType } from '@/api/admin/types';

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  faculty_id: z.string().min(1, {
    message: "Faculty is required.",
  }),
  email: z.string().email(),
  createby: z.number().optional(),
});

export default function CoordinatorFormView() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data: faculties, isFetching: isFacultyFetching } = api.admin.faculties.getFaculties.useQuery();

  const location = useLocation();
  const { id } = useParams();

  const passedData = location.state?.data;

  const item: AddCoordinatorPayloadType = id
    ? { ...passedData }
    : {
      first_name: "",
      last_name: "",
      faculty_id: "",
      email: "",
      createby: 1,
    };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: item?.first_name || "",
      last_name: item?.last_name || "",
      email: item?.email || "",
      faculty_id: item?.faculty_id.toString() || "",
      createby: item?.createby || 1,
    },
  });

  const { mutate: addCoordinator } =
    api.admin.coordinatorUsers.addCoordinator.useMutation({
      onMutate: () => {
        dispatch(openLoader());
      },
      onSuccess: () => {
        toast({
          title: "New Coordinator added successfully",
          variant: "success",
        });
        navigate("/admin/user-management/coordinators");
      },
      onError: (error) => {
        form.setError("email", { type: "custom", message: error.message });
        toast({
          title: error.message,
          variant: "destructive",
        });
      },
      onSettled: () => {
        dispatch(hideLoader());
      },
    });

  const { mutate: updateCoordinator } =
    api.admin.coordinatorUsers.updateCoordinator.useMutation({
      onMutate: () => {
        dispatch(openLoader());
      },
      onSuccess: () => {
        toast({
          title: "Coordinator updated successfully",
          variant: "success",
        });
        navigate("/admin/user-management/coordinators");
      },
      onError: (error) => {
        form.setError("email", { type: "custom", message: error.message });
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
      formData.append("faculty_id", item.faculty_id);

      if (id) {
        // For edit form
        formData.append("updateby", (item.createby || 1).toString());
        formData.append("id", id);

        // Call update API
        await updateCoordinator(formData as unknown as UpdateCoordinatorPayloadType);
      } else {
        // For add form
        formData.append("createby", (item.createby || 1).toString());

        // Call add API
        await addCoordinator(formData as unknown as AddCoordinatorPayloadType);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="m-4">
      <FormHeader
        title="User Management - Coordinator"
      />
      <div className="p-6 bg-white rounded-lg">
        <div className='flex mb-8'>
          <div className='me-5'>
            <Link to={'/admin/user-management/coordinators'}>
              <CircleChevronLeft className='w-8 h-8 text-secondary hover:text-blue-500' />
            </Link>
          </div>
          <div className='text-base font-semibold mt-1 text-secondary'>
            {id ? "Edit Coordinator" : "Add New Coordinator"}
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-6 mt-5'>
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
              {/* Faculty */}
              <FormField
                control={form.control}
                name="faculty_id"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Faculty <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isFacultyFetching ? 'Loading' : 'Select Faculty'} />
                        </SelectTrigger>
                        <SelectContent>
                          {faculties?.map((item: GetFacultiesType) => (
                            <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                          ))}

                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
