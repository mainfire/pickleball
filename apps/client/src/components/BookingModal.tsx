import { useState } from 'react';
import { X, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { endpoints } from '../lib/api';
import { cn } from '../lib/utils';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    court: { id: string; name: string } | null;
    selectedDate: Date;
    onSuccess: () => void;
}

export function BookingModal({ isOpen, onClose, court, selectedDate, onSuccess }: BookingModalProps) {
    const [startTime, setStartTime] = useState('09:00');
    const [duration, setDuration] = useState('60'); // minutes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !court) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Construct Date objects
            const [hours, minutes] = startTime.split(':').map(Number);
            const start = new Date(selectedDate);
            start.setHours(hours, minutes, 0, 0);

            const end = new Date(start.getTime() + parseInt(duration) * 60000);

            await endpoints.createBooking({
                courtId: court.id,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                notes: 'Booked via Web'
            });

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to book court');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-primary text-white">
                    <h3 className="text-lg font-bold">Book {court.name}</h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <div className="flex items-center text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                {selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                    <select
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="pl-9 block w-full rounded-lg border-gray-300 bg-white border shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm py-2"
                                    >
                                        {Array.from({ length: 14 }, (_, i) => i + 8).map(hour => (
                                            <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                                {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 bg-white border shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm py-2 px-3"
                                >
                                    <option value="60">1 Hour</option>
                                    <option value="90">1.5 Hours</option>
                                    <option value="120">2 Hours</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-primary bg-secondary hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {loading ? 'Confirming...' : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
