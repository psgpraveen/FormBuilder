import axios from "axios";
import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ItemType = {
  FORM_FIELD: "formField",
};

const DraggableField = ({ name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.FORM_FIELD,
    item: { name, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-200 shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {name}
    </div>
  );
};

const DropZone = ({ onDrop, children }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType.FORM_FIELD,
    drop: (item) => onDrop(item),
  }));

  return (
    <div
      ref={drop}
      className="p-6 border-dashed border-4 border-blue-400 rounded-lg bg-blue-50 min-h-[300px] flex flex-col items-center justify-center text-gray-700"
    >
      {children}
    </div>
  );
};

const Home = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [questions, setQuestions] = useState([]);
  const [password, setPassword] = useState("");
  const [update, setupdate] = useState(false);
  const [linkon, setLinkon] = useState("submit-form");
  const ITEM = location.state?.item;
  const [title, setTitle] = useState(ITEM ? ITEM.title : "");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (ITEM?.questions) {
      setQuestions(ITEM.questions);
      setupdate(true);
    }
  }, [ITEM]);

  const handleDrop = (item) => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        question: "",
        fieldType: item.type,
        options:
          item.type === "dropdown" || item.type === "radio"
            ? ["Option 1", "Option 2"]
            : [],
      },
    ]);
  };

  const handleQuestionChange = (id, newQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, question: newQuestion } : q))
    );
  };

  const handleOptionChange = (id, index, newOption) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const updatedOptions = [...q.options];
          updatedOptions[index] = newOption;
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    );
  };

  const addOption = (id) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            options: [...q.options, `Option ${q.options.length + 1}`],
          };
        }
        return q;
      })
    );
  };

  const removeOption = (id, index) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const updatedOptions = q.options.filter((_, i) => i !== index);
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSubmitForm = async () => {
    const formData = {
      email: user.Email,
      password,
      ID: ITEM ? ITEM._id : " " ,
      title,
      questions,
    };

    try {
      const response = await axios.post( update
        ? `${apiUrl}/update-form` :`${apiUrl}/${linkon}`, {
            formData,
          });

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex bg-gray-50">
        <div className="w-1/4 p-2 bg-white border-r shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Toolbox</h2>
          <DraggableField name="Text Input" type="text" />
          <DraggableField name="Number Input" type="number" />
          <DraggableField name="Date Picker" type="date" />
          <DraggableField name="Checkbox" type="checkbox" />
          <DraggableField name="Dropdown Select" type="dropdown" />
          <DraggableField name="Radio Buttons" type="radio" />
        </div>

        <div className="flex-1  p-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Form Builder
          </h2>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Form Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <DropZone onDrop={handleDrop}>
            {questions.length === 0 ? (
              <p className="text-center text-gray-400">
                Drag and drop fields here to create your form.
              </p>
            ) : (
              questions.map((q) => (
                <div
                  key={q.id}
                  className="mb-4 p-4 border rounded-lg bg-white shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      placeholder="Enter your question"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(q.id, e.target.value)
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="ml-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>

                  {q.fieldType === "text" && (
                    <input
                      type="text"
                      placeholder="Text Input"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  )}
                  {q.fieldType === "number" && (
                    <input
                      type="number"
                      placeholder="Number Input"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  )}
                  {q.fieldType === "date" && (
                    <input
                      type="date"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  )}
                  {q.fieldType === "checkbox" && (
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <label>Checkbox</label>
                    </div>
                  )}
                  {q.fieldType === "dropdown" && (
                    <div>
                      {q.options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(q.id, index, e.target.value)
                            }
                            className="flex-1 p-2 border rounded-lg mr-2 focus:outline-none focus:ring focus:ring-blue-200"
                          />
                          <button
                            onClick={() => removeOption(q.id, index)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(q.id)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Add Option
                      </button>
                    </div>
                  )}
                  {q.fieldType === "radio" && (
                    <div>
                      {q.options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="radio"
                            name={`radio-${q.id}`}
                            className="mr-2"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(q.id, index, e.target.value)
                            }
                            className="flex-1 p-2 border rounded-lg mr-2 focus:outline-none focus:ring focus:ring-blue-200"
                          />
                          <button
                            onClick
                            onClick={() => removeOption(q.id, index)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(q.id)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Add Option
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </DropZone>
          <div className="mt-6  ">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />  <br/>
            <button
              onClick={handleSubmitForm}
              className="w-full p-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors duration-300"
            >
              {update ? "Update Form" : " Submit Form"}
            </button>
        <br/>
          <button
            onClick={handleBack}
            className="w-full p-3 mx-auto bg-indigo-600 justi hover:bg-indigo-300 my-8 text-white rounded-lg shadow  transition-colors duration-300"
          >
            Back to previous page
          </button>
        </div>  </div>
      </div>
    </DndProvider>
  );
};

export default Home;
