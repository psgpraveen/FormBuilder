import React,{useState,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header/Index";
const apiUrl = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user,setUser] = useState(null)
  const mail = location.state?.user?.Email;
  const data =async()=>{
   try{
     const response = await axios.post(`${apiUrl}/formname`,{
      email:mail
    })
 if (response.data) {  
  setUser(response.data);  
} else {
  console.error('No data returned from server');
}
 } catch (error) {
      console.error("Error deleting form:", error);
      alert("An error occurred while deleting the form");
    
  }}
  useEffect(() => {
  data();
  }, [])
  const handleCreateNewForm = () => {
    if (user) {
      navigate("/home", { state: { user } });
  
    } else {
      console.error("User not found!");
    }
  };

  const handleDeleteForm = async (title) => {
    if (!user) return;
    
    try {
      const response = await axios.post(`${apiUrl}/delete-form`, {
        email : user.Email,
        title,
      });
      data()
      alert(response?.data?.message || "Form deleted successfully");
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("An error occurred while deleting the form");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-indigo-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-800 sm:mb-10 md:mb-12 lg:text-4xl">
            Welcome, {user?.first_name} {user?.last_name}!
          </h2>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <button
              onClick={handleCreateNewForm}
              className={`px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
                user
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!user}
            >
              Create New Form
            </button>
          </div>

          <h3 className="text-xl font-bold text-center text-gray-700 sm:text-2xl lg:text-2xl mb-6 sm:mb-8">
            Your Forms Collection
          </h3>

          <div
            style={{ gap: "5.5rem" }}
            className="grid lg:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          >
            {Array.isArray(user?.formsName) && user.formsName.length > 0 ? (
              user.formsName.map((item, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {item.title}
                  </h4>
                  <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 bg-indigo-50 p-4 rounded-b-lg flex justify-between items-center">
                    <button
                      onClick={() => {
                        if (user) navigate("/home", { state: { item, user } });
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (user)
                          navigate(`/response/${item.title}`, {
                            state: { item, user },
                          });
                      }}
                      className="text-indigo-600 mx-4 hover:text-indigo-800 font-medium"
                    >
                      View Responses
                    </button>
                    <button
                      onClick={() => {
                        if (item && user) {
                          navigate(`/lob/${user.Email}/${item.title}`, {
                            state: { item },
                          });
                        }
                      }}
                      className="text-green-600 mx-4 hover:text-green-800 font-medium"
                    >
                      Open Form
                    </button>
                    <button
                      onClick={() => handleDeleteForm(item.title)}
                      className="text-red-600 mx-4 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">
                No forms available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
