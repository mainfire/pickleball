import { Trophy, Users } from 'lucide-react';

interface Court {
    id: string;
    name: string;
    type: string;
    surface?: string;
    availableSlots?: any[];
}

interface CourtGridProps {
    courts: Court[];
    onBook: (court: Court) => void;
    loading?: boolean;
}

export function CourtGrid({ courts, onBook, loading }: CourtGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl h-64 animate-pulse shadow-sm border border-gray-100"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courts.map((court) => (
                <div key={court.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col">
                    <div className="h-32 bg-primary/5 relative flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Trophy className="h-10 w-10 text-primary/40 group-hover:text-primary/60 transition-colors" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-primary border border-primary/10">
                            {court.type}
                        </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{court.name}</h3>
                        <div className="flex items-center text-sm text-text-muted mb-4">
                            <Users className="h-4 w-4 mr-1.5" />
                            <span>{court.surface || 'Pro Surface'}</span>
                        </div>

                        {/* Availability Slots */}
                        <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Available Times</h4>
                            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                                {court.availableSlots && court.availableSlots.length > 0 ? (
                                    court.availableSlots.slice(0, 6).map((slot: any, idx: number) => (
                                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-400 italic">No slots available</span>
                                )}
                                {court.availableSlots && court.availableSlots.length > 6 && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        +{court.availableSlots.length - 6} more
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <button
                                onClick={() => onBook(court)}
                                className="w-full py-2.5 px-4 bg-white border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-sm"
                            >
                                Book Court
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
