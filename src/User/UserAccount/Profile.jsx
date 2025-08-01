import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../Redux/User/Action/Action";
import { Edit as EditIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleEditCredentials = () => {
    navigate("/profile/edit");
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page, or fallback to home
    if (window.history.state === null) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="container max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center justify-center space-y-4" role="status">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
            <div className="absolute inset-0 border-4 border-t-blue-600 border-r-indigo-600 border-b-blue-600 border-l-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-1 border-2 border-t-transparent border-r-transparent border-b-blue-600 border-l-indigo-600 rounded-full animate-spin animation-delay-150 opacity-50 animate-pulse"></div>
          </div>
          <p className="text-sm font-medium text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="container max-w-2xl mx-auto text-center">
          <p className="text-red-600 text-lg font-medium">Error: {error}</p>
          <button
            onClick={() => dispatch(getProfile())}
            className="mt-4 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Retry fetching profile"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="container max-w-2xl mx-auto text-center">
          <p className="text-gray-600 text-lg">Profile not found.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to home"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return "N/A";
    const names = name.split(" ");
    return names
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
        <div className="flex flex-col">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="self-start mb-4 px-3 py-2 text-black  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            aria-label="Go back"
          >
            <ArrowBackIcon style={{ fontSize: "20px" }} />
          </button>
          {/* Profile Content */}
          <div className="flex flex-col items-center">
            {/* Profile Avatar */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-xl font-semibold mb-6">
              {getInitials(profile.name)}
            </div>
            {/* Profile Details */}
            <dl className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-700">User Name</dt>
                <dd className="text-base font-semibold text-gray-900">
                  {profile.name || "N/A"}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-700">Email</dt>
                <dd className="text-base font-semibold text-gray-900">
                  {profile.email || "N/A"}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-700">Phone</dt>
                <dd className="text-base font-semibold text-gray-900">
                  {profile.phone || "N/A"}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-700">Verified</dt>
                <dd className="flex items-center text-base font-semibold text-gray-900">
                  {profile.isEmailVerified ? "Yes" : "No"}
                  {profile.isEmailVerified && (
                    <svg
                      className="ml-2 w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </dd>
              </div>
            </dl>
            {/* Edit Button */}
            <button
              onClick={handleEditCredentials}
              className="mt-6 w-full sm:w-auto px-3 py-2 text-blacktransition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Edit profile credentials"
            >
              <EditIcon style={{ fontSize: "20px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;