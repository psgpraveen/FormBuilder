import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
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
        console.log(response.data.responses);
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
    return <p className="text-center text-gray-500">Loading responses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
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
    return <><button
    onClick={handleBack}
    className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
  >
    Back
  </button><p className="text-center text-gray-500">No responses available</p>;</>
  }
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-12 lg:text-3xl">
          Responses for {item?.title}
        </h2>
        <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-gray-50">
          <h3 className="font-bold text-lg mb-4">Response {index1 + 1}</h3>
          <div className="space-y-2">
            {responses[index1].map((res, idx) => (
              <div
                key={idx}
                className="border-b pb-2 mb-2 last:border-b-0 last:pb-0"
              >
                <p className="text-sm font-medium text-gray-600">
                  Question: {" "}
                  <span className="font-semibold text-gray-800">
                    {res.questionText}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Answer: {" "}
                  <span className="font-semibold text-gray-800">
                    {res.answer || "Not answered"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
          >
            Back
          </button>
          <div className="flex space-x-4">
            <button
              onClick={handlePrevious}
              disabled={index1 === 0}
              className={`px-4 py-2 rounded-lg text-white ${
                index1 === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={index1 === responses.length - 1}
              className={`px-4 py-2 rounded-lg text-white ${
                index1 === responses.length - 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
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
