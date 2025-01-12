const linktoadmin = document.getElementById('admin-page')
const logoutlink = document.getElementById('adminLogout')
const dashboardlink = document.getElementById('Dashboard')
const addclasseslink = document.getElementById('addClasses')


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
//function login() {
//    localStorage.setItem(AUTH_KEY, 'dummy_token');
//    alert('Logged in successfully');
//}
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