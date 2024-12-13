import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const SharedFormView = () => {
  const [questions, setQuestions] = useState([]);
  const { id, email } = useParams();
  const [answers, setAnswers] = useState([]);
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/get-questions/${email}/${id}`
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (email && id) {
      fetchQuestions();
    }
  }, [email, id]);

  const handleInputChange = (question, value) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(
        (a) => a.questionId === question.id
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          answer: value,
        };
        return updatedAnswers;
      }
      return [
        ...prev,
        {
          questionId: question.id,
          questionText: question.question,
          answer: value,
        },
      ];
    });
  };

  const handleFormDetailsChange = (field, value) => {
    setFormDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formDetails.name || !formDetails.email) {
      alert("Please fill in your name and email before submitting.");
      return;
    }

    try {
      const formattedAnswers = questions.map((q) => {
        const answerEntry = answers.find((a) => a.questionId === q.id);
        return {
          questionText: q.question,
          fieldType: q.fieldType,
          answer: answerEntry ? answerEntry.answer : null,
        };
      });

      const payload = {
        email: formDetails.email,
        name: formDetails.name,
        title: id,
        responses: formattedAnswers,
      };


      const response = await axios.post(
        `${apiUrl}/submit-ans`,
        payload
      );
      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 text-gray-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Form</h2>
        <p>No questions available.</p>
      </div>
    );
  }
  const handleCopyClick = () => {
  const currentUrl = window.location.href;
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      alert("Link copied to clipboard!");
    })
    .catch((error) => {
      console.error("Error copying the link: ", error);
      alert("Failed to copy the link.");
    });}
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-4xl">
        Shared Form
      </h2>
      <div className="mb-6">
        <div className="w-full p-3 border rounded-lg shadow bg-white text-center lg:text-xl">
          {id}
        </div>
      </div>
      <div className="mx-8">
        <div className="mb-6 p-4 bg-white border rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formDetails.name}
            onChange={(e) => handleFormDetailsChange("name", e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-6 p-4 bg-white border rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formDetails.email}
            onChange={(e) => handleFormDetailsChange("email", e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {questions.map((q, index) => (
            <div
              key={q.id || index}
              className="mb-4 p-4 border rounded-lg bg-white shadow-md lg:mb-0 lg:mr-4"
            >
              <label className="block text-gray-700 font-semibold mb-2">
                {q.question || `Question ${index + 1}`}
              </label>
              {q.fieldType === "text" && (
                <input
                  type="text"
                  placeholder="Text Input"
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              )}
              {q.fieldType === "number" && (
                <input
                  type="number"
                  placeholder="Number Input"
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              )}
              {q.fieldType === "date" && (
                <input
                  type="date"
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              )}
              {q.fieldType === "checkbox" && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleInputChange(q, e.target.checked ? "checked" : "")
                    }
                    className="mr-2"
                  />
                  <label>Checkbox</label>
                </div>
              )}
              {q.fieldType === "dropdown" && (
                <select
                  onChange={(e) => handleInputChange(q, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  {q.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {q.fieldType === "radio" && (
                <div>
                  {q.options.map((option, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={`radio-${q.id}`}
                        value={option}
                        onChange={(e) => handleInputChange(q, e.target.value)}
                        className="mr-2"
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCopyClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Copy Link to Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedFormView;
