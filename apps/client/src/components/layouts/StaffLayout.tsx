import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, Users, DollarSign, Settings, LogOut, BarChart2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function StaffLayout() {
    const location = useLocation();

    const navigation = [
        { name: 'Schedule', href: '/staff', icon: Calendar },
        { name: 'Members', href: '/staff/members', icon: Users },
        { name: 'POS', href: '/staff/pos', icon: DollarSign },
        { name: 'Analytics', href: '/staff/analytics', icon: BarChart2 },
        { name: 'Settings', href: '/staff/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 bg-gray-900">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4 mb-5">
                                <span className="text-xl font-bold text-white">Smashpoint Staff</span>
                            </div>
                            <nav className="mt-5 flex-1 px-2 space-y-1">
                                {navigation.map((item) => {
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={cn(
                                                isActive
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                            )}
                                        >
                                            <item.icon
                                                className={cn(
                                                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300',
                                                    'mr-3 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex bg-gray-800 p-4">
                            <Link to="/" className="flex-shrink-0 w-full group block">
                                <div className="flex items-center">
                                    <div>
                                        <LogOut className="inline-block h-9 w-9 rounded-full text-gray-400 p-1 border border-gray-600" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-white">Exit Console</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
