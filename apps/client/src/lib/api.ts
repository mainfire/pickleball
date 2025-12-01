const API_URL = import.meta.env.VITE_API_URL || '/api';

interface RequestOptions extends RequestInit {
    token?: string;
}

export async function api<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, ...init } = options;
    const headers = new Headers(init.headers);

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // Mock user email for now since we don't have full auth
    // In a real app, this would be handled by the token
    const mockEmail = localStorage.getItem('userEmail');
    if (mockEmail) {
        headers.set('x-user-email', mockEmail);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...init,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
}

export const endpoints = {
    courts: {
        list: () => api<any[]>('/courts'),
    },
    bookings: {
        list: (courtId: string, date: string) => api<any[]>(`/bookings?courtId=${courtId}&date=${date}`),
        create: (data: any) => api('/bookings', { method: 'POST', body: JSON.stringify(data) }),
    },
    memberships: {
        me: () => api('/memberships/me'),
    },
    staff: {
        schedule: (date: string) => api<any[]>(`/staff/schedule?date=${date}`, { headers: getAuthHeaders() }),
        checkIn: (bookingId: string) => api(`/staff/checkin/${bookingId}`, { method: 'POST', headers: getAuthHeaders() }),
        walkIn: (data: any) => api('/staff/walkin', { method: 'POST', body: JSON.stringify(data), headers: getAuthHeaders() }),
    },
    // Bookings
    getAvailability: async (date: string) => {
        const response = await fetch(`${API_URL}/bookings/availability?date=${date}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch availability');
        return response.json();
    },

    createBooking: async (data: any) => {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create booking');
        }
        return response.json();
    },
    pos: {
        getProducts: () => api<any[]>('/pos/products', { headers: getAuthHeaders() }),
        createOrder: (data: any) => api('/pos/orders', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: getAuthHeaders()
        }),
    }
};

// Helper
const getAuthHeaders = () => {
    // Mock Auth
    return {
        'x-user-email': 'member@example.com'
    };
};
