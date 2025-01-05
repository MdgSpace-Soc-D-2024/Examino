const linktoadmin = document.getElementById('admin-page')
const logoutlink = document.getElementById('adminLogout')
const dashboardlink = document.getElementById('Dashboard')
let logout_option = false

if (linktoadmin!=null) {
    linktoadmin.addEventListener('click', function() {
        window.location.href = 'admin.html';
    });
};

if (logoutlink!=null) {
    logoutlink.addEventListener('click', function() {
        window.location.href = 'home.html';
        let logout_option = true
    });
};
if (logout_option === true) {
    pass
}
if (dashboardlink!=null) {
    dashboardlink.addEventListener('click', function() {
        window.location.href = 'admin-info.html';
        
    });
};

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

// Display the code
if (code) {
    document.getElementById('codeInstitute').textContent = `Your code is: ${code}`;
} else {
    document.getElementById('codeInstitute').textContent = 'No code found.';
}
