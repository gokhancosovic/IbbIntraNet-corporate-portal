const API_URL = 'http://localhost:8080/api/tickets';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
};

export const ticketService = {
    // Kullanıcının kendi talebini açması
    createTicket: async (ticketData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(ticketData),
        });
        if (!response.ok) throw new Error('Talep oluşturulamadı');
        return response.json();
    },

    // Giriş yapan kullanıcının kendi talepleri
    getMyTickets: async () => {
        const response = await fetch(`${API_URL}/my-tickets`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Talepler yüklenemedi');
        return response.json();
    },

    // Sadece Admin: Tüm talepleri getir
    getAllTickets: async () => {
        const response = await fetch(API_URL, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Destek talepleri yüklenemedi');
        return response.json();
    },

    // Sadece Admin: Durum güncelle (PENDING, IN_PROGRESS, RESOLVED, REJECTED)
    updateStatus: async (id, status, adminNote = '') => {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status, adminNote }),
        });
        if (!response.ok) throw new Error('Durum güncellenemedi');
        return response.json();
    },
};