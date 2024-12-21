import * as z from "zod";

export const createPersonalInfoSchema = (t: (key: string) => string) =>
	z.object({
		first_name: z.string().min(2, {
			message: t("fields.firstName.error"),
		}),
		middle_initial: z.string().min(2, {
			message: t("fields.middleName.error"),
		}),
		last_name: z.string().min(2, {
			message: t("fields.lastName.error"),
		}),
		// first_name_amharic: z.string().min(2, {
		// 	message: t("fields.firstNameAm.error"),
		// }),
		// middle_initial_amharic: z.string().min(2, {
		// 	message: t("fields.middleNameAm.error"),
		// }),
		// last_name_amharic: z.string().min(2, {
		// 	message: t("fields.lastNameAm.error"),
		// }),
		gender: z.enum(["male", "female", "not_prefer_to_say"], {
			invalid_type_error: t("fields.gender.error"),
		}),
		date_of_birth: z.string().min(1, {
			message: t("fields.dateOfBirth.error"),
		}),
	});

export type PersonalInfoFormValues = z.infer<
	ReturnType<typeof createPersonalInfoSchema>
>;

export const createbusinessInfoSchema = (t: (key: string) => string) =>
	z.object({
		company_name: z
			.string()
			.min(2, { message: t("fields.company_name.error") }),
		business_license_number: z.string().min(5, {
			message: t("fields.business_license_number.error"),
		}),
		tax_identification_number: z.string().min(5, {
			message: t("fields.tax_identification_number.error"),
		}),
		business_type: z.enum(["private", "group", "sector"], {
			invalid_type_error: t("fields.business_type.error"),
		}),

		license_state: z.string().min(2, {
			message: t("fields.license_state.error"),
		}),
		license_issued_date: z.string().min(1, {
			message: t("fields.license_issued_date.error"),
		}),
		license_expired_date: z.string().min(1, {
			message: t("fields.license_expired_date.error"),
		}),
	});

export type BusinessInfoFormValues = z.infer<
	ReturnType<typeof createbusinessInfoSchema>
>;

export const createaddressInfoSchema = (t: (key: string) => string) =>
	z.object({
		phone_number: z
			.string()
			.min(10, { message: t("fields.contactPhone.error") }),
		email_address: z
			.string()
			.email({ message: t("fields.contactEmail.error") }),
		business_address_line_1: z
			.string()
			.min(5, { message: t("fields.business_address_line_1.error") }),
		business_address_line_2: z.string().optional(),
		business_kifle_ketema: z.string().optional(),
		business_city: z
			.string()
			.min(2, { message: t("fields.business_city.error") }),
		business_state: z
			.string()
			.min(2, { message: t("fields.business_state.error") }),
		business_zip_code: z
			.string()
			.min(5, { message: t("fields.business_zip_code.error") }),
	});

export type AddressInfoFormValues = z.infer<
	ReturnType<typeof createaddressInfoSchema>
>;
