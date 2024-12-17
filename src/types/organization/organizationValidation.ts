import * as RPNInput from "react-phone-number-input";
import * as z from "zod";

export const createorganizationInfoSchema = (t: (key: string) => string) =>
	z.object({
		name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.name.error"),
			}),
		]),
		registration_number: z.string().min(2, {
			message: t("fields.registration_number.error"),
		}),
		industry_type: z.string().min(2, {
			message: t("fields.industry_type.error"),
		}),
		number_of_employees: z.string().min(2, {
			message: t("fields.number_of_employees.error"),
		}),
		company_website: z.string().min(2, {
			message: t("fields.company_website.error"),
		}),
		// plan_coverage_type: z.string().min(2, {
		// 	message: t("fields.plan_coverage_type.error"),
		// }),
		preferred_start_date: z.string().min(2, {
			message: t("fields.preferred_start_date.error"),
		}),
		// preferred_end_date: z.string().min(2, {
		// 	message: t("fields.preferred_end_date.error"),
		// }),
		phone_number: z.string().refine((val) => RPNInput.isValidPhoneNumber(val), {
			message: t("fields.phone_number.error"),
		}),
		email_address: z.union([
			z.literal(""),
			z.string().email({ message: t("fields.email_address.error") }),
		]),
		country_of_origin: z.string().min(2, {
			message: t("fields.country_of_origin.error"),
		}),
	});

export type OrganizationInfoFormValues = z.infer<
	ReturnType<typeof createorganizationInfoSchema>
>;

export const organizationAddressSchema = (t: (key: string) => string) =>
	z.object({
		country: z.string().min(2, {
			message: t("fields.country.error"),
		}),
		street_address: z.string().min(2, {
			message: t("fields.street_address.error"),
		}),

		city: z.string().min(2, {
			message: t("fields.city.error"),
		}),

		region: z.string().min(2, {
			message: t("fields.region.error"),
		}),
		kifle_ketema: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.kifle_ketema.error") }),
		]),
		zip_code: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.provider_zip_code.error") }),
		]),
	});

export type OrganizationAddressFormValues = z.infer<
	ReturnType<typeof organizationAddressSchema>
>;

export const contactPersonInfoSchema = (t: (key: string) => string) =>
	z.object({
		contact_person_first_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.contact_person_first_name.error"),
			}),
		]),
		contact_person_last_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.contact_person_last_name.error"),
			}),
		]),
		contact_person_middle_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.contact_person_middle_name.error"),
			}),
		]),
		contact_person_position: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.contact_person_position.error"),
			}),
		]),
		contact_person_phone_number: z
			.string()
			.refine((val) => RPNInput.isValidPhoneNumber(val), {
				message: t("fields.contact_person_phone_number.error"),
			}),
		contact_person_email_address: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.contact_person_email_address.error"),
			}),
		]),
	});

export type OrganizationContactPersonInfoFormValues = z.infer<
	ReturnType<typeof contactPersonInfoSchema>
>;
