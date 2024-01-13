<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<!-- CSS -->
<link rel="stylesheet" href="resources/calendar/css/calendar-list-view.css">

<!-- JavaScript -->
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Latest compiled and minified CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- fullcalendar-5.11.5 -->
<link href="resources/calendar/fullcalendar-5.11.5/lib/main.css" rel="stylesheet" />
<script src="resources/calendar/fullcalendar-5.11.5/lib/main.js"></script>

<!-- JS -->
<script src="resources/calendar/js/calendar-list-view.js"></script>

<meta charset="UTF-8">
<title>Calendar</title>
</head>

<body onload="calendarOnload(), drawCalendar()">
<jsp:include page="../common/header.jsp" />
	<div class="menu">
		<div class = "calendar-bg">
			<div id="calendar"></div>
		</div>
	
	<!-- 일정 등록 Modal -->
    <div class="modal fade" id="calendarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" id="modal-dialog-id">
            <div class="modal-content">
                <form action="" method="post">
                    <div class="modal-header" id="modal-header-id">
                        <button type="button" id="close-btn2" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <h4 class="modal-title" id="modal-title-id">일정등록</h4>
                        <div>
                            <button type="button" class="form-button3" id="addSchedule" onclick="addSchedule">등록</button>
                            <button type="button" class="form-button2" id="fakeBtn" onclick="executeCloseButton2()">취소</button>
                        </div>
                    </div>
                        <div class="modal-body" id="modal-body-id">
                            <table class="modal-table">
	                            <tr>
	                            	<th>구분</th>
	                            	<td>
	                            		<div id="calendarCategory">
                                            <label for="inpHold" class="labl-hold">
		                            		<input type="radio" name="calendarCategory" value="0" id="myCalendar" class="txt-hide" checked>
											내 일정</label>
											<div class="mycircle"></div>
	
                                            <label for="inpHold" class="labl-hold">
											<input type="radio" name="calendarCategory" value="1" id="teamCalendar" class="txt-hide">
											팀 일정</label>
											<div class="teamcircle"></div>
                                                
                                            <label for="inpHold" class="labl-hold">
											<input type="radio" name="calendarCategory" value="2" id="allCalendar" class="txt-hide">
											전체 일정</label>
											<div class="allcircle"></div>
										</div>
	                            	</td>
	                            </tr>
                                <tr>
                                    <th>일정명</th>
                                    <td><input type="text" class="modal-input" id="calendarName"></td>
                                </tr>
                                <tr>
                                    <th id="modal-table-th-date">일시</th>
                                    <td>
                                        <input type="date" id="modal-start-date" class="modal-input-date" name="startTime" value="startTime">

                                        <select class="modal-input-date" id="start" value="start">
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
                                            <option value="00:00">00:00</option>
                                        </select>
                                        ~
                                        <input type="date" id="modal-end-date" name="endTime" class="modal-input-date" value="endTime">

                                        <select class="modal-input-date" id="end" value="end">
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
                                            <option value="00:00">00:00</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>일정내용</th>
                                    <td>
                                    	<textarea class="modal-input2" id="calendarContent" rows="3" cols="80" name="calendarContent" placeholder="일정내용을 입력해주세요" spellcheck="false"></textarea>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- 일정 수정 Modal -->
        <div class="modal fade" id="calendarUpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" id="modal-dialog-id">
                <div class="modal-content">
                    <form action="" method="post">
                        <div class="modal-header" id="modal-header-id">
                            <button type="button" id="close-btn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <h4 class="modal-title" id="modal-title-id">일정수정</h4>
                            <div>
                                <button type="button" class="form-button3" id="updateSchedule" onclick="updateSchedule">수정</button>
                                <button type="button" class="form-button2" id="fakeBtn" onclick="executeCloseButton()">취소</button>
                            </div>
                        </div>
                            <div class="modal-body" id="modal-body-id">
                                <table class="modal-table">
                                    <tr>
                                        <th>구분</th>
                                        <td>
                                            <div id="calendarCategory1">
                                                <label for="inpHold" class="labl-hold">
                                                <input type="radio" name="calendarCategory" value="0" id="myCalendar1" class="txt-hide">
                                                내 일정</label>
                                                <div class="mycircle"></div>
        
                                                <label for="inpHold" class="labl-hold">
                                                <input type="radio" name="calendarCategory" value="1" id="teamCalendar1" class="txt-hide">
                                                팀 일정</label>
                                                <div class="teamcircle"></div>
                                                    
                                                <label for="inpHold" class="labl-hold">
                                                <input type="radio" name="calendarCategory" value="2" id="allCalendar1" class="txt-hide">
                                                전체 일정</label>
                                                <div class="allcircle"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>일정명</th>
                                        <td><input type="text" class="modal-input" id="calendarName1"></td>
                                    </tr>
                                    <tr>
                                        <th id="modal-table-th-date">일시</th>
                                        <td>
                                            <input type="date" id="modal-start-date1" class="modal-input-date" name="startTime" value="startTime">

                                            <select class="modal-input-date" id="start1" value="start">
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
                                                <option value="00:00">00:00</option>
                                            </select>
                                            ~
                                            <input type="date" id="modal-end-date1" name="endTime" class="modal-input-date" value="endTime">

                                            <select class="modal-input-date" id="end1" value="end">
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
                                                <option value="00:00">00:00</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>일정내용</th>
                                        <td>
                                            <textarea class="modal-input2" id="calendarContent1" rows="3" cols="80" name="calendarContent" placeholder="일정내용을 입력해주세요" spellcheck="false"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="deleteBtn">
                                                <button type="button" id="deleteSchedule" onclick="deleteCalendar">삭제</button>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
	
	</div><!-- <div class="menu"> -->
</body>
</html>