import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Employee = string[]; // Each employee is an array of 6 strings

const List: React.FC = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 6;

  // 🔐 Protect Route
  useEffect(() => {
    const storedData = localStorage.getItem("tableData");

    if (!storedData) {
      navigate("/");
      return;
    }

    const parsedData: Employee[] = JSON.parse(storedData);
    // eslint-disable-next-line react-hooks/immutability
    simulateLoading(parsedData);
  }, [navigate]);

  // 🔄 Fake Loading Animation
  const simulateLoading = (data: Employee[]) => {
    let value = 0;

    const interval = setInterval(() => {
      value += 5;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setEmployees(data);
        setLoading(false);
      }
    }, 50);
  };

  // 🚪 Logout
  const handleLogout = (): void => {
    localStorage.removeItem("tableData");
    navigate("/");
  };

  // 📄 Pagination Logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // 🎯 Random Status Generator
  const getStatus = (): "Active" | "On Leave" | "Terminated" => {
    const statuses = ["Active", "On Leave", "Terminated"] as const;
    // eslint-disable-next-line react-hooks/purity
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  // 📥 CSV Export
  const exportCSV = (): void => {
    let csvContent = "data:text/csv;charset=utf-8,";

    employees.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔶 Header */}
      <header className="bg-yellow-400 h-16 flex items-center justify-between px-8 shadow-md">
        <h1 className="font-bold text-xl">✨ JOTISH</h1>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-5 py-2 rounded-full hover:opacity-80 transition"
        >
          Logout
        </button>
      </header>

      <div className="p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2">Employee List</h2>
        <p className="text-gray-500 mb-6">Data fetched from API</p>

        {/* ⏳ Loading Section */}
        {loading && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Loading data...</span>
                  <span>{progress}%</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 👥 Employee Cards */}
        {!loading && (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {currentEmployees.map((emp, index) => {
                const status = getStatus();

                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <img
                        src={`https://i.pravatar.cc/100?img=${index + 10}`}
                        alt="avatar"
                        className="w-16 h-16 rounded-xl"
                      />

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          status === "Active"
                            ? "bg-green-100 text-green-600"
                            : status === "On Leave"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold">{emp[0]}</h3>
                    <p className="text-gray-500 text-sm mb-4">{emp[2]}</p>

                    <div className="flex justify-between items-center">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                        <p className="text-gray-500">Salary</p>
                        <p className="font-semibold">{emp[5]}</p>
                      </div>

                      <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-sm font-medium transition">
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 📄 Pagination + Export */}
            <div className="flex justify-between items-center mt-10">
              <div className="flex gap-3">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === i + 1
                        ? "bg-yellow-400"
                        : "bg-white shadow"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={exportCSV}
                className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-80 transition"
              >
                Export Data (CSV)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default List;