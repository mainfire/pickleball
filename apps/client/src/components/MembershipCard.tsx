import { Check, Crown } from 'lucide-react';


interface MembershipCardProps {
    planName?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    renewalDate?: string;
    loading?: boolean;
}

export function MembershipCard({ planName, status, renewalDate, loading }: MembershipCardProps) {
    if (loading) {
        return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-48 animate-pulse"></div>;
    }

    const isActive = status === 'ACTIVE';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Crown className="h-24 w-24 text-secondary-dark" />
            </div>

            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Current Plan</h3>
                        <h2 className="text-2xl font-bold text-primary mt-1">{planName || 'No Active Membership'}</h2>
                    </div>
                    {isActive && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            Active
                        </span>
                    )}
                </div>

                {isActive ? (
                    <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium mr-2">Renews:</span>
                            {renewalDate ? new Date(renewalDate).toLocaleDateString() : 'N/A'}
                        </div>
                        <button className="text-sm text-secondary-dark font-medium hover:text-secondary transition-colors">
                            Manage Subscription
                        </button>
                    </div>
                ) : (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-4">Upgrade to a membership plan to unlock exclusive benefits.</p>
                        <button className="w-full py-2 px-4 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-light transition-colors text-sm">
                            View Plans
                        </button>
                    </div>
                )}
            </div>

            {isActive && (
                <div className="bg-primary/5 px-6 py-3 border-t border-gray-100">
                    <p className="text-xs text-primary font-medium flex items-center">
                        <Crown className="h-3 w-3 mr-1.5" />
                        Gold Member Benefits Active
                    </p>
                </div>
            )}
        </div>
    );
}
