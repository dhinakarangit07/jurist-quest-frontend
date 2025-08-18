import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useInternshipProgram = () => {
  const [hasApplied, setHasApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const checkApplicationStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const response = await axios.get(`${API_URL}/api/other/internship-program/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHasApplied(response.data.length > 0);
    } catch (err) {
      setError('Failed to check application status.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    checkApplicationStatus();
  }, [checkApplicationStatus]);

  const applyForInternship = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      await axios.post(`${API_URL}/api/other/internship-program/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHasApplied(true);
    } catch (err) {
      setError('Failed to submit application.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { hasApplied, isLoading, error, applyForInternship, checkApplicationStatus };
};

export default useInternshipProgram;
