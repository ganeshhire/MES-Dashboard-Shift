document.addEventListener('DOMContentLoaded', () => {
    const adminUsername = 'admin'; // Example username
    const adminPassword = 'password'; // Example password

    const employees = [
        { name: 'Lalit', mobile: '9607948951', shift: 'First Shift' },
        { name: 'Abdul', mobile: '8484938224', shift: 'Second Shift' },
        { name: 'Vijay', mobile: '9545760053', shift: 'Second Shift' },
        { name: 'Vivek', mobile: '9665360633', shift: 'Second Shift' },
        { name: 'Pranish', mobile: '9834495534', shift: 'Second Shift' },
        { name: 'Tushar', mobile: '8482802688', shift: 'Second Shift' },
        { name: 'Prashant', mobile: '8788826979', shift: 'Second Shift' },
        { name: 'Atul', mobile: '9175843608', shift: 'Second Shift' },
        { name: 'Ganesh', mobile: '9561485928', shift: 'Second Shift' },
        { name: 'Rushikesh', mobile: '8482891791', shift: 'Second Shift' },
        { name: 'Akshay', mobile: '7558537384', shift: 'Second Shift' },
    

        // Add remaining employees
    ];

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const loginButton = document.getElementById('login-btn');
    const loginContainer = document.getElementById('login-container');
    const appContainer = document.getElementById('app-container');
    const loginError = document.getElementById('login-error');

    loginButton.addEventListener('click', () => {
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;

        if (username === adminUsername && password === adminPassword) {
            loginContainer.style.display = 'none';
            appContainer.style.display = 'block';
            populateTable();
        } else {
            loginError.style.display = 'block';
        }
    });

    function populateTable() {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        employees.forEach(employee => {
            const row = document.createElement('tr');

            // Create table cells
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.mobile}</td>
                ${daysOfWeek.map(day => `
                    <td>
                        <select class="${employee.shift.replace(' ', '-').toLowerCase()}-shift" name="${employee.name}_${day}">
                            <option value="First Shift" ${employee.shift === 'First Shift' ? 'selected' : ''}>First Shift</option>
                            <option value="Second Shift" ${employee.shift === 'Second Shift' ? 'selected' : ''}>Second Shift</option>
                            <option value="General Shift" ${employee.shift === 'General Shift' ? 'selected' : ''}>General Shift</option>
                        </select>
                    </td>
                `).join('')}
            `;

            tbody.appendChild(row);
        });

        // Add event listeners to update colors on change
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', function() {
                const selectedValue = this.value;
                this.classList.remove('first-shift', 'second-shift', 'general-shift');
                if (selectedValue === 'First Shift') {
                    this.classList.add('first-shift');
                } else if (selectedValue === 'Second Shift') {
                    this.classList.add('second-shift');
                } else if (selectedValue === 'General Shift') {
                    this.classList.add('general-shift');
                }
            });

            // Set initial color based on the current selection
            const initialValue = select.value;
            if (initialValue === 'First Shift') {
                select.classList.add('first-shift');
            } else if (initialValue === 'Second Shift') {
                select.classList.add('second-shift');
            } else if (initialValue === 'General Shift') {
                select.classList.add('general-shift');
            }
        });

        document.getElementById('save-btn').addEventListener('click', () => {
            const data = new FormData(document.querySelector('table'));

            const shifts = {};
            data.forEach((value, key) => {
                shifts[key] = value;
            });

            console.log('Shift Data:', shifts);
            // You can send the shift data to the server here if needed
        });
    }
});
