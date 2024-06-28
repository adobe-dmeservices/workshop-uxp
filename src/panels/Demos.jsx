import React, { useState } from "react";

export const Demos = () => {
    const [prompt, setPrompt] = useState("");

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(prompt); 
    };

    return (
        <>
            <form onSubmit={submitForm}>
                <sp-field-label for="story-0-m">Prompt</sp-field-label>
                <sp-textfield
                    onInput={handlePromptChange}
                    multiline
                ></sp-textfield>
                <sp-action-button type="submit">Submit</sp-action-button>
            </form>
        </>
    );
}