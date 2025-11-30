import { Calendar, Clock, MapPin } from 'lucide-react';

interface Booking {
    id: string;
    startTime: string;
    endTime: string;
    court: {
        name: string;
    };
    status: string;
}

interface BookingsListProps {
    bookings: Booking[];
    loading?: boolean;
}

export function BookingsList({ bookings, loading }: BookingsListProps) {
    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-4 animate-pulse h-24 border border-gray-100"></div>
                ))}
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No upcoming bookings</h3>
                <p className="text-gray-500 text-sm mt-1">Ready to play? Book a court now.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking) => {
                const start = new Date(booking.startTime);
                const end = new Date(booking.endTime);

                return (
                    <div key={booking.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-16 text-center bg-primary/5 rounded-lg p-2">
                                <div className="text-xs font-bold text-primary uppercase">{start.toLocaleDateString(undefined, { month: 'short' })}</div>
                                <div className="text-xl font-bold text-gray-900">{start.getDate()}</div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">{booking.court.name}</h4>
                                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-2 sm:gap-4">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1.5" />
                                        {start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} - {end.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1.5" />
                                        Smashpoint Center
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                {booking.status}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
