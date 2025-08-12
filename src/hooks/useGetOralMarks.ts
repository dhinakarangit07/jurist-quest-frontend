import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useGetOralMarks = (teamCode: string | null, roundId: number | null, juryId: number | null) => {
  const [oralMarks, setOralMarks] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOralMarks = useCallback(async () => {
    if (!teamCode || !roundId || !juryId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/oral-marks/`, {
        params: {
          team_id: teamCode,
          round_id: roundId,
          jury_id: juryId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.length > 0) {
        setOralMarks(response.data[0]); // Assuming one oral marks entry per team/round/jury pair
      } else {
        setOralMarks(null);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'An unknown error occurred.';
      setError(errorMessage);
      console.error('Error fetching oral marks:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [teamCode, roundId, juryId]);

  useEffect(() => {
    fetchOralMarks();
  }, [fetchOralMarks]);

  return { oralMarks, isLoading, error, refetch: fetchOralMarks };
};

export default useGetOralMarks;
