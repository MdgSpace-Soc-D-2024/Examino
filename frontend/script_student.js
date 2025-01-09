const linktostudenthome = document.getElementById('studentHome')
const linktogiveexams = document.getElementById('exams')
const linktoseeresults = document.getElementById('results')

linktostudenthome.addEventListener('click', function () {
      window.location.href = 'student.html';
});
if (linktogiveexams!=null) {
    linktogiveexams.addEventListener('click', function () {
        window.location.href = 'student-exam.html';
    });
}


linktoseeresults.addEventListener('click', function () {
    window.location.href = 'student-result.html';
});
