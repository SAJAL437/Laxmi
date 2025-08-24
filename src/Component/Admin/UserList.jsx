import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/Admin/Action";
import { Avatar } from "@mui/material";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((store) => store.UserList);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers()).then(
      (result) => console.log("FetchUser:", result.payload),
      (err) => console.log("Error :", err.message, err)
    );
  }, [dispatch]);

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col  bg-transparent">
        <div className="flex z-10 flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 rounded-xl shadow-inner shadow-gray-800/40 sticky top-0 bg-black/10 backdrop-blur-lg">
          <h2 className="font-bold font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-0">
            Users
          </h2>
        </div>
        <div className="flex justify-center items-center mt-20 bg-transparent">
          <div className="text-center text-gray-700 text-sm sm:text-base font-semibold flex items-center gap-2">
            <span className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"></span>
            Loading Users...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-transparent">
      <style>
        {`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fadeOutScale {
            from {
              opacity: 1;
              transform: scale(1);
            }
            to {
              opacity: 0;
              transform: scale(0.95);
            }
          }

          .modal-enter {
            animation: fadeInScale 0.3s ease-out forwards;
          }

          .modal-exit {
            animation: fadeOutScale 0.3s ease-in forwards;
          }
        `}
      </style>

      <div className="flex z-10 flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 rounded-xl shadow-inner shadow-gray-800/40 sticky top-0 bg-black/10 backdrop-blur-lg">
        <h2 className="font-semibold font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-0">
          Users
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-5 px-4 gap-3">
        {users.map((item) => (
          <div
            onClick={() => handleCardClick(item)}
            key={item.id}
            className="flex flex-col bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow duration-300 p-3 cursor-pointer shadow-xl"
          >
            <div className="relative overflow-hidden flex justify-center items-center rounded-xl">
              <div className="p-2 px-4 bg-gradient-to-r bg-gray-800 to-gray-600 rounded-full text-4xl font-semibold font-serif text-gray-50">
                {item?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>

            <div className="flex flex-col justify-between flex-grow font-medium mt-3">
              <div className="text-center">
                <p className="text-sm flex justify-center gap-2 items-center text-gray-800 uppercase font-serif font-medium">
                  {item.name}{" "}
                  {item.isEmailVerified ? <RiVerifiedBadgeFill /> : ""}
                </p>
                <p className="text-sm text-gray-500">{item.email}</p>
              </div>
            </div>

            <div className="flex justify-center item-center text-xs font-semibold mt-1">
              <p className="bg-purple-400 px-4 text-white rounded-2xl">
                {item.isSeller ? "SELLER" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50 modal-enter"
          role="dialog"
          aria-modal="true"
          aria-label="User Details Modal"
        >
          <div
            onAnimationEnd={(e) => {
              if (e.animationName === "fadeOutScale") {
                setSelectedUser(null);
              }
            }}
            className="bg-white rounded-xl border p-6 max-w-md w-full mx-4 relative"
          >
            <button
              className="absolute cursor-pointer top-2 right-2 font-bold text-gray-500 hover:text-gray-700"
              onClick={() => {
                const modal = document.querySelector(".modal-enter");
                if (modal) {
                  modal.classList.remove("modal-enter");
                  modal.classList.add("modal-exit");
                }
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
            <h3 className="text-xl font-serif font-semibold mb-4 text-gray-900">
              User Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Name:</span>
                <span>{selectedUser.name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Email:</span>
                <span>{selectedUser.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Phone:</span>
                <span>{selectedUser.phoneNumber || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Created At:</span>
                <span>
                  {selectedUser.createdAt
                    ? new Date(selectedUser.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Status:</span>
                <span>
                  {selectedUser.isEmailVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Role:</span>
                <span>{selectedUser.isSeller ? "Seller" : "User"}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                onClick={() => {
                  const modal = document.querySelector(".modal-enter");
                  if (modal) {
                    modal.classList.remove("modal-enter");
                    modal.classList.add("modal-exit");
                  }
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
