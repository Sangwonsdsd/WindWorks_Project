document.addEventListener("DOMContentLoaded", function () {

    // 아이콘에 클릭 이벤트를 추가합니다.
    // document.getElementById("lectureMaterialsDetail-title-favorites").addEventListener("click", function () {
    //     // 현재 클래스를 확인하고 변경합니다.
    //     if (document.getElementById("lectureMaterialsDetail-title-favorites").classList.contains("bi-star")) {
    //         // bi-star 클래스가 있으면 bi-star-fill로 변경
    //         document.getElementById("lectureMaterialsDetail-title-favorites").classList.remove("bi-star");
    //         document.getElementById("lectureMaterialsDetail-title-favorites").classList.add("bi-star-fill");
    //         document.getElementById("lectureMaterialsDetail-title-favorites").innerHTML = '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>'
    //         document.getElementById("lectureMaterialsDetail-title-favorites").style.color = "#fbf4a8"
    //     } else {
    //         // bi-star 클래스가 없으면 bi-star로 변경
    //         document.getElementById("lectureMaterialsDetail-title-favorites").classList.remove("bi-star-fill");
    //         document.getElementById("lectureMaterialsDetail-title-favorites").classList.add("bi-star");
    //         document.getElementById("lectureMaterialsDetail-title-favorites").innerHTML = ' <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>'
    //         document.getElementById("lectureMaterialsDetail-title-favorites").style.color = "rgba(0, 0, 0, 0.281)"
    //     }
    // });
    //체크박스
    document.getElementById("lectureMaterialsDetail-item-bar1-checkbox").checked = true;
    document.getElementById("lectureMaterialsDetail-item-bar1-checkbox2").checked = true;
    document.getElementById("lectureMaterialsDetail-item-bar1-checkbox3").checked = true;
    document.getElementById("lectureMaterialsDetail-item-bar1-checkbox").addEventListener("click", function () {

        if (!document.getElementById("lectureMaterialsDetail-item-bar1-checkbox").checked) {
            document.querySelector("#lectureMaterialsDetail-item-bar1-content1").style.display = "none";
            document.querySelector("#lectureMaterialsDetail-item-bar1-checkbox-label1").innerHTML = "자세히 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>'
                + '</svg>';
        } else {

            document.querySelector("#lectureMaterialsDetail-item-bar1-content1").style.display = "flex";
            document.querySelector("#lectureMaterialsDetail-item-bar1-checkbox-label1").innerHTML = "자세히 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"'
                + 'class="bi bi-chevron-up" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg>';
        }

    });

    document.getElementById("lectureMaterialsDetail-item-bar1-checkbox2").addEventListener("click", function () {

        if (!document.getElementById("lectureMaterialsDetail-item-bar1-checkbox2").checked) {
            document.querySelector("#lectureMaterialsDetail-item-bar1-content2").style.display = "none";
            document.querySelector("#lectureMaterialsDetail-item-bar1-checkbox-label2").innerHTML = "상세내용 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>'
                + '</svg>';
        } else {

            document.querySelector("#lectureMaterialsDetail-item-bar1-content2").style.display = "flex";
            document.querySelector("#lectureMaterialsDetail-item-bar1-checkbox-label2").innerHTML = "상세내용 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"'
                + 'class="bi bi-chevron-up" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg>';
        }

    });

    document.getElementById("lectureMaterialsDetail-item-bar1-checkbox3").addEventListener("click", function () {

        if (!document.getElementById("lectureMaterialsDetail-item-bar1-checkbox3").checked) {
            document.querySelector("#lectureMaterialsDetail-item-bar1-content3").style.display = "none";
            document.querySelector("#lectureMaterialsDetail-item-bar1-checkbox-label3").innerHTML = "첨부파일 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>'
                + '</svg>';
        } else {
            document.querySelector("#lectureMaterialsDetail-item-bar1-content3").style.display = "flex";
            document.querySelector("#lectureMaterialsDetail-item-bar1-checkbox-label3").innerHTML = "첨부파일 " + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"'
                + 'class="bi bi-chevron-up" viewBox="0 0 16 16">'
                + '<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /> </svg>';
        }
    });


});


function copyURL() {
    let currentURL = window.location.href;

    // 가상의 텍스트 입력 요소를 생성하고 값을 설정합니다.
    let tempInput = document.createElement("input");
    tempInput.value = currentURL;

    // body에 임시 요소를 추가합니다.
    document.body.appendChild(tempInput);

    // 텍스트 입력 요소를 선택하고 복사합니다.
    tempInput.select();
    document.execCommand("copy");

    // body에서 임시 요소를 제거합니다.
    document.body.removeChild(tempInput);

    swal("", "URL이 클립보드에 복사되었습니다: " + currentURL, "success");
}

function updateForm(classDataNo) {
    location.href = "updateFormView.lm?classDataNo=" + classDataNo;
}

function deleteClassData(classDataNo) {
    location.href = "delete.lm?classDataNo=" + classDataNo;
}

function lectureMovement(writerName, loginUserName) {
    if (writerName === loginUserName) {
        ajaxLectureMovement(document.getElementById("hiddenclassDataNo").value, document.getElementById("classDataCategorySelect").value)
    } else {
        swal("", "작성자만 이동 가능합니다", "warning");
    }

}