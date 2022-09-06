import React from 'react'
import { API_URL } from '../utils/constants'

export const getBannersApi = async () => {
    try {
        const url = `${API_URL}/home-banners?_sort=position:DESC`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return null
    }
}
