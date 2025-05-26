import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Plus, ArrowLeft, Save, Trash2, Edit2 } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useApp } from '../context/AppContext';

const CropManagementPage = () => {
  const { crops, addCrop, updateCrop, deleteCrop } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCropId, setEditingCropId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    quantity: '',
    expectedHarvestDate: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cropData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      id: editingCropId || Date.now().toString()
    };

    if (editingCropId) {
      updateCrop(editingCropId, cropData);
    } else {
      addCrop(cropData);
    }

    setShowAddForm(false);
    setEditingCropId(null);
    setFormData({
      name: '',
      variety: '',
      quantity: '',
      expectedHarvestDate: '',
      description: ''
    });
  };

  const handleDelete = (cropId: string) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      deleteCrop(cropId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crop Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Add, edit, and manage your farm's crops
            </p>
          </div>
          <button
            onClick={() => {
              setEditingCropId(null);
              setFormData({
                name: '',
                variety: '',
                quantity: '',
                expectedHarvestDate: '',
                description: ''
              });
              setShowAddForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Crop
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white shadow sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {editingCropId ? 'Edit Crop' : 'Add New Crop'}
            </h3>
            <form onSubmit={handleSubmit} className="mt-5 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Crop Name
                  </label>
                  <select
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select a crop</option>
                    <option value="Tomatoes">Tomatoes</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Maize">Maize</option>
                    <option value="Beans">Beans</option>
                    <option value="Potatoes">Potatoes</option>
                    <option value="Green Grams">Green Grams</option>
                    <option value="Rice">Rice</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="variety" className="block text-sm font-medium text-gray-700">
                    Variety
                  </label>
                  <input
                    type="text"
                    id="variety"
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">
                    Expected Harvest Date
                  </label>
                  <input
                    type="date"
                    id="harvestDate"
                    value={formData.expectedHarvestDate}
                    onChange={(e) => setFormData({ ...formData, expectedHarvestDate: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingCropId ? 'Update Crop' : 'Add Crop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Crops</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="relative bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{crop.name}</h4>
                    <p className="text-sm text-gray-500">{crop.variety}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingCropId(crop.id);
                        setFormData({
                          name: crop.name,
                          variety: crop.variety,
                          quantity: crop.quantity.toString(),
                          expectedHarvestDate: crop.expectedHarvestDate || '',
                          description: crop.description || ''
                        });
                        setShowAddForm(true);
                      }}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(crop.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  <p>Quantity: {crop.quantity}</p>
                  {crop.expectedHarvestDate && (
                    <p className="flex items-center mt-1">
                      <CalendarClock className="w-4 h-4 mr-1" />
                      Harvest in {formatDistanceToNow(parseISO(crop.expectedHarvestDate))}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropManagementPage; 