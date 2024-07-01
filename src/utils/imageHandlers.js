import { uploadReferenceImage } from "../controllers/apiConnector";

const fs = require("fs");
const { storage } = require("uxp");

export const fetchS3PresignedContent = async (presignedUrl) => {
    try {
        const response = await fetch(presignedUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.arrayBuffer();
    } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
    }
}

export const createImageFromBuffer = async (arrayBuffer) => {
    const localFileSystem = require("uxp").storage.localFileSystem;
    try {
        await fs.writeFile(
            "plugin-temp:/image.jpeg",
            new Uint8Array(arrayBuffer)
        )
        const tempFolder = await localFileSystem.getTemporaryFolder();
        const imageFile = await tempFolder.getEntry("image.jpeg");
        if (!imageFile) {
            throw new Error("Could not create image file");
        }
        const imageToken = localFileSystem.createSessionToken(imageFile);
        return imageToken;
    } catch (error) {
        console.error("There was a problem creating the image file:", error);
    }
}

export const addImageDataToDocument = async (imageToken) => {
    const core = require("photoshop").core;
    const { batchPlay } = require("photoshop").action;
    async function placeFireflyTmpImage(token) {
        try {
            await batchPlay(
                [
                    {
                        _obj: "placeEvent",
                        null: { _path: token },
                        _isCommand: true,
                        _options: { dialogOptions: "dontDisplay" },
                    },
                ],
                { synchronousExecution: false }
            );
        } catch (error) {
            console.error("There was a problem placing the image:", error);
        }
    } 
    try {
        core.executeAsModal(
            async () => {
                await placeFireflyTmpImage(imageToken);
            },
            {commandName: "Import Firefly Image Command"}
        );
        return true;
    } catch (error) {
        console.error("There was a problem adding the image to the document:", error);
    }
}

async function rmvBgrd() {
    let result;
    let psAction = require("photoshop").action;

    let command = [
        // Remove Background
        {"_obj":"removeBackground"}
    ];
    result = await psAction.batchPlay(command, {});
}

export async function runModalFunction() {
    await require("photoshop").core.executeAsModal(rmvBgrd, {"commandName": "Action Commands"});
}


const getReferenceImage = async () => {
    try {
        const file = await storage.localFileSystem.getFileForOpening({ types: ["jpg"] });
        const data = await file.read({format: storage.formats.binary});
        return {
            data: data,
            name: file.name
        }
    } catch(error) {
        console.error("There was a problem getting the reference image:", error);
    }
}

export const uploadImage = async () => {
    try {
        const response = await getReferenceImage();
        const result = await uploadReferenceImage(response.data);
        const ref = {
            id: result.images[0].id,
            name: response.name
        };
        return ref;
    } catch (error) {
        console.error("There was a problem uploading the image:", error);
    }
};
