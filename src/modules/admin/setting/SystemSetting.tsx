import { UpdateSettingPayloadType } from "@/api/admin/types";
import FormHeader from "@/components/common/FormHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import DatePicker from '@/components/ui/datepicker';
import { Button } from "@/components/ui/button";
import api from "@/api";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
    academic_year: z.string().min(6, {
        message: "Academic year must contain at least 6 characters.",
    }),
    closure_date: z.date({
        required_error: "Closure date is required.",
    }),
    final_closure_date: z.date({
        required_error: "Final closure date is required.",
    }),
    updateby: z.number().optional(),
});

const SystemSetting = () => {
    const { data, isFetching, refetch, isRefetching } = api.admin.setting.getSetting.useQuery();

      const dispatch = useDispatch();
    
    const { mutate: updateSetting } =
        api.admin.setting.updateSetting.useMutation({
          onMutate: () => {
            dispatch(openLoader());
          },
          onSuccess: () => {
            toast({
              title: "System Setting updated successfully",
              variant: "success",
            });
            refetch();
          },
          onError: (error) => {
            form.setError("academic_year", { type: "custom", message: error.message });
            toast({
              title: error.message,
              variant: "destructive",
            });
          },
          onSettled: () => {
            dispatch(hideLoader());
          },
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            academic_year: "",
            closure_date: undefined,
            final_closure_date: undefined,
        },
    });

    useEffect(() => {
        if (data) {
            form.reset({
                academic_year: data.academic_year || "",
                closure_date: data.closure_date ? new Date(data.closure_date) : undefined,
                final_closure_date: data.final_closure_date ? new Date(data.final_closure_date) : undefined,
            });
        }
    }, [data, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData : UpdateSettingPayloadType = {
            id: data!.id,
            academic_year: values.academic_year,
            closure_date: values.closure_date,
            final_closure_date: values.final_closure_date,
            updateby: 1,
        }
        await updateSetting(formData);
    };

    return (
        <section className="m-4">
            {/* Page Header */}
            <FormHeader title="System Setting" 
            onRefresh={() => refetch()}
            isLoading={isFetching || isRefetching}/>

            <div className="p-6 bg-white rounded-lg shadow-lg min-h-[530px] space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 mt-5">
                            {/* Academic Year */}
                            <FormField
                                control={form.control}
                                name="academic_year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Academic Year <span className="text-primary font-extrabold text-base">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Academic Year" {...field} disabled={isFetching || isRefetching} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Closure Date */}
                            <FormField
                                control={form.control}
                                name="closure_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Submission Closure Date <span className="text-primary font-extrabold text-base">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Submission Closure Date"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Final Closure Date */}
                            <FormField
                                control={form.control}
                                name="final_closure_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Final Closure Date <span className="text-primary font-extrabold text-base">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Final Closure Date"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={isFetching || isRefetching}
                            className="w-full md:w-auto"
                        >
                            Update
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
};

export default SystemSetting;
