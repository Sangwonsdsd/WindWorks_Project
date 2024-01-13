const mainOnload = function () {
    document.querySelector("#nav-home-bar").classList.add('active');
    document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';
}

const reservationPageOnload = function () {
    document.querySelector("#nav-reservationPage-bar").classList.add('active');
    document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';
}

const noticeOnload = function () {
    document.querySelector("#nav-notice-bar").classList.add('active');
    document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';

    

}

const lessonOnload = function () {
    document.querySelector("#nav-studyM-bar").classList.add('active');
    document.querySelector("#navbar").style.background = '#B62547';
    document.querySelector(".active").style.background = 'white';
    document.querySelector(".active").style.color = '#B62547';


    document.querySelector(".right-section-person").style.background = '#B62547';
    document.querySelector(".right-section-person").style.border = '1px solid #B62547';
}

const approvalOnload = function () {
    document.querySelector("#nav-approval-bar").classList.add('active');
    document.querySelector("#navbar").style.background = '#B62547';
    document.querySelector(".active").style.background = 'white';
    document.querySelector(".active").style.color = '#B62547';

    document.querySelector(".right-section-person").style.background = '#B62547';
    document.querySelector(".right-section-person").style.border = '1px solid #B62547';
}

const lectureMaterialsDetailOnload = function () {
    document.querySelector("#nav-studyM-bar").classList.add('active');
    document.querySelector("#navbar").style.background = '#B62547';
    document.querySelector(".active").style.background = 'white';
    document.querySelector(".active").style.color = '#B62547';

    document.querySelector(".right-section-person").style.background = '#B62547';
    document.querySelector(".right-section-person").style.border = '1px solid #B62547';

    $("#studyManagementMenus-id").val("lectureMaterials").prop("selected", true);

}

const calendarOnload = function () {
    document.querySelector("#nav-calendar-bar").classList.add('active');
    document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';
}

const emailOnload = function () {
    document.querySelector("#nav-email-bar").classList.add('active');
    document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';
}

const orgOnload = function () {
    document.querySelector("#nav-org-bar").classList.add('active');
    document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';
}

const chattingOnload = function () {
    document.querySelector("#nav-chatting-bar").classList.add('active');
    document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';
}

const reservationOnload = function () {
    document.querySelector("#nav-reservationPage-bar").classList.add('active');
    document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';
}
