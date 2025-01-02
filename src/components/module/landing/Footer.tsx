import Image from "next/image";
import Link from "next/link";

import {
	ArrowUpRight,
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/files";

const Footer = () => {
	return (
		<footer className=" py-10 bg-[#] shadow-xl">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-start mb-8  space-y-6 md:space-y-0">
					{/* Logo Section */}
					<div className="flex items-center justify-center md:justify-start w-full md:w-1/4">
						<Image
							src={IMAGES.blueLogo}
							alt="Logo"
							className=" h-auto"
							width={200}
						/>
					</div>

					{/* About Us Section */}
					<div className="w-full md:w-1/4 mr-6 animate-fade-in">
						<h3 className="text-lg group font-semibold mb-2 flex items-center gap-2 cursor-pointer transition duration-300 hover:underline hover:text-primary">
							About
							<ArrowUpRight
								size={16}
								className="text-primary transition-transform group-hover:translate-x-1 "
							/>
						</h3>
						<p className="text-sm">
							Tilla is dedicated to providing our members with the best
							healthcare solutions and resources. We aim to empower individuals
							through information and support.
						</p>
					</div>

					{/* Contact Section */}
					<div className="w-full md:w-1/4 ml-4 animate-fade-in">
						<h3 className="text-lg group font-semibold mb-2 flex items-center gap-2 cursor-pointer transition duration-300 hover:underline hover:text-primary">
							Contact
							<ArrowUpRight
								size={16}
								className="text-primary transition-transform group-hover:translate-x-1 "
							/>
						</h3>
						<p className="text-sm">
							Email: <span className="text-primary">info@tillaHealth.com</span>
						</p>
						<p className="text-sm mb-2">
							Phone: <span className="text-primary">(123) 456-7890</span>
						</p>
					</div>

					{/* FAQ and Social Media Section */}
					<div className="w-full md:w-1/4 animate-fade-in">
						<h3 className="text-lg group font-semibold mb-2 flex items-center gap-2 cursor-pointer transition duration-300 hover:underline hover:text-primary">
							FAQ
							<ArrowUpRight
								size={16}
								className="text-primary transition-transform group-hover:translate-x-1 "
							/>
						</h3>
						<p className="text-sm mb-4">
							Have questions? Check out our FAQ section for quick answers to
							common inquiries.
						</p>
						<h3 className="text-lg font-semibold mb-2">Follow Us</h3>
						<div className="flex space-x-4">
							<Link href="#" aria-label="Facebook">
								<Facebook className="text-primary" />
							</Link>
							<Link href="#" aria-label="Twitter">
								<Twitter className="text-primary" />
							</Link>
							<Link href="#" aria-label="LinkedIn">
								<Linkedin className="text-primary" />
							</Link>
							<Link href="#" aria-label="Instagram">
								<Instagram className="text-primary" />
							</Link>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-primary pt-4 text-center text-sm">
					<p className="">
						&copy; {new Date().getFullYear()} Tilla Health Insurance. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
