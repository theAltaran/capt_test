document.addEventListener('DOMContentLoaded', () => {
    const paymentGroupsList = document.getElementById('paymentGroupsList');
    const paymentsDetails = document.getElementById('paymentsDetails');
    const generateButton = document.getElementById('generateButton');

    // Hardcoded payment groups
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

    let currentGroupId = null;

    // Display payment groups
    function displayPaymentGroups() {
        paymentGroupsList.innerHTML = paymentGroups.map(group => `
            <div class="group-item" data-group-id="${group.id}">
                <span>${group.name}</span>
                <input 
                    type="checkbox" 
                    class="group-checkbox" 
                    ${group.selected ? 'checked' : ''}
                >
            </div>
        `).join('');

        // Add click event listeners to group items
        document.querySelectorAll('.group-item').forEach(groupItem => {
            groupItem.addEventListener('click', () => {
                // Remove active class from all groups
                document.querySelectorAll('.group-item').forEach(item => 
                    item.classList.remove('active')
                );
                
                // Add active class to clicked group
                groupItem.classList.add('active');
                
                // Display payments for this group
                const groupId = parseInt(groupItem.dataset.groupId);
                const selectedGroup = paymentGroups.find(g => g.id === groupId);
                displayPayments(selectedGroup);
                currentGroupId = groupId;
            });

            // Add event listener to group checkbox
            const groupCheckbox = groupItem.querySelector('.group-checkbox');
            groupCheckbox.addEventListener('change', (event) => {
                const groupId = parseInt(groupItem.dataset.groupId);
                const group = paymentGroups.find(g => g.id === groupId);
                
                // Toggle selection for all payments in the group
                group.payments.forEach(payment => {
                    payment.selected = event.target.checked;
                });

                // If this group is currently displayed, update the view
                if (currentGroupId === groupId) {
                    displayPayments(group);
                }
            });
        });

        // Select first group by default
        if (paymentGroups.length > 0) {
            const firstGroupItem = document.querySelector('.group-item');
            firstGroupItem.classList.add('active');
            currentGroupId = parseInt(firstGroupItem.dataset.groupId);
            displayPayments(paymentGroups[0]);
        }
    }

    // Display payments for a selected group
    function displayPayments(group) {
        if (!group) return;

        paymentsDetails.innerHTML = `
            <h2>${group.name} Payments</h2>
            ${group.payments.map(payment => `
                <div class="payment-item ${payment.selected ? 'selected' : ''}" data-payment-id="${payment.id}">
                    <span>${payment.name} - $${payment.amount.toFixed(2)}</span>
                    <input 
                        type="checkbox" 
                        class="payment-checkbox" 
                        ${payment.selected ? 'checked' : ''}
                    >
                </div>
            `).join('')}
        `;

        // Add event listeners to checkboxes
        document.querySelectorAll('.payment-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const paymentItem = event.target.closest('.payment-item');
                const paymentId = parseInt(paymentItem.dataset.paymentId);
                const group = paymentGroups.find(g => g.id === currentGroupId);
                const payment = group.payments.find(p => p.id === paymentId);
                
                // Toggle payment selection
                payment.selected = event.target.checked;
                
                // Update UI
                paymentItem.classList.toggle('selected', payment.selected);
            });
        });
    }

    // Generate button event listener
    generateButton.addEventListener('click', () => {
        // Collect all selected payments
        const selectedPayments = paymentGroups.flatMap(group => 
            group.payments.filter(payment => payment.selected)
        );

        if (selectedPayments.length === 0) {
            alert('No payments selected. Please select at least one payment.');
            return;
        }

        // Calculate total amount
        const totalAmount = selectedPayments.reduce((sum, payment) => sum + payment.amount, 0);

        // Create a detailed summary
        const summary = `
Selected Payments Summary:
-------------------------
${selectedPayments.map(p => `${p.name}: $${p.amount.toFixed(2)}`).join('\n')}
-------------------------
Total Amount: $${totalAmount.toFixed(2)}
        `;

        // Display summary in a more user-friendly way
        alert(summary);
    });

    // Initial display of payment groups
    displayPaymentGroups();
});