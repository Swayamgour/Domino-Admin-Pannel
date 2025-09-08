import React, { useState, useRef } from "react";
import { useUpdateProfileImageMutation } from "../redux/api";

const ProfileImageUpdate = ({ userData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const [updateImage, { isLoading }] = useUpdateProfileImageMutation();

    const handleEditClick = () => setIsModalOpen(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file); // ✅ Store actual File object
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result); // Preview ke liye Base64
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => fileInputRef.current.click();

    const handleSaveImage = async () => {
        try {
            if (!selectedImage) {
                alert("Please select an image first");
                return;
            }

            const formData = new FormData();
            formData.append("profileImage", selectedImage); // ✅ Send File, not Base64

            await updateImage(formData).unwrap();

            alert("Profile image updated successfully!");
        } catch (error) {
            console.error("Profile image update error:", error);
            alert(error?.data?.message || "Failed to upload image");
        } finally {
            handleCloseModal();
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedImage(null);
        alert("Profile image removed!");
        handleCloseModal();
    };

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 p-8">
                <div className="relative z-10 text-center">
                    <div className="mx-auto bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full w-32 h-32 flex items-center justify-center mb-4 relative">
                        <div className="bg-indigo-100 border-2 border-dashed border-indigo-300 rounded-full w-24 h-24 flex items-center justify-center overflow-hidden">
                            <img
                                src={
                                    userData?.profileImage ||
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                }
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                        <button
                            className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
                            onClick={handleEditClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-white">{userData?.name}</h2>
                    <p className="text-indigo-100 mt-1">{userData?.phone}</p>
                    <div className="mt-3">
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1 rounded-full">
                            {userData?.role.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Update Profile Picture
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Upload a new image or remove the current one
                            </p>

                            <div className="flex justify-center mb-6">
                                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-100">
                                    <img
                                        src={
                                            imagePreview ||
                                            userData?.profileImage ||
                                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                        }
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleUploadClick}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                    </svg>
                                    Upload New Image
                                </button>

                                <button
                                    onClick={handleRemoveImage}
                                    disabled={!userData?.profileImage}
                                    className={`${!userData?.profileImage
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-red-100 hover:bg-red-200 text-red-700"
                                        } font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    Remove Current Image
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-100 px-6 py-4 flex justify-end gap-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-5 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveImage}
                                disabled={!selectedImage || isLoading}
                                className={`${!selectedImage || isLoading
                                        ? "bg-indigo-300 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700"
                                    } text-white px-5 py-2 rounded-lg font-medium transition-colors`}
                            >
                                {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileImageUpdate;
