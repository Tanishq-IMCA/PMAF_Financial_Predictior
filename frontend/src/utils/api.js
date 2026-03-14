import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchHistoricalData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/historical_data`);
        return response.data;
    } catch (error) {
        console.error("Error fetching historical data", error);
        return [];
    }
};

export const fetchPredictions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/predictions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching predictions", error);
        return null;
    }
};
