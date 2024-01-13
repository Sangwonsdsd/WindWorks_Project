
// 전역변수
const currentCommunity = {
}
const currentUser = {

}



function detailGoBack() {
    document.querySelector(".communityList-container-box").innerHTML = "";
    selectCommunityBoardList(currentCommunity.comNo, 1);
}



// 내 커뮤니티 리스트
function myCommunityList(callback) {
    $.ajax({
        url: "myComList.com",
        data: {},
        success: function (res) {
            let str = "";
            str += '<div class="communityList-area1-button-div"><button class="communityList-area1-button" onclick="comBoardCreateForm()">글쓰기</button></div>' +
                '<div class="communityList-area1-title">' +
                '<div><h5>내 커뮤니티</h5></div>' +
                '<button class="plus-btn" onclick="comListAll()"><div>&#43;</div></button>' +
                '</div>' +
                '<ul class="communityList-area1-li">';
            for (let i = 0; i < res.length; i++) {
                str += '<li id="startList' + i + '" name="' + res[i].communityNo + '" onclick="selectCommunityOne(this)">' + res[i].communityName + '</li>';
            }
            str += '</ul>';
            document.querySelector(".communityList-area1").innerHTML = str;

            let startList = document.getElementById('startList0');
            callback(startList);
        },
        error: function () {
            console.log("실패");
        }
    });
}



// 리스트 선택시 실행될 함수
function selectCommunityOne(clickedElement) {
    let selectComNo = clickedElement.getAttribute('name');
    
    // currentList이름을 가진 리스트 가져와서 클래스명 지우기
    let currentLists = document.getElementsByClassName("currentList");
    for (var i = 0; i < currentLists.length; i++) {
        currentLists[i].classList.remove("currentList");
    }
    // 선택한 리스트에 currentList 클래스명 부여하기
    clickedElement.classList.add('currentList');


    selectCommunityColorChange(clickedElement); // 색바꾸기
    selectCommunityMemberList(selectComNo); // 멤버 리스트 조회
    // 게시글 조회
    $(".communityList-container-box").empty();
    selectCommunityBoardList(selectComNo, 1);
}

// 리스트 색 바꾸기
function selectCommunityColorChange(clickedElement){
    // 전체 리스트색 초기화
    var allElements = document.querySelectorAll('.communityList-area1-li li');
    allElements.forEach(element => {
        element.style.backgroundColor = '';
    });
    // 선택 리스트색 바꾸기
    clickedElement.style.backgroundColor = 'rgba(85, 175, 130, 0.2)';
}

// 멤버 리스트 조회
function selectCommunityMemberList(selectComNo){
    let loginUserNo = currentUser.empNo;
    $.ajax({
        url: "memberList.com",
        data:{
            comNo : selectComNo,
        },
        success: function(res){
            // 전역변수에 값 저장
            currentCommunity.comNo = res[0].communityNo;  
            currentCommunity.comName = res[0].communityName;

            let str = "";
            str +=  '<div class="communityList-area3-title">' +
                        '<h5 id="select-com-name">'+ res[0].communityName +'</h5>' +
                        '<div data-bs-toggle="modal" data-bs-target="#com-update" onclick="comUpdateModal()"><ion-icon style="width:20px; height:20px" name="cog-outline"></ion-icon></div>' +
                    '</div>' +
                    '<div class="communityList-area3-member">' +
                        '<div><h5>멤버</h5></div>' +
                    '</div>' +
                    '<ul class="communityList-area3-li">'
            for (let list of res){
                str += '<li>' + list.empName + " " + list.jobName + '</li>'
            }
            str += '</ul>' +
                    '<div class="communityList-area3-title-btn2-box">' +
                        '<button class="communityList-area3-title-btn2" onclick="comOut(' + res[0].communityNo + ',' + loginUserNo + '); location.reload(true);"><div>탈퇴하기</div></button>' +
                        '</div>' +
                        '<input type="hidden" id="select-com-point" value="' + res[0].communityPoint + '"/>'+
                        '<input type="hidden" id="select-com-no-" value="' + res[0].communityNo + '"/>'

            document.querySelector(".communityList-area3").innerHTML = str;
        },
        error : function(){
               console.log("실패")
        }
    })
}

// 게시글 리스트 가져오기
function selectCommunityBoardList(selectComNo, cpage){
    $.ajax({
        url: "boardList.com",
        data:{
            comNo : selectComNo,
            cpage : cpage
        },
        success: function(res){
            let blist = res.boardList;
            let pi = res.pi;

            // 만약 위에 더보기 버튼이 있다면 없애주기
            if(document.getElementById('btn'+(cpage-1)) !== null){
                document.getElementById('btn'+(cpage-1)).style.display = "none";
            }
            
            let str = "";
            for (let list of blist){
                str += '<div class="communityList-area2-container" onclick="boardDetailView(' + list.communityBoardNo + ')">' +
                            '<div class="communityList-area2-container-content">' +
                                '<div class="communityList-area2-container-content-title">' +
                                    '<div class="overflow-hidden communityList-area2-container-content-title1">' + list.communityBoardTitle + '</div>' +
                                    '<div class="communityList-area2-container-content-title2"></div>' +
                                    '<div class="communityList-area2-container-content-title3"></div>' +
                                '</div>' +
                                '<div class="overflow-hidden communityList-area2-container-content-content">' + list.communityBoardContent + '</div>' +
                                '<div class="communityList-area2-container-content-profile">' +
                                    '<div class="communityList-area2-container-content-profile-image">' + '<img class="communityList-area2-img" src="'+ list.profileFilePath +'">' + '</div>' +
                                    '<div class="communityList-area2-container-content-profile-name">' + list.empName + '</div>' +
                                    '<div class="communityList-area2-container-content-profile-date">' + list.communityBoardCreateDate + '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="communityList-area2-container-like">' +
                                '<div>' + '<ion-icon name="chatbox-ellipses-outline" class="nav__icon"></ion-icon>' + '</div>' +
                                '<div>' + list.communityBoardReplyCount + '</div>' +
                            '</div>' +
                        '</div>'
            }

            // 이 부분에서 새로운 데이터를 기존 데이터 뒤에 추가
            $(".communityList-container-box").append(str);

            // 더보기 버튼 추가
            if(cpage != pi.maxPage){
                cpage++;
                str = '<div class="moreBtn" id="btn'+ (cpage-1) +'" onclick="selectCommunityBoardList(\'' + selectComNo + '\', \'' + cpage + '\')">더보기</div>';
                $(".communityList-container-box").append(str);
            }
           },
           error : function(){
               console.log("실패")
           }
    })
}

// 게시글 디테일 (보드 + 댓글) 조회
function boardDetailView(bno){
    selectBoard(bno);

}

// 보드 디테일 조회
function selectBoard(bno){
    let loginUserNo = currentUser.empNo;
    $.ajax({
        url: "board.com",
        data:{
            bno: bno
        },
        success: function(res){
            let board = res.board;
            let atList = res.atList;

            let str = "";
            
            str += '<div class="communityList-area2-detail-title-area">' +
                        '<div class="communityList-area2-detail-title-title">' +
                            '<div class="communityList-area2-detail-title-title-title">' +
                                '<div class="back-icon cursor" onclick="detailGoBack()">&lt;</div>' +
                                '<div class="detail-title">' + board.communityBoardTitle + '</div>' +
                            '</div>' +
                            '<div class="communityList-area2-detail-title-title-profile">' +
                                '<div class="profile-image"><img style="width: 25px; height: 25px; border-radius: 50%;" src="' + board.profileFilePath + '"></div>' +
                                '<div class="profile-name">' + board.empName + '</div>' +
                                '<div class="profile-date">' + board.communityBoardCreateDate + '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="communityList-area2-detail-title-like">'
                        if(board.empNo == loginUserNo){
                        str +=	'<button class="boardDetailUpdateBtn" onclick="boardUpdate(' + board.communityBoardNo + ')">수정</button>' +
                            '<button class="boardDetailDeleteBtn" onclick="boardDelete(' + board.communityBoardNo + ')">삭제</button>'
                        }
                        str += '</div>' +
                    '</div>' +
                    '<div class="communityList-area2-detail-content">' +
                        '<div class="detail-content">' + board.communityBoardContent + '</div>' +
                        '<div class="detail-file">' + // 파일 리스트 들어갈 곳

                        '</div>' +
                    '</div>' +
                    '<div class="communityList-area2-detail-reply">' +
                        '<div class="reply-title-area">' +
                            '<div>댓글 (' + board.communityBoardReplyCount + ')</div>' +
                            '<div></div>' +
                        '</div>' +
                        '<hr>' +
                        '<table class="reply-table">' +//댓글 들어갈 곳
                        '</table>' +
                    '</div>' +

                    // 댓글 작성 영역
                    '<div class="notice-reply-bottom">' +
                        '<div class="notice-reply-write-area">' +
                            '<div class="notice-reply-write-writer">'+ currentUser.empName +'</div>' +
                            '<div>' +
                                '<textarea cols="100" placeholder="댓글을 입력해주세요" id="reply-content"></textarea>' +
                            '</div>' +
                            '<div class="notice-reply-write-btn">' +
                                '<button onclick="insertReply(' + board.communityBoardNo + ')">등록</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>'+
                    '<input type="hidden" id="curBoardNo" value="' + board.communityBoardNo + '">'

            document.querySelector(".communityList-container-box").innerHTML = str;

            let str2 ="";
            for (let list of atList){
                str2 += '<div><a href="'+ list.communityChangeName +'" download="'+ list.communityOriginName +'">'+ list.communityOriginName +'</a></div>'
            }
            document.querySelector(".detail-file").innerHTML = str2;
            // 댓글 리스트 조회
            selectReplyList(bno)
        },
        error : function(){
            console.log("실패")
        }
    })
}

// 댓글, 대댓글 리스트 조회
function selectReplyList(bno){
    let loginUserEmpNo = currentUser.empNo;
    $.ajax({
        url: "replyList.com",
        data:{
            bno: bno
        },
        success: function(res){
            let reList = res.reList;
            let reReList = res.reReList;

            let str = "";
            for (let list of reList){
                str += '<tr class="reply-table-tr" id="rNo' + list.communityReplyNo + '">' +
                            '<td class="reply-name">'+ list.empName +'</td>' +
                            '<td class="reply-content">' + list.communityReplyComment + '</td>' +
                            '<td class="reply-update-date-area">'
                if(list.empNo == loginUserEmpNo){
                    str += '<div class="reply-update-area">' +
                                    '<div class="cursor" data-name1="' + list.communityReplyNo + '" data-name2="' + list.communityReplyComment + '" data-bs-toggle="modal" data-bs-target="#reply-update">수정</div>' +
                                    '<div>|</div>' +
                                    '<div class="cursor" onclick="deleteReply(' + list.communityReplyNo + ',' + bno + ')">삭제</div>' +
                            '</div>'
                } else{
                    str += '<div class="reply-update-area cursor" name="' + list.communityReplyNo + '" data-bs-toggle="modal" data-bs-target="#reReply-Insert">답글</div>'
                }

                    str += '<div class="replyDate">'+ list.communityReplyCreateDate +'</div>' +
                            '</td>' +
                        '</tr>'		
            }
            document.querySelector(".reply-table").innerHTML = str;

            // 대댓글 조회
            for (let list of reReList){
                let str2 = '<tr class="reReply-table-tr" id="rNo' + list.communityReplyNo + '">' +
                            '<td class="reply-name"><ion-icon name="return-down-forward-outline" style="width: 18px; height: 18px; padding-right: 4px;"></ion-icon>'+ list.empName +'</td>' +
                            '<td class="reply-content">' + list.communityReplyComment + '</td>' +
                            '<td class="reply-update-date-area">'
                    if(list.empNo == loginUserEmpNo){
                        str2 += '<div class="reply-update-area">' +
                                        '<div class="cursor" data-name1="' + list.communityReplyNo + '" data-name2="' + list.communityReplyComment + '" data-bs-toggle="modal" data-bs-target="#reply-update">수정</div>' +
                                        '<div>|</div>' +
                                        '<div class="cursor" onclick="deleteReply(' + list.communityReplyNo + ',' + bno + ')">삭제</div>' +
                                '</div>'
                    } else{
                        str2 += '<div class="reply-update-area"></div>'
                    }
                        str2 += '<div class="replyDate">'+ list.communityReplyCreateDate +'</div>' +
                                '</td>' +
                            '</tr>'	
                // 부모 EL찾아서 밑에 넣어주기
                let selectEl = document.querySelector('#rNo' + list.parentReplyNo);
                selectEl.insertAdjacentHTML('afterend', str2);
            }
        },
        error : function(){
            console.log("실패")
        }
    })
}

// 댓글 작성
function insertReply(bno){
    let loginUserEmpNo = currentUser.empNo;
    let content = document.querySelector("#reply-content").value;

    swal({
		text : "등록하시겠습니까?",
		buttons: ["취소" , "확인"]
	})
	.then(function(result){
        
        if(result){
        	$.ajax({
                url: "replyIn.com",
                data: {
                    bno: bno,
                    eno: loginUserEmpNo,
                    reCont: content,
                },
                success: function (res) {
                    if(res == "success"){
                        selectBoard(bno)
                        document.querySelector("#reply-content").value = "";
                    } else {
                        console.log("insert실패")
                    }
                },
                error: function () {
                    console.log("실패");
                }
            });
        }
        
	})
}

// 댓글 삭제
function deleteReply(rno, bno){

    swal({
		text : "삭제하시겠습니까",
		buttons: ["취소" , "확인"]
	})
	.then(function(result){
        if(result){
        	$.ajax({
                url: "replyDel.com",
                data: {
                    rno: rno
                },
                success: function (res) {
                    if(res == "success"){
                        selectBoard(bno)
                    } else {
                        console.log("insert실패")
                    }
                },
                error: function () {
                    console.log("실패");
                }
            });
        }
        
	})

}


// 전체 커뮤 리스트
function comListAll(){
    let loginUserEmpNo = currentUser.empNo;
    $.ajax({
        url: "listAll.com",
        data:{
            empNo: loginUserEmpNo
        },
        success: function(res){
            let allList = res.allList;
            let myList = res.myList;
            let str = "";
            str +=  '<div class="community-join-area">' +
                        '<div class="community-join-title">커뮤니티 목록</div><br>' +
                        '<div class="comInsert">' +
                        '<div data-bs-toggle="modal" data-bs-target="#com-create">커뮤니티 만들기</div>' +
                    '</div>' +
                    '<br>' +
                    '<table class="community-join-table">'
            for (let list of allList){
                str += '<tr class="community-join-table-tr">' +
                            '<td class="community-join-table-td1">' +
                                '<div class="community-join-name">'+ list.communityName +'</div>' +
                                '<div class="community-join-point">'+ list.communityPoint +'</div>' +
                            '</td>' +
                            '<td class="join-btn-area">'
                    let checkCount = 0;
                    for (let list2 of myList){
                        if (list.communityNo == list2.communityNo){
                            checkCount++;
                        }
                    }
                    if (checkCount > 0){
                        str += '<button class="join-btn1 join-btn" onclick="comOut(' + list.communityNo + ',' + loginUserEmpNo + '); comListAll();">탈퇴하기</button>'
                    } else{
                        str += '<button class="join-btn2 join-btn" onclick="comIn(' + list.communityNo + ',' + loginUserEmpNo + ')">가입하기</button>'
                    }

                    str += '</td></tr>'	
            }
            str +=	'</table></div>';
            document.querySelector(".communityList-container-box").innerHTML = str;
            // area3 비워주기
            document.querySelector(".communityList-area3").innerHTML = "";
        },
        error : function(){
            console.log("실패")
        }
    })
}

// 커뮤 가입
function comIn(comNo, empNo){

    swal({
		text : "가입하시겠습니까?",
		buttons: ["취소" , "확인"]
	})
	.then(function(result){
        
        if(result){
        	$.ajax({
                url: "comIn.com",
                data:{
                    comNo: comNo,
                    empNo: empNo
                },
                success: function(res){
                    if(res == "success"){
                            myCommunityList();
                            comListAll();
                    } else {
                        console.log("insert실패")
                    }
                },
                error : function(){
                    console.log("실패")
                }
            })
        }
        
	})
    
}

// 커뮤 탈퇴
function comOut(comNo, empNo){
    swal({
		text : "탈퇴하시겠습니까?",
		buttons: ["취소" , "확인"]
	})
	.then(function(result){
		console.log(result);
        
        if(result){
        	$.ajax({
                url: "comOut.com",
                data:{
                    comNo: comNo,
                    empNo: empNo
                },
                success: function(res){
                    if(res == "success"){
                        myCommunityList();
                        comListAll();
                    } else {
                        console.log("delete 실패")
                    }
                },
                error: function() {
                    console.log("실패")
                }
            })
        }
        
	})

}


// 글쓰기 폼
function comBoardCreateForm(){
    let str = "";
    str +='<div class="communityList-area2-all">' +
            '<div class="communityEnrollForm-title">글쓰기</div>' +
            '<form action="createBo.com" method="post" enctype="multipart/form-data">' +
                '<table class="communityEnrollForm-table">' +
                    '<tr>' +
                        '<td class="td1">분류</td>' +
                        '<td>' +
                            '<input type="hidden" name="empNo" value="' + currentUser.empNo + '"/>'+
                            '<input type="hidden" name="communityNo" value="' + currentCommunity.comNo + '"/>'+
                            '<input class="td-name" type="text" value="' + currentCommunity.comName + '" readonly>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="td1">제목</td>' +
                        '<td><input type="text" name="communityBoardTitle" class="td2 table-title" id="create-board-title"></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="td1 test-up">파일첨부</td>' +
                        '<td style="height: 80px;">' +
                            '<div class="createLectureMaterials-file-upload-box" id="drop-area">' +
                                '<div class="createLectureMaterials-file-upload" ondragover="allowDrop(event)"ondragenter="highlightDropArea()" ' +
                                    'ondragleave="unhighlightDropArea()" ' +
                                    'ondrop="handleDrop(event)" >' +

                                    '<ion-icon class="create-document-icon" name="cloud-upload-outline"></ion-icon>' +
                                    '<span>이 곳에 파일을 드래그 하세요. 또는<span>' +
                                    '<label id="create-fileSelected-label" for="fileInput">파일선택</label>' +
                                    '<input type="file" name="filesss" class="create-fileSelected" id="fileInput" onchange="handleFileSelect(event)" title="파일선택" multiple="multiple" accept="undfined">' +
                                    '</span>' +
                                    '</span>' +
                                '</div>' +
                                '<ui class="createLectureMaterials-file-upload-wrap"></ui>' +
                            '</div>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="td1 test-up">내용</td>' +
                        '<td><textarea class="td2" id="create-board-content" name="communityBoardContent" id="" cols="30" rows="10"></textarea></td>' +
                    '</tr>' +
                '</table>' +
                '<div class="form-button-all">' +
                    '<button class="form-button1" type="submit">등록</button>' +
                    '<button class="form-button2" onclick="backCreateBo()">취소</button>' +
                '</div>' +
            '</form>' +
        '</div>' 
        document.querySelector(".communityList-container-box").innerHTML = str;


}


// 파일 업로드 관련
function allowDrop(event) {
    event.preventDefault();
}
function highlightDropArea() {
    document.getElementById('drop-area').classList.add('createLectureMaterials-file-upload-box2');
}
function unhighlightDropArea() {
    document.getElementById('drop-area').classList.remove('createLectureMaterials-file-upload-box2');
}
function handleDrop(event) {
    event.preventDefault();
    unhighlightDropArea();

    const files = event.dataTransfer.files;
    handleFiles(files);
}
function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

// 파일 정보를 삭제하는 함수
function removeFile(element) {
    let listItem = element.parentNode;
    listItem.parentNode.removeChild(listItem);
}

function handleFiles(files) {
    for (const file of files) {
        let fileName = file.name;
            let fileSize = file.size;

            // 리스트 아이템 생성
            let listItem = document.createElement('li');
            listItem.className = 'fileItem';
            listItem.innerHTML = ' <span class="closeButton">파일 이름: ' + fileName + '</span>'
                + '<span class="closeButton">파일 크기: ' + formatBytes(fileSize) + '</span>'
                + '<span class="closeButton" onclick="removeFile(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">'
                + '<path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"></path>'
                + '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>'
                + '</span>'    

            // 파일 정보를 표시하는 ul에 추가
            document.querySelector('.createLectureMaterials-file-upload-wrap').appendChild(listItem);
    }
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 게시글 삭제
function boardDelete(bno){
    swal({
		text : "삭제하시겠습니까?",
		buttons: ["취소" , "확인"]
	})
	.then(function(result){
        
        if(result){
            location.href = "deleteBo.com?bno=" + bno;
        }
        
	})


}

// 게시글 수정
function boardUpdate(bno){
    $.ajax({
        url: "updateBoForm.com",
        data:{
            bno: bno,
        },
        success: function(res){
            let board = res.board;
            let atList = res.atList;
            console.log(atList)

            let str = "";
            str +='<div class="communityList-area2-all">' +
                    '<div class="communityEnrollForm-title">글쓰기 수정</div>' +
                    '<form action="updateBo.com" method="post" enctype="multipart/form-data">' +
                        '<table class="communityEnrollForm-table">' +
                            '<tr>' +
                                '<td class="td1">분류</td>' +
                                '<td>' +
                                    '<input type="hidden" name="empNo" value="' + currentUser.empNo + '"/>'+
                                    '<input type="hidden" name="communityNo" value="' + currentCommunity.comNo + '"/>'+
                                    '<input type="hidden" name="communityBoardNo" value="' + board.communityBoardNo + '"/>'+
                                    '<input class="td-name" type="text" value="' + currentCommunity.comName + '" readonly>' +
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="td1">제목</td>' +
                                '<td><input type="text" name="communityBoardTitle" class="td2 table-title" id="create-board-title" value="' + board.communityBoardTitle + '"></td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="td1 test-up">기존파일</td>' +
                                '<td>'
                            for (let list of atList){
                                str += '<span class="updateForm-file-list">'+ list.communityOriginName +'</span>' +
                                    '<input type="hidden" name="filePath" value="' + list.communityFilePath + '"/>' +
                                    '<input type="hidden" name="fileNo" value="' + list.communityFileNo + '"/>'
                                }
                                str += '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="td1 test-up">파일첨부</td>' +
                                '<td style="height: 80px;">' +
                                    '<div class="createLectureMaterials-file-upload-box" id="drop-area">' +
                                        '<div class="createLectureMaterials-file-upload" ondragover="allowDrop(event)"ondragenter="highlightDropArea()" ' +
                                            'ondragleave="unhighlightDropArea()" ' +
                                            'ondrop="handleDrop(event)" >' +

                                            '<ion-icon class="create-document-icon" name="cloud-upload-outline"></ion-icon>' +
                                            '<span>이 곳에 파일을 드래그 하세요. 또는<span>' +
                                            '<label id="create-fileSelected-label" for="fileInput">파일선택</label> (변경시 기존파일 삭제)' +
                                            '<input type="file" name="reupfiles" class="create-fileSelected" id="fileInput" onchange="handleFileSelect(event)" title="파일선택" multiple="multiple" accept="undfined">' +
                                            '</span>' +
                                            '</span>' +
                                        '</div>' +
                                        '<ui class="createLectureMaterials-file-upload-wrap">' +
                                        '</ui>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="td1 test-up">내용</td>' +
                                '<td><textarea class="td2" id="create-board-content" name="communityBoardContent" id="" cols="30" rows="10">'+ board.communityBoardContent +'</textarea></td>' +
                            '</tr>' +
                        '</table>' +
                        '<div class="form-button-all">' +
                            '<button class="form-button1" type="submit">등록</button>' +
                            '<button class="form-button2" onclick="backCreateBo()">취소</button>' +
                        '</div>' +
                    '</form>' +
                '</div>' 
                document.querySelector(".communityList-container-box").innerHTML = str;

        },
        error: function() {
            console.log("실패")
        }
    })
}

// 게시글 작성, 수정에서 취소버튼
function backCreateBo(){
    //event.preventDefault(); // 이벤트의 기본 동작을 막음 (create.bo가 실행되는 이슈)
    document.querySelector(".communityList-container-box").innerHTML = '';

    // 현재 선택된 커뮤니티 글 다시 불러오기
    let currentListNo = document.querySelector(".currentList").getAttribute("name");
    selectCommunityBoardList(currentListNo, 1);
}


