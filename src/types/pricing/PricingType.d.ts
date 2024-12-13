export interface Feature {
	name: string;
	covered: boolean;
}

export interface PricingTier {
	title: string;
	price: {
		monthly: number;
		yearly: number;
	};
	features: Feature[];
}
