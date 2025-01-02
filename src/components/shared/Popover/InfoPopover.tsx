"use client";

import { BookOpenText, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function InfoPopover() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon" className="text-primary">
					<Info className="h-5 w-5" />
					<span className="sr-only">Information</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] bg-primary text-white p-4">
				<div className="text-xs">
					If you need any assistance, please contact us at a contact page or
					Read this document
					<a
						href="https://www.google.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-secondary text-lg mt-2 flex items-center justify-center"
					>
						<BookOpenText size={16} className="mr-2 text-secondary" />
						Here
					</a>
				</div>
			</PopoverContent>
		</Popover>
	);
}
