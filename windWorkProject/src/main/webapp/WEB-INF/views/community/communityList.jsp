<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Community</title>

<!-- 부트스트랩 -->
<!-- Latest compiled and minified CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<link rel="stylesheet" href="resources/community/css/community.css">
<script src="resources/community/js/community.js"></script>

<style>

</style>

</head>
<body>
	<jsp:include page="../common/header.jsp" />
	<div class="menu">
	
		<!-- area1 : 커뮤 리스트 -->
		<div class="communityList-area1">
			
		</div>
		
		<div class="test1">
		</div>
		
		<!-- area2 : 리스트, 디테일, 수정 -->
		<div class="communityList-area2">
			<div class="communityList-container-box">
			</div>
		</div>

		<!-- area3 : 멤버 영역 -->
		<div class="communityList-area3">

		</div>

		
	</div>







	<!-- -------------------------------------- 모달 (커뮤 등록) ----------------------------------------------- -->

	<!-- The Modal -->
	<div class="modal" id="com-create">
		<div class="modal-dialog">
			<div class="modal-content">

				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title">커뮤니티 만들기</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" onclick="closeBtn()"></button>
				</div>

				<!-- Modal body -->
                    <div class="modal-body">
                        <h6>이름</h6>
                        <div class="input-group mb-3 input-group-lg">  
							<textarea id="modal-Name" name="comName" class="form-control" style="height: 50px;"></textarea>
                        </div>
                        <div>
                            <h6>소개</h6>
                            <textarea id="modal-point" name="comCont" class="form-control" style="height: 100px;"></textarea>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
						<button type="submit" id="create-btn" data-bs-dismiss="modal" onclick="createCom()">등록</button>
                    </div>
			</div>
		</div>
	</div>

	<script>
		// 모달 닫기 버튼 (내용 지우기)
		function closeBtn(){
			document.querySelector('#modal-Name').value = "";
			document.querySelector('#modal-point').value = "";
		}
		// 커뮤 등록
		function createCom(){
			let loginUserNo = '${loginUser.empNo}';
			$.ajax({
                url : "create.com",
                data : {
                    empNo : loginUserNo,
                    comName : $('#modal-Name').val(),
                    comPoint : $("#modal-point").val()
                },
                success: function(res){
					if(res == "success"){
						swal("등록 완료")
						$('#modal-Name').val("");
                		$("#modal-point").val("");
						myCommunityList();
						comListAll();
					} else {
						console.log("create 실패")
					}
                },
                error : function(){
                    console.log("실패");
                }
            })
		}
	</script>


<!-- -------------------------------------- 모달 (커뮤 수정) ----------------------------------------------- -->

	<!-- The Modal -->
	<div class="modal" id="com-update">
		<div class="modal-dialog">
			<div class="modal-content">

				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title">커뮤니티 수정</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>

				<!-- Modal body -->
                    <div class="modal-body">
                        <h6>이름</h6>
                        <div class="input-group mb-3 input-group-lg">  
							<textarea id="modal-name" name="comName" class="form-control" style="height: 50px;"></textarea>
                        </div>
                        <div>
                            <h6>소개</h6>
                            <textarea id="modal-point-" name="comCont" class="form-control" style="height: 100px;"></textarea>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div id="modal-footer" class="modal-footer">
						<button type="submit" id="delete-btn" data-bs-dismiss="modal" onclick="daleteCom()">삭제</button>
						<button type="submit" id="update-btn" data-bs-dismiss="modal" onclick="updateCom()">수정</button>
                    </div>
			</div>
		</div>
	</div>
	
	<script>
		// 모달에 내용 채우기
	   	function comUpdateModal(){
			document.querySelector('#modal-name').value = document.querySelector('#select-com-name').textContent;
			document.querySelector('#modal-point-').value = document.querySelector('#select-com-point').value;
		}	

		// 커뮤 수정
		function updateCom(){
			$.ajax({
				url: "update.com",
				data: {
					comName: document.querySelector('#modal-name').value,
					comPoint: document.querySelector('#modal-point-').value,
					comNo: document.querySelector('#select-com-no-').value,
				},
				success: function (res) {
					if(res == "success"){
						swal("수정 완료")
							myCommunityList();
							selectCommunityMemberList(document.querySelector('#select-com-no-').value)
						} else {
							console.log("수정 실패")
						}
				},
				error: function () {
					console.log("실패");
				}
			});
		}

		// 커뮤 삭제
		function daleteCom(){

			swal({
				text : "※주의※ 삭제 후 복구할 수 없습니다.",
				buttons: ["취소" , "획인"]
			})
			.then(function(result){
				
				if(result){
					$.ajax({
					url: "delete.com",
					data: {
						comNo: document.querySelector('#select-com-no-').value,
					},
					success: function (res) {
						if(res == "success"){
								myCommunityList(function (startList) {
									selectCommunityOne(startList);
								});
							} else {
								console.log("수정 실패")
							}
					},
					error: function () {
						console.log("실패");
					}
				});
				}
				
			})
		}


	</script>


	<!-- -------------------------------------- 모달 (대댓글 작성) ----------------------------------------------- -->

	<!-- The Modal -->
	<div class="modal" id="reReply-Insert">
		<div class="modal-dialog">
			<div class="modal-content">

				<!-- Modal Header -->
				<div class="modal-header">
					<h5 class="modal-title">답글 작성</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" onclick="reReplyContentDelete()"></button>
				</div>

				<!-- Modal body -->
                    <div class="modal-body">
                        <h6>내용</h6>
                        <div class="input-group mb-3 input-group-lg">  
							<textarea id="modal-reReply-content" name="reReply-content" class="form-control" style="height: 50px;"></textarea>
                        </div>
						<input type="hidden" id="modal-hidden-value" value="">
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
						<button type="submit" id="create-btn" data-bs-dismiss="modal" onclick="reReplyInsert()">등록</button>
                    </div>
			</div>
		</div>
	</div>

	<script>

		$(document).ready(function () {
			// 모달이 열릴 때 이벤트 핸들러
			$('#reReply-Insert').on('show.bs.modal', function (event) {
			let selectDiv = $(event.relatedTarget); // 클릭된 요소
			let nameValue = selectDiv.attr('name'); // 클릭된 요소의 name 속성 값
			$("#modal-hidden-value").val(nameValue); // 모달 내부에 name 값 입력
			});
		});
  
		function reReplyInsert(){
			let bno = document.querySelector('#curBoardNo').value;
			let loginUserEmpNo = '${loginUser.empNo}';

			$.ajax({
					url: "reReplyIn.com",
					data: {
						replyNo: document.querySelector('#modal-hidden-value').value,
						boardNo: bno,
						empNo: loginUserEmpNo,
						reReplyContent: document.querySelector('#modal-reReply-content').value,
					},
					success: function (res) {
						if(res == "success"){
								swal("등록 완료")
								document.querySelector('#modal-reReply-content').value = "";
								selectBoard(bno)	
							} else {
								console.log("수정 실패")
							}
					},
					error: function () {
						console.log("실패");
					}
				});
		}

		// 내용 비우기
		function reReplyContentDelete(){
			document.querySelector('#modal-reReply-content').value = "";
		}
	</script>



	<!-- -------------------------------------- 모달 (댓글, 대댓글 수정) ----------------------------------------------- -->

	<!-- The Modal -->
	<div class="modal" id="reply-update">
		<div class="modal-dialog">
			<div class="modal-content">

				<!-- Modal Header -->
				<div class="modal-header">
					<h5 class="modal-title">댓글 수정</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" onclick=""></button>
				</div>

				<!-- Modal body -->
                    <div class="modal-body">
                        <h6>내용</h6>
                        <div class="input-group mb-3 input-group-lg">  
							<textarea id="modal-reply-update-content" name="reReply-content" class="form-control" style="height: 50px;"></textarea>
                        </div>
						<input type="hidden" id="modal-hidden-No" value="">
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
						<button type="submit" id="create-btn" data-bs-dismiss="modal" onclick="replyUpdate()">수정</button>
                    </div>
			</div>
		</div>
	</div>

	<script>
		$(document).ready(function () {
			// 모달이 열릴 때 이벤트 핸들러
			$('#reply-update').on('show.bs.modal', function (event) {
			let selectDiv = $(event.relatedTarget); // 클릭된 요소
			let comReNo = selectDiv.attr('data-name1'); // 클릭된 요소의 name 속성 값
			let comReCont = selectDiv.attr('data-name2');
			$("#modal-hidden-No").val(comReNo); // 모달 내부에 name 값 입력
			$("#modal-reply-update-content").val(comReCont)
			});
		});

		function replyUpdate(){
			let bno = document.querySelector('#curBoardNo').value;
			$.ajax({
					url: "replyUp.com",
					data: {
						replyNo: document.querySelector('#modal-hidden-No').value,
						boardNo: bno,
						updateContent: document.querySelector('#modal-reply-update-content').value,
					},
					success: function (res) {
						if(res == "success"){
							swal("수정 완료")
								// document.querySelector('#modal-reReply-content').value = "";
								selectBoard(bno)
							} else {
								console.log("수정 실패")
							}
					},
					error: function () {
						console.log("실패");
					}
				});
		}
	</script>

	
	<!-- ------------------------------------------------ 스크립트 --------------------------------------------------------- -->
	
	<script>
		onload = function(){
			currentUser.empNo = '${loginUser.empNo}';
			currentUser.empName = '${loginUser.empName}';

			myCommunityList(function (startList) {
				selectCommunityOne(startList);
			});
			
			document.querySelector("#nav-com-bar").classList.add('active');
			document.querySelector("#navbar").style.background = 'rgb(85, 175, 130)';
		}
	</script>


</body>
</html>


