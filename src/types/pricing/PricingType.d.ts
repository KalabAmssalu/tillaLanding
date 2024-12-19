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

export type checkoutType = {
	member_id?: string;
	email?: string;
	billing_cycle: string;
	plan_type: string;
	members_count: number;
	amount?: number;
};
