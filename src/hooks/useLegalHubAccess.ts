import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useLegalHubAccess = () => {
  const [hasRequested, setHasRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const checkRequestStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const response = await axios.get(`${API_URL}/api/other/legal-hub-access/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHasRequested(response.data.length > 0);
    } catch (err) {
      setError('Failed to check request status.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    checkRequestStatus();
  }, [checkRequestStatus]);

  const requestAccess = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      await axios.post(`${API_URL}/api/other/legal-hub-access/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHasRequested(true);
    } catch (err) {
      setError('Failed to submit request.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { hasRequested, isLoading, error, requestAccess, checkRequestStatus };
};

export default useLegalHubAccess;
