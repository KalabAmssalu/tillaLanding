import { useTranslations } from "next-intl";

interface FieldProps {
	label: string;
	value: string;
	local: string;
}
function Field({ label, value, local }: FieldProps) {
	const t = useTranslations(local);

	// Get the localized label from the translations object
	const localizedLabel = t(`${label}.label`);

	return (
		<div className="flex  items-center gap-x-4">
			<dt className="text-gray-500">
				{/* {formatLabel(t(`${label}.label`))}: - */}
				{localizedLabel}: -
			</dt>
			<dd className="font-medium text-xs text-gray-900">{value}</dd>
		</div>
	);
}

export default Field;
