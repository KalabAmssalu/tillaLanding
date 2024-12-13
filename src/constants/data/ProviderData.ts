export const steps = [
	"Personal Details",
	"Contact and Address Details",
	"Professional and Group Details",
	"Review",
];

export const API_POST = "https://api.tillahealthinsurance.com/providers/";

export const specialtyMapping: Record<string, string[]> = {
	"Dental Providers": [
		"General Dentist",
		"Orthodontist",
		"Oral Surgeon",
		"Periodontist",
		"Endodontist",
		"Prosthodontist",
		"Pediatric Dentist",
	],
	"Medical Providers": [
		"General Practitioner",
		"Family Medicine Physician",
		"Internist",
		"Pediatrician",
		"OB/GYN",
		"Psychiatrist",
		"Cardiologist",
		"Neurologist",
		"Dermatologist",
		"Gastroenterologist",
		"Pulmonologist",
		"Rheumatologist",
		"Nephrologist",
		"Oncologist",
		"Endocrinologist",
	],
	"Surgical Providers": [
		"General Surgeon",
		"Orthopedic Surgeon",
		"Neurosurgeon",
		"Cardiothoracic Surgeon",
		"Vascular Surgeon",
		"Plastic and Reconstructive Surgeon",
		"Trauma Surgeon",
	],
	"Mental Health Providers": [
		"Psychologist",
		"Licensed Clinical Social Worker (LCSW)",
		"Marriage and Family Therapist (MFT)",
		"Psychiatric Nurse Practitioner",
		"Mental Health Counselor",
	],
	"Allied Health Providers": [
		"Physical Therapist",
		"Occupational Therapist",
		"Speech-Language Pathologist",
		"Respiratory Therapist",
		"Audiologist",
		"Dietitian/Nutritionist",
	],
	"Specialized Providers": [
		"Chiropractor",
		"Podiatrist",
		"Optometrist",
		"Ophthalmologist",
		"Urologist",
		"Otolaryngologist (ENT Specialist)",
		"Anesthesiologist",
		"Pain Management Specialist",
	],
	"Hospital-Based Providers": [
		"Hospitalist",
		"Emergency Medicine Physician",
		"Radiologist",
		"Pathologist",
		"Intensivist (Critical Care Specialist)",
	],
	"Nursing Providers": [
		"Registered Nurse (RN)",
		"Nurse Practitioner (NP)",
		"Certified Nurse Midwife (CNM)",
		"Licensed Practical Nurse (LPN)",
		"Clinical Nurse Specialist (CNS)",
	],
	"Pharmacy Providers": [
		"Pharmacist",
		"Clinical Pharmacist",
		"Pharmacy Technician",
	],
	"Rehabilitation Providers": [
		"Physical Medicine and Rehabilitation Specialist (PM&R)",
		"Rehabilitation Counselor",
		"Recreational Therapist",
	],
	"Laboratory Providers": [
		"Medical Technologist",
		"Phlebotomist",
		"Pathology Laboratory Specialist",
	],
	"Public Health Providers": [
		"Community Health Worker",
		"Public Health Nurse",
		"Health Educator",
	],
	"Durable Medical Equipment (DME) Providers": [
		"Durable Medical Equipment Supplier",
		"Orthotist",
		"Prosthetist",
	],
	"Alternative Medicine Providers": [
		"Acupuncturist",
		"Naturopathic Doctor (ND)",
		"Homeopath",
	],
	"Other Providers": [
		"Hospice Provider",
		"Home Health Provider",
		"EMT",
		"Paramedic",
		"Transport Provider (Ambulance Services)",
	],
};

export const fieldDefinitions = {
	identificationAndPersonalDetails: [
		{ name: "provider_id", label: "Provider ID", type: "text", required: true },
		{ name: "tin_number", label: "TIN Number", type: "text", required: true },
		{
			name: "provider_type_selection",
			label: "Service Type",
			type: "select",
			options: ["Professional", "Institute"],
			required: true,
		},
		{
			name: "institute_name",
			label: "Institute Name",
			type: "text",
			required: true,
			dependsOn: { field: "provider_type_selection", value: "Institute" },
		},
		{
			name: "provider_contact_person",
			label: "Contact Person",
			type: "text",
			dependsOn: { field: "provider_type_selection", value: "Institute" },
		},
		{
			name: "provider_title",
			label: "Title",
			type: "text",
			dependsOn: { field: "provider_type_selection", value: "Professional" },
		},
		{
			name: "provider_first_name",
			label: "First Name",
			type: "text",
			dependsOn: { field: "provider_type_selection", value: "Professional" },
		},
		{
			name: "provider_middle_initial",
			label: "Middle Initial",
			type: "text",
			dependsOn: { field: "provider_type_selection", value: "Professional" },
		},
		{
			name: "provider_last_name",
			label: "Last Name",
			type: "text",
			required: true,
			dependsOn: { field: "provider_type_selection", value: "Professional" },
		},
	],
	addressAndContactDetails: [
		{
			name: "provider_address",
			label: "Address",
			type: "text",
			required: true,
		},
		{ name: "provider_city", label: "City", type: "text", required: true },
		{ name: "provider_county", label: "County", type: "text" },
		{ name: "provider_region", label: "Region/Zone", type: "text" },
		{
			name: "provider_kifle_ketema",
			label: "Kifle Ketema/Zip Code",
			type: "text",
		},
		{ name: "provider_zip_code", label: "Zip Code", type: "text" },
		{
			name: "provider_phone_number",
			label: "Phone Number",
			type: "text",
			required: true,
		},
		{ name: "provider_fax", label: "Fax", type: "text" },
		{
			name: "provider_email",
			label: "Email Address",
			type: "email",
			required: true,
		},
	],
	professionalAndGroupDetails: [
		{
			name: "provider_type",
			label: "Provider Type",
			type: "select",
			options: Object.keys(specialtyMapping),
		},
		{
			name: "provider_primary_specialty",
			label: "Primary Specialty",
			type: "select",
			options: Object.keys(specialtyMapping),
			required: true,
		},
		{
			name: "provider_sub_specialty",
			label: "Sub Specialty",
			type: "select",
			options: [],
		},
		{
			name: "medicare_provider_number",
			label: "Medicare Provider Number",
			type: "text",
		},
		{ name: "provider_group_name", label: "Group Name", type: "text" },
		{
			name: "provider_group_contact_person",
			label: "Group Contact Person",
			type: "text",
		},
		{
			name: "provider_group_phone_number",
			label: "Group Phone Number",
			type: "text",
		},
		{ name: "provider_group_address", label: "Group Address", type: "text" },
	],
};

export type FormData = {
	identificationAndPersonalDetails: Record<string, string>;
	addressAndContactDetails: Record<string, string>;
	professionalAndGroupDetails: Record<string, string>;
};
