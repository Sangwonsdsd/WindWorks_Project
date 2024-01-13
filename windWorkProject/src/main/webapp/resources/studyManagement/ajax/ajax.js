//강의계획표 보여주기 
function lessonPlanView(czpage, drowlessonPlanView) {
    $.ajax({
        url: "ajaxlist.lp",
        data: {
            cpage: czpage
        },
        success: function (res) {
            console.log(res)
            drowlessonPlanView(res)
        },
        error: function () {
            console.log("lessonPlanView ajax 통신 실패")
        },
    })
}

//강의 계획표 수정 모달
document.querySelector("#studyManagementWriter").onclick = function () {
    $.ajax({
        url: "ajaxupdatePlanlist.lp",
        success: function (res) {
            console.log(res)
            drowupdateBtnLessonPlanView(res);
        },
        error: function () {
            console.log("lessonPlanView ajax 통신 실패")
        },
    })
}

//자료실 보여주기
function lectureMaterialsView(czpage, drowlectureMaterialsView, category) {
    $.ajax({
        url: "ajaxlist.lm",
        data: {
            cpage: czpage,
            category: category
        },
        success: function (res) {
            console.log(res)
            drowlectureMaterialsView(res)
        },
        error: function () {
            console.log("lectureMaterialsView ajax 통신 실패")
        },
    })
}

//자료실 검색
function ajaxLectureMaterialsSearch(searchSelect, searchbarInput, drowstudentManagementView, czpage, category) {
    $.ajax({
        url: "ajaxLectureMaterialsSearch.lm",
        data: {
            searchSelect: searchSelect,
            searchbarInput: searchbarInput,
            cpage: czpage,
            category: category
        },
        success: function (res) {
            console.log(res)
            drowlectureMaterialsView(res)
        },
        error: function () {
            console.log("lectureMaterialsView ajax 통신 실패")
        },
    });
}

//학생 리스트 보여주기
function studentManagementView(czpage, drowstudentManagementView) {
    $.ajax({
        url: "ajaxSelectList.stm",
        data: {
            cpage: czpage
        },
        success: function (res) {
            console.log(res)
            drowstudentManagementView(res)
        },
        error: function () {
            console.log("studentManagementView ajax 통신 실패")
        },
    })
}


//학생 리스트 리미트 보여주기
function studentBoardLimitManagementView(czpage, drowstudentManagementView, selectLimit) {
    $.ajax({
        url: "ajaxSelectList.stm",
        data: {
            cpage: czpage,
            boardLimit: selectLimit
        },
        success: function (res) {
            console.log(res)
            drowstudentManagementView(res)
        },
        error: function () {
            console.log("studentManagementView ajax 통신 실패")
        },
    })
}

//학생 speed add 기능
function ajaxstudentaddManagementView(classNo, studentName, studentEmail, studentPhone, czpage, drowstudentManagementView) {
    $.ajax({
        url: "ajaxaddSelectList.stm",
        data: {
            classNo: classNo,
            studentName: studentName,
            studentEmail: studentEmail,
            studentPhone: studentPhone,
            cpage: czpage
        },
        success: function (res) {
            swal("", "추가 완료.", "success");
            drowstudentManagementView(res)
        },
        error: function () {
            console.log("studentManagementView add ajax 통신 실패")
        },
    })
}

//학생초성으로 검색
function ajaxStudentSelectInutialManagement(minUnicodeNum, maxUnicodeNum, classNo, czpage, drowstudentManagementView, boardLimit) {
    $.ajax({
        url: "ajaxInutialSelectList.stm",
        data: {
            classNo: classNo,
            minUnicodeNum: minUnicodeNum,
            maxUnicodeNum: maxUnicodeNum,
            boardLimit: boardLimit,
            cpage: czpage
        },
        success: function (res) {
            drowstudentManagementinutialView(res, minUnicodeNum, maxUnicodeNum, classNo)
        },
        error: function () {
            console.log("ajaxInutialSelectList add ajax 통신 실패")
        },
    })
}

//학생검색어로 검색
function ajaxSelectSerachStudent(searchSelect, searchbarInput, czpage, classNo, drowstudentManagementView, boardLimit) {
    $.ajax({
        url: "ajaxSelectSerachStudent.stm",
        data: {
            classNo: classNo,
            searchSelect: searchSelect,
            searchbarInput: searchbarInput,
            boardLimit: boardLimit,
            cpage: czpage
        },
        success: function (res) {
            drowstudentManagementView(res)
        },
        error: function () {
            console.log("ajaxInutialSelectList add ajax 통신 실패")
        },
    })
}

//학생 삭제
function deletedStudent(checkBoxtrueList, drowstudentManagementView) {
    $.ajax({
        url: "deleted.stm",
        data: {
            studentNoList: checkBoxtrueList
        },
        success: function (res) {
            drowstudentManagementView(res)
            swal("", "삭제 완료!!", "success");
        },
        error: function () {
            console.log("studentManagementView ajax 통신 실패")
        },
    })
}

//강의자료실 즐겨찾기
function ajaxLikeAddSelect(classDataNo, empNo) {
    $.ajax({
        url: "ajaxLikeAddSelect,lm",
        data: {
            classDataNo: classDataNo,
            empNo: empNo
        },
        success: function (res) {
            swal("", "즐겨찾기 완료!!", "success");
            let str = ' <svg xmlns="http://www.w3.org/2000/svg"'
                + ' onclick="ajaxLikeDeleteSelect(' + res.c.classDataNo + ", " + res.c.empNo + ')"'
                + 'style="color: #fbf4a8;" width="16" height="16" fill="currentColor"'
                + 'id="lectureMaterialsDetail-title-favorites" class="bi bi-star" viewBox="0 0 16 16">'
                + '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />'
                + '</svg>'
            document.querySelector("#ajaxlikediv").innerHTML = str

        },
        error: function () {
            console.log("ajaxLikeAddSelect ajax 통신 실패")
        },
    })
}

//강의자료실 즐겨찾기 삭제
function ajaxLikeDeleteSelect(classDataNo, empNo) {
    $.ajax({
        url: "ajaxLikeDeleteSelect.lm",

        data: {
            classDataNo: classDataNo,
            empNo: empNo
        },
        success: function (res) {
            swal("", "즐겨찾기 취소!!", "success");

            let str = ' <svg xmlns="http://www.w3.org/2000/svg"'
                + ' onclick="ajaxLikeAddSelect(' + res.c.classDataNo + ", " + res.c.empNo + ')"'
                + 'style="color: rgba(0, 0, 0, 0.281);" width="16" height="16" fill="currentColor"'
                + 'id="lectureMaterialsDetail-title-favorites" class="bi bi-star" viewBox="0 0 16 16">'
                + '<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />'
                + '</svg>'
            document.querySelector("#ajaxlikediv").innerHTML = str
        },
        error: function () {
            console.log("ajaxLikeDeleteSelect ajax 통신 실패")
        },
    })
}

//강의자료실 이동
function ajaxLectureMovement(classDataNo, categoryNo) {
    $.ajax({
        url: "ajaxLectureMovement.lm",
        data: {
            classDataNo: classDataNo,
            categoryNo: categoryNo
        },
        success: function (res) {
            if (res === "success") {
                swal("", "변경완료", "success");
            } else {
                swal("", "변경실패", "error");
            }

        },
        error: function () {
            console.log("studentManagementView ajax 통신 실패")
        },
    })
}