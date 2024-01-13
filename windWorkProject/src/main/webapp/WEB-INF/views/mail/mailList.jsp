<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!DOCTYPE html>
        <html>

        <head>
            <meta charset="UTF-8">
            <title>Mail</title>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossorigin="anonymous"></script>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
                crossorigin="anonymous">
            <!--css-->
            <link rel="stylesheet" href="resources/mail/css/mail.css">
            <!--js-->
            <script src="resources/mail/js/mailList.js"></script>
            <script src="resources/mail/js/ajax.js"></script>
        </head>

        <body onload="getMailList(), emailOnload()">
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
                                <li class="mail-menu-li-sub mailCategorySeleted">
                                    <div onclick="maillocationHref(1)">받은메일함</div>
                                    <div id="putMailCount" class="trash-btn">${readListCount}</div>
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
                    <h4 style="padding-top: 20px; padding-left: 30px; margin-bottom: 0px;">받은메일함</h4>
                    <div class="mail-right-menu">

                        <div class="mail-select">
                            <select name="boardLimit" onchange="changeBoardLimit(${pi.currentPage})" id="boardLimit"
                                size="1" class="">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>

                        <button class="mail-btn1-mode" onclick="mailGetDeleteBtn(${pi.currentPage})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash3 mail-btn-margin" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg> 삭제
                        </button>

                        <button class="mail-btn1-mode" data-bs-toggle="modal" data-bs-target="#emailModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-reply-all mail-btn-margin" viewBox="0 0 16 16">
                                <path
                                    d="M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                                <path
                                    d="M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z" />
                            </svg> 전달
                        </button>

                        <button class="mail-btn1-mode2" onclick="notReadMail(0, ${pi.currentPage})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-envelope mail-btn-margin" viewBox="0 0 16 16">
                                <path
                                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg> 안읽음
                        </button>

                        <button class="mail-btn1-mode" onclick="readMail(0, ${pi.currentPage})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-envelope-open mail-btn-margin" viewBox="0 0 16 16">
                                <path
                                    d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z" />
                            </svg> 읽음
                        </button>

                        <button class="mail-btn1-mode2" id="getMailCount">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-mailbox mail-btn-margin" viewBox="0 0 16 16">
                                <path
                                    d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
                                <path
                                    d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
                            </svg> ${mailListCount}/140
                        </button>

                        <div class="mail-right-search-box">
                            <div class="mail-right-search-container">
                                <select class="mail-right-search-select" id="mail-right-search-select">
                                    <option value="emailTitle">제목</option>
                                    <option value="emailContent">내용</option>
                                    <option value="emailEmail">이메일</option>
                                </select>
                                <div class="mail-right-search-input1">
                                    <input class="mail-right-search-input" id="mailSearchInput"
                                        onkeyup="mailSearch(event)" type="text">
                                </div>
                                <div class="mail-right-search-searchbtn" onclick="mailSendSearch(event)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-search" viewBox="0 0 16 16">
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mail-right-middle">
                        <table class="mail-right-table">
                            <thead class="mail-table-thead">
                                <tr>
                                    <th style="padding-left: 30px; width: 114px;">
                                        <input type="checkbox" id="all-mail-checkbox" onclick="mailAllCheckBtn()"
                                            class="all-mail-checkbox">
                                    </th>
                                    <th class="mail-table-th mail-table-read mail-table-ailgn">
                                        읽음 표시
                                    </th>
                                    <th class="mail-table-th mail-table-ailgn" style="width: 280px;">
                                        메일 주소
                                    </th>
                                    <th class="mail-table-th mail-table-ailgn">
                                        제목
                                    </th>
                                    <th class="mail-table-th mail-table-time-th">
                                        시간
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="mail-right-tbody" id="getEmailList">

                            </tbody>
                        </table>

                    </div>
                    <div class="mail-right-bottom" id="getMailListPi">

                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="exampleModalLabel"
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
                                            <th><input type="checkbox" id="relayAllCheckBox" onclick="relayAllCheck()"
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
                                                        class="mail-relay-checkbox">
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
                            <button type="button" class="btn btn-primary" onclick="relayMail()">전달</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- IONICONS -->
            <script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></script>
        </body>

        </html>