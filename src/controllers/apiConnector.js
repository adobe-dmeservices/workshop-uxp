let ACCESS_TOKEN = undefined;

const CLIENT_ID = process.env.FIREFLY_CLIENT_ID;
const CLIENT_SECRET = process.env.FIREFLY_CLIENT_SECRET;

export const getToken = async (prod) => {
    const url = "https://ims-na1.adobelogin.com/ims/token/v3";
    const body = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
            },
            body: body,
        });
        const data = await response.json();
        console.log(data)
        ACCESS_TOKEN = data.access_token;
    } catch (error) {
        console.log(error);
    }
};

export const addPost = async (data) => {
    const url = "https://firefly-api.adobe.io/v3/images/generate";
    if (!ACCESS_TOKEN) {
        console.log("No token....getting it now...");
        await getToken();
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Api-Key": CLIENT_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify(data),
        })
        return response.json();
    } catch (error) {
        console.log(error);
    }
}