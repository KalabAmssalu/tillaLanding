import { Button } from "@/components/ui/button";

export default function CTA() {
	return (
		<section className="py-12 md:py-20 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
					Ready to Secure Your Health?
				</h2>
				<p className="text-xl mb-8 animate-fade-in">
					Get a personalized quote today and start your journey to better health
					coverage.
				</p>
				<Button size="lg" variant="secondary" className="animate-fade-in">
					Get Your Free Quote
				</Button>
			</div>
		</section>
	);
}
