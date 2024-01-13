<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Reservation</title>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<link rel="stylesheet" href="./resources/reservation/css/reservation.css">
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
</head>
<body onload='init(${result}, `${loginUser.empName}`), reservationOnload()'>
    <jsp:include page="../common/header.jsp" />
    <div class ="menu">
        <div class="reservation-all">
            <div class="reservation-calender">
                <div id="calendar-title-yesterday" >
                    <ion-icon name="chevron-back-outline" onclick='backCalendarDate("${reserDate}")'></ion-icon>
                </div>
                <div id="calendar-title">${reserDate}</div>
                <div id="calendar-title-tomorrow">
                    <ion-icon name="chevron-forward-outline" onclick='frontCalendarDate("${reserDate}")'></ion-icon>
                </div>
                <div id="calendar-title-btn">
                    <button id="todayBtn" onclick="goToday()">오늘</button>
                </div>
            </div>
            <div class="reservation-graph">
                <div class="graph-header">
                    <div class="graph-head"></div>
                    <div class="graph-head-hour">00</div>
                    <div class="graph-head-hour">01</div>
                    <div class="graph-head-hour">02</div>
                    <div class="graph-head-hour">03</div>
                    <div class="graph-head-hour">04</div>
                    <div class="graph-head-hour">05</div>
                    <div class="graph-head-hour">06</div>
                    <div class="graph-head-hour">07</div>
                    <div class="graph-head-hour">08</div>
                    <div class="graph-head-hour">09</div>
                    <div class="graph-head-hour">10</div>
                    <div class="graph-head-hour">11</div>
                    <div class="graph-head-hour">12</div>
                    <div class="graph-head-hour">13</div>
                    <div class="graph-head-hour">14</div>
                    <div class="graph-head-hour">15</div>
                    <div class="graph-head-hour">16</div>
                    <div class="graph-head-hour">17</div>
                    <div class="graph-head-hour">18</div>
                    <div class="graph-head-hour">19</div>
                    <div class="graph-head-hour">20</div>
                    <div class="graph-head-hour">21</div>
                    <div class="graph-head-hour">22</div>
                    <div class="graph-head-hour">23</div>
                </div>
                <div class="graph-body">
                    <div class="graph-body-list">
                
                    </div>
                </div>
            </div>
            <div class="reservation-status">
                <div class="reservation-status-title">내 예약현황</div>
                <div class="reservation-status-table">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 350px;">자산명</th>
                                <th style="width: 480px;">대여 날짜</th>
                                <th style="width: 345px;">내용</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <button type="button" style="display: none;" id="reservation-btn" data-bs-toggle="modal" data-bs-target="#reservationModal"></button>
                </div>
            </div>
        </div>
    </div>
    <!-- 예약 Modal -->
    <div class="modal fade" id="reservationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" id="modal-dialog-id">
            <div class="modal-content">
                <form action="reservation.as" method="post">
                    <div class="modal-header" id="modal-header-id">
                        <button type="button" id="close-btn2" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <h4 class="modal-title" id="modal-title-id">예약</h4>
                        <div>
                            <button type="submit" class="form-button3">등록</button>
                            <button type="button" class="form-button2" id="fakeBtn" onclick="executeCloseButton2()">취소</button>
                        </div>
                    </div>
                        <div class="modal-body" id="modal-body-id">
                            <table class="modal-table">
                                <tr>
                                    <th>자산명</th>
                                    <td>
                                        <input type="text" class="modal-input" id="assetName" name="assName" value="" readonly>
                                        <input type="hidden" id="assetNo" name="assNo" value="">
                                        <input type="hidden" id="loginUserNo" name="empNo" value="${loginUser.empNo}">
                                    </td>
                                </tr>
                                <tr>
                                    <th id="modal-table-th-date">일시</th>
                                    <td>
                                        <input type="date" class="modal-input-date" name="startDate" id="startDate" value="${reserDate}">

                                        <select class="modal-input-date" name="startTime" id="reservation-time-start">
                                            <option value="00:00">00:00</option>
                                            <option value="00:30">00:30</option>
                                            <option value="01:00">01:00</option>
                                            <option value="01:30">01:30</option>
                                            <option value="02:00">02:00</option>
                                            <option value="02:30">02:30</option>
                                            <option value="03:00">03:00</option>
                                            <option value="03:30">03:30</option>
                                            <option value="04:00">04:00</option>
                                            <option value="04:30">04:30</option>
                                            <option value="05:00">05:00</option>
                                            <option value="05:30">05:30</option>
                                            <option value="06:00">06:00</option>
                                            <option value="06:30">06:30</option>
                                            <option value="07:00">07:00</option>
                                            <option value="07:30">07:30</option>
                                            <option value="08:00">08:00</option>
                                            <option value="08:30">08:30</option>
                                            <option value="09:00">09:00</option>
                                            <option value="09:30">09:30</option>
                                            <option value="10:00">10:00</option>
                                            <option value="10:30">10:30</option>
                                            <option value="11:00">11:00</option>
                                            <option value="11:30">11:30</option>
                                            <option value="12:00">12:00</option>
                                            <option value="12:30">12:30</option>
                                            <option value="13:00">13:00</option>
                                            <option value="13:30">13:30</option>
                                            <option value="14:00">14:00</option>
                                            <option value="14:30">14:30</option>
                                            <option value="15:00">15:00</option>
                                            <option value="15:30">15:30</option>
                                            <option value="16:00">16:00</option>
                                            <option value="16:30">16:30</option>
                                            <option value="17:00">17:00</option>
                                            <option value="17:30">17:30</option>
                                            <option value="18:00">18:00</option>
                                            <option value="18:30">18:30</option>
                                            <option value="19:00">19:00</option>
                                            <option value="19:30">19:30</option>
                                            <option value="20:00">20:00</option>
                                            <option value="20:30">20:30</option>
                                            <option value="21:00">21:00</option>
                                            <option value="21:30">21:30</option>
                                            <option value="22:00">22:00</option>
                                            <option value="22:30">22:30</option>
                                            <option value="23:00">23:00</option>
                                            <option value="23:30">23:30</option>
                                        </select>
                                        ~
                                        <input type="date" class="modal-input-date" name="endDate" id="endDate" value="${reserDate}">
                                        <select class="modal-input-date" name="endTime" id="reservation-time-end">
                                            <option value="00:00">00:00</option>
                                            <option value="00:30">00:30</option>
                                            <option value="01:00">01:00</option>
                                            <option value="01:30">01:30</option>
                                            <option value="02:00">02:00</option>
                                            <option value="02:30">02:30</option>
                                            <option value="03:00">03:00</option>
                                            <option value="03:30">03:30</option>
                                            <option value="04:00">04:00</option>
                                            <option value="04:30">04:30</option>
                                            <option value="05:00">05:00</option>
                                            <option value="05:30">05:30</option>
                                            <option value="06:00">06:00</option>
                                            <option value="06:30">06:30</option>
                                            <option value="07:00">07:00</option>
                                            <option value="07:30">07:30</option>
                                            <option value="08:00">08:00</option>
                                            <option value="08:30">08:30</option>
                                            <option value="09:00">09:00</option>
                                            <option value="09:30">09:30</option>
                                            <option value="10:00">10:00</option>
                                            <option value="10:30">10:30</option>
                                            <option value="11:00">11:00</option>
                                            <option value="11:30">11:30</option>
                                            <option value="12:00">12:00</option>
                                            <option value="12:30">12:30</option>
                                            <option value="13:00">13:00</option>
                                            <option value="13:30">13:30</option>
                                            <option value="14:00">14:00</option>
                                            <option value="14:30">14:30</option>
                                            <option value="15:00">15:00</option>
                                            <option value="15:30">15:30</option>
                                            <option value="16:00">16:00</option>
                                            <option value="16:30">16:30</option>
                                            <option value="17:00">17:00</option>
                                            <option value="17:30">17:30</option>
                                            <option value="18:00">18:00</option>
                                            <option value="18:30">18:30</option>
                                            <option value="19:00">19:00</option>
                                            <option value="19:30">19:30</option>
                                            <option value="20:00">20:00</option>
                                            <option value="20:30">20:30</option>
                                            <option value="21:00">21:00</option>
                                            <option value="21:30">21:30</option>
                                            <option value="22:00">22:00</option>
                                            <option value="22:30">22:30</option>
                                            <option value="23:00">23:00</option>
                                            <option value="23:30">23:30</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td><input type="text" name="reserName" class="modal-input2" required></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="resources/reservation/js/reservation.js"></script>
</body>
</html>