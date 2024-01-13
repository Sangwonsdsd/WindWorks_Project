/* ----- 댓글 리스트 가져오기 -----*/
const notice = {
    noticeNo: 0
}
selectReplyList = (nno) => {
    notice.noticeNo = nno;
    data = {
        nno :nno
    }
    noticeDetailViewController.selectReplyListAjax(data, selectReplyListDraw)
}

/* ----- 댓글 쓰기 기능 ----- */
addReply = (noticeNo, empNo) => {

    data = {
        noticeNo,
        empNo,
        noticeReplyContent: $("#contentReply").val()
    }

    noticeDetailViewController.addReplyAjax(data, selectReplyList)
}

/* ----- 댓글 수정 기능 ----- */
addReplyUpdate1 = (noticeReplyNo, content) => {
    
    data = {
        noticeNo: notice.noticeNo,
        noticeReplyNo: noticeReplyNo,
        noticeReplyContent: document.getElementById(content).value
    }

    noticeDetailViewController.noticeReplyUpdateAjax(data, selectReplyList)
}

/* ----- 댓글 삭제 기능 ----- */
noticeReplyDelete = (noticeReplyNo) => {

    data = {
        noticeNo: notice.noticeNo,
        noticeReplyNo: noticeReplyNo
    }
    noticeDetailViewController.noticeReplyDeleteAjax(data, selectReplyList)
}

/* ----- 답글 쓰기 기능 ----- */
addChildReply = (noticeReplyNo, parentReplyNo, empNo, num) => {

    data = {
        noticeNo: notice.noticeNo,
        noticeReplyNo: noticeReplyNo,
        parentReplyNo: parentReplyNo,
        empNo: empNo,
        noticeReplyContent: $("#contentChildReply"+ num).val()
    }
    noticeDetailViewController.addChildReplyAjax(data, selectReplyList)
}

/* ----- 답글 수정 기능 ----- */
appendChildReplyUpdate = (noticeReplyNo, childReplyContent) => {

    data = {
        noticeNo: notice.noticeNo,
        noticeReplyNo: noticeReplyNo,
        noticeReplyContent: document.getElementById(childReplyContent).value
    }
    noticeDetailViewController.appendChildReplyUpdateAjax(data, selectReplyList)
}

/* ----- 답글 삭제 기능 ----- */
noticeChildReplyDelete = (noticeReplyNo) => {

    data = {
        noticeNo: notice.noticeNo,
        noticeReplyNo: noticeReplyNo
    }
    noticeDetailViewController.noticeChildReplyDeleteAjax(data, selectReplyList)
}

/* ----- 댓글 그려주기 -----*/
selectReplyListDraw = (result) => {

    let list = result.list;
    let str1="";
    let str2="";
    let str3="";
    let str4="";
    
    // 댓글 반복문 돌기
    for (let i = 0; i < list.length; i++){
        // 로그인유저만 수정,삭제 보이기
        if (result.loginUser === list[i].empNo) {
        //    const noticeReply =  document.createElement("button")
        //    noticeReply.className = notice-reply-update-btn;
        //    noticeReply.innerText = "수정"
        //    noticeReply.onclick = () =>{
        //         noticeReplyUpdate(list[i].noticeReplyNo)
        //    }
            str2 = '<button class="notice-reply-update-btn" onclick="noticeReplyUpdate('+ list[i].noticeReplyNo +')">' + '수정' + '</button>'
                    + '<div>' + '|' + '</div>'
                    + '<button class="notice-reply-delete-btn" onclick="noticeReplyDelete(' + list[i].noticeReplyNo + ')">' + '삭제' + '</button>'
            }
        
        // 대댓글 반목문 돌기
        for (let j = 0; j < list[i].childReply.length; j++) {

            // 로그인유저만 수정,삭제 보이기
            if (result.loginUser === list[i].childReply[j].empNo) {
                str4 = '<button class="notice-reply-update-btn" onclick="noticeChildReplyUpdate(' + list[i].childReply[j].noticeReplyNo + ')">' + '수정' + '</button>'
                        + '<div>' + '|' + '</div>'
                        + '<button class="notice-reply-delete-btn" onclick="noticeChildReplyDelete(' + list[i].childReply[j].noticeReplyNo + ')">' + '삭제' + '</button>'
                }
            
            // 대댓글 그리기
            if (list[i].childReply.length !== 0) {
                str3 += '<div id="notice-child-reply-content'+ list[i].childReply[j].noticeReplyNo +'" class="notice-reply-parent-content-area">'
                        + '<div class="notice-reply-parent-writer">' + list[i].childReply[j].empName 
                        + '<div id="notice-reply-middle-right'+ list[i].childReply[j].noticeReplyNo +'" class="notice-reply-middle-right">' + str4 +'</div>'
                        + '</div>'
                        + '<div class="notice-reply-parent-content">' + '<pre>' + list[i].childReply[j].noticeReplyContent + '</pre>' + '</div>'
                        + '<div class="notice-reply-parent-date">' + list[i].childReply[j].noticeReplyCreateDate
                        + '</div>'
                        + '</div>'

                        // 답글 쓰기 수정 클릭시 기존 내용이 담긴 textarea 불러오기
                        +'<div id="appendChildReplyUpdate' + list[i].childReply[j].noticeReplyNo + '" class="notice-child-reply-write-area" style="display: none;">'
                        + '<div class="notice-reply-write-writer">' + list[i].childReply[j].empName + '</div>'
                        + '<div class="notice-reply-write-content">'
                        + 	'<textarea id="childReplyContent' + list[i].childReply[j].noticeReplyNo  + '" class="childReplyContentUpdate" cols="100" spellcheck="false">' + list[i].childReply[j].noticeReplyContent + '</textarea>'
                        + '</div>'
                        + '<div class="notice-reply-write-btn">'
                        + '<button onclick="appendChildReplyUpdate(' + list[i].childReply[j].noticeReplyNo + ',' + "'" + 'childReplyContent' + list[i].childReply[j].noticeReplyNo  + "'" + ')">' + '수정' + '</button>'
                        + '<button id="addChildReplyCancel" onclick="addChildReplyCancel(' + list[i].childReply[j].noticeReplyNo + ')">' + '취소' + '</button>'
                        + '</div>'
                        + '</div>'
   
            }
                            
        }
        
        // 댓글 그리기
        str1 += '<div class="notice-reply-all">'
                    + '<div id="notice-reply-content'+ list[i].noticeReplyNo +'" class="notice-reply-content">'
                    + '<div class="notice-reply-writer">' + list[i].empName
                    + '<div id="notice-reply-middle-right'+ list[i].noticeReplyNo +'" class="notice-reply-middle-right">' + str2 +'</div>'
                    + '</div>'
                    + '<div class="notice-reply">' + '<pre>' + list[i].noticeReplyContent + '</pre>' + '</div>'
                    + '<div class="notice-reply-date">' + list[i].noticeReplyCreateDate 
                    + 	'<div class="notice-reply-parent">' + '<button onclick="appendReply('+ list[i].noticeReplyNo +')">' + '답글쓰기' + '</button>' + '</div>'
                    + '</div>'
                    + '</div>'

                    // 댓글 수정시 기존 내용이 담긴 textarea display 불러오기
                    + '<div id="appendReplyUpdate'+ list[i].noticeReplyNo +'" class="notice-reply-write-area" style="display: none;">'
                    + '<div class="notice-reply-write-writer">' + list[i].empName + '</div>'
                    + '<div class="notice-reply-write-content">'
                    + 	'<textarea id="content' + i + '" class="replyContentUpdate" cols="100" spellcheck="false">' + list[i].noticeReplyContent + '</textarea>'
                    + '</div>'
                    + '<div class="notice-reply-write-btn">'
                    + '<button onclick="addReplyUpdate1(' + list[i].noticeReplyNo + ',' + "'" + 'content' + i + "'" + ')">' + '수정' + '</button>'
                    + '<button id="addReplyCancel" onclick="addReplyCancel(' + list[i].noticeReplyNo + ')">' + '취소' + '</button>'
                    + '</div>'
                    + '</div>'
                    
                    + '<div class="notice-reply-parent-content-all">'
                        // 대댓글 그리기
                        // 답글 쓰기 수정 클릭시 textarea 불러오기
                        + str3
                    + '</div>'
                    
                + '</div>'
                
                // 답글 쓰기 클릭시 댓글 아래 빈 textarea 불러오기
                + '<div id="appendReply'+ list[i].noticeReplyNo +'" class="notice-reply-parent-bottom" style="display: none;">'
                + '<div class="notice-reply-write-area">'
                + '<div class="notice-reply-write-writer">' + result.loginUserName + '</div>'
                + '<div class="notice-reply-write-content">'
                + 	'<textarea id="contentChildReply'+i+'" rows="1" cols="100" spellcheck="false">' + '</textarea>'
                + '</div>'
                + '<div class="notice-reply-write-btn">'
                + '<button onclick="addChildReply(' + list[i].noticeReplyNo + ',' + list[i].childReply.parentReplyNo + ',' + result.loginUser + ',' + i + ')">' + '등록' + '</button>'
                + '<button id="addReplyCancel" onclick="addChildReplyCancel2('+ list[i].noticeReplyNo +')">' + '취소' + '</button>'
                + '</div>'
                + '</div>'
                + '</div>'
                    
                
                // 대댓글 비워주기
                str3 = "";
                str4 = "";
                str5 = "";
                
    }
    // 부모 댓글 추가한 후, 해당 부모 댓글의 요소를 변경하려면
    document.querySelector("#notice-reply").innerHTML = str1;
    
    const totalCount = list.reduce((acc, item) => acc + item.childReply.length, list.length);
    document.querySelector("#rcount").innerHTML = totalCount;
    
    
    /* ----- textare 높이 자동 조절 ----- */
    const DEFAULT_HEIGHT = 5;
    document.querySelectorAll('textarea').forEach(($textarea) => {
        $textarea.addEventListener('input', (event) => {
            const $target = event.target;
            $target.style.height = 0;
            $target.style.height = DEFAULT_HEIGHT + $target.scrollHeight + 'px';
        })
    })
    
    // replyContentUpdate 클래스를 가진 textarea에 대해 높이를 자동으로 조절하는 코드
    document.querySelectorAll('.replyContentUpdate').forEach(($textarea) => {
        $textarea.style.height = 'auto';
        $textarea.addEventListener('input', (event) => {
            const $target = event.target;
            $target.style.height = 'auto';
            $target.style.height = $target.scrollHeight + 'px';
        })
    })			
}


/* -----답글 쓰기 버튼 ----- */
function appendReply(num) {
    displayAllNone(num)
    
    // 답글 쓰기 클릭시 댓글 아래 빈 textarea 불러오기
    let replyElement = document.querySelector('#appendReply' + num);
    replyElement.style.display = "block";
}


/* ----- 답글 쓰기 취소 버튼 ----- */
function addChildReplyCancel2(num){
    let appendReplyElement = document.querySelector('#appendReply' + num);

    if (appendReplyElement) {
        appendReplyElement.style.display = 'none';
    }
}


/* ----- 댓글 수정 버튼 클릭 ----- */
function noticeReplyUpdate(num) {
    displayAllNone(num)

    // 수정하려고 보여주는 : 기존 내용이 담긴 댓글 textarea 영역
    const replyUpdateBtn = document.querySelector('#appendReplyUpdate' + num);
    // 기존에 그려주는 댓글 영역
    const noticeReplyContentId = document.getElementById('notice-reply-content' + num);

    noticeReplyContentId.style.display = "none"
    replyUpdateBtn.style.display = "block"
    
}

/* ----- 댓글 수정창 취소 버튼 클릭시 ----- */
function addReplyCancel(num) {
    
    // 수정하려고 보여주는 : 기존 내용이 담긴 댓글 textarea 영역
    const replyUpdateBtn = document.querySelector('#appendReplyUpdate' + num);
    // 기존에 그려주는 댓글 영역
    const noticeReplyContentId = document.getElementById('notice-reply-content' + num);

    noticeReplyContentId.style.display = 'block';
    replyUpdateBtn.style.display = 'none';

}

/* ----- 답글 수정 버튼 클릭 ----- */
function noticeChildReplyUpdate(num) {
    displayAllNone(num)
    
    // 대댓글 보여주는 곳
    const noticeReplyMiddleRightElement = document.getElementById("notice-child-reply-content" + num);
    // 대댓글 수정 창 : 수정 클릭시 기존 내용이 담긴 textarea
    const appendChildReplyUpdateElement = document.getElementById("appendChildReplyUpdate" + num);

    noticeReplyMiddleRightElement.style.display = "none";
    appendChildReplyUpdateElement.style.display = "block";

}

/* ----- 답글 수정창 취소 버튼 클릭시 ----- */
function addChildReplyCancel(num) {

    // 대댓글 보여주는 곳
    const noticeReplyMiddleRightElement = document.getElementById("notice-child-reply-content" + num);
    // 대댓글 수정 창 : 수정 클릭시 기존 내용이 담긴 textarea
    const appendChildReplyUpdateElement = document.getElementById("appendChildReplyUpdate" + num);
    const ChildReplyUpdateContent = document.getElementById("content" + num);

    if (appendChildReplyUpdateElement) {
        appendChildReplyUpdateElement.style.display = 'none';
    }

    if (noticeReplyMiddleRightElement) {
        noticeReplyMiddleRightElement.style.display = 'block';
    }

    ChildReplyUpdateContent.value = "";

}

/* ----- 모든 디스플레이 none으로 해주는 함수 ----- */
function displayAllNone(num){
    // 답글 쓰기 클릭시 입력할 textarea 불러오기
    const appendReplyTextarea = document.querySelectorAll(".notice-reply-parent-bottom")
    // 답글 쓰기 수정 클릭시 기존 내용이 담긴 textarea 불러오기
    const updateReplyTextarea =  document.querySelectorAll(".notice-child-reply-write-area")
    // 대댓글 그리기
    const childReplyContent = document.querySelectorAll(".notice-reply-parent-content-area")
    
    // 댓글 수정 클릭시 기존 내용이 담긴 textarea display 불러오기
    const noticeReplyContent = document.querySelectorAll(".notice-reply-all .notice-reply-write-area")
    // 댓글 그리기
    const noticeReply = document.querySelectorAll(".notice-reply-all .notice-reply-content")
    

    // 답글 쓰기 클릭시 댓글 아래 빈 textarea 돌면서 none으로 바꿔주기
    for (let i = 0; i < appendReplyTextarea.length; i++) {
        appendReplyTextarea[i].style.display = "none";
    }

    // 답글 쓰기 수정 클릭시 기존 내용이 담긴 textarea 돌기
    for (let j = 0; j < updateReplyTextarea.length; j++) {
        if (updateReplyTextarea[j].style.display === "block") {
            childReplyContent[j].style.display = "block";
        }
        updateReplyTextarea[j].style.display = "none";
    }

    // 댓글 수정 클릭시 기존 내용이 담긴 textarea display 는 block 댓글 block
    for(let i = 0; i < noticeReplyContent.length; i++) {
        if (noticeReplyContent[i].style.display === "block") {
            noticeReply[i].style.display = "block";
        }
        noticeReplyContent[i].style.display = "none";
    }
}

/* ----- textare 높이 자동 조절 ----- */
const DEFAULT_HEIGHT = 5; // textarea 기본 height
const $textarea = document.querySelector('#contentReply');

$textarea.oninput = (event) => {
    const $target = event.target;

    $target.style.height = 0;
    $target.style.height = DEFAULT_HEIGHT + $target.scrollHeight + 'px';
}