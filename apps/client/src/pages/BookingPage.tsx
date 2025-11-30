import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { CourtGrid } from '../components/CourtGrid';
import { BookingModal } from '../components/BookingModal';
import { endpoints } from '../lib/api';

export function BookingPage() {
    const [courts, setCourts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCourt, setSelectedCourt] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [courtsData, availabilityData] = await Promise.all([
                    endpoints.courts.list(),
                    endpoints.getAvailability(selectedDate.toISOString().split('T')[0])
                ]);

                // Merge availability into courts
                const courtsWithAvailability = courtsData.map((court: any) => {
                    const courtSlots = availabilityData.filter((slot: any) =>
                        slot.availableCourtIds.includes(court.id)
                    );
                    return { ...court, availableSlots: courtSlots };
                });

                setCourts(courtsWithAvailability);
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedDate]);

    const handleBook = (court: any) => {
        setSelectedCourt(court);
        // If a slot is selected, we could pass it to the modal
        // For now, just open the modal
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        // Refresh availability if we were showing it
        // For now just close
        console.log('Booking successful');
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Filters */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-2xl font-bold text-primary">Book a Court</h1>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-secondary focus:border-secondary sm:text-sm"
                                    value={selectedDate.toISOString().split('T')[0]}
                                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                />
                            </div>
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CourtGrid
                    courts={courts}
                    loading={loading}
                    onBook={handleBook}
                />
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                court={selectedCourt}
                selectedDate={selectedDate}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
