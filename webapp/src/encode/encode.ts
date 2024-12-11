export async function convertImageToFile(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], "shoes.png", { type: blob.type });
}