<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>

<!-- CSS -->
<link rel="stylesheet" href="resources/notice/css/notice-update-form.css">
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

<!-- JS -->
<script src="resources/notice/js/notice-update-form.js"></script>

<meta charset="UTF-8">
<title>Update Notice</title>
</head>
<body onload="noticeOnload()">
<jsp:include page="../common/header.jsp" />

	<div class="menu">
		
		<div class="notice-enroll-area">
			<div class="notice-enroll-top">
				<div class="notice-enroll-icon">
					<button onclick="history.back()" class="notice-back-btn"><ion-icon class="notice-back-icon" name="chevron-back-outline"></ion-icon></button>
				</div>
				<div class="notice-enroll-text">공지사항 작성</div>
			</div>
			
			<!-- 공지사항 작성 폼 -->
			<div class="notice-enroll-form-area-top">
				<div class="notice-enroll-form-area">
					<form id="notice-enroll-form" method="post" action="update.no" enctype="multipart/form-data">
						<input type="hidden" name="noticeNo" value="${n.noticeNo}">
						<%-- <input type="hidden" name="empNo" value="${loginUser.empNo}"> --%>
						<table class="notice-enroll-table">
							<tr>
								<th><label for="title">제목</label></th>
								<td><input type="text" id="title" class="notice-enroll-title" name="noticeTitle" value="${n.noticeTitle}" required /></td>
							</tr>
							
							<tr>
                                <th><label>기존파일</label></th>
                                <td>
	                             
	                               	<c:choose>
									    <c:when test="${not empty naList}">
									        <!-- 파일 리스트가 비어있지 않을 때 -->
									        <c:forEach var="na" items="${naList}">
									            <span class="updateForm-file-list" style="color: rgb(85, 175, 130);">${na.noticeOriginName}</span><br>
									            <!-- 원하는 다른 파일 속성을 여기에 출력할 수 있습니다 -->
									        </c:forEach>
									        <!-- 파일 경로와 파일 번호를 마지막 파일의 속성에서 가져와야 합니다 -->
									        <c:set var="lastFile" value="${naList[fn:length(naList) - 1]}" />
									        <input type="hidden" name="filePath" value="${lastFile.noticeFilePath}"/>
									        <input type="hidden" name="fileNo" value="${lastFile.noticeFileNo}"/>
									    </c:when>
									    <c:otherwise>
									        <!-- 파일 리스트가 비어있을 때 -->
									    </c:otherwise>
									</c:choose>
	                               	
                                </td>
                            </tr>
							
							
							<tr>
								<th><label for="fileInput">파일첨부</label></th>
                                <td style="height: 80px;">
                                    <div class="createLectureMaterials-file-upload-box" id="drop-area">
                                        <div class="createLectureMaterials-file-upload" ondragover="allowDrop(event)"ondragenter="highlightDropArea()"
                                            ondragleave="unhighlightDropArea()" ondrop="handleDrop(event)" >

                                            <ion-icon class="create-document-icon" name="cloud-upload-outline"></ion-icon>
                                            <span>이 곳에 파일을 드래그 하세요. 또는<span>
                                            <label id="create-fileSelected-label" for="fileInput">파일선택</label>(변경시 기존파일 삭제)
                                            <input type="file" name="reupfiles" class="create-fileSelected" id="fileInput" onchange="handleFileSelect(event)" title="파일선택" multiple="multiple" accept="undfined">
                                            </span>
                                            </span>
                                        </div>
                                        <ui class="createLectureMaterials-file-upload-wrap">
                                        </ui>
                                    </div>
                                </td>
                            </tr>
		                    
		                    <tr>
		                        <th><label for="content">내용</label></th>
		                        <td><textarea id="content" class="notice-enroll-content" rows="12" style="resize:none;" name="noticeContent" spellcheck="false" required>${n.noticeContent}</textarea></td>
		                    </tr>
						</table>
						
						<!-- 등록,취소 버튼 -->
						<div class="notice-enroll-btn">
							<button type="submit" class="notice-enroll-btn-submit">수정</button>
							<button type="reset" class="notice-enroll-btn-reset">취소</button>
						</div>
						
					</form>
				</div>
			</div>
			
		
			
		</div>
	</div>

</body>
</html>