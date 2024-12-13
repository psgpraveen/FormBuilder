import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Responses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, user } = location.state || {};
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index1, setIndex] = useState(0);

  useEffect(() => {
    const fetchResponses = async () => {
      if (!user || !item) return;
      try {
        const response = await axios.get(
          `${apiUrl}/get-responses/${user.Email}/${item.title}`
        );
        setResponses(response.data.responses);
      } catch (err) {
        setError("Error fetching responses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [user, item]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-6">
        <p>Loading responses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-6">
        <p>{error}</p>
      </div>
    );
  }

  const handlePrevious = () => {
    if (index1 > 0) setIndex(index1 - 1);
  };

  const handleNext = () => {
    if (index1 < responses.length - 1) setIndex(index1 + 1);
  };

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  if (responses.length === 0) {
    return (
      <div className="text-center py-6">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Back
        </button>
        <p className="text-gray-500 mt-4">No responses available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-6 md:px-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 md:mb-12 lg:text-4xl">
          Responses for {item?.title}
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Response by {responses[index1][1]} || Email: {responses[index1][0]}
          </h3>
          <div className="space-y-4">
            {responses[index1][2].map((res, idx) => (
              <div
                key={idx}
                className="border-b pb-4 mb-4 last:border-b-0 last:pb-0"
              >
                <p className="text-sm font-medium text-gray-600">
                  Question:{" "}
                  <span className="font-semibold text-gray-800">
                    {res.questionText}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Answer:{" "}
                  <span className="font-semibold text-gray-800">
                    {res.answer || "Not answered"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-lg text-white bg-gray-500 hover:bg-gray-600 focus:outline-none"
          >
            Back
          </button>
          <div className="flex space-x-4">
            <button
              onClick={handlePrevious}
              disabled={index1 === 0}
              className={`px-6 py-3 rounded-lg text-white ${
                index1 === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={index1 === responses.length - 1}
              className={`px-6 py-3 rounded-lg text-white ${
                index1 === responses.length - 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responses;
