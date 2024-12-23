export interface Feature {
	name: string;
	covered: boolean;
}

export interface PricingTier {
	title: string;
	with_deductible: {
		deductible_amount: number;
		max_out_of_pocket: number;
		coInsurance: number;
		price: {
			monthly: number;
			yearly: number;
		};
		features: Feature[];
	};
	non_deductible: {
		max_out_of_pocket: number;
		coInsurance: number;
		price: {
			monthly: number;
			yearly: number;
		};
		features: Feature[];
	};
}

export type checkoutType = {
	member_id: string | number[] | undefined;
	email?: string;
	billing_cycle: string;
	member_plan: string;
	members_count: number;
	amount?: number;
	deductible_type?: string;
	cancel_url?: string;
};
