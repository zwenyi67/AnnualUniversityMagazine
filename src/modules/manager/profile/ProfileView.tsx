import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUserData } from "@/store/AuthContext";
import FormHeader from "@/components/common/FormHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, ShieldCheck, Mail, User, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordUpdatePayload } from '@/api/auth/types';
import { hideLoader, openLoader } from '@/store/features/loaderSlice';
import { toast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import api from '@/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';

const formSchema = z.object({
    old_password: z.string().min(6, {
        message: "Password must contain at least 8 characters.",
    }),
    new_password: z.string().min(6, {
        message: "Password must contain at least 8 characters.",
    }),
    confirm_password: z.string().min(6, {
        message: "Password must contain at least 8 characters.",
    }),
    updateby: z.number().optional(),
});

const ProfileView = () => {
    const { userData } = useUserData();
    const [profilePic, setProfilePic] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { userLogout } = useAuth()

    const logout = () => {
        userLogout()

        navigate("/auth/login")
    }

    const [isPasswordChanged, setIsPasswordChanged] = useState<boolean | null>(null);

    useEffect(() => {
        if (userData?.is_password_change !== undefined) {
            setIsPasswordChanged(userData.is_password_change);
        }
    }, [userData]);

    const item: PasswordUpdatePayload = {
        user_id: 0,
        old_password: "",
        new_password: "",
        confirm_password: "",
        updateby: 1,
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            old_password: item?.old_password || "",
            new_password: item?.new_password || "",
            confirm_password: item?.confirm_password || "",
            updateby: item?.updateby || 1,
        },
    });


    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setProfilePic(imageUrl);
        }
    };

    const { mutate: passwordUpdate } =
        api.auth.passwordUpdate.useMutation({
            onMutate: () => {
                dispatch(openLoader());
            },
            onSuccess: () => {
                toast({
                    title: "Password Updated Successfully, please login again",
                    variant: "success",
                });

                setTimeout(() => {
                    setOpen(false);
                }, 300);
                logout();
            },
            onError: (error) => {
                form.setError("old_password", { type: "custom", message: error.message });
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

            const formData: PasswordUpdatePayload = {
                user_id: userData!.id,
                old_password: item.old_password,
                new_password: item.new_password,
                confirm_password: item.confirm_password,
                updateby: userData!.id,
            }

            // Call add API
            await passwordUpdate(formData);

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };



    return (
        <section className="m-4">
            {/* Page Header */}
            <FormHeader title="User Profile" />

            <div className="p-6 bg-white rounded-lg shadow-lg min-h-[530px] space-y-6">

                {/* Password Update Warning */}
                {!isPasswordChanged && isPasswordChanged !== null && (
                    <div className="p-4 bg-red-100 text-red-600 rounded-lg flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5" />
                        <span>For our security policies, please update your password.</span>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">

                    {/* User Profile Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-secondary" />
                                <span className="text-secondary">Profile Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex flex-col items-center gap-4">
                                {/* Profile Picture */}
                                <div className="relative">
                                    <img
                                        src={profilePic}
                                        alt="User Profile"
                                        className="w-28 h-28 rounded-full border shadow-md object-cover"
                                    />
                                    {/* Upload Icon */}
                                    <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-secondary p-1 rounded-full cursor-pointer">
                                        <Camera className="h-5 w-5 text-white" />
                                    </label>
                                    <input
                                        type="file"
                                        id="profile-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm">Full Name</label>
                                <Input value={userData?.first_name || "N/A"} />
                            </div>
                            <div>
                                <label className="text-gray-600 text-sm">Email</label>
                                <Input value={userData?.email || "N/A"} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-secondary" />
                                <span className="text-secondary">Security Settings</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <label className="text-gray-600 text-sm">Email</label>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                    <Input value={userData?.email || "N/A"} disabled />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col mt-2">
                                    <span className="text-gray-600 text-sm">Password</span>
                                    <span>**********</span>
                                </div>

                                {/* Password Update Dialog Box */}
                                <Dialog open={open} onOpenChange={setOpen} modal={true}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">
                                            <Pencil className="h-4 w-4 mr-1" /> Change Password
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Update Password</DialogTitle>
                                        </DialogHeader>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                                <div className='grid gap-6 mt-5'>

                                                    {/* Old_Password */}
                                                    <FormField
                                                        control={form.control}
                                                        name="old_password"
                                                        render={({ field }) => (
                                                            <FormItem >
                                                                <FormLabel>Old Password <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                                                                <FormControl>
                                                                    <Input type="password" placeholder="Password" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {/* new_Password */}
                                                    <FormField
                                                        control={form.control}
                                                        name="new_password"
                                                        render={({ field }) => (
                                                            <FormItem >
                                                                <FormLabel>New Password <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                                                                <FormControl>
                                                                    <Input type="password" placeholder="Password" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {/* confirm_Password */}
                                                    <FormField
                                                        control={form.control}
                                                        name="confirm_password"
                                                        render={({ field }) => (
                                                            <FormItem >
                                                                <FormLabel>Confirm Password <span className='text-primary font-extrabold text-base'>*</span></FormLabel>
                                                                <FormControl>
                                                                    <Input type="password" placeholder="Password" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                </div>
                                                <DialogFooter className='mt-4'>
                                                    <Button variant={'secondary'}>Update</Button>
                                                </DialogFooter>
                                            </form>
                                        </Form>

                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ProfileView;
