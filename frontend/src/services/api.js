// src/services/api.js
import axios from 'axios';

// Uprav podľa toho, kde ti beží backend:
const BASE_URL = 'http://127.0.0.1:5000';

// 1. Načítanie záznamov (GET)
export const getAuta = async (search, sortBy, sortOrder) => {
    const params = {};
    if (search) params.search = search;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

    const response = await axios.get(`${BASE_URL}/auta`, { params });
    return response.data; // pole áut
};

// 2. Vytvorenie nového záznamu (POST)
export const createAuto = async (autoData) => {
    const response = await axios.post(`${BASE_URL}/auta`, autoData);
    return response.data; // vráti novovytvorené auto
};

// 3. Úprava existujúceho auta (PUT)
export const updateAuto = async (id, autoData) => {
    const response = await axios.put(`${BASE_URL}/auta/${id}`, autoData);
    return response.data; // vráti upravené auto
};

// 4. Zmazanie (DELETE)
export const deleteAuto = async (id) => {
    const response = await axios.delete(`${BASE_URL}/auta/${id}`);
    return response.data; // {deleted_id: ...}
};
