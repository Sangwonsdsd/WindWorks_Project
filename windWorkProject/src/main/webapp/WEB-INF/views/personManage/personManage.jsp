<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>PersonManage</title>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<!--css-->
<link rel="stylesheet" href="./resources/personManage/css/personManage.css">
</head>
<body onload="approvalOnload()">
	<jsp:include page="../common/header.jsp" />
    <div class ="menu">
        <div class="pmMainbox">
            <div class="personManage">
                <div class="personManage_header">
                    <div class="personManage_title"><h4>전직원</h4></div>
                    <input type="hidden" id="ascHidden" value="${sorting}">
                    <input type="hidden" id="conditionHidden" value="${condition}">
                    <div class="personManage_personSum">${empConut}</div>
                    <div class="personManage_searchDiv"><input type="text" id="personManage_search" class="personManage_search" name="keyword" value="${keyword}"><ion-icon name="search-outline" onclick="searchKeyword(${pi.currentPage})" style="cursor: pointer;"></ion-icon></div>
                    <div class="personManage_accept">
                        미승인: ${empJobCount}
                    </div>
                </div>
                <div class="personManage_body">
                    <table class="personManage_table" id="personManage_table">
                        <thead>
                            <tr>
                                <c:choose>
                                    <c:when test="${sorting == 'asc' && condition == 'empNo'}">
                                        <th id="sortEnoTable" style="padding-left: 10px;">
                                            사번<ion-icon name="chevron-up-outline" onclick="sortEnoTable(${pi.currentPage},'${sorting}','${condition}')" style="cursor: pointer;"></ion-icon>
                                        </th>
                                    </c:when>
                                    <c:otherwise>
                                        <th>
                                            사번<ion-icon name="chevron-down-outline" onclick="sortEnoTable(${pi.currentPage},'${sorting}','${condition}')" style="cursor: pointer;"></ion-icon>
                                        </th>
                                    </c:otherwise>
                                </c:choose>
                                <c:choose>
                                    <c:when test="${sorting == 'asc' && condition == 'deptCode'}">
                                        <th id="sortDeptCodeTable" style="padding-left: 10px;">
                                            부서<ion-icon name="chevron-up-outline" onclick="sortDeptCodeTable(${pi.currentPage},'${sorting}','${condition}')" style="cursor: pointer;"></ion-icon>
                                        </th>
                                    </c:when>
                                    <c:otherwise>
                                        <th>
                                            부서<ion-icon name="chevron-down-outline" onclick="sortDeptCodeTable(${pi.currentPage},'${sorting}','${condition}')" style="cursor: pointer;"></ion-icon>
                                        </th>
                                    </c:otherwise>
                                </c:choose>
                                <c:choose>
                                    <c:when test="${sorting == 'asc' && condition == 'jobCode'}">
                                        <th>
                                            직급<ion-icon name="chevron-up-outline" onclick="sortJobCodeTable(${pi.currentPage},'${sorting}','${condition}')" style="cursor: pointer;"></ion-icon>
                                        </th>
                                    </c:when>
                                    <c:otherwise>
                                        <th>
                                            직급<ion-icon name="chevron-down-outline" onclick="sortJobCodeTable(${pi.currentPage},'${sorting}','${condition}')" style="cursor: pointer;"></ion-icon>
                                        </th>
                                    </c:otherwise>
                                </c:choose>
                                <th>이름</th>
                                <th style="width: 200px;">이메일</th>
                                <th>연락처</th>
                                <th>생년월일</th>
                                <th>입사일</th>
                                <c:choose>
                                    <c:when test="${sorting == 'asc' && condition == 'empStatus'}">
                                        <th>
                                            상태<ion-icon name="chevron-up-outline" onclick="sortStatusTable(${pi.currentPage},'${sorting}','${condition}')" style="cursor: pointer;"></ion-icon>
                                        </th>
                                    </c:when>
                                    <c:otherwise>
                                        <th>
                                            상태<ion-icon name="chevron-down-outline" onclick="sortStatusTable(${pi.currentPage},'${sorting}','${condition}')" style="cursor: pointer;"></ion-icon>
                                        </th>
                                    </c:otherwise>
                                </c:choose>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        	<c:forEach var="e" items="${list}">
	                            <tr>
	                                <td>${e.empNo}</td>
	                                <td>${e.deptName}</td>
	                                <td>${e.jobName}</td>
	                                <td>${e.empName}</td>
	                                <td>${e.empEmail}</td>
	                                <td>${e.empPhone}</td>
	                                <td>${e.empAge}</td>
	                                <td>${e.empEnrollDate}</td>
	                                
	                                	<c:choose>
	                                		<c:when test="${e.empStatus eq '0'}">
	                                			<td>미승인</td>
	                                		</c:when>
                                            <c:when test="${e.empStatus eq '1'}">
	                                			<td>재직</td>
	                                		</c:when>
	                                		<c:otherwise>
	                                			<td>퇴직</td>
	                                		</c:otherwise>
	                                	</c:choose>
	                                
	                                <td>
	                                	<button class="personManage_update" onclick="empInformation(${e.empNo},'${e.empName}','${e.empEmail}','${e.empPhone}','${e.empAge}','${e.empEnrollDate}',)" 
	                                			data-bs-toggle="modal" data-bs-target="#updatePm">
	                                		수정
	                                	</button>
	                                </td>
	                            </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
                <!-- 페이지네이션 -->
                <div class="personManage_footer">
                    <ul class="pagination">
                    	<c:choose>
                    		<c:when test="${ pi.currentPage eq 1 }">
	                        	<li class="page-item disabled"><a class="page-link">&lt;</a></li>
	                        </c:when>
	                        <c:otherwise>
	                        	<li class="page-item"><a class="page-link" href="approval.em?cpage=${ pi.currentPage - 1 }">&lt;</a></li>
	                        </c:otherwise>
	                    </c:choose>
	                    
	                    <c:forEach var="p" begin="${pi.startPage}" end="${ pi.endPage }" >
	                        <li class="page-item"><a class="page-link" href="approval.em?cpage=${ p }">${ p }</a></li>
	                    </c:forEach>
	                    
	                    <c:choose>
	                    	<c:when test="${ pi.currentPage eq pi.maxPage }">
	                        	<li class="page-item"><a class="page-link">&gt;</a></li>
	                        </c:when>
	                        <c:otherwise>
	                        	<li class="page-item"><a class="page-link" href="approval.em?cpage=${ pi.currentPage + 1 }">&gt;</a></li>
	                        </c:otherwise>
	                    </c:choose>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!--수정 Modal -->
    <div class="modal fade" id="updatePm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" id="modal-dialog-id">
            <div class="modal-content">
                <form action="emUpdate.em" method="post">
                    <div class="modal-header" id="modal-header-id">
                        <button type="button" id="close-btn2" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="display: none;"></button>
                        <h4 class="modal-title" id="modal-title-id">수정</h4>
                        <button type="submit" class="form-button3">수정</button>
                        <button type="button" class="form-button2" id="fakeBtn" onclick="executeCloseButton2()">취소</button>
                    </div>
                        <div class="modal-body" id="modal-body-id">
                            <table class="modal-table" id="updateModaltable">
                                
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="resources/personManage/js/personManage.js"></script>
</body>