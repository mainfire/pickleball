import { useState, useEffect } from 'react';
import { MembershipCard } from '../components/MembershipCard';
import { BookingsList } from '../components/BookingsList';


export function DashboardPage() {
    const [membership, setMembership] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mock data for now as we build out the backend integration
                // In real app: const memData = await endpoints.memberships.me();

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                setMembership({
                    planName: 'Gold Annual',
                    status: 'ACTIVE',
                    renewalDate: '2024-11-28'
                });

                setBookings([
                    {
                        id: '1',
                        startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                        endTime: new Date(Date.now() + 90000000).toISOString(),
                        court: { name: 'Court 1' },
                        status: 'CONFIRMED'
                    },
                    {
                        id: '2',
                        startTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
                        endTime: new Date(Date.now() + 176400000).toISOString(),
                        court: { name: 'Court 3' },
                        status: 'CONFIRMED'
                    }
                ]);

            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-primary mb-8">My Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Membership & Quick Actions */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Membership</h2>
                            <MembershipCard
                                planName={membership?.planName}
                                status={membership?.status}
                                renewalDate={membership?.renewalDate}
                                loading={loading}
                            />
                        </section>

                        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
                                    Update Profile
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
                                    Manage Payment Methods
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
                                    View Billing History
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Bookings */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h2>
                                <button className="text-sm text-secondary-dark font-medium hover:text-secondary">
                                    View All
                                </button>
                            </div>
                            <BookingsList bookings={bookings} loading={loading} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
