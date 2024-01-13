<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>WriteMail</title>
    <!--부트스트랩-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <!--css-->
    <link rel="stylesheet" href="resources/mail/css/sendMailForm.css">
    <!-- 제이쿼리 -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <!-- 썸머노트 -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    <!--js-->
    <script src="resources/mail/js/mailMailForm.js"></script>
</head>
<body onload="sendMailFormInit(), emailOnload()">
    <jsp:include page="../common/header.jsp" />
	<div class = "menu">
        <div class = "mailWriteForm">
            <div class = "mailWriteForm-header">
                <h3>&lt;&nbsp;</h3>
                <h3>메일 작성</h3>
            </div>
            <form action="sendfile.mail" class="mailWriteForm-table-box" method="post" enctype="multipart/form-data">
                <input type="hidden" name="empNo" value="${loginUser.empNo}">
                <table>
                    <tr>
                        <th class = "mailWriteForm-table-th">
                            <div class = "mail-th-flex">
                                수신
                                <p class="mail-star">*</p>
                            </div>
                        </th>
                        <td class = "mailWriteForm-table-td">
                            <div class="mailWriteForm-table-input-div">
                                <div class="mail-email-list" id="mail-email-b1">
                                    <div class="mail-email-btn" id="mailEmailAddress24">
                                        <input name="referenceEmail" id="emailBtnreadonly24" type="text" class="strInput" onkeypress="redonlyEmailOnKeyup(event)" readonly="" value="${email.emailSenderEmail}">
                                        <svg onclick="updateEmailAddress(24)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
                                        </svg>
                                            <div onclick="removeMail(this, event)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path></svg></div></div>
                                </div><input class = "mailWriteForm-table-input" onkeypress="referenceEmailOnKeyup1(event)" type="text">
                            </div>
                            
                        </td>
                    </tr>
                    <tr>
                        <th class = "mailWriteForm-table-th">참조</th>
                        <td class = "mailWriteForm-table-td">
                            <div class="mailWriteForm-table-input-div">
                                <div class="mail-email-list" id="mail-email-b2"></div><input type="text" class = "mailWriteForm-table-input" onkeypress="referenceEmailOnKeyup2(event)">
                            </div>
                            
                        </td>
                    </tr>
                    <tr>
                        <th class = "mailWriteForm-table-th-content">파일첨부</th>
                        <td class = "mailWriteForm-table-td">
                            <label class="mailWriteForm-file-upload-box" id="drop-area" for="fileList">
                                <div class="mailWriteForm-file-upload">
                                    <ion-icon class="mailWriteForm-document-icon"
                                        name="cloud-upload-outline"></ion-icon>
                                        <span>
                                            <span>
                                                <label id="mailWriteForm-fileSelected-label" for="fileList">파일
                                                    선택</label>
                                                <input type="file" class="mailWriteForm-fileSelected" name = "fileList" id="fileList"
                                                    onchange="handleFileSelect(event)" title="파일선택"
                                                    multiple="multiple" accept="undfined">
                                            </span>
                                        </span>
                                </div>
                                <ui class="mailWriteForm-file-upload-wrap">

                                </ui>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th class = "mailWriteForm-table-th">     
                            <div class = "mail-th-flex">
                                제목
                                <p class="mail-star">*</p>
                            </div>
                        </th>
                        <td class = "mailWriteForm-table-td"><input required class = "mailWriteForm-table-input2" name="emailTitle" type="text"></td>
                    </tr>
                    <tr>
                        <th class="mailWriteForm-table-th-content">
                        <div class = "mail-th-flex">
                            내용
                            <p class="mail-star">*</p>
                        </div>
                    </th>
                        <td><textarea id="summernote" required name="emailContent"></textarea></td>
                    </tr>
                </table>
                <br>
                <div class = "mail-btns">
                    <div class = "mail-btnss">
                        <button type="submit" class="form-button1">등록</button>
                        <button onclick="history.back();" class="form-button2">취소</button>
                    </div>
                </div>
            </form>
            
        </div>
    </div>

    <!--썸머노트-->
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
</body>
</html>