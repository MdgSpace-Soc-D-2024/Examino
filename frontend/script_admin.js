const linktoadmin = document.getElementById('admin-page')
const logoutlink = document.getElementById('adminLogout')
const dashboardlink = document.getElementById('Dashboard')
const addclasseslink = document.getElementById('addClasses')
const getusernamelink =  "http://localhost:8000/api/get-username/"

if (linktoadmin!=null) {
    linktoadmin.addEventListener('click', function() {
        window.location.href = 'admin.html';
    });
};
if (addclasseslink!=null) {
    addclasseslink.addEventListener('click', function() {
        window.location.href = 'admin-class.html';
    });
};

if (dashboardlink!=null) {
    dashboardlink.addEventListener('click', function() {
        window.location.href = 'admin-info.html';
        
    });
};

const protectedRoutes = ['Dashboard', 'manageExams', 'seeStudents', 'seeResults'];
const AUTH_KEY = 'auth_token'
function isAuthenticated() {
    return (localStorage.getItem(AUTH_KEY) !== null) && (localStorage.getItem(is_admin !== true));
}
function navigateTo(pageId) {
    if (protectedRoutes.includes(pageId) && !isAuthenticated()) {
        alert('Please login to access this page');
        return false;
    }
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    return true;
}

function logout() {
    localStorage.removeItem(AUTH_KEY, is_admin);
    window.location.href = 'home.html'
    alert('Logged out successfully');
}
document.getElementById('navigation').addEventListener('click', (e) => {
    if (e.target.dataset.page) {
        e.preventDefault();
        navigateTo(e.target.dataset.page);
    }
})
const currentPage = document.querySelector('.active').id;
if (protectedRoutes.includes(currentPage) && !isAuthenticated()) {
    navigateTo('home');
}

if (logoutlink!=null) {
    logoutlink.addEventListener('click', function() {
        logout()
    }
)};

document.addEventListener("DOMContentLoaded", () => {
    const AUTH_KEY = localStorage.getItem(AUTH_KEY)
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
    try {
        const response = fetch(getusernamelink, {
            method: "POST", 
            headers: headers,
            body: JSON.stringify({AUTH_KEY})
        });
        if (response.ok) {
            const result = response.json();
            const username = document.getElementById('username');
            username.innerHTML = '';
            username.textContent = result.username
            
        } else {
            console.log('error')
        }
    } catch (error){
        pass
    }

});