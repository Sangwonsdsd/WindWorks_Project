<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>

<!-- CSS -->
<link rel="stylesheet" href="resources/notice/css/notice-detail-view.css">

<!-- JavaScript -->
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- JS -->
<script src="resources/notice/js/notice-detail-view.js"></script>
<script src="resources/notice/js/notice-detail-view-Ajax.js"></script>

<meta charset="UTF-8">
<title>Notice Detail</title>
</head>
<body onload="selectReplyList('${n.noticeNo}'), noticeOnload()">  

<jsp:include page="../common/header.jsp" />

	<c:if test="${!empty alertMsg}">
		
		<c:remove var="alertMsg" scope="session" />
	</c:if>
	
	<div class="menu">
		<div class="notice-detail-area">
		
			<!-- 공지사항 디테일  -->
			<div class="notice-detail-view">
				
				<div class="notice-top">
					<div class="notice-title">
						<button onclick="history.back()" class="notice-back-btn"><ion-icon class="notice-back-icon" name="chevron-back-outline"></ion-icon></button>
						${n.noticeTitle}
					</div>
					<div class="notice-top-right">
						<div class="notice-writer">
							${n.empName}
						</div>
						<div class="notice-date">
							${n.noticeCreateDate}
						</div>
					</div>
				</div>
				
				<div class="notice-middle">
					<div class="notice-content">
						<pre>${n.noticeContent}</pre>
					</div>
					
					<div class="notice-middle-right">
					
						<c:if test="${loginUser.empNo eq n.empNo}">
							<button class="notice-update-btn" onclick="noticeFormSubmit(1)">수정</button>
							<div>|</div>
							<button class="notice-delete-btn" onclick="noticeFormSubmit(2)">삭제</button>
						</c:if>
						
						<form action="" method="post" id="updateForm">
							<input type="hidden" name="nno" value="${n.noticeNo}">
							<input type="hidden" name="filePath" value="${na.noticeChangeName}">
						</form>
						
						<script>
							function noticeFormSubmit(num){
								if(num === 1){
									$("#updateForm").attr('action', 'updateForm.no');
									// document.querySelector("updateForm").setAttribute('action', 'updateForm.no')
								} else {
									$("#updateForm").attr('action', 'delete.no');
								}
								$("#updateForm").submit();
							}
						</script>
					</div>
				</div>
				
				<div class="notice-bottom">
				    <!-- 파일 리스트를 돌면서 -->
				    <c:choose>
				        <c:when test="${!empty naList}">
				            <div class="notice-attachment">
				            <c:forEach var="na" items="${naList}">
				                <a href="${na.noticeChangeName}" download="${na.noticeOriginName}" style="color: rgb(85, 175, 130);">${na.noticeOriginName}</a><br>
				            </c:forEach>
				            </div>
				        </c:when>
				        <c:otherwise>
				            <!-- 파일 리스트가 없을 때 -->
				            <div class="notice-attachment">
				                	첨부된 파일이 없습니다.
				            </div>
				        </c:otherwise>
				    </c:choose>
				</div>
					
				<!-- 공지사항 댓글 -->
				<div class="notice-reply-area">
					<div class="notice-reply-top">
						댓글 (<span id="rcount">0</span>)
					</div>
					
					<div id="notice-reply" class="notice-reply-middle">
					</div> 
					
					<!-- 댓글작성영역 -->
					<div class="notice-reply-bottom">
						<div class="notice-reply-write-area">
							<div class="notice-reply-write-writer">${loginUser.empName}</div>
							<div class="notice-reply-write-content">
								<textarea id="contentReply" rows="1" cols="100" placeholder="댓글을 입력해주세요"></textarea>
							</div>
							<div class="notice-reply-write-btn">
								<button onclick="addReply('${n.noticeNo}', '${loginUser.empNo}');">등록</button>
							</div>
						</div>
					</div>
				</div>

			</div><!-- <div class="notice-detail-view"> -->
		</div><!-- <div class="notice-detail-area"> -->
	</div><!-- <div class="menu"> -->

</body>
</html>