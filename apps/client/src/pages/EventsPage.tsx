import { useState, useEffect } from 'react';
import { EventCard } from '../components/EventCard';

export function EventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        // Mock data
        const mockEvents = [
            {
                id: '1',
                title: 'Spring Ladder League',
                description: 'Competitive ladder league for 3.5+ players. 8 weeks of play with playoffs.',
                date: '2024-04-01',
                startTime: '2024-04-01T18:00:00',
                endTime: '2024-04-01T20:00:00',
                type: 'LEAGUE',
                price: 120,
                spotsTotal: 32,
                spotsTaken: 24
            },
            {
                id: '2',
                title: 'Beginner Clinic',
                description: 'Learn the basics of pickleball with our pro instructors. Paddles provided.',
                date: '2024-03-15',
                startTime: '2024-03-15T10:00:00',
                endTime: '2024-03-15T11:30:00',
                type: 'CLINIC',
                price: 25,
                spotsTotal: 12,
                spotsTaken: 8
            },
            {
                id: '3',
                title: 'Friday Night Social',
                description: 'Open play social mixer. Music, snacks, and great games. All levels welcome.',
                date: '2024-03-10',
                startTime: '2024-03-10T19:00:00',
                endTime: '2024-03-10T22:00:00',
                type: 'SOCIAL',
                price: 15,
                spotsTotal: 40,
                spotsTaken: 15
            },
            {
                id: '4',
                title: 'Smashpoint Open Tournament',
                description: 'Annual tournament with Men\'s, Women\'s, and Mixed Doubles divisions.',
                date: '2024-05-20',
                startTime: '2024-05-20T08:00:00',
                endTime: '2024-05-20T18:00:00',
                type: 'TOURNAMENT',
                price: 60,
                spotsTotal: 100,
                spotsTaken: 45
            }
        ];

        setTimeout(() => {
            setEvents(mockEvents);
            setLoading(false);
        }, 500);
    }, []);

    const filteredEvents = filter === 'ALL'
        ? events
        : events.filter(e => e.type === filter);

    const handleRegister = (event: any) => {
        console.log('Registering for', event.title);
        alert(`Registration for ${event.title} coming soon!`);
    };

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Events & Leagues</h1>
                        <p className="text-gray-600 mt-2">Join the community, improve your game, and compete.</p>
                    </div>

                    <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                        {['ALL', 'LEAGUE', 'TOURNAMENT', 'SOCIAL', 'CLINIC'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filter === type
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {type === 'ALL' ? 'All Events' : type.charAt(0) + type.slice(1).toLowerCase() + 's'}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onRegister={handleRegister}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
