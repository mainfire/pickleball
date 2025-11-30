export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-secondary mb-4">SMASHPOINT</h3>
                        <p className="text-gray-400 text-sm">
                            The premier indoor pickleball facility. Play, train, and compete in style.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/book" className="hover:text-secondary">Book a Court</a></li>
                            <li><a href="/events" className="hover:text-secondary">Events</a></li>
                            <li><a href="/membership" className="hover:text-secondary">Membership</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <p className="text-gray-400 text-sm">
                            123 Pickleball Lane<br />
                            Sportsville, ST 12345<br />
                            (555) 123-4567<br />
                            hello@smashpoint.com
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Smashpoint Pickleball. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
