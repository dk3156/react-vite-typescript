import {modelResultType} from "../model/modelResult.ts";

export async function getModelInference(file: File) : Promise<modelResultType> {

    const url = "http://localhost:8000/predict";

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);

    // Send the POST request
    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Error fetching model inference result");
    }
    return await response.json();
}