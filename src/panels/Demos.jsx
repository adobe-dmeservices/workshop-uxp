import React, { useState } from "react";

export const Demos = () => {
    const [prompt, setPrompt] = useState("");
    const [classType, setClassType] = useState("art");

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleClassChange = (e) => {
        setClassType(e.target.value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(prompt); 
        console.log(classType);
    };

    const classTypes = [
        { id: "art", label: "Art" },
        { id: "photo", label: "Photo" }
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
                <sp-action-button type="submit">Submit</sp-action-button>
            </form>
        </>
    );
}