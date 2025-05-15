import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function MemeDetailPage() {
  const { memeId } = useParams();
  const { user } = useAuth();

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <h1 className="mb-4">Meme Details</h1>
      <div className="alert alert-info">
        Meme detail page for ID: {memeId}. This page will be implemented later.
      </div>
    </div>
  );
}

export default MemeDetailPage; 