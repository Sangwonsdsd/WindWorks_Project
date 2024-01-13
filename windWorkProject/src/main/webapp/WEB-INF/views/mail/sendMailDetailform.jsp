<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<!DOCTYPE html>
		<html>

		<head>
			<meta charset="UTF-8">
			<title>MailTitle</title>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
				crossorigin="anonymous"></script>
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
				crossorigin="anonymous">
			<!--css-->
			<link rel="stylesheet" href="resources/mail/css/mail.css">
			<link rel="stylesheet" href="resources/mail/css/mailDetailForm.css">
			<!--js-->
			<script src="resources/mail/js/mailList.js"></script>
			<script src="resources/mail/js/ajax.js"></script>
		</head>

		<body onload="emailOnload()">
			<jsp:include page="../common/header.jsp" />
			<div class="menu">
				<div class="mail-left-bar">
					<div class="mail-writeForm" onclick="mailWriteForm();">
						<div>메일 쓰기</div>
					</div>
					<div class="mail-menu">
						<ul class="mail-menu-ul">
							<li class="mail-menu-li-main">메일함</li>
							<ul class="mail-menu-ul-sub">
								<li class="mail-menu-li-sub">
									<div onclick="maillocationHref(1)">받은메일함</div>
									<div class="trash-btn">${readListCount}</div>
								</li>
								<li class="mail-menu-li-sub">
									<div onclick="maillocationHref(2)">보낸메일함</div>
								</li>
								<li class="mail-menu-li-sub">
									<div onclick="maillocationHref(3)">휴지통</div><button class="trash-btn"><ion-icon
											name="trash-outline"></ion-icon></button>
								</li>
							</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="mail-right-bar">
					<div class="maildetailForm-header">
						<h3>&lt;&nbsp;</h3>
						<h3>메일 제목</h3>
					</div>
					<div class="maildetailForm-table-box">
						<table>
							<tr>
								<th class="maildetailForm-table-th">보낸사람</th>
								<td class="maildetailForm-table-td"><button class="maildetailForm-btn">${email.empSenderName}
									${email.empDeptName} ${email.empJobName} ${email.empEmail}
									</button></td>
							</tr>
							<tr>
								<th class="maildetailForm-table-th">받는사람</th>
								<td class="maildetailForm-table-td"><button class="maildetailForm-btn">
									${email.empName}
									${email.emailSenderDept} ${email.emailSenderJob} ${email.emailSenderEmail}
									</button></td>
							</tr>
							<tr>
								<th class="maildetailForm-table-th">참조</th>
								<td class="maildetailForm-table-td">
									<c:forEach var="item" items="${emailReferenceList}">
										<button class="maildetailForm-btn">${item.empSenderName} ${item.empDeptName}
											${item.empJobName} ${item.emailSenderEmail}</button>
									</c:forEach>
								</td>
							</tr>
							<tr>
								<th class="maildetailForm-table-th-content">첨부파일</th>
								<td>
									<div class="maildetailForm-file-upload-box">
										<ui class="maildetailForm-file-upload-wrap">
											<c:forEach var="item" items="${emailAttachment}">
												<li>
													<button class="downloadMailbtn"
														onclick="downloadMail('${item.emailFilePath}', '${item.emailChangeName}')">
														<span class="closeButton">파일 이름: ${item.emailOriginName} </span>
														<span class="closeButton"><svg
																xmlns="http://www.w3.org/2000/svg" width="16"
																height="16" fill="currentColor"
																class="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
																<path fill-rule="evenodd"
																	d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z" />
																<path
																	d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
															</svg>
														</span>
													</button>
												</li>
											</c:forEach>
										</ui>
									</div>
								</td>
							</tr>
							<tr>
								<th class="maildetailForm-table-th-content">내용</th>
								<td class="maildetailForm-table-td">
									<div class="maildetailForm-get-content">
										${email.emailContent}
									</div>
								</td>
							</tr>
						</table>
						<br>
						<br>
						<div class="mail-btns">
							<div class="mail-btnss">
								<button class="form-button1"  data-bs-toggle="modal" data-bs-target="#emailSendModal">전달</button>
								<button class="form-button2"  onclick="detailDeleteMailForm(${email.emailNo}, 1)" >삭제</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			            <!-- Modal -->
						<div class="modal fade" id="emailSendModal" tabindex="-1" aria-labelledby="exampleModalLabel"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
							<div class="modal-content">
								<div class="modal-header">
									<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<div>
										<h3>메일 전달</h3>
									</div>
									<div>
										<table align="center">
											<thead align="center">
												<tr>
													<th><input type="checkbox" id="relaySendAllCheckBox" onclick="relaySendAllCheck()"
															class="mail-all-relay-checkbox" style="width: 100px;">
													</th>
													<th style="width: 100px;">
														성명
													</th>
													<th style="width: 300px;">이메일</th>
												</tr>
											</thead>
											<tbody align="center">
												<c:forEach var="item" items="${empList}">
													<tr>
														<td><input type="checkbox" value="${item.empNo}"
																class="mail-send-relay-checkbox">
														</td>
														<td>${item.empName}</td>
														<td>${item.empEmail}</td>
													</tr>
												</c:forEach>
											</tbody>
			
										</table>
									</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
									<button type="button" class="btn btn-primary" onclick="relayOnlySendMail(${email.emailNo})">전달</button>
								</div>
							</div>
						</div>
					</div>
		</body>

		</html>