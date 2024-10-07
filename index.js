document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const userTable = document.getElementById('user-table');

    // Load saved users from localStorage and populate the table
    loadUsers();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptedTerms = document.getElementById('terms').checked;

        // Validate email
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate age
        if (!isAgeValid(dob)) {
            alert("You must be between 18 and 55 years old.");
            return;
        }

        const user = {
            name,
            email,
            password,
            dob,
            acceptedTerms
        };

        // Save user to localStorage
        saveUser(user);
        addUserToTable(user);
        form.reset(); // Clear form fields
    });
    
    function validateEmail(email) {
        // Regular expression for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function isAgeValid(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        return (age > 18 && age < 55) || (age === 18 && monthDifference >= 0) || (age === 55 && monthDifference <= 0);
    }

    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(addUserToTable);
    }

    function addUserToTable(user) {
        const row = userTable.insertRow();
        row.insertCell(0).innerText = user.name;
        row.insertCell(1).innerText = user.email;
        row.insertCell(2).innerText = user.password;
        row.insertCell(3).innerText = user.dob;
        row.insertCell(4).innerText = user.acceptedTerms ? 'true' : 'false';
    }
});
