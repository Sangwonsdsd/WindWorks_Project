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
                                <div class="mail-email-list" id="mail-email-b1"></div><input class = "mailWriteForm-table-input" onkeypress="referenceEmailOnKeyup1(event)" type="text">
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