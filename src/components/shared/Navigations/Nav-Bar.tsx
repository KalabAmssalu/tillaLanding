"use client";

import {
	BriefcaseMedical,
	Hospital,
	LogIn,
	PhoneOutgoing,
	User,
} from "lucide-react";
import { useTypewriter } from "react-simple-typewriter";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LocaleSwitcher from "../DropDown/LocaleSwitcher";

const Navbar = () => {
	const [typewriter] = useTypewriter({
		words: [
			"Welcome to Tilla Health Insurance",
			"Protecting Your Health, Securing Your Future.",
		],
		loop: true,
		deleteSpeed: 40,
		typeSpeed: 100,
	});

	return (
		<>
			<div className="bg-primary py-1 px-4 sm:px-8 text-center">
				<div className="flex justify-between items-center mx-auto">
					<p className="text-white text-sm flex gap-1">
						&#128400; <span className="hidden sm:flex"> {typewriter}</span>
					</p>
					<div className="flex space-x-3 justify-center items-center">
						<LocaleSwitcher />
						<Button className="h-6" variant={"outline"}>
							<PhoneOutgoing className="mr-2 h-4 w-4" />
							<span className="sm:flex hidden">Contact</span>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant={"outline"} className=" h-6 gap-3" size={"sm"}>
									<LogIn size={15} />
									SignIn{" "}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>Login to your portal</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<User size={16} />
										<span className="text-xs px-2">Member</span>
										<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Hospital size={16} />
										<span className="text-xs px-2">Provider</span>
										<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<BriefcaseMedical size={16} />
										<span className="text-xs px-2">Broker</span>
										<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
