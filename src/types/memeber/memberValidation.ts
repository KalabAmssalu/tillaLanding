import * as RPNInput from "react-phone-number-input";
import * as z from "zod";

export const createMemeberInfoSchema = (t: (key: string) => string) =>
	z.object({
		tin_number: z.string().min(2, {
			message: t("fields.tin_number.error"),
		}),

		first_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.first_name.error"),
			}),
		]),
		middle_name: z.union([
			z.literal(""),
			z
				.string()
				.min(2, {
					message: t("fields.middle_name.error"),
				})
				.regex(/^[^\d]*$/, {
					message: t("fields.middle_name.error"),
				}),
		]),
		last_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.last_name.error"),
			}),
		]),

		gender: z.union([
			z.literal(""),
			z.enum(["male", "female", "not_prefer_to_say"], {
				invalid_type_error: t("fields.gender.error"),
			}),
		]),
		date_of_birth: z.string().min(1, {
			message: t("fields.date_of_birth.error"),
		}),
		marital_status: z.enum(["single", "married", "divorced"], {
			invalid_type_error: t("fields.marital_status.error"),
		}),
		height: z
			.number()
			.min(0, {
				message: t("fields.height.error"),
			})
			.optional(),
		weight: z
			.number()
			.min(0, {
				message: t("fields.weight.error"),
			})
			.optional(),
		phone_number: z.string().refine((val) => RPNInput.isValidPhoneNumber(val), {
			message: t("fields.phone_number.error"),
		}),

		email_address: z.union([
			z.literal(""),
			z.string().email({ message: t("fields.email_address.error") }),
		]),
	});

export type MemberInfoFormValues = z.infer<
	ReturnType<typeof createMemeberInfoSchema>
>;

export const createMemberAddressSchema = (t: (key: string) => string) =>
	z.object({
		street_address: z.string().min(2, {
			message: t("fields.street_address.error"),
		}),
		mailing_address_line1: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.mailing_address_line1.error") }),
		]),
		city: z.string().min(2, {
			message: t("fields.city.error"),
		}),
		country: z.string().min(2, {
			message: t("fields.country.error"),
		}),
		region: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.region.error") }),
		]),

		kifle_ketema: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.kifle_ketema.error") }),
		]),
		zip_code: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.provider_zip_code.error") }),
		]),
	});

export type MemberAddressFormValues = z.infer<
	ReturnType<typeof createMemberAddressSchema>
>;

export const createMemberRepresentativeSchema = (t: (key: string) => string) =>
	z.object({
		representative_first_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.representative_first_name.error"),
			}),
		]),
		representative_last_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.representative_last_name.error"),
			}),
		]),
		representative_middle_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.representative_middle_name.error"),
			}),
		]),
		representative_gender: z.union([
			z.literal(""),
			z.enum(["male", "female", "not_prefer_to_say"], {
				invalid_type_error: t("fields.representative_gender.error"),
			}),
		]),
		representative_date_of_birth: z.string().min(1, {
			message: t("fields.representative_date_of_birth.error"),
		}),

		representative_marital_status: z.union([
			z.literal(""),
			z.enum(["single", "married", "divorced"], {
				invalid_type_error: t("fields.representative_marital_status.error"),
			}),
		]),
		representative_mailing_address_line1: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.representative_mailing_address_line1.error"),
			}),
		]),
		representative_country: z.string().min(2, {
			message: t("fields.representative_country.error"),
		}),
		representative_street_address: z.string().min(2, {
			message: t("fields.representative_street_address.error"),
		}),
		representative_city: z.string().min(2, {
			message: t("fields.representative_city.error"),
		}),
		representative_region: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.representative_region.error") }),
		]),
		representative_kifle_ketema: z.union([
			z.literal(""),
			z
				.string()
				.min(2, { message: t("fields.representative_kifle_ketema.error") }),
		]),
		representative_zip_code: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.representative_zip_code.error") }),
		]),
		representative_phone_number: z
			.string()
			.refine((val) => RPNInput.isValidPhoneNumber(val), {
				message: t("fields.representative_phone_number.error"),
			}),

		representative_email_address: z.union([
			z.literal(""),
			z
				.string()
				.email({ message: t("fields.representative_email_address.error") }),
		]),
	});

export type MemberRepresentativeFormValues = z.infer<
	ReturnType<typeof createMemberRepresentativeSchema>
>;

export const QuestionnaireformSchema = (t: (key: string) => string) =>
	z.object({
		familyHistory: z.array(z.string()).optional(),
		cancerType: z.string().optional(),
		otherCondition: z.string().optional(),
		currentConditions: z.array(z.string()).optional(),
		currentMedications: z
			.object({
				taking: z.enum(["yes", "no"]).optional(),
				medications: z.string().optional(),
			})
			.optional(),
		lifestyle: z
			.object({
				smoking: z.object({
					smokes: z.enum(["yes", "no"]).optional(),
					amount: z.string().optional(),
				}),
				alcohol: z.object({
					drinks: z.enum(["yes", "no"]).optional(),
					frequency: z.string().optional(),
				}),
				exercise: z.string().optional(),
			})
			.optional(),
		allergies: z
			.object({
				hasAllergies: z.enum(["yes", "no"]).optional(),
				allergyList: z.string().optional(),
			})
			.optional(),
		preventiveHealth: z.array(z.string()).optional(),
		womensHealth: z
			.object({
				pregnant: z.enum(["yes", "no"]).optional(),
				hadMammogram: z.enum(["yes", "no"]).optional(),
			})
			.optional(),
	});

export type QuestionnaireformSchemaValues = z.infer<
	ReturnType<typeof QuestionnaireformSchema>
>;

export const createFamilyInfoSchema = (t: (key: string) => string) =>
	z.object({
		relationship_to_member: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.relationship_to_member.error") }),
		]),
		relationship_to_member_other: z.string().optional(),
		first_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.first_name.error"),
			}),
		]),
		middle_name: z.union([
			z.literal(""),
			z
				.string()
				.min(2, {
					message: t("fields.middle_name.error"),
				})
				.regex(/^[^\d]*$/, {
					message: t("fields.middle_name.error"),
				}),
		]),
		last_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.last_name.error"),
			}),
		]),

		gender: z.union([
			z.literal(""),
			z.enum(["male", "female", "not_prefer_to_say"], {
				invalid_type_error: t("fields.gender.error"),
			}),
		]),
		date_of_birth: z.string().min(1, {
			message: t("fields.date_of_birth.error"),
		}),

		phone_number: z.string().refine((val) => RPNInput.isValidPhoneNumber(val), {
			message: t("fields.phone_number.error"),
		}),

		email_address: z.union([
			z.literal(""),
			z.string().email({ message: t("fields.email_address.error") }),
		]),
		height: z
			.number()
			.min(0, {
				message: t("fields.height.error"),
			})
			.optional(),
		weight: z
			.number()
			.min(0, {
				message: t("fields.weight.error"),
			})
			.optional(),
		marital_status: z.enum(["single", "married", "divorced"], {
			invalid_type_error: t("fields.marital_status.error"),
		}),
		tin_number: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.tin_number.error") }),
		]),
		street_address: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.street_address.error") }),
		]),
		mailing_address_line1: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.mailing_address_line1.error") }),
		]),
		country: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.country.error") }),
		]),

		city: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.city.error") }),
		]),

		region: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.region.error") }),
		]),
		kifle_ketema: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.kifle_ketema.error") }),
		]),
		zip_code: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.zip_code.error") }),
		]),
	});

export type FamilyInfoFormValues = z.infer<
	ReturnType<typeof createFamilyInfoSchema>
>;
