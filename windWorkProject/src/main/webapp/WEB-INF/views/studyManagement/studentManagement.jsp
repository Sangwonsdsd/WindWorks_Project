<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>StudyManagement</title>

        <!-- 부트스트랩 -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        <!--css-->
        <link rel="stylesheet" href="resources/studyManagement/css/studentManagement.css">
        <!--alert-->
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    </head>

    <body onload="lessonOnload()">
        <jsp:include page="../common/header.jsp" />
        <div class="menu">
            <jsp:include page="./studyManagement.jsp" />
            <div class="right-student-container">
                <div class="student-header-container">
                    <h1>
                        <span class="student-header-title">전체 주소록</span>
                        <span class="student-header-subtitle">(총 99명)</span>
                    </h1>
                    <div class="student-header-searchbar">
                        <div class="student-header-searchbar-container">
                            <select class="student-header-searchbar-select">
                                <option>이름</option>
                                <option>휴대폰</option>
                                <option>이메일</option>
                                <option selected>학생주소록</option>
                            </select>
                            <div class="student-header-searchbar-input1">
                                <input class="student-header-searchbar-input" type="text">
                            </div>
                            <div class="student-header-searchbar-input-searchbtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="student-header-toolbar-container">
                    <ul class="student-header-toolbar-critical">
                        <li>
                            <a class="student-btn-tool">
                                <span class="student-btn-tool-icon"><ion-icon name="add-outline"></ion-icon></span>
                                <span>빠른 등록</span>
                            </a>
                        </li>
                        <li>
                            <a class="student-btn-tool">
                                <span class="student-btn-tool-icon"><ion-icon name="mail-outline"></ion-icon></span>
                                <span>메일 발송</span>
                            </a>
                        </li>
                        <li>
                            <a class="student-btn-tool">
                                <span class="student-btn-tool-icon"><ion-icon name="people-outline"></ion-icon></span>
                                <span>그룹 지정</span>
                            </a>
                        </li>
                        <li>
                            <a class="student-btn-tool">
                                <span class="student-btn-tool-icon"><ion-icon name="trash-outline"></ion-icon></span>
                                <span>삭제</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <form action="" class="student-speed-regist">
                    <fieldset class="student-speed-regist-fleldset">
                        <div class="student-header-form-speed">
                            <input type="text" placeholder="이름" class="student-input student-speed-first">
                            <input type="text" placeholder="이메일" class="student-input">
                            <input type="text" placeholder="휴대폰" class="student-input">
                            <div class="student-speed-add-btn">
                                <ion-icon name="add-outline"></ion-icon>
                            </div>

                            <div class="student-speed-detail-add-btn">
                                <span>상세정보 추가</span>
                            </div>
                        </div>
                    </fieldset>
                </form>

                <div class="student-header-toolbar-container">
                    <ul class="student-header-toolbar-critical ">
                        <li class="student-btn-tool2 student-on">
                            <span>전체</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㄱ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㄴ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㄷ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㄹ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅁ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅂ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅅ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅇ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅈ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅊ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅋ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅌ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅍ</span>
                        </li>
                        <li class="student-btn-tool2">
                            <span>ㅎ</span>
                        </li>
                    </ul>
                    <div class="student-popup">
                        <div class="student-popup-optional">
                            <a class="student-btn-tool">
                                <span class="student-btn-tool-icon"><ion-icon name="funnel-outline"></ion-icon></span>
                                <span>필터</span>
                            </a>
                        </div>
                        <div class="student-dataTables-length">
                            <label>
                                <select name="" id="" size="1" class="student-dataTables-length-select">
                                    <option value="">5</option>
                                    <option value="">10</option>
                                    <option value="">15</option>
                                    <option value="">20</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="student-header-table-container">
                    <table class="student-table">
                        <thead>
                            <tr class="student-thead-tr">
                                <th style="padding-left: 24px;"><ion-icon style="padding-top: 5px;"
                                        name="checkbox-outline"></ion-icon>
                                </th>
                                <th style="padding: 0px 16px;">이름</th>
                                <th style="padding: 0px 16px;">휴대폰</th>
                                <th style="padding: 0px 16px;">이메일</th>
                                <th style="padding: 0px 16px;">주소</th>
                                <th style="padding: 0px 16px;">생년월일</th>
                                <th style="padding: 0px 16px;">성별</th>
                                <th style="padding: 0px 16px;">메모</th>
                                <th>
                                    <select name="" id="" size="1" class="student-dataTables-length-select">
                                        <option selected>강의실</option>
                                        <option value="">A</option>
                                        <option value="">B</option>
                                        <option value="">C</option>
                                        <option value="">D</option>
                                        <option value="">E</option>
                                        <option value="">I</option>
                                    </select>
                                </th>
                                <th>출결</th>

                            </tr>
                        </thead>
                        <tbody class="student-tbody">
                            <tr class="student-tbody-tr">
                                <td style="padding: 8px 0px 8px 24px;"><input class="student-tbody-tr-checkbox"
                                        type="checkbox" name="" id="">
                                <td style="padding: 8px 16px;">권두언</td>
                                <td style="padding: 8px 16px;">010-2222-1111</td>
                                <td style="padding: 8px 16px;">dododo@naver.com</td>
                                <td style="padding: 8px 16px;">서울특별시 강남구 테헤란로 232길</td>
                                <td style="padding: 8px 16px;">660223</td>
                                <td style="padding: 8px 16px;">여자</td>
                                <td style="padding: 8px 16px;">화장실 자주 감</td>
                                <td style="padding: 8px 16px;">I</td>
                                <td>지각</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="student-pagenation">
                    <ul class="pagination">
                        <li class="page-item disabled"><a class="page-link" href="#">
                                < </a>
                        </li>
                        <li class="page-item"><a class="page-link page-color" href="#">1</a></li>
                        <li class="page-item"><a class="page-link page-color" href="#">2</a></li>
                        <li class="page-item"><a class="page-link page-color" href="#">3</a></li>
                        <li class="page-item"><a class="page-link page-color" href="#">></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </body>

    </html>