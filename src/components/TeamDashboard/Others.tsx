// components/SpecialOffersDemo.tsx
import { Shield, Users, Tag, CheckCircle } from "lucide-react";
import useLegalHubAccess from "@/hooks/useLegalHubAccess";

const SpecialOffersDemo = () => {
  const { hasRequested, isLoading, error, requestAccess } = useLegalHubAccess();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section
        style={{ backgroundColor: "#2d4817" }}
        className="text-white py-20 px-6 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Exclusive Legal Offers
        </h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto opacity-95 leading-relaxed">
          Unlock premium access to the <strong>Corporate Legal Hub</strong> and jumpstart your career with the{" "}
          <strong>CLA Internship Program</strong> — now with <span className="underline">limited-time discounts</span> for early adopters!
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-16 px-5 sm:px-8 space-y-20">

        {/* === Corporate Legal Hub Card === */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-2xl">
          <div className="md:flex">
            {/* Left Badge */}
            <div
              style={{ backgroundColor: "#2d4817" }}
              className="md:w-1/3 p-10 text-white text-center flex flex-col items-center justify-center space-y-4"
            >
              <Tag className="h-14 w-14 opacity-90" />
              <h3 className="text-2xl font-bold">Save 30%</h3>
              <p className="text-sm opacity-90">Limited-time annual discount</p>
            </div>

            {/* Right Content */}
            <div className="md:w-2/3 p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <Shield className="h-7 w-7" style={{ color: "#2d4817" }} />
                Corporate Legal Hub Access
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Empower your legal team with a comprehensive digital platform featuring contract automation, compliance tools, research databases, and live expert sessions.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Legal research & precedent library",
                  "Smart contract generation tools",
                  "Compliance dashboards & alerts",
                  "Monthly webinars with industry experts",
                  "Team-based collaboration spaces",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div>
                  
                </div>
                <button
                  style={{ backgroundColor: hasRequested ? "#6c757d" : "#2d4817" }}
                  className="px-8 py-4 text-white font-semibold rounded-xl hover:bg-[#2a4015] transition-all duration-200 transform hover:scale-105 shadow-md"
                  onClick={requestAccess}
                  disabled={hasRequested || isLoading}
                >
                  {isLoading ? 'Submitting...' : hasRequested ? 'Already Requested' : 'Request Access'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* === CLA Internship Program Card === */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-2xl">
          <div className="md:flex flex-col md:flex-row">
            {/* Left Content */}
            <div className="md:w-2/3 p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <Users className="h-7 w-7" style={{ color: "#2d4817" }} />
                CLA Internship Program
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                A transformative 12-week program designed for law students and fresh graduates to gain real legal experience, mentorship, and career opportunities.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Hands-on case analysis & drafting",
                  "Mentorship from senior advocates and judges",
                  "Certificate recognized by partner firms",
                  "Exclusive networking with legal leaders",
                  "Top performers fast-tracked to job offers",
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div>
                 
                </div>
                <button
                  style={{ backgroundColor: "#2d4817" }}
                  className="px-8 py-4 text-white font-semibold rounded-xl hover:bg-[#2a4015] transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  Apply Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersDemo;
