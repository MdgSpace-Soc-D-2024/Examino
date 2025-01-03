const linktoadmin = document.getElementById('admin-page')
const logoutlink = document.getElementById('adminLogout')
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