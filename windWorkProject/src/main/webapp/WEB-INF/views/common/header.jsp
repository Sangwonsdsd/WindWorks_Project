<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!DOCTYPE html>
        <html>

        <head>
            <meta charset="UTF-8">
            <title>Header</title>
            <!-- jQuery library -->
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

            <!-- 부트스트랩 -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
                crossorigin="anonymous">
            <!-- CSS -->
            <link rel="stylesheet" href="resources/common/css/styles.css">
            <link rel="stylesheet" href="resources/common/css/header.css">
            <link rel="stylesheet" href="resources/common/css/mypage-menu.css">
            <script src="resources/common/js/onload.js"></script>
            
            <!-- SweetAlert -->
			<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

        </head>

        <body id="body-pd">
            <c:if test="${ !empty alertMsg }">
                <script>
                    swal("", "${alertMsg}", "success");
                </script>
                <c:remove var="alertMsg" scope="session" />
            </c:if>
            <div class="l-navbar" id="navbar">
                <nav class="nav">
                    <div class="main-logo">
                        <div class="main-logo-image">
                            <img src="./resources/common/logo/1 (흰).png" alt="" class="main-logo-image-img" width="100"
                                height="100">
                            <div class="main-logo-text">
                                <div style="font-weight: 600;">WIND</div>
                                <div>WORKS</div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="nav__list">
                            <a href="homeForm.em" id="nav-home-bar" class="nav__link">
                                <ion-icon name="home-outline" class="nav__icon"></ion-icon>
                                <span class="nav_name">홈</span>
                            </a>

                            <a href="list.org" id="nav-org-bar" class="nav__link">
                                <ion-icon name="person-outline" class="nav__icon"></ion-icon>
                                <span class="nav_name">조직도</span>
                            </a>

                            <a href="list.ca" id="nav-calendar-bar" class="nav__link">
                                <ion-icon name="calendar-clear-outline" class="nav__icon"></ion-icon>
                                <span class="nav_name">캘린더</span>
                            </a>

                            <a href="list.mail" id="nav-email-bar" class="nav__link">
                                <ion-icon name="mail-outline" class="nav__icon"></ion-icon>
                                <span class="nav_name">메일</span>
                            </a>

                            <a href="list.ch" id="nav-chatting-bar" class="nav__link">
                                <ion-icon name="chatbubbles-outline" class="nav__icon"></ion-icon>
                                <span class="nav_name">채팅</span>
                            </a>

                            <a href="list.com" id="nav-com-bar" class="nav__link">
                                <ion-icon name="chatbox-ellipses-outline" class="nav__icon"></ion-icon>
                                <span class="nav_name">커뮤니티</span>
                            </a>

                            <a onclick="reservation()" id="nav-reservationPage-bar" class="nav__link">
                                <ion-icon name="time-outline" class="nav__icon"></ion-icon>
                                <span class="nav_name">예약</span>
                            </a>
                        </div>
                        <a href="list.no" id="nav-notice-bar" class="nav__link">
                            <ion-icon name="notifications-outline" class="nav__icon"></ion-icon>
                            <span class="nav_name">공지사항</span>
                        </a>
               <c:if test = "${loginUser.deptName eq '강사팀'}">
                   <a href="list.lp" id="nav-studyM-bar" class="nav__link">
                            <ion-icon name="book-outline" class="nav__icon"></ion-icon>
                            <span class="nav_name">강의관리</span>
                        </a>
               
               </c:if>
               <c:if test="${ loginUser.deptName == '인사팀' }">
                        <a href="approval.em" id="nav-approval-bar" class="nav__link">
                            <ion-icon name="person-add-outline" class="nav__icon"></ion-icon>
                            <span class="nav_name">인사관리</span>
                        </a>
                    </c:if>
                    </div>
                    <div class="nav__brand">
                        <ion-icon name="menu-outline" class="nav__toggle" id="nav-toggle"></ion-icon>
                        <a href="#" class="nav__logo"></a>
                    </div>
                </nav>
            </div>
            <div class="header">
                <div class="left-section">
                    <h1></h1>
                </div>
                <div class="right-section">
                    <div class="right-section-bell">
                    </div>

                    <div class="right-section-person" onclick="toggleDisplay();">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                            class="bi bi-person-circle right-section-icon right-section-userinfo-door-pointer"
                            viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                        <!-- <div class="notifications-person"> -->
                    </div>
                    <div class="right-section-userinfo2" id="rightUserinfo2">
                    </div>
                    <div class="right-section-userinfo" id="rightUserinfo" onclick="stopEvent(event)">
                        <div>
                            <div class="right-section-userinfo-img">
                                <img src="./${loginUser.profileFilePath}" class="right-section-userinfo-img-icon-person"
                                    alt="...">
                            </div>
                        </div>
                        <div class="right-section-userinfo-info">
                            <div class="right-section-userinfo-info-name">
                                <p class="h6 fw-bold right-section-userinfo-info-font2"
                                    style="margin: 0px 10px 0px 0px;">
                                    ${loginUser.empName}</p>
                            </div>
                            <div class="fw-medium right-section-userinfo-info-font">
                                <div class="right-section-userinfo-info-name">${loginUser.deptName} ${loginUser.jobName}
                                </div>
                            </div>
                            <br>
                            <div class="fw-medium right-section-userinfo-info-font">
                                <div class="right-section-userinfo-info-name">${loginUser.empPhone}</div>
                            </div>
                            <div class="fw-medium right-section-userinfo-info-font">
                                <div class="right-section-userinfo-info-name">${loginUser.empEmail}</div>
                            </div>
                        </div>
                        <div class="right-section-userinfo-door">
                            <div class="right-section-userinfo-door-box">
                                <svg xmlns="http://www.w3.org/2000/svg" onclick="myPageForm()" width="17" height="17"
                                    fill="currentColor" class="bi bi-pencil-fill right-section-userinfo-door-pointer"
                                    style="color: gray;" viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>

                                <svg onclick="logout()" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    fill="currentColor"
                                    class="bi bi-box-arrow-right right-section-userinfo-door-pointer"
                                    viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                    <path fill-rule="evenodd"
                                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- IONICONS -->
            <script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></script>
            <!-- JS -->
            <script src="resources/common/js/main.js"></script>
            <script src="resources/common/js/header.js"></script>
        </body>

        </html>