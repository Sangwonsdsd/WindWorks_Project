<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Create Lecture Materials</title>
        <!-- 부트스트랩 -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        <!--제이쿼리-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <!--css-->
        <link rel="stylesheet" href="resources/studyManagement/css/createLectureMaterials.css">
        <script src="resources/studyManagement/ajax/ajax.js"></script>
        <!--js-->
        <script src="resources/studyManagement/js/createLectureMaterials.js"></script>
    </head>

    <body onload="lessonOnload()">
        <jsp:include page="../common/header.jsp" />
        <div class="menu">

            <div class="createLectureMaterials">
                <form id="createLecturefileForm" name="createLecturefileForm" class="createLectureMaterials-container"
                    method="post" enctype="multipart/form-data">
                    <div class="createLectureMaterials-title">
                        <h4>문서 등록</h4>
                    </div>
                    <div class="createLectureMaterials-createInputs-container">
                        <input type="hidden" name="empNo" value="${empNo}">
                        <table class="createLectureMaterials-createInputs-table">
                            <tr>
                                <th style="width: 172px; height: 42px; text-align: end;">
                                    <div class="createLectureMaterials-createInputs-div">
                                        <p class="createLectureMaterials-createInputs-p">위치</p>
                                        <p class="createLectureMaterials-createInputs-star">*</p>
                                    </div>
                                </th>
                                <td style="height: 42px;">
                                    <select class="form-select form-select-sm createLectureMaterials-select-subject"
                                        aria-label="Small select example" name="categoryNo" style="font-size: 13px;">
                                        <option selected>선택</option>
                                        <option value="1">자바</option>
                                        <option value="2">데이터베이스</option>
                                        <option value="4">파이썬</option>
                                        <option value="3">자바스크립트</option>
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
                                    <input class="form-control form-control-sm" name="classDataTitle" type="text"
                                        placeholder="제목을 입력하세요" aria-label=".form-control-sm example">
                                </td>
                            </tr>
                            <tr>
                                <th style="width: 172px; height: 42px;">
                                    <div class="createLectureMaterials-createInputs-div">
                                        <p class="createLectureMaterials-createInputs-p">보존연한</p>
                                    </div>
                                </th>
                                <td style="height: 42px;">
                                    <select class="form-select form-select-sm createLectureMaterials-select-year"
                                        aria-label="Small select example" name="classDataTimeName"
                                        style=" font-size: 13px;">
                                        <option value="3">3년</option>
                                        <option value="5">5년</option>
                                        <option selected value="15">15년</option>
                                        <option value="20">20년</option>
                                        <option value="25">25년</option>
                                    </select>
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
                                        <div class="createLectureMaterials-file-upload" ondragover="allowDrop(event)"
                                            ondragenter="highlightDropArea()" ondragleave="unhighlightDropArea()"
                                            ondrop="handleDrop(event)">
                                            <ion-icon class="create-document-icon"
                                                name="cloud-upload-outline"></ion-icon>
                                            <span>
                                                이 곳에 파일을 드래그 하세요. 또는
                                                <span>
                                                    <input type="hidden" name="files" />
                                                    <label id="create-fileSelected-label" for="fileList">파일
                                                        선택</label>
                                                    <input type="file" class="create-fileSelected" id="fileList"
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
                                        name="classDataContent" style="width: 100%; height: 100%;"></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="createLectureMaterials-btn-container">
                        <div class="createLectureMaterials-btn-container2">
                            <button class="form-button1" id="save">등록</button>
                            <button class="form-button2" onclick="history.back()">취소</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!--에디터-->
        <!--<script src="https://cdn.tiny.cloud/1/YOUR_API_KEY/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script><-->
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