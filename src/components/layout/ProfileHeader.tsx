import React from 'react';
import { useNotifications } from '../../context/NotificationsContext';

const ProfileHeader = ({ user }) => {
  const { showNotification } = useNotifications();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simuler un upload
      setTimeout(() => {
        showNotification('Photo de profil mise à jour avec succès', 'success');
      }, 1000);
    }
  };

  return (
    <div className="relative group">
      <input
        type="file"
        id="profilePicture"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <label
        htmlFor="profilePicture"
        className="absolute bottom-0 right-0 p-2 bg-orange-500 rounded-full 
                 shadow-lg group-hover:bg-orange-600 transition-colors cursor-pointer"
      >
        <Camera className="w-4 h-4 text-white" />
      </label>
    </div>
  );
};
