'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const ratingQuestions = [
  {
    id: 'foodQualityRating',
    question: 'How would you rate the overall food quality?',
    labels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    id: 'foodTasteRating',
    question: 'How would you rate the taste of the meals?',
    labels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    id: 'portionSizeRating',
    question: 'How satisfied are you with the portion sizes?',
    labels: ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
  },
  {
    id: 'foodTemperatureRating',
    question: 'How would you rate the temperature of the food served?',
    labels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    id: 'varietyRating',
    question: 'How would you rate the variety of meals offered?',
    labels: ['Very Limited', 'Limited', 'Adequate', 'Good', 'Excellent'],
  },
  {
    id: 'presentationRating',
    question: 'How would you rate the presentation of the food?',
    labels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    id: 'hygieneRating',
    question: 'How would you rate the hygiene standards?',
    labels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
  },
];

export default function FeedbackPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    foodQualityRating: 0,
    foodTasteRating: 0,
    portionSizeRating: 0,
    foodTemperatureRating: 0,
    varietyRating: 0,
    presentationRating: 0,
    hygieneRating: 0,
    favoriteItem: '',
    leastFavoriteItem: '',
    suggestions: '',
  });

  const handleRatingChange = (questionId: string, rating: number) => {
    setFormData((prev) => ({ ...prev, [questionId]: rating }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all ratings are selected
    const allRatingsSelected = ratingQuestions.every(
      (q) => {
        const value = formData[q.id as keyof typeof formData];
        return typeof value === 'number' && value > 0;
      }
    );
    
    if (!allRatingsSelected) {
      alert('Please provide ratings for all questions');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setFormData({
            schoolName: '',
            foodQualityRating: 0,
            foodTasteRating: 0,
            portionSizeRating: 0,
            foodTemperatureRating: 0,
            varietyRating: 0,
            presentationRating: 0,
            hygieneRating: 0,
            favoriteItem: '',
            leastFavoriteItem: '',
            suggestions: '',
          });
          setSuccess(false);
        }, 3000);
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">School Meal Feedback Form</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
            Thank you! Your feedback has been submitted successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="form-group">
            <label htmlFor="schoolName">
              School Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleInputChange}
              required
              placeholder="Enter your school name"
            />
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Rate Your Experience</h2>
            <p className="text-sm text-gray-600 mb-6">Please rate the following aspects (1 = worst, 5 = best)</p>

            {ratingQuestions.map((item, index) => (
              <div key={item.id} className="mb-6 pb-6 border-b last:border-b-0">
                <p className="font-medium text-gray-700 mb-3">
                  {index + 1}. {item.question} <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4, 5].map((rating) => {
                    const isSelected = formData[item.id as keyof typeof formData] === rating;
                    
                    // Define colors based on rating (1=red, 2=orange, 3=yellow, 4=light green, 5=green)
                    const ratingColors = {
                      1: {
                        bg: 'bg-gradient-to-br from-red-500 to-red-600',
                        border: 'border-red-600',
                        ring: 'ring-red-300',
                        hover: 'hover:border-red-500 hover:bg-red-50',
                      },
                      2: {
                        bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
                        border: 'border-orange-600',
                        ring: 'ring-orange-300',
                        hover: 'hover:border-orange-500 hover:bg-orange-50',
                      },
                      3: {
                        bg: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
                        border: 'border-yellow-600',
                        ring: 'ring-yellow-300',
                        hover: 'hover:border-yellow-500 hover:bg-yellow-50',
                      },
                      4: {
                        bg: 'bg-gradient-to-br from-lime-500 to-lime-600',
                        border: 'border-lime-600',
                        ring: 'ring-lime-300',
                        hover: 'hover:border-lime-500 hover:bg-lime-50',
                      },
                      5: {
                        bg: 'bg-gradient-to-br from-green-500 to-green-600',
                        border: 'border-green-600',
                        ring: 'ring-green-300',
                        hover: 'hover:border-green-500 hover:bg-green-50',
                      },
                    };

                    const colors = ratingColors[rating as keyof typeof ratingColors];

                    return (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingChange(item.id, rating)}
                        className={`rating-button flex-1 min-w-[85px] px-4 py-4 rounded-lg border-2 font-medium transition-all ${
                          isSelected
                            ? `selected ${colors.border} ${colors.bg} text-white shadow-xl ring-4 ${colors.ring}`
                            : `border-gray-300 bg-white ${colors.hover} text-gray-800 shadow-sm hover:shadow-md`
                        }`}
                        style={{
                          transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                        }}
                      >
                        <div className={`font-extrabold text-2xl mb-1 ${isSelected ? 'drop-shadow-sm' : ''}`}>
                          {rating}
                        </div>
                        <div className={`text-xs leading-tight font-semibold ${
                          isSelected ? 'text-white drop-shadow-sm' : 'text-gray-600'
                        }`}>
                          {item.labels[rating - 1]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>

            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="favoriteItem">
                  What is your favorite meal item?
                </label>
                <input
                  type="text"
                  id="favoriteItem"
                  name="favoriteItem"
                  value={formData.favoriteItem}
                  onChange={handleInputChange}
                  placeholder="e.g., Spaghetti, Chicken sandwich"
                />
              </div>

              <div className="form-group">
                <label htmlFor="leastFavoriteItem">
                  What is your least favorite meal item?
                </label>
                <input
                  type="text"
                  id="leastFavoriteItem"
                  name="leastFavoriteItem"
                  value={formData.leastFavoriteItem}
                  onChange={handleInputChange}
                  placeholder="e.g., Vegetable soup"
                />
              </div>

              <div className="form-group">
                <label htmlFor="suggestions">
                  Any suggestions or improvements?
                </label>
                <textarea
                  id="suggestions"
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Please share any suggestions, comments, or areas for improvement..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-lg py-3"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
