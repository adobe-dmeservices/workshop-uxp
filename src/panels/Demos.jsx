import React, { useState } from "react";

export const Demos = () => {
    const [prompt, setPrompt] = useState("");
    const [classType, setClassType] = useState("art");
    const [size, setSize] = useState({});

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleClassChange = (e) => {
        setClassType(e.target.value);
    };

    const handleSizeChange = (e) => {
        const sizeObj = JSON.parse(e.target.getAttribute("value"));
        setSize(sizeObj);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(prompt); 
        console.log(classType);
        console.log(size);
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

    return (
        <>
            <form onSubmit={submitForm}>
                <sp-field-label style={{color: "white"}}>Prompt</sp-field-label>
                <sp-textfield
                    onInput={handlePromptChange}
                    multiline
                    grows
                ></sp-textfield>
                <sp-picker value="art">
                    <sp-menu slot="options">
                        {classTypes.map((type) => (
                            <sp-menu-item 
                                key={type.id} 
                                value={type.id} 
                                onClick={handleClassChange}
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
                                onClick={handleSizeChange}
                            >
                                {dim.label}
                            </sp-menu-item>
                        ))}
                    </sp-menu>
                </sp-picker>
                <sp-action-button type="submit">Submit</sp-action-button>
            </form>
        </>
    );
}