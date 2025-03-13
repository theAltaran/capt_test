const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Mock data for payment groups
const paymentGroups = [
    {
        id: 1,
        name: 'Utilities',
        selected: false,
        payments: [
            { id: 1, name: 'Electricity', amount: 120.50, selected: false },
            { id: 2, name: 'Water', amount: 75.25, selected: false },
            { id: 3, name: 'Internet', amount: 60.00, selected: false }
        ]
    },
    {
        id: 2,
        name: 'Subscriptions',
        selected: false,
        payments: [
            { id: 4, name: 'Netflix', amount: 15.99, selected: false },
            { id: 5, name: 'Spotify', amount: 9.99, selected: false },
            { id: 6, name: 'Cloud Storage', amount: 5.99, selected: false }
        ]
    },
    {
        id: 3,
        name: 'Loans',
        selected: false,
        payments: [
            { id: 7, name: 'Car Loan', amount: 350.00, selected: false },
            { id: 8, name: 'Student Loan', amount: 250.00, selected: false }
        ]
    }
];

// API endpoint to get payment groups
app.get('/api/payment-groups', (req, res) => {
    res.json(paymentGroups);
});

// API endpoint to toggle payment selection
app.post('/api/toggle-payment/:groupId/:paymentId', (req, res) => {
    const { groupId, paymentId } = req.params;
    
    const group = paymentGroups.find(g => g.id === parseInt(groupId));
    if (!group) {
        return res.status(404).json({ error: 'Group not found' });
    }

    const payment = group.payments.find(p => p.id === parseInt(paymentId));
    if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
    }

    payment.selected = !payment.selected;
    res.json(payment);
});

// Vercel serverless function export
module.exports = app;