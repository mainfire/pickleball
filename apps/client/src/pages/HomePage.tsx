import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Users, Calendar } from 'lucide-react';

export function HomePage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-primary-dark text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1626224583764-84786c71971e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Elevate Your Game at <span className="text-secondary">Smashpoint</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        The premier indoor pickleball facility. Professional courts, vibrant community, and unmatched amenities.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/book" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-primary bg-secondary hover:bg-secondary-light transition-colors">
                            Book a Court
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link to="/membership" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-full text-white hover:bg-white hover:text-primary transition-colors">
                            View Memberships
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Why Smashpoint?</h2>
                        <p className="text-text-muted text-lg">Experience pickleball like never before.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Trophy className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Pro-Grade Courts</h3>
                            <p className="text-text-muted">8 climate-controlled indoor courts with professional surfacing and lighting.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                                <Users className="h-6 w-6 text-secondary-dark" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Vibrant Community</h3>
                            <p className="text-text-muted">Leagues, tournaments, and social events for players of all skill levels.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                                <Calendar className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Easy Booking</h3>
                            <p className="text-text-muted">Seamless online booking system. Reserve your spot in seconds.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Membership Plans */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Choose Your Level</h2>
                        <p className="text-text-muted text-lg">Flexible plans designed for every type of player.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Platinum */}
                        <div className="bg-white rounded-2xl shadow-sm border-2 border-secondary overflow-hidden relative flex flex-col">
                            <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-bl-lg">BEST VALUE</div>
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold text-primary mb-2">Platinum</h3>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900">$130</span>
                                    <span className="text-gray-500">/mo</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-6">+$150 initiation fee</p>

                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-secondary mr-2 mt-0.5" />
                                        <span>14-Day Booking Window</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-secondary mr-2 mt-0.5" />
                                        <span>20% Off Court Rentals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-secondary mr-2 mt-0.5" />
                                        <span>Unlimited Open Play</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-secondary mr-2 mt-0.5" />
                                        <span>4 Guest Passes / mo</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 pt-0 mt-auto">
                                <Link to="/signup?plan=platinum" className="block w-full py-2.5 px-4 bg-primary text-white text-center font-bold rounded-lg hover:bg-primary-light transition-colors">
                                    Select Platinum
                                </Link>
                            </div>
                        </div>

                        {/* Gold */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold text-primary mb-2">Gold</h3>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900">$80</span>
                                    <span className="text-gray-500">/mo</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-6">+$100 initiation fee</p>

                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-primary/40 mr-2 mt-0.5" />
                                        <span>10-Day Booking Window</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-primary/40 mr-2 mt-0.5" />
                                        <span>10% Off Court Rentals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-primary/40 mr-2 mt-0.5" />
                                        <span>10 Free Open Play Sessions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-primary/40 mr-2 mt-0.5" />
                                        <span>2 Guest Passes / mo</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 pt-0 mt-auto">
                                <Link to="/signup?plan=gold" className="block w-full py-2.5 px-4 bg-white border-2 border-primary text-primary text-center font-bold rounded-lg hover:bg-gray-50 transition-colors">
                                    Select Gold
                                </Link>
                            </div>
                        </div>

                        {/* Silver */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold text-primary mb-2">Silver</h3>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900">$40</span>
                                    <span className="text-gray-500">/mo</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-6">+$50 initiation fee</p>

                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-gray-300 mr-2 mt-0.5" />
                                        <span>7-Day Booking Window</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-gray-300 mr-2 mt-0.5" />
                                        <span>Standard Court Rates</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-gray-300 mr-2 mt-0.5" />
                                        <span>4 Free Open Play Sessions</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 pt-0 mt-auto">
                                <Link to="/signup?plan=silver" className="block w-full py-2.5 px-4 bg-white border-2 border-primary text-primary text-center font-bold rounded-lg hover:bg-gray-50 transition-colors">
                                    Select Silver
                                </Link>
                            </div>
                        </div>

                        {/* Bronze */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold text-primary mb-2">Bronze</h3>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900">Free</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-6">Pay as you go</p>

                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-gray-300 mr-2 mt-0.5" />
                                        <span>5-Day Booking Window</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-gray-300 mr-2 mt-0.5" />
                                        <span>Standard Rates</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Trophy className="h-4 w-4 text-gray-300 mr-2 mt-0.5" />
                                        <span>Full Price Open Play</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 pt-0 mt-auto">
                                <Link to="/signup?plan=bronze" className="block w-full py-2.5 px-4 bg-white border-2 border-gray-200 text-gray-600 text-center font-bold rounded-lg hover:bg-gray-50 transition-colors">
                                    Join for Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
