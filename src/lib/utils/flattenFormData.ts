export function flattenFormData(
	formData: Record<string, any>
): Record<string, any> {
	return Object.entries(formData).reduce(
		(acc, [key, value]) => {
			if (typeof value === "object" && value !== null) {
				Object.entries(value).forEach(([subKey, subValue]) => {
					acc[subKey] = subValue;
				});
			} else {
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, any>
	);
}

/**
 * Utility function to flatten and normalize a nested array of objects.
 * @param {Array} data - The nested array of objects to be flattened.
 * @returns {Array} - The flattened and normalized array.
 */
export function flattenAndNormalize(data: any) {
	if (!Array.isArray(data)) {
		throw new Error("Input must be an array");
	}

	return data.map((item) => {
		const normalizedItem = { ...item };

		// Flattening or transforming keys if necessary
		normalizedItem.full_name =
			`${item.first_name || ""} ${item.middle_name || ""} ${item.last_name || ""}`.trim();
		delete normalizedItem.first_name;
		delete normalizedItem.middle_name;
		delete normalizedItem.last_name;

		// Normalizing gender values
		normalizedItem.gender =
			item.gender === "not_prefer_to_say" ? "Prefer not to say" : item.gender;

		return normalizedItem;
	});
}
