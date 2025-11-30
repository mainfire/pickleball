import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-primary text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="font-bold text-xl tracking-tight text-secondary">SMASHPOINT</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="hover:bg-primary-light px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                <Link to="/book" className="hover:bg-primary-light px-3 py-2 rounded-md text-sm font-medium">Book Court</Link>
                                <Link to="/events" className="hover:bg-primary-light px-3 py-2 rounded-md text-sm font-medium">Events</Link>
                                <Link to="/membership" className="hover:bg-primary-light px-3 py-2 rounded-md text-sm font-medium">Membership</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            <Link to="/signup" className="bg-secondary text-primary hover:bg-secondary-light px-4 py-2 rounded-md text-sm font-bold ml-2">Join Now</Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-primary-light inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-primary-dark focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/" className="hover:bg-primary-light block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                    <Link to="/book" className="hover:bg-primary-light block px-3 py-2 rounded-md text-base font-medium">Book Court</Link>
                    <Link to="/events" className="hover:bg-primary-light block px-3 py-2 rounded-md text-base font-medium">Events</Link>
                    <Link to="/membership" className="hover:bg-primary-light block px-3 py-2 rounded-md text-base font-medium">Membership</Link>
                    <div className="border-t border-primary-light pt-4 mt-4">
                        <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white">Login</Link>
                        <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-white">Join Now</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
