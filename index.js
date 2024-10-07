document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const userTableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    // Load saved users from localStorage
    loadUsers();

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Validate age
        if (!isValidAge(dob)) {
            alert('You must be between 18 and 55 years old.');
            return;
        }

        // Save user data to localStorage
        saveUser({ name, email, password, dob, termsAccepted });

        // Clear form inputs
        form.reset();

        // Load users into the table
        loadUsers();
    });

    function isValidAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        return age >= 18 && age <= 55 && (monthDifference > 0 || (monthDifference === 0 && today.getDate() >= birthDate.getDate()));
    }

    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUsers() {
        userTableBody.innerHTML = ''; // Clear existing table data
        const users = JSON.parse(localStorage.getItem('users')) || [];

        users.forEach(user => {
            const row = userTableBody.insertRow();
            row.insertCell(0).textContent = user.name;
            row.insertCell(1).textContent = user.email;
            row.insertCell(2).textContent = user.password; // In a real application, avoid displaying passwords
            row.insertCell(3).textContent = user.dob;
            row.insertCell(4).textContent = user.termsAccepted ? 'true' : 'false';
        });
    }
});
