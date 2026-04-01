import axios from 'axios';

// This will dynamically figure out the backend IP address.
// On your computer, window.location.hostname will be 'localhost'.
// On your iPad, it will be your computer's network IP (e.g., '192.168.1.100').
const backendHost = window.location.hostname;
const API_BASE_URL = `http://${backendHost}:5000/api`;

export const fetchHistoricalData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/historical_data`);
        return response.data;
    } catch (error) {
        console.error("Error fetching historical data from", API_BASE_URL, error);
        return [];
    }
};

export const fetchPredictions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/predictions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching predictions from", API_BASE_URL, error);
        return null;
    }
};
