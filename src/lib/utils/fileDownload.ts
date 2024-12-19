export const downloadFile = (filePath: string, fileName: string) => {
	const link = document.createElement("a");
	link.href = filePath; // Use the file path provided
	link.download = fileName; // Desired file name for the downloaded file
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
