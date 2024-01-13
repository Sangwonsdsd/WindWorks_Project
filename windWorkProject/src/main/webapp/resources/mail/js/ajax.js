//받은 메일 ajax
function ajaxMailList(num, returnF) {
    $.ajax({
        url: "ajaxMaillist.mail",
        data: {
            num: num
        },
        success: function (res) {
            returnF(res)
        },
        error: function () {
            console.log("ajaxMailList ajax 통신 실패")
        },
    })
}

//받은 메일 board처리 ajax
function ajaxMailBoardLimitList(num, returnF, cpage, boardLimit) {
    $.ajax({
        url: "ajaxMaillist.mail",
        data: {
            cpage: cpage,
            boardLimit: boardLimit,
            num: num
        },
        success: function (res) {
            returnF(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}
//휴지통 ajax
function ajaxDeleteMail(drawDeleteMailList) {
    $.ajax({
        url: "ajaxDeleteMailList.mail",
        success: function (res) {
            drawDeleteMailList(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}


//휴지통 board처리 ajax
function ajaxDeleteMailboard(drawDeleteMailList, cpage, boardLimit) {
    $.ajax({
        url: "ajaxDeleteMailList.mail",
        data: {
            cpage: cpage,
            boardLimit: boardLimit
        },
        success: function (res) {
            drawDeleteMailList(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}

//메일 삭제
function ajaxMailDelete(num, returnF, checkBoxtrueList, cpage, boardLimit) {
    $.ajax({
        url: "ajaxMailDeletelist.mail",
        data: {
            cpage: cpage,
            boardLimit: boardLimit,
            emailNoList: checkBoxtrueList,
            num: num
        },
        success: function (res) {
            returnF(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}
//메일 삭제
function ajaxDeleteMailDelete(drawDeleteMailList, checkBoxtrueList, cpage, boardLimit) {
    $.ajax({
        url: "ajaxDeleteMailDeletelist.mail",
        data: {
            cpage: cpage,
            boardLimit: boardLimit,
            emailNoList: checkBoxtrueList
        },
        success: function (res) {
            drawDeleteMailList(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}

//메일 복구
function ajaxRestoreMail(drawDeleteMailList, checkBoxtrueList, cpage, boardLimit){
    $.ajax({
        url: "ajaxRestoreMaillist.mail",
        data: {
            cpage: cpage,
            boardLimit: boardLimit,
            emailNoList: checkBoxtrueList
        },
        success: function (res) {
            drawDeleteMailList(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}

//메일 전달
function ajaxMailrelay(relayCheckBoxtrueList, mailCheckBoxtrueList) {
    $.ajax({
        url: "ajaxMailrelay.mail",
        data: {
            relayCheckBoxtrueList: relayCheckBoxtrueList,
            mailCheckBoxtrueList: mailCheckBoxtrueList
        },
        success: function (res) {
            alert("전달 성공");
        },
        error: function () {
            console.log("ajaxMailrelay ajax 통신 실패")
        },
    })
}

//메일 전달
function ajaxRelayOnlySendMail(relayCheckBoxtrueList, emailNo) {
    $.ajax({
        url: "ajaxRelayOnlySend.mail",
        data: {
            relayCheckBoxtrueList: relayCheckBoxtrueList,
            emailNo: emailNo
        },
        success: function (res) {
            alert("전달 성공");
        },
        error: function () {
            console.log("ajaxMailrelay ajax 통신 실패")
        },
    })
}

//메일 안읽음 표시
function ajaxNotReadMail(respon, checkBoxtrueList, cpage, blt, num) {
    $.ajax({
        url: "ajaxNotReadMail.mail",
        data: {
            cpage: cpage,
            boardLimit: blt,
            emailNoList: checkBoxtrueList,
            num : num
        },
        success: function (res) {
            alert("안읽음처리 성공");
            respon(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}


//메일 읽음 표시
function ajaxReadMail(respon, checkBoxtrueList, cpage, blt, num) {
    $.ajax({
        url: "ajaxReadMail.mail",
        data: {
            cpage: cpage,
            boardLimit: blt,
            emailNoList: checkBoxtrueList,
            num : num
        },
        success: function (res) {
            alert("읽음처리 성공");
            respon(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}

//메일 검색
function ajaxmailSearchInput(num, respon, mailSearchInput, mailSearchSelect) {
    $.ajax({
        url: "ajaxmailSearchInput.mail",
        data: {
            num: num,
            mailSearchInput: mailSearchInput,
            mailSearchSelect: mailSearchSelect
        },
        success: function (res) {
            respon(res)
        },
        error: function () {
            console.log("ajaxMailDelete ajax 통신 실패")
        },
    })
}

//휴지통 메일 전달
function ajaxDeleteMailrelay(relayCheckBoxtrueList, mailCheckBoxtrueList){
    $.ajax({
        url: "ajaxDeleteMailrelay.mail",
        data: {
            relayCheckBoxtrueList: relayCheckBoxtrueList,
            mailCheckBoxtrueList: mailCheckBoxtrueList,
        },
        success: function (res) {
            alert("전달 성공");
        },
        error: function () {
            console.log("ajaxMailrelay ajax 통신 실패")
        },
    })
}