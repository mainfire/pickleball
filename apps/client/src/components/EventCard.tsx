import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    type: 'LEAGUE' | 'TOURNAMENT' | 'SOCIAL' | 'CLINIC';
    price: number;
    spotsTotal: number;
    spotsTaken: number;
}

interface EventCardProps {
    event: Event;
    onRegister: (event: Event) => void;
}

export function EventCard({ event, onRegister }: EventCardProps) {
    const date = new Date(event.date);
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);

    const typeColors = {
        LEAGUE: 'bg-blue-100 text-blue-800',
        TOURNAMENT: 'bg-purple-100 text-purple-800',
        SOCIAL: 'bg-green-100 text-green-800',
        CLINIC: 'bg-orange-100 text-orange-800'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeColors[event.type]}`}>
                        {event.type}
                    </span>
                    <span className="text-lg font-bold text-primary">
                        ${event.price}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{event.description}</p>

                <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2.5 text-gray-400" />
                        {date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2.5 text-gray-400" />
                        {start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} - {end.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2.5 text-gray-400" />
                        Smashpoint Center
                    </div>
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2.5 text-gray-400" />
                        {event.spotsTotal - event.spotsTaken} spots left
                    </div>
                </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
                <button
                    onClick={() => onRegister(event)}
                    className="w-full py-2.5 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors"
                >
                    Register Now
                </button>
            </div>
        </div>
    );
}
