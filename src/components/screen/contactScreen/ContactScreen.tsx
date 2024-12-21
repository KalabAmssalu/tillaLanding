"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	message: z.string().min(10, {
		message: "Message must be at least 10 characters.",
	}),
});

export default function ContactScreen() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("Form submitted:", values);
		form.reset();
	}

	return (
		<div className="container mx-auto p-8 space-y-8">
			<div className="text-center space-y-4">
				<h1 className="text-3xl font-bold text-primary">Contact Us</h1>
				<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
					We would love to hear from you! If you have any questions or feedback,
					please reach out to us using the information below.
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-secondary">Get in Touch</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center space-x-3">
								<Mail className="h-5 w-5 text-muted-foreground" />
								<a
									href="mailto:info@tillahealth.com"
									className="text-primary hover:underline"
								>
									info@tillahealth.com
								</a>
							</div>
							<div className="flex items-center space-x-3">
								<Phone className="h-5 w-5 text-muted-foreground" />
								<a
									href="tel:0901010101"
									className="text-primary hover:underline"
								>
									0901010101
								</a>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-secondary">Visit Us</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center space-x-3">
								<MapPin className="h-5 w-5 text-muted-foreground" />
								<p className="text-muted-foreground">
									Tilla Health, 123 Health St, Wellness City, Healthland
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-secondary">Send Us a Message</CardTitle>
						<CardDescription>
							Fill out the form below and we`&apos`ll get back to you as soon as
							possible.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Your name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="Your email"
													type="email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Message</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Your message"
													className="min-h-[120px]"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									Send Message
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
