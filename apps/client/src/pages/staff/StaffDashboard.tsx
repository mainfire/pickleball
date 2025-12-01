import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Clock, Plus } from 'lucide-react';
import { WalkInModal } from '../../components/staff/WalkInModal';
import { endpoints } from '../../lib/api';

export function StaffDashboard() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isWalkInOpen, setIsWalkInOpen] = useState(false);

    const fetchSchedule = useCallback(async () => {
        try {
            const data = await endpoints.staff.schedule(selectedDate);
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch schedule', error);
        }
    }, [selectedDate]);

    useEffect(() => {
        // eslint-disable-next-line
        fetchSchedule();
    }, [fetchSchedule]);

    const handleCheckIn = async (bookingId: string) => {
        try {
            await endpoints.staff.checkIn(bookingId);
            // Refresh
            fetchSchedule();
        } catch (error) {
            console.error('Check-in failed', error);
        }
    };

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Daily Schedule
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                    <button
                        onClick={() => setIsWalkInOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        New Walk-in
                    </button>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <WalkInModal
                isOpen={isWalkInOpen}
                onClose={() => setIsWalkInOpen(false)}
                onSuccess={fetchSchedule}
            />

            {/* Timeline / List View */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {bookings.length === 0 ? (
                        <li className="px-4 py-12 text-center text-gray-500">
                            No bookings for this date.
                        </li>
                    ) : (
                        bookings.map((booking) => (
                            <li key={booking.id}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {booking.court.name.replace('Court ', '')}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-primary truncate">
                                                    {booking.user.name || booking.user.email}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                    {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                                    {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {booking.notes?.includes('Checked in') ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                    Checked In
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleCheckIn(booking.id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                                >
                                                    Check In
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
