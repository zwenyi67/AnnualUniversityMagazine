import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutDialog } from "@/components/dialogs";
import { useUserData } from "@/store/AuthContext";
import { Link } from "react-router-dom";

const ProfileBox = () => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const { userData } = useUserData();

	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="relative">
			{/* Profile Header */}
			<div
				className="flex items-center gap-3 cursor-pointer"
				onClick={toggleDropdown}
			>
				<Avatar className="w-8 h-8">
					<AvatarImage src="/image" alt="Profile Image" />
					<AvatarFallback>{userData?.first_name?.charAt(0)?.toUpperCase() || "N"}</AvatarFallback>
				</Avatar>
				<div className="text-left">
					<h5 className="text-[13px] font-semibold">{userData?.first_name}</h5>
					<p className="text-muted text-[10px]">{userData?.role_name}</p>
				</div>
				<span className="ml-1 text-muted">
					{isDropdownOpen ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M14.707 10.707a1 1 0 01-1.414 0L10 7.414 6.707 10.707a1 1 0 11-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</span>
			</div>


			{isDropdownOpen && (
				<div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-200 z-50">
					<div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
						<Avatar className="w-8 h-8">
							<AvatarImage src="/image" alt="Profile Image" />
							<AvatarFallback>{userData?.first_name?.charAt(0)?.toUpperCase() || "N"}</AvatarFallback>
						</Avatar>
						<div>
							<div className="text-sm font-semibold text-gray-900">
								{userData?.first_name} {userData?.last_name}
							</div>
							<div className="text-xs text-gray-500">{userData?.role_name}</div>
						</div>
					</div>

					<ul className="py-2">
						<li className="px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded transition">
							<Link to={`/${userData?.role_name}/profile`}>My Account</Link>
						</li>
						{/* Add more menu items if needed */}
					</ul>

					<div className="border-t border-gray-100 mb-3">
						<LogoutDialog>
							<div className="ps-5 px-4 py-2 text-sm text-destructive hover:bg-accent cursor-pointer rounded-md">
								Log out
							</div>
						</LogoutDialog>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileBox;
