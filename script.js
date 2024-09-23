document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, role })
    });
    const result = await response.json();
    alert(result.message || result.error);
});

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.data-section');
    sections.forEach(section => section.style.display = 'none');

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

// Example: Set the registration section to be shown by default for testing
document.addEventListener('DOMContentLoaded', function() {
    showSection('register-section');
});




document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (result.message) {
        alert(result.message);
        // Store the role in session or a cookie for access control
        sessionStorage.setItem('role', result.role);
    } else {
        alert(result.error);
    }
});

const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});





// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

<script>
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Set the theme based on localStorage
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    // Initialize the theme when the page loads
    document.addEventListener('DOMContentLoaded', initializeTheme);
</script>




if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})


// Fetch students based on course and division selection
document.getElementById('division').addEventListener('change', async function() {
    const course = document.getElementById('course').value;
    const division = this.value;

    if (course && division) {
        try {
            const response = await fetch(`/students?course=${course}&division=${division}`);
            const students = await response.json();

            const studentSelect = document.getElementById('student');
            studentSelect.innerHTML = '<option value="">Select Student</option>';
            students.forEach(student => {
                const option = document.createElement('option');
                option.value = student.student_id; // Use student_id for fetching results
                option.textContent = `${student.roll_no} - ${student.name}`; // Display roll_no and name
                studentSelect.appendChild(option);
            });
        } catch (error) {
            alert('Error fetching students data.');
        }
    }
});
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.data-section');
    sections.forEach(section => section.style.display = 'none');

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

// Event Listener for Viewing Results
document.getElementById('viewResultBtn').addEventListener('click', async function () {
    const studentId = document.getElementById('student').value;
    const year = document.getElementById('year').value;

    if (studentId && year) {
        try {
            const response = await fetch(`/results?student_id=${studentId}&year=${year}`);
            const result = await response.json();

            const resultDisplay = document.getElementById('resultDisplay');
            if (result.error) {
                resultDisplay.textContent = result.error;
                resultDisplay.style.color = 'red';
            } else {
                // Display the result with student details
                resultDisplay.innerHTML = `
                    <p>Result for <strong>${result.name}</strong> (Roll No: ${result.roll_no}, Division: ${result.division}, Year: ${result.year}):</p>
                    <pre>${JSON.stringify(result.marks, null, 2)}</pre>
                `;
                resultDisplay.style.color = 'black';
            }
        } catch (error) {
            alert('Error fetching results.');
        }
    } else {
        alert('Please select a student and a year to view the result.');
    }
});



function generateInitials(name) {
    const initials = name.match(/\b\w/g).join('');
    return initials.toUpperCase();
  }

  // Assuming you have a user object with a 'name' property
const user = { name: 'Palak Shete' };
const initials = generateInitials(user.name);
const profilePictureContainer = document.querySelector('.profile-picture');
profilePictureContainer.textContent = initials;


const profilePictureInput = document.querySelector('#profile-picture-input');
profilePictureInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  // Handle file upload process using a library like multer
});

