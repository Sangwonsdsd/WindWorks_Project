
const loginUser = {
    socket: null
}

// 조직도 조회
function orgList(callback) {
    $.ajax({
        url: "orgList.ch",
        data: {

        },
        success: function (res) {
            let deptList = res.deptList;
            let empList = res.empList;

            let str1 = '';
            for (let dList of deptList) {
                str1 += '<li class="org-item">' +
                    '<div class="org-oneline org-title org-title2">' +
                    '<div class="org-toggle">&#43;</div>' +
                    '<div>' + dList.deptName + '</div>' +
                    '</div>' +
                    ' <ul class="org-content" id="dept-' + dList.deptCode + '"c>' +

                    '</ul>' +
                    '</li>'

            }
            document.querySelector("#start-ul").innerHTML = str1

            for (let eList of empList) {
                let str2 = '';
                if (eList.empNo == loginUser.empNo) {
                    str2 = '<li>' +
                        '<label class="org-item member-area"><div class="org-status-area-'+ eList.empNo +'">'
                        if (eList.empOnlineStatus == 1){
                            str2 += '<div class="circle circle-online"></div>'
                        } else if(eList.empOnlineStatus == 2){
                            str2 += '<div class="circle circle-away"></div>'
                        } else {
                            str2 += '<div class="circle circle-offline"></div>'
                        }
                        str2 += '</div><div class="member-name">' + eList.empName + '</div>' +
                        '<div>' + eList.jobName + '</div>' +
                        '<input type="hidden" class="member-filePath" value="' + eList.profileFilePath + '">' +
                        '<input type="hidden" class="member-empNo" value="' + eList.empNo + '">' +
                        '</label>' +
                        '</li>'
                    $("#dept-" + eList.deptCode + "").append(str2);
                    
                    let str3 = '';
                    if (eList.empOnlineStatus == 1){
                        str3 += '<div class="circle circle-online"></div>'
                    } else if(eList.empOnlineStatus == 2){
                        str3 += '<div class="circle circle-away"></div>'
                    } else {
                        str3 += '<div class="circle circle-offline"></div>'
                    }
                    document.querySelector(".profileStatus").innerHTML = str3;
                    

                } else {
                    str2 = '<li>' +
                        '<label class="org-item member-area"><div class="org-status-area-'+ eList.empNo +'">'
                        if (eList.empOnlineStatus == 1){
                            str2 += '<div class="circle circle-online"></div>'
                        } else if(eList.empOnlineStatus == 2){
                            str2 += '<div class="circle circle-away"></div>'
                        } else {
                            str2 += '<div class="circle circle-offline"></div>'
                        }
                        str2 += '</div><div class="member-name">' + eList.empName + '</div>' +
                        '<div>' + eList.jobName + '</div>' +
                        '<input type="hidden" class="member-filePath" value="' + eList.profileFilePath + '">' +
                        '<input type="hidden" class="member-empNo" value="' + eList.empNo + '">' +
                        '<input class="member-checkbox" type="checkbox">' +
                        '</label>' +
                        '</li>'
                    $("#dept-" + eList.deptCode + "").append(str2);

                }

            }

            callback();
        },
        error: function () {
            console.log("실패");
        }
    });
}

// 토글 효과
function toggle() {

    $(document).ready(function () {
        $('.org-title').click(function () {
            $('.org-title').css({ "pointer-events": "none" })
            $(this).next('.org-content').slideToggle(200, function () {
                $('.org-title').css({ "pointer-events": "auto" })
                if ($(this).css('display') === 'block') {
                    $(this).prev().find('.org-toggle').html('&#45;');
                } else {
                    $(this).prev().find('.org-toggle').html('&#43;');
                }
            });
        });
    });

}

// 체크박스 이벤트
function checkBoxEvent() {
    let checkboxes = document.querySelectorAll('.member-checkbox');
    let addButton = document.querySelector(".screen_leftDown-right-plusbtn");

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            let empNo = this.parentElement.querySelector('.member-empNo').value;
            let empName = this.parentElement.querySelector('.member-name').textContent;
            let filePath = this.parentElement.querySelector('.member-filePath').value;

            // 체크되어 있는 박스들만 가져옴
            var checkedCheckboxes = document.querySelectorAll('.member-checkbox:checked');

            if (this.checked) {
                // 체크박스가 체크되었을 때 실행할 코드
                str = '<div class="screen_leftDown-left-plusEmp checkEmpNo" id="plusEmp-' + empNo + '" name="' + empNo + '">' +
                    '<div class="plus-profileImg-img-area"><img class="plus-profileImg-img" src="' + filePath + '"/></div>' +
                    '<div class="plus-profileImg-name-area">' + empName + '</div>' +
                    '</div>'
                document.querySelector(".screen_leftDown-left").innerHTML += str
            } else {
                // 체크박스가 해제되었을 때 실행할 코드
                let notCheckedEl = document.querySelector("#plusEmp-" + empNo)
                notCheckedEl.parentNode.removeChild(notCheckedEl);
            }

            // 체크된 체크박스의 개수에 따라 버튼 활성화/비활성화
            if (checkedCheckboxes.length > 0){
                addButton.disabled = false;
                addButton.style.backgroundColor = 'rgb(85, 175, 130)';
            } else {
                addButton.disabled = true;
                addButton.style.backgroundColor = 'rgb(160, 159, 159)'
            }
        });
    });
}

// 전부 체크 해제하고 비워주기
function checkBoxFalse(){
    // 체크되어 있는 박스들만 가져와서 해제
    var checkedCheckboxes = document.querySelectorAll('.member-checkbox:checked');
    checkedCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
    // 목록 비우고 버튼 비활성화
    document.querySelector(".screen_leftDown-left").innerHTML = "";
    let addButton = document.querySelector(".screen_leftDown-right-plusbtn");
    addButton.disabled = true;
    addButton.style.backgroundColor = 'rgb(160, 159, 159)'

}



// 새로운 채팅창 만들기
function createChat() {
    let elList = document.querySelector(".screen_leftDown-left").getElementsByClassName('checkEmpNo');
    let checkEmpList = [];
    checkEmpList.push(loginUser.empNo)
    // 선택한 유저들의 empNo을 배열에 담기
    for (var i = 0; i < elList.length; i++) {
        var nameValue = elList[i].getAttribute('name');
        checkEmpList.push(nameValue)
    }

    $.ajax({
        url: "createChat.ch",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ empList: checkEmpList }), // JSON 형태로 변환하여 전송
        success: function (res) {
            if (res == "success") {
                chatRoomList();
                checkBoxFalse();
            } else if (res == "error"){
                console.log("만들기 실패")
            } else {
                chatDetail(res)
                checkBoxFalse();
            }

        },
        error: function () {
            console.log("실패");
        }
    });

}



// 채팅방 리스트 그려주기
function chatRoomList() {
    $.ajax({
        url: "roomList.ch",
        data: {
            empNo: loginUser.empNo
        },
        success: function (res) {
            let chatRoomList = res.crlList;

            let str = ''
            for (let RoomList of chatRoomList) {
                if (RoomList.lastMsg == null) {
                    RoomList.lastMsg = "";
                }

                str += '<div class="chattingList-area1-container" onclick="chatDetail('+ RoomList.chatRoomNo +')">' +
                    '<div class="chattingList-area1-container-area1"><img class="chattingList-area1-container-area1-profile" src="' + RoomList.targetProfilePath + '"/></div>' +
                    '<div class="chattingList-area1-container-area2">' +
                    '<div class="chattingList-area1-container-area2-name overflow-hidden">' + RoomList.targetList + '</div>' +
                    '<div class="chattingList-area1-container-area2-content overflow-hidden">' + RoomList.lastMsg + '</div>' +
                    '</div>'
                    if (RoomList.noReadCount > 0){
                        str += '<div class="chattingList-area1-container-area3"><div class="red_area">' + RoomList.noReadCount + '</div></div>'
                    } else {
                        str += '<div class="chattingList-area1-container-area3"></div>'
                    }
                    
                    str += '</div>'
            }

            document.querySelector('.chattingList-area1').innerHTML = str;

        },
        error: function () {
            console.log("실패");
        }
    });
}


// 채팅 디테일 불러오기
function chatDetail(rNo) {
    if (loginUser.socket != null){
        loginUser.socket.close();
    }

    $.ajax({
        url: "roomDetail.ch",
        data: {
            roomNo: rNo,
            empNo: loginUser.empNo
        },
        success: function (res) {
            drawDetail(res)
            chatRoomList();
        },
        error: function () {
            console.log("실패");
        }
    });
}


// 채팅 디테일 그려주기
function drawDetail(res){
    let chatMsgList = res.chatMsgList;
    let roomNo = res.roomNo;
    let targetList = res.targetList;

    // 채팅 헤더
    let str1 = '<div class="chattingList-area2-header">' +
        '<div class="chattingList-area2-header-profile1"><img class="chattingList-area1-container-area1-profile" src="' + targetList.targetProfilePath + '"/></div>' +
        '<div class="chattingList-area2-header-profile2">' + targetList.targetList + '</div>' +
        '</div>' +
        '</div>'
    document.querySelector('.chattingList-area2-header-area').innerHTML = str1;

    // 채팅 바디
    let str2 = "";
    for (let list of chatMsgList) {
        if (list.empNo == loginUser.empNo) {
            str2 += '<div class="body-chatting-me-area">' +
                '<div class="body-chatting-me">' + list.chatMsgContent + '</div>' +
                '<div class="body-chatting-me-time">' + list.chatMsgDate + '</div>' +
                '</div>'
        } else {
            if (targetList.chatRoomLevel == 1) {
                console.log(list)
                str2 += '<div class="body-chatting-you-area">' +
                    '<div class="body-chatting-you-name">' + list.empName + " " + list.jobName + '</div>' +
                    '<div class="body-chatting-you">' + list.chatMsgContent + '</div>' +
                    '<div class="body-chatting-you-time">' + list.chatMsgDate + '</div>' +
                    '</div>'
            } else {
                str2 += '<div class="body-chatting-you-area">' +
                    '<div class="body-chatting-you">' + list.chatMsgContent + '</div>' +
                    '<div class="body-chatting-you-time">' + list.chatMsgDate + '</div>' +
                    '</div>'
            }
        }
    }
    document.querySelector('.chattingList-area2-body').innerHTML = str2;

    // 채팅 푸터
    let str3 = '<div class="chattingList-area2-footer-div">' +
        '<input type="hidden" class="chattingList-area2-footer-div-input-target" value="' + roomNo + '">' +
        '<input class="chattingList-area2-footer-div-input" onkeyup="sendMsg(event)" type="text">' +
        '<button class="chattingList-area2-footer-div-button" onclick="sendMsg(event)">전송</button>' +
        '</div>'
    document.querySelector('.chattingList-area2-footer').innerHTML = str3;
    
    scrollToBottom();
    loginUser.socket = socketOn();

    document.querySelector('.chattingList-area2-footer-div-input').focus();


}


// 스크롤 하단 고정
function scrollToBottom(){
    var element = document.querySelector(".chattingList-area2-body");
    element.scrollTop = element.scrollHeight;
}




  // 소켓연결(디테일 열었을떄)
  function socketOn() {

    const socket = new WebSocket("ws://localhost:8900/ww/server");

    // socket연결 성공시
    socket.onopen = function () {
        console.log("웹소켓 연결ok...")
    }

    // socket연결 끊어졌을시
    socket.onclose = function () {
        console.log("웹소켓 끊어짐...")
    }

    // socket연결 실패했을시
    socket.onerror = function () {
        console.log("웹소켓 연결 실패...")
        alert("웹소켓 연결 실패");
    }


    // socket연결로부터 데이터가 도착했을때
    // 서버로부터 데이터가 도착했을 때
    socket.onmessage = function (ev) {
        const receive = JSON.parse(ev.data)
        
        
        if(receive.isSide == 0){
            // 오늘 날짜
            let currentDate =  dateToStringYYYYMMDDhhmm();
            console.log(receive)

            str = '';
            if (receive.chatRoomLevel == 0){
                str = '<div class="body-chatting-you-area">' +
                '<div class="body-chatting-you">' + receive.chatMsgContent + '</div>' +
                '<div class="body-chatting-you-time">' + currentDate + '</div>' +
                '</div>'
            } else {
                str = '<div class="body-chatting-you-area">' +
                '<div class="body-chatting-you-name">' + receive.empName + '</div>' +
                '<div class="body-chatting-you">' + receive.chatMsgContent + '</div>' +
                '<div class="body-chatting-you-time">' + currentDate + '</div>' +
                '</div>'
            }
            
            document.querySelector('.chattingList-area2-body').innerHTML += str;
            document.querySelector('.chattingList-area2-footer-div-input').value = "";
            chatRoomList();
            scrollToBottom();

        } else {
            chatRoomList();
        }

    }

    return socket;

}

// 메세지 보내기
function sendMsg(event) {
    if(event.keyCode === 13 || !event.keyCode) {
        if(document.querySelector(".chattingList-area2-footer-div-input").value.trim() === ''){
            return;
        }
        const msgData = {
            message: document.querySelector(".chattingList-area2-footer-div-input").value,
            target: document.querySelector(".chattingList-area2-footer-div-input-target").value,
            sendEmpName : loginUser.empName
        }
        loginUser.socket.send(JSON.stringify(msgData));

        // 오늘 날짜
        let currentDate =  dateToStringYYYYMMDDhhmm();

        let str =  '<div class="body-chatting-me-area">' +
            '<div class="body-chatting-me">' + msgData.message + '</div>' +
            '<div class="body-chatting-me-time">' + currentDate + '</div>' +
            '</div>'
        document.querySelector('.chattingList-area2-body').innerHTML += str;
        document.querySelector('.chattingList-area2-footer-div-input').value = "";
        chatRoomList();
        scrollToBottom();

    }
    
}

// 현재시간 변환
function dateToStringYYYYMMDDhhmm(date){
    let currentDate = date ? new Date(date) : new Date();
    const yy = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month > 9 ? month : ("0" + month);
    let dd = currentDate.getDate();
    dd = dd > 9 ? dd : ("0" + dd);
    let hh = currentDate.getHours();
    hh = hh > 9 ? hh : ("0" + hh);
    let mm = currentDate.getMinutes();
    mm = mm > 9 ? mm : ("0" + mm);

    return yy + "." + month + "." + dd + " " + hh + ":" + mm
}

// 상태 div창 띄우기
function showOverlay() {
    let overlayDiv = document.querySelector(".overlay-div")
    overlayDiv.style.display = (overlayDiv.style.display === "none" || overlayDiv.style.display === "") ? "flex" : "none";
}

// 상태 변경하기
function changeOnline(){
    $.ajax({
        url: "changeOnline.emp",
        data: {
            empNo: loginUser.empNo
        },
        success: function (res) {
            if (res == "success") {
                let str = '<div class="circle circle-online"></div>'
                document.querySelector(".profileStatus").innerHTML = str;
                document.querySelector(".org-status-area-"+loginUser.empNo).innerHTML = str;
            } else {
                console.log("업데이트 실패")
            }
        },
        error: function () {
            console.log("실패");
        }
    });
}
function changeAway(){
    $.ajax({
        url: "changeAway.emp",
        data: {
            empNo: loginUser.empNo
        },
        success: function (res) {
            if (res == "success") {
                let str = '<div class="circle circle-away"></div>'
                document.querySelector(".profileStatus").innerHTML = str;
                document.querySelector(".org-status-area-"+loginUser.empNo).innerHTML = str;
            } else {
                console.log("업데이트 실패")
            }
        },
        error: function () {
            console.log("실패");
        }
    });
}
function changeOffline(){
    $.ajax({
        url: "changeOffline.emp",
        data: {
            empNo: loginUser.empNo
        },
        success: function (res) {
            if (res == "success") {
                let str = '<div class="circle circle-offline"></div>'
                document.querySelector(".profileStatus").innerHTML = str;
                document.querySelector(".org-status-area-"+loginUser.empNo).innerHTML = str;
            } else {
                console.log("업데이트 실패")
            }
        },
        error: function () {
            console.log("실패");
        }
    });
}






