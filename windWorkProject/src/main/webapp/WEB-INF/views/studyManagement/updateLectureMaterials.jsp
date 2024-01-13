<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="UTF-8">
                <title>Update Lecture</title>
                <!-- 부트스트랩 -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                    crossorigin="anonymous"></script>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
                    crossorigin="anonymous">
                <!--제이쿼리-->
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <!--css-->
                <link rel="stylesheet" href="resources/studyManagement/css/createLectureMaterials.css">
                <!--js-->
                <script src="resources/studyManagement/js/updateLectureMaterials.js"></script>
            </head>

            <body onload="lessonOnload()">
                <jsp:include page="../common/header.jsp" />
                <div class="menu">
                    <div class="createLectureMaterials">
                        <form id="updateLecturefileForm" class="createLectureMaterials-container" method="post"
                            enctype="multipart/form-data">
                            <div class="createLectureMaterials-title">
                                <h4>문서 수정</h4>
                            </div>
                            <div class="createLectureMaterials-createInputs-container">
                                <input type="hidden" name="empNo" value="${c.empNo}">
                                <input type="hidden" name="classDataNo" value="${c.classDataNo}">
                                <table class="createLectureMaterials-createInputs-table">
                                    <tr>
                                        <th style="width: 172px; height: 42px; text-align: end;">
                                            <div class="createLectureMaterials-createInputs-div">
                                                <p class="createLectureMaterials-createInputs-p">위치</p>
                                                <p class="createLectureMaterials-createInputs-star">*</p>
                                            </div>
                                        </th>
                                        <td style="height: 42px;">
                                            <select
                                                class="form-select form-select-sm createLectureMaterials-select-subject"
                                                aria-label="Small select example" id="updateSelectCategory"
                                                name="categoryNo" style="font-size: 13px;">
                                                <c:choose>
                                                    <c:when test="${c.category eq '자바'}">
                                                        <option>선택</option>
                                                        <option selected value="1">자바</option>
                                                        <option value="2">데이터베이스</option>
                                                        <option value="4">파이썬</option>
                                                        <option value="3">자바스크립트</option>
                                                    </c:when>
                                                    <c:when test="${c.category eq '데이터베이스'}">
                                                        <option>선택</option>
                                                        <option value="1">자바</option>
                                                        <option selected value="2">데이터베이스</option>
                                                        <option value="4">파이썬</option>
                                                        <option value="3">자바스크립트</option>
                                                    </c:when>
                                                    <c:when test="${c.category eq '파이썬'}">
                                                        <option>선택</option>
                                                        <option value="1">자바</option>
                                                        <option value="2">데이터베이스</option>
                                                        <option selected value="4">파이썬</option>
                                                        <option value="3">자바스크립트</option>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <option>선택</option>
                                                        <option value="1">자바</option>
                                                        <option value="2">데이터베이스</option>
                                                        <option value="4">파이썬</option>
                                                        <option selected value="3">자바스크립트</option>
                                                    </c:otherwise>
                                                </c:choose>

                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 172px; height: 42px;">
                                            <div class="createLectureMaterials-createInputs-div">
                                                <p class="createLectureMaterials-createInputs-p">제목</p>
                                                <p class="createLectureMaterials-createInputs-star">*</p>
                                            </div>
                                        </th>
                                        <td style="height: 42px;">
                                            <input class="form-control form-control-sm" value="${c.classDataTitle}"
                                                name="classDataTitle" type="text" placeholder="제목을 입력하세요"
                                                aria-label=".form-control-sm example">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 172px; height: 42px;">
                                            <div class="createLectureMaterials-createInputs-div">
                                                <p class="createLectureMaterials-createInputs-p">보존연한</p>
                                            </div>
                                        </th>
                                        <td style="height: 42px;">
                                            <select
                                                class="form-select form-select-sm createLectureMaterials-select-year"
                                                aria-label="Small select example" name="classDataTimeName"
                                                style=" font-size: 13px;">
                                                <c:choose>
                                                    <c:when test="${c.classDataTimeName eq 3}">
                                                        <option selected value="3">3년</option>
                                                        <option value="5">5년</option>
                                                        <option value="15">15년</option>
                                                        <option value="20">20년</option>
                                                        <option value="25">25년</option>
                                                    </c:when>
                                                    <c:when test="${c.classDataTimeName eq 5}">
                                                        <option value="3">3년</option>
                                                        <option selected value="5">5년</option>
                                                        <option value="15">15년</option>
                                                        <option value="20">20년</option>
                                                        <option value="25">25년</option>
                                                    </c:when>
                                                    <c:when test="${c.classDataTimeName eq 15}">
                                                        <option value="3">3년</option>
                                                        <option value="5">5년</option>
                                                        <option selected value="15">15년</option>
                                                        <option value="20">20년</option>
                                                        <option value="25">25년</option>
                                                    </c:when>
                                                    <c:when test="${c.classDataTimeName eq 20}">
                                                        <option value="3">3년</option>
                                                        <option value="5">5년</option>
                                                        <option value="15">15년</option>
                                                        <option selected value="20">20년</option>
                                                        <option value="25">25년</option>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <option value="3">3년</option>
                                                        <option value="5">5년</option>
                                                        <option value="15">15년</option>
                                                        <option value="20">20년</option>
                                                        <option selected value="25">25년</option>
                                                    </c:otherwise>
                                                </c:choose>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 172px; height: 30px;">
                                            <p class="createLectureMaterials-createInputs-p ">기존파일<br>(변경시 기존파일 삭제)</p>
                                        </th>
                                        <td style="height: 30px;">
                                            <ui class="createLectureMaterials-file-upload-wrap2">
                                                <c:forEach var="i" begin="0" end="${fn:length(calist)}">
                                                    <li class="fileItem">
                                                        <a href="${calist[i].classFilePath}"
                                                            download="${calist[i].classFilePath}"><span
                                                                class="closeButton">${calist[i].classOriginName}</span></a>
                                                    </li>
                                                    <input type="hidden" name="filePath"
                                                        value="${calist[i].classFilePath }">
                                                    <input type="hidden" name="fileNo"
                                                        value="${calist[i].classFileNo }">
                                                </c:forEach>
                                            </ui>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 172px; height: 65px;">
                                            <div class="createLectureMaterials-createInputs-p-file">
                                                <p class="createLectureMaterials-createInputs-p ">파일첨부(최대 4개)</p>
                                            </div>
                                        </th>
                                        <td style="height: 65px;">
                                            <div class="createLectureMaterials-file-upload-box" id="drop-area">
                                                <div class="createLectureMaterials-file-upload"
                                                    ondragover="allowDrop(event)" ondragenter="highlightDropArea()"
                                                    ondragleave="unhighlightDropArea()" ondrop="handleDrop(event)">
                                                    <ion-icon class="create-document-icon"
                                                        name="cloud-upload-outline"></ion-icon>
                                                    <span>
                                                        이 곳에 파일을 드래그 하세요. 또는
                                                        <span>
                                                            <label id="create-fileSelected-label" for="fileInput">파일
                                                                선택</label>
                                                            <input type="file" name="reupfiles"
                                                                class="create-fileSelected" id="fileInput"
                                                                onchange="handleFileSelect(event)" title="파일선택"
                                                                multiple="multiple" accept="undfined">
                                                        </span>
                                                    </span>
                                                </div>
                                                <ui class="createLectureMaterials-file-upload-wrap">

                                                </ui>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 172px; height: 65px;">
                                            <br>
                                            <p class="createLectureMaterials-createInputs-p ">내용</p>
                                        </th>
                                        <td style="height: 316px;">
                                            <br>
                                            <textarea class="form-control form-control-sm" id="postContent"
                                                name="classDataContent"
                                                style="width: 100%; height: 100%;">${c.classDataContent}</textarea>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="createLectureMaterials-btn-container">
                                <div class="createLectureMaterials-btn-container2">
                                    <button class="form-button1" id="updateSave">등록</button>
                                    <button class="form-button2" onclick="history.back()">취소</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!--에디터-->
                <!--<script src="https://cdn.tiny.cloud/1/YOUR_API_KEY/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>-->
                <!-- <script>
                    tinymce.init({
                        selector: '#postContent', // 에디터를 적용할 텍스트 영역의 ID
                        height: 300, // 에디터의 높이
                        plugins: 'link image code', // 필요한 플러그인 추가
                        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code', // 에디터 상단에 표시되는 툴바 구성
                    });

                    document.querySelector("#create-fileSelected-label").addEventListener("click", function () {
                        document.getElementById('fileInput').click();
                    })
                </script>-->
            </body>

            </html>