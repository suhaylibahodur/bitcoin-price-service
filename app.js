const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const UPDATE_FREQUENCY = process.env.UPDATE_FREQUENCY || 10000; // default 10 seconds
const COMMISSION = process.env.COMMISSION || 0.01 / 100; // default 0.01%

let bitcoinPrice = { bid: 0, ask: 0, mid: 0 };

const getBitcoinPrice = async () => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT');
        const { bidPrice, askPrice } = response.data;
        const bid = parseFloat(bidPrice);
        const ask = parseFloat(askPrice);

        // Apply commission
        const bidWithCommission = bid * (1 - COMMISSION);
        const askWithCommission = ask * (1 + COMMISSION);

        // Calculate mid price
        const mid = (bidWithCommission + askWithCommission) / 2;

        // Update the price
        bitcoinPrice = { bid: bidWithCommission, ask: askWithCommission, mid };
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
};

// Update Bitcoin price every 10 seconds
setInterval(getBitcoinPrice, UPDATE_FREQUENCY);

app.get('/bitcoin-price', (req, res) => {
    res.json(bitcoinPrice);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
