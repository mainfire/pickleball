import { useState } from 'react';
import { X } from 'lucide-react';

interface WalkInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function WalkInModal({ isOpen, onClose, onSuccess }: WalkInModalProps) {
    const [loading, setLoading] = useState(false);
    const [courtId, setCourtId] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [duration, setDuration] = useState('60');
    const [userId, setUserId] = useState(''); // In real app, this would be a user search

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Construct dates
            const start = new Date();
            const [hours, minutes] = startTime.split(':').map(Number);
            start.setHours(hours, minutes, 0, 0);
            const end = new Date(start.getTime() + parseInt(duration) * 60000);

            await fetch('http://localhost:3001/api/staff/walkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-email': 'admin@smashpoint.com'
                },
                body: JSON.stringify({
                    userId: userId || 'guest-id', // Placeholder
                    courtId,
                    startTime: start.toISOString(),
                    endTime: end.toISOString(),
                    notes: 'Walk-in Booking'
                })
            });

            onSuccess();
            onClose();
        } catch (error) {
            console.error('Walk-in failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">New Walk-in Booking</h3>
                    <button onClick={onClose}><X className="h-5 w-5" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Court ID (UUID)</label>
                        <input
                            type="text"
                            value={courtId}
                            onChange={e => setCourtId(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter Court ID"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">User ID (UUID)</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter User ID (Optional)"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Duration (min)</label>
                            <select
                                value={duration}
                                onChange={e => setDuration(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                <option value="30">30</option>
                                <option value="60">60</option>
                                <option value="90">90</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        {loading ? 'Creating...' : 'Create Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
}
