import React, { useState, useEffect } from "react";
import { addPost } from "../controllers/apiConnector";
import { 
    addImageDataToDocument, 
    createImageFromBuffer, 
    fetchS3PresignedContent, 
    runModalFunction, 
    uploadImage 
} from "../utils/imageHandlers";

export const Demos = () => {
    const [formData, setFormData] = useState({
        prompt: "",
        negativePrompt: "",
        contentClass: "",
        size: {},
        styles: [],
    });
    const [referenceImage, setReferenceImage] = useState({ id: "", name: ""});

    useEffect(() => {
        // This function intentionally left blank. 
        // It's here to trigger a re-render when formData.referenceImage.name changes.
    }, [referenceImage.name]); // Dependency array

    const handleChange = (e) => {
        const { id, value } = e.target;
        let newValue;
        if (id === "size") {
            newValue = JSON.parse(value);
        } else if (id === "styles") {
            const isChecked = e.target.checked;
            if (isChecked) {
                newValue = [...formData.styles, value];
            } else {
                newValue = formData.styles.filter((style) => style !== value);
            }
        } else {
            newValue = value;
        }
        setFormData((prev) => ({
            ...prev,
            [id]: newValue
        }));
    };

    const handleUploadImage = async () => {
        try {
            // Await the async operation to complete and get the response
            const response = await uploadImage();
            // Set the reference image with the response
            setReferenceImage(response);
        } catch (error) {
            console.error("There was a problem uploading the image:", error);
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        const requestBody = {
            numVariations: 1,
            prompt: formData.prompt,
            negativePrompt: formData.negativePrompt,
            contentClass: formData.contentClass,
            size: formData.size,
            style: {
                presets: formData.styles,
                strength: 100,
            }
        }
        if (referenceImage.id !== "") {
            requestBody.style.imageReference = {source: {uploadId: referenceImage.id}};
        }
        // Post the data to the FF API endpoint and return the response
        addPost(requestBody).then((response) => {
            console.log(response);
            // Get the url from the response for the presigned URL to the image in the Amazon S3 bucket
            const contentUrl = response.outputs[0].image.url;
            fetchS3PresignedContent(contentUrl).then((buffer) => {
                createImageFromBuffer(buffer).then((imageToken) => {
                    addImageDataToDocument(imageToken).then((result) => {
                        console.log("Image added to document");
                    });
                })
            })
        })
    };

    const clearReferenceImage = () => {
        setReferenceImage({ id: "", name: "" });
    }

    const handleActions = async () => {
        try {
            await runModalFunction();
        }
        catch (error) {
            console.error("There was a problem running the modal function:", error);
        }
    }

    const classTypes = [
        { id: "art", label: "Art" },
        { id: "photo", label: "Photo" }
    ]

    const dimensions = [
        { size: '{"width": 2048, "height": 2048}', label: "Square" },
        { size: '{"width": 2304, "height": 1792}', label: "Landscape" },
        { size: '{"width": 1792, "height": 2304}', label: "Portrait" },
        { size: '{"width": 2688, "height": 1536}', label: "Widescreen" }
    ]

    const styleOptions = [
        { id: "color_explosion", label: "Color Explosion" },
        { id: "dark", label: "Dark" },
        { id: "faded_image", label: "Faded Image" },
        { id: "fisheye", label: "Fisheye" },
        { id: "iridescent", label: "Iridescent" },
        { id: "isometric", label: "Isometric" },
        { id: "misty", label: "Misty" },
        { id: "neon", label: "Neon" },
    ]

    return (
        <>
            <form onSubmit={submitForm} style={{fontFamily: "Adobe Clean"}}>
                <sp-textarea
                    onInput={handleChange}
                    id="prompt"
                    placeholder="Enter a prompt"
                ></sp-textarea>
                <sp-textarea
                    onInput={handleChange}
                    id="negativePrompt"
                    placeholder="Enter a negative prompt"
                ></sp-textarea>
                <sp-picker value="art">
                    <sp-menu slot="options">
                        {classTypes.map((type) => (
                            <sp-menu-item 
                                key={type.id} 
                                value={type.id} 
                                onClick={handleChange}
                                id="contentClass"
                            >
                                {type.label}
                            </sp-menu-item>
                        ))}
                    </sp-menu>
                </sp-picker>
                <sp-picker value="square">
                    <sp-menu slot="options">
                        {dimensions.map((dim) => (
                            <sp-menu-item 
                                key={dim.label} 
                                value={dim.size} 
                                onClick={handleChange}
                                id="size"
                            >
                                {dim.label}
                            </sp-menu-item>
                        ))}
                    </sp-menu>
                </sp-picker>
                <div style={{display: "flex", flexDirection: "column"}}>
                    {styleOptions.map((style) => (
                        <sp-checkbox 
                            key={style.id} 
                            onClick={handleChange}
                            id="styles"
                            value={style.id}
                        >
                            {style.label}
                        </sp-checkbox>
                    ))
                    }
                </div>
                <sp-textfield value={referenceImage.name} disabled></sp-textfield>
                <sp-action-button onClick={handleUploadImage}>↑</sp-action-button>
                <sp-action-button onClick={clearReferenceImage}>×</sp-action-button>
                
                <br />
                <sp-action-button type="submit">Submit</sp-action-button>
            </form>
            <sp-action-button onClick={handleActions}>Actions</sp-action-button>
        </>
    );
}