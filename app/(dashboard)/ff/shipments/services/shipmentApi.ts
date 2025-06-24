import axios from "axios";
import {
  mockTimelineData,
  shipmentData,
  ShipmentData,
  vendorPaymentsData,
} from "../lib/data";
import { TimelineItemType } from "../types";

// Create an axios instance with default config
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // You can add auth token here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with an error status
      if (error.response.status === 401) {
        // Handle unauthorized
        console.error("Unauthorized access");
        // Redirect to login or refresh token
      } else if (error.response.status === 404) {
        console.error("Resource not found");
      } else if (error.response.status >= 500) {
        console.error("Server error");
      }
    } else if (error.request) {
      // Request was made but no response
      console.error("Network error");
    } else {
      // Something else happened
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

// Shipment API service
export const shipmentApi = {
  // Get shipment data
  getShipmentData: async (): Promise<ShipmentData> => {
    try {
      // In a real app, this would be an API call
      // const response = await api.get('/shipment');
      // return response.data;

      // For now, return mock data
      return shipmentData;
    } catch (error) {
      console.error("Error fetching shipment data:", error);
      throw error;
    }
  },

  // Get timeline data
  getTimelineData: async (): Promise<TimelineItemType[]> => {
    try {
      // In a real app, this would be an API call
      // const response = await api.get('/timeline');
      // return response.data;

      // For now, return mock data
      return mockTimelineData;
    } catch (error) {
      console.error("Error fetching timeline data:", error);
      throw error;
    }
  },

  // Get vendor payments
  getVendorPayments: async (): Promise<any[]> => {
    try {
      // In a real app, this would be an API call
      // const response = await api.get('/vendor-payments');
      // return response.data;

      // For now, return mock data
      return vendorPaymentsData;
    } catch (error) {
      console.error("Error fetching vendor payments:", error);
      throw error;
    }
  },

  // Record a payment
  recordPayment: async (paymentData: {
    amount: number;
    vendor: string;
  }): Promise<{
    success: boolean;
    data: { amount: number; vendor: string };
  }> => {
    try {
      // In a real app, this would be an API call
      // const response = await api.post('/payments', paymentData);
      // return response.data;

      // For now, just log and return the data
      console.log("Recording payment:", paymentData);
      return { success: true, data: paymentData };
    } catch (error) {
      console.error("Error recording payment:", error);
      throw error;
    }
  },

  // Make a payment
  makePayment: async (paymentData: {
    amount: number;
    vendor: string;
  }): Promise<{
    success: boolean;
    data: { amount: number; vendor: string };
  }> => {
    try {
      // In a real app, this would be an API call
      // const response = await api.post('/make-payment', paymentData);
      // return response.data;

      // For now, just log and return the data
      console.log("Making payment:", paymentData);
      return { success: true, data: paymentData };
    } catch (error) {
      console.error("Error making payment:", error);
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (
    paymentId: string,
    status: string
  ): Promise<{ success: boolean; paymentId: string; status: string }> => {
    try {
      // In a real app, this would be an API call
      // const response = await api.put(`/payments/${paymentId}`, { status });
      // return response.data;

      // For now, just log and return the data
      console.log(`Updating payment ${paymentId} to ${status}`);
      return { success: true, paymentId, status };
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  },

  // Delete a payment
  deletePayment: async (
    paymentId: string
  ): Promise<{ success: true; paymentId: string }> => {
    try {
      // In a real app, this would be an API call
      // const response = await api.delete(`/payments/${paymentId}`);
      // return response.data;

      // For now, just log and return the data
      console.log(`Deleting payment ${paymentId}`);
      return { success: true, paymentId };
    } catch (error) {
      console.error("Error deleting payment:", error);
      throw error;
    }
  },
};
