import React, { useState, useEffect } from 'react';

// Define the type for the user data
interface JuryDetails {
  id: number;
  name: string;
  email: string;
  contact_number: string | null;
  address: string | null;
}

const Profile: React.FC = () => {
  const [juryDetails, setJuryDetails] = useState<JuryDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        const stored = localStorage.getItem('jury_details');
        if (stored) {
          const parsed: JuryDetails[] = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setJuryDetails(parsed[0]); // Get the first jury member
          } else {
            console.warn('Stored jury_details is not a valid array');
          }
        } else {
          console.warn('No data found in localStorage for key "jury_details"');
        }
      } catch (error) {
        console.error('Failed to parse jury_details from localStorage', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-muted-foreground font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!juryDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
        <div className="bg-card p-8 rounded-xl shadow-lg text-center max-w-md mx-4 border">
          <div className="text-destructive mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">No Profile Data</h2>
          <p className="text-muted-foreground">We couldn't find any profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8 -mt-8">
        <div className="bg-card rounded-2xl shadow-xl border p-8">
          <h2 className="text-3xl font-semibold text-foreground mb-8 pb-4 border-b border-border">Personal Information</h2>

          <div className="space-y-8">
            {/* Email */}
            <div className="flex items-start group hover:bg-muted/50 p-4 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-6 shadow-sm group-hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email Address</p>
                <a
                  href={`mailto:${juryDetails.email}`}
                  className="text-xl text-primary hover:text-primary/80 hover:underline font-medium transition-colors duration-200 break-all"
                >
                  {juryDetails.email}
                </a>
              </div>
            </div>

            {/* Contact Number */}
            <div className="flex items-start group hover:bg-muted/50 p-4 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-6 shadow-sm group-hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Contact Number</p>
                {juryDetails.contact_number ? (
                  <a
                    href={`tel:${juryDetails.contact_number}`}
                    className="text-xl text-primary hover:text-primary/80 hover:underline font-medium transition-colors duration-200"
                  >
                    {juryDetails.contact_number}
                  </a>
                ) : (
                  <p className="text-xl text-muted-foreground">Not provided</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start group hover:bg-muted/50 p-4 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-6 shadow-sm group-hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Address</p>
                {juryDetails.address ? (
                  <p className="text-xl text-foreground leading-relaxed">{juryDetails.address}</p>
                ) : (
                  <p className="text-xl text-muted-foreground">Not provided</p>
                )}
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Profile;
