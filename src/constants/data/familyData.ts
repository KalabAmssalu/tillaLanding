export const relationshipData = [
	{ value: "father", label: "Father" },
	{ value: "mother", label: "Mother" },
	{ value: "son", label: "Son" },
	{ value: "daughter", label: "Daughter" },
	{ value: "brother", label: "Brother" },
	{ value: "sister", label: "Sister" },
	{ value: "husband", label: "Husband" },
	{ value: "wife", label: "Wife" },
	{ value: "grandfather", label: "Grandfather" },
	{ value: "grandmother", label: "Grandmother" },
	{ value: "grandson", label: "Grandson" },
	{ value: "granddaughter", label: "Granddaughter" },
	{ value: "uncle", label: "Uncle" },
	{ value: "aunt", label: "Aunt" },
	{ value: "nephew", label: "Nephew" },
	{ value: "niece", label: "Niece" },
	{ value: "cousin", label: "Cousin" },
	{ value: "guardian", label: "Guardian" },
	{ value: "stepfather", label: "Stepfather" },
	{ value: "stepmother", label: "Stepmother" },
	{ value: "stepson", label: "Stepson" },
	{ value: "stepdaughter", label: "Stepdaughter" },
	{ value: "other", label: "Other" },
];

export function getAllRelationships() {
	return relationshipData;
}
