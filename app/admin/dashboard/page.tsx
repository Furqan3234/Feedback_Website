'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface Feedback {
  id: number;
  userEmail: string;
  schoolName: string;
  foodQualityRating: number;
  foodTasteRating: number;
  portionSizeRating: number;
  foodTemperatureRating: number;
  varietyRating: number;
  presentationRating: number;
  hygieneRating: number;
  favoriteItem: string | null;
  leastFavoriteItem: string | null;
  suggestions: string | null;
  createdAt: Date;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback');
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data.feedbacks);
      } else {
        alert('Failed to fetch feedbacks');
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const calculateAverageRating = (feedback: Feedback) => {
    const total = 
      feedback.foodQualityRating +
      feedback.foodTasteRating +
      feedback.portionSizeRating +
      feedback.foodTemperatureRating +
      feedback.varietyRating +
      feedback.presentationRating +
      feedback.hygieneRating;
    return (total / 7).toFixed(1);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 4) return 'bg-green-100';
    if (rating >= 3) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">School Meal Feedback Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading feedbacks...</div>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No feedback submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Total Feedbacks: {feedbacks.length}
              </h2>
            </div>

            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedFeedback(feedback)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{feedback.schoolName}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full ${getRatingBg(Number(calculateAverageRating(feedback)))}`}>
                      <span className={`text-lg font-bold ${getRatingColor(Number(calculateAverageRating(feedback)))}`}>
                        {calculateAverageRating(feedback)} / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Quality</p>
                      <p className="text-lg font-semibold">{feedback.foodQualityRating}/5</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Taste</p>
                      <p className="text-lg font-semibold">{feedback.foodTasteRating}/5</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Portion Size</p>
                      <p className="text-lg font-semibold">{feedback.portionSizeRating}/5</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Hygiene</p>
                      <p className="text-lg font-semibold">{feedback.hygieneRating}/5</p>
                    </div>
                  </div>

                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedFeedback && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedFeedback(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedFeedback.schoolName}</h2>
                  <p className="text-sm text-gray-500">
                    Submitted on {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ratings Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Food Quality', value: selectedFeedback.foodQualityRating },
                      { label: 'Food Taste', value: selectedFeedback.foodTasteRating },
                      { label: 'Portion Size', value: selectedFeedback.portionSizeRating },
                      { label: 'Food Temperature', value: selectedFeedback.foodTemperatureRating },
                      { label: 'Variety', value: selectedFeedback.varietyRating },
                      { label: 'Presentation', value: selectedFeedback.presentationRating },
                      { label: 'Hygiene', value: selectedFeedback.hygieneRating },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={star <= item.value ? 'text-yellow-400' : 'text-gray-300'}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-gray-600 font-semibold w-12 text-right">
                            {item.value}/5
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    {selectedFeedback.favoriteItem && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Favorite Item</p>
                        <p className="text-gray-800">{selectedFeedback.favoriteItem}</p>
                      </div>
                    )}
                    {selectedFeedback.leastFavoriteItem && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Least Favorite Item</p>
                        <p className="text-gray-800">{selectedFeedback.leastFavoriteItem}</p>
                      </div>
                    )}
                    {selectedFeedback.suggestions && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Suggestions & Improvements</p>
                        <p className="text-gray-800 whitespace-pre-wrap">{selectedFeedback.suggestions}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Submitted By</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedFeedback.userEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
