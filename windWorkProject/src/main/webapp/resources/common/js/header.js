function stopEvent(ev) {
    ev.preventDefault()
    ev.stopImmediatePropagation()
    ev.stopPropagation()
}

function logout() {
    location.href = "logout.em";
    swal("", "로그아웃 성공", "success");
}

function myPageForm() {
    location.href = "myPageForm.em";
}

function reservation(){
    let todayDate = new Date();
    
    let year = todayDate.getFullYear();
    let month = String(todayDate.getMonth() + 1).padStart(2, '0');
    let day = String(todayDate.getDate()).padStart(2, '0');
    let reserDate = year + '-' + month + '-' + day;

    location.href = "reservationPage.re?reserDate=" + reserDate;
}