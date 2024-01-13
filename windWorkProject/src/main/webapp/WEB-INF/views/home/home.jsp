    <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home</title>

<!-- jQuery 3.7.1 -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<!-- 부트스트랩 -->
<!-- Latest compiled and minified CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!-- fullcalendar-5.11.5 -->
<link href="resources/home/fullcalendar-5.11.5/lib/main.css" rel="stylesheet" />
<script src="resources/home/fullcalendar-5.11.5/lib/main.js"></script>

<link rel="stylesheet" href="resources/home/css/home.css">
<script src="resources/home/js/home.js"></script>

</head>
<body>
    <div class="home-All">

        <!-- --------------- 상단 영역 --------------- -->
        <div class="home-upArea">

            <!-- ----- 프로필 영역 ----- -->
            <div class="home-upArea-area1">
                <div class="home-upArea-area1-profile">
                    <!-- 1.프로필 -->
                    <div class="profile-profile">
                        <div class="profile-profile-1"><img class="profile-profile-1-img" src="./${loginUser.profileFilePath}"></div>
                        <div class="profile-profile-2">${loginUser.empName} ${loginUser.jobName} </div>
                        <div class="profile-profile-3">${loginUser.deptName}</div>
                    </div>

                    <!-- 2. 출퇴근 -->
                    <div class="commute-area">
                        <div class="current-time"></div>
                        <div class="commute-status">
                            <button class="status-work" onclick="statusWork('${loginUser.empNo}')">출근</button>
                            <button class="status-leave" onclick="statusLeave('${loginUser.empNo}')">퇴근</button>
                        </div>
                    </div>


                    <!-- 3.알림 -->
                    <div class="profile-inform">
                        <div class="profile-inform-">
                            <div class="profile-inform-mail" onclick="mailList()">
                                <div>미확인 메일</div>
                                <div class="profile-inform-mail-2" ></div>
                            </div>
                            <div class="profile-inform-chat" onclick="chattingList()">
                                <div>미확인 채팅</div>
                                <div class="profile-inform-chat-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <!-- ----- 캘린더 영역 ----- -->
            <div class="home-upArea-area2">
                <div class="home-upArea-area2-calendar">
                    <div id="calendar"></div>
                </div>
            </div>

            <!-- ----- 버스 영역 ----- -->
            <div class="home-upArea-area3">
                <div class="home-upArea-area3-map">
                    <div class="bus-search-bar">
                        <div class="bus-search-bar-flex">
                            <h5 class="bus-search-bar-title">버스 정류장(서울)</h5>
                            <div class="bus-search-bar-title-sec" id="bus-search-bar-title-sec"></div>
                        </div>

                        <div class="bus-search">
                            <input class="bus-search-input" id="bus-search-input" onkeyup="busSearchBtn(event)"
                                type="text" placeholder="버스 정류장 검색">
                            <button class="bus-search-btn" onclick="busSearchBtn(event)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-search-heart" viewBox="0 0 16 16">
                                    <path
                                        d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                                    <path
                                        d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="bus-search-output" class="bus-search-output">
                        <div class="bus-output-item">
                            <div class="bus-output-item-title">
                                <h5 class="bus-output-item-title-text">검색기록이 없습니다.</h5>
                            </div>
                            <div class="bus-output-item-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------- 하단 영역 --------------- -->
        <div class="home-downArea">

            <!-- ----- 날씨 영역 ----- -->
            <div class="home-downArea-area1">
                <div class="home-downArea-area1-weather">
                    <div class="home-downArea-area1-weather-temperature">
                    
                    </div>
                    <div class="home-downArea-area1-weather-misseMunji" id="home-downArea-area1-weather-misseMunji">
                        
                    </div>
                </div>
            </div>

            <!-- ----- 번역 영역 ----- -->
            <div class="home-downArea-area2">
                <div class="home-downArea-area2-translate">

                    <div class="home-downArea-area2-translate-up">
                        <div class="source-Language">한국어</div>
                        <div class="change-icon-div" onclick="changeLanguage()"><ion-icon class="change-icon" name="repeat-outline" style="width: 20px; height: 20px;"></ion-icon></div>
                        <div class="target-Language">English</div>
                    </div>

                    <div class="home-downArea-area2-translate-center">
                        <div class="home-downArea-area2-translate-center-1">
                            <textarea name="" id="translate-input"></textarea>
                        </div>
                        <div class="home-downArea-area2-translate-center-2">
                            <div class="deleteText-area" onclick="deleteText()">
                                <ion-icon name="trash-outline" style="width: 16px; height: 16px;"></ion-icon>
                            </div>
                            <div class="home-downArea-area2-translate-center-2-btn" onclick="papago()">번역</div>
                        </div>
                    </div>

                    <div class="home-downArea-area2-translate-down">
                        <textarea name="" id="translate-value" disabled></textarea>
                    </div>

                </div>
            </div>


            <!-- ----- gpt 영역 ----- -->
            <div class="home-downArea-area3">
                <div class="home-downArea-area3-chatgpt">
                    <div class="textCheckBox">
                        <div class="textCheckBox-title">
                            <h5>이메일 작성기</h5>
                        </div>

                        <textarea name="comment" onkeyup="chatGptTextCheck(event)" id="comment" class="comment"
                            maxlength="1001" placeholder="어떤 내용에 대해 작성해드릴까요?"></textarea>
                        <textarea class="comment2" id="comment2" readonly placeholder="결과"></textarea>
                        <div class="text-check-btn-box">
                            <span style="color:#aaa;" id="counter">(0 / 1000)</span>
                            <div>
                                <button class="text-check-btn" onclick="chatGptTextDelete()">지우기</button>
                                <button class="text-check-btn" onclick="chatGptTextCheck(event)">검사하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</body>
</html>