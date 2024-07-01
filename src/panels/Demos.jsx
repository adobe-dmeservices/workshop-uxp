import React, { useState } from "react";

export const Demos = () => {
    const [formData, setFormData] = useState({
        prompt: "",
        negativePrompt: "",
        contentClass: "",
        size: {},
        styles: []
    });

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

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
    };

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

    const styles = [
        { "id": "color_explosion", "label": "Color Explosion" },
        { "id": "dark", "label": "Dark" },
        { "id": "faded_image", "label": "Faded Image" },
        { "id": "fisheye", "label": "Fisheye" },
        { "id": "iridescent", "label": "Iridescent" },
        { "id": "isometric", "label": "Isometric" },
        { "id": "misty", "label": "Misty" },
        { "id": "neon", "label": "Neon" },
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
                        {styles.map((style) => (
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
                <sp-action-button type="submit">Submit</sp-action-button>
            </form>
        </>
    );
}