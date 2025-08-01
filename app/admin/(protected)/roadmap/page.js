'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

// A simpler card component without drag-and-drop handles
const FeatureCard = ({ feature, onEdit, onDelete }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-semibold text-gray-800">{feature.name}</p>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                    <button onClick={() => onEdit(feature)} className="text-gray-400 hover:text-blue-600"><PencilIcon className="h-4 w-4" /></button>
                    <button onClick={() => onDelete(feature.id)} className="text-gray-400 hover:text-red-600"><TrashIcon className="h-4 w-4" /></button>
                </div>
            </div>
        </div>
    );
};

// A simpler column component
const RoadmapColumn = ({ title, features, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
            <div className="space-y-4">
                {features.map(feature => (
                    <FeatureCard key={feature.id} feature={feature} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};

export default function AdminRoadmapPage() {
    const [features, setFeatures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFeature, setEditingFeature] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', status: 'future' });

    const fetchFeatures = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/roadmap');
            if (!res.ok) throw new Error("Failed to fetch roadmap features.");
            const data = await res.json();
            setFeatures(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    const handleOpenModal = (feature = null) => {
        setEditingFeature(feature);
        if (feature) {
            setFormData({ name: feature.name, description: feature.description, status: feature.status });
        } else {
            setFormData({ name: '', description: '', status: 'future' });
        }
        setIsModalOpen(true);
    };

    const handleSaveFeature = async () => {
        const url = editingFeature ? `/api/admin/roadmap/${editingFeature.id}` : '/api/admin/roadmap';
        const method = editingFeature ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        setIsModalOpen(false);
        fetchFeatures(); // Refresh the list after saving
    };

    const handleDeleteFeature = async (id) => {
        if (confirm('Are you sure you want to delete this feature?')) {
            await fetch(`/api/admin/roadmap/${id}`, { method: 'DELETE' });
            fetchFeatures(); // Refresh the list after deleting
        }
    };

    const columns = {
        future: features.filter(f => f.status === 'future'),
        in_progress: features.filter(f => f.status === 'in_progress'),
        completed: features.filter(f => f.status === 'completed'),
    };

    return (
        <div>
            <div className="sm:flex sm:items-center sm:justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Roadmap Management</h1>
                <button onClick={() => handleOpenModal()} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                    Add New Feature
                </button>
            </div>

            {isLoading ? <p>Loading roadmap...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RoadmapColumn title="Future Plans" features={columns.future} onEdit={handleOpenModal} onDelete={handleDeleteFeature} />
                    <RoadmapColumn title="In Progress" features={columns.in_progress} onEdit={handleOpenModal} onDelete={handleDeleteFeature} />
                    <RoadmapColumn title="Completed" features={columns.completed} onEdit={handleOpenModal} onDelete={handleDeleteFeature} />
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">{editingFeature ? 'Edit Feature' : 'Add New Feature'}</h3>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Feature Name</label>
                            <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select id="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                <option value="future">Future Plan</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="button" onClick={handleSaveFeature} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">Save Feature</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}