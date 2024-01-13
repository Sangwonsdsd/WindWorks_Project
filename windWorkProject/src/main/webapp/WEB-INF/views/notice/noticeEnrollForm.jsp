<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>

<!-- CSS -->
<link rel="stylesheet" href="resources/notice/css/notice-enroll-form.css">

<!-- JS -->
<script src="resources/notice/js/notice-enroll-form.js"></script>

<meta charset="UTF-8">
<title>Enroll Notice</title>
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
					<form id="notice-enroll-form" method="post" action="insert.no" enctype="multipart/form-data">
						<input type="hidden" name="empNo" value="${loginUser.empNo}">
						<table class="notice-enroll-table">
							<tr>
								<th><label for="title">제목</label></th>
								<td><input type="text" id="title" class="notice-enroll-title" name="noticeTitle" required /></td>
							</tr>
							<tr>
		                        <th><label>파일첨부</label></th>
		                        <td>
			                        <div class="createLectureMaterials-file-upload-box" id="drop-area">
                                        <div class="createLectureMaterials-file-upload" ondragover="allowDrop(event)" ondragenter="highlightDropArea()"
											ondragleave="unhighlightDropArea()" ondrop="handleDrop(event)">
			                        		
			                        		<ion-icon class="create-document-icon" name="cloud-upload-outline"></ion-icon>
			                        		<label id="create-fileSelected-label" for="upfile">파일 선택</label>
                                            <input type="file" name="upfile" id="upfile" class="create-fileSelected"  onchange="handleFileSelect(event)" title="파일선택" multiple="multiple" accept="undfined">
                                            </span>
                                            </span>
			                        
			                        	</div>
                                        <ui class="createLectureMaterials-file-upload-wrap"></ui>
                                    </div>
		                        </td>
		                    </tr>
		                    <tr>
		                        <th><label for="content">내용</label></th>
		                        <td><textarea id="content" class="notice-enroll-content" rows="12" style="resize:none;" name="noticeContent" spellcheck="false" required></textarea></td>
		                    </tr>
						</table>
						
						<!-- 등록,취소 버튼 -->
						<div class="notice-enroll-btn">
							<button type="submit" class="notice-enroll-btn-submit">등록</button>
							<button type="reset" class="notice-enroll-btn-reset">취소</button>
						</div>
						
					</form>
				</div>
			</div>
			
		</div><!-- <div class="notice-enroll-area"> -->
	</div><!-- <div class="menu"> -->
	
	<script>
	
	</script>

</body>
</html>