// 채팅페이지로 이동
function chattingList() {
    location.href = "list.ch";
}

//메일페이지로 이동
function mailList() {
    console.log('들어옴')
    location.href = "list.mail";
}


// 미확인 채팅 카운트
function noReadChatCount() {

    $.ajax({
        url: "noReadChatCount.ch",
        success: function (res) {
            document.querySelector(".profile-inform-chat-2").innerHTML = res.readChatCount;
            document.querySelector(".profile-inform-mail-2").innerHTML = res.readEmailCount;
        },
        error: function () {
            console.log("실패");
        }
    });
}


// 캘린더 그리기
document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        googleCalendarApiKey: "AIzaSyDms3oLpDbnfLhL9z6TFgFnBoh5Jk5T2Fc",
        height: 365, // 캘린더 높이 설정
        initialView: 'listWeek', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
        locale: 'ko', // 한국어 설정
        //selectable: true, // 달력 일자 드래그 설정가능
        events: function (timezone, callback) {
            // console.log("서버로부터 가져와서 실행함")
            //여기서 서버로부터 데이터가져오기
            listCalendar(timezone, function (res) {
                // 일정이 없을 때
                const noEventElement = document.querySelector('.fc-list-empty');
                const emptyEventDiv = document.createElement('div');
                emptyEventDiv.classList.add('fc-list-empty-event');
                if (res.length === 0 && noEventElement.querySelector('.fc-list-empty-event') === null) {
                    emptyEventDiv.innerHTML = '일정이 없습니다.';
                    noEventElement.appendChild(emptyEventDiv);

                    // 빈 이벤트 목록
                    callback(events);
                } else {
                    callback(res);
                }
            })
        },
        // 일정 클릭
        eventClick: function (info) {
            info.jsEvent.stopPropagation();
            info.jsEvent.preventDefault();
        },
        headerToolbar: { // 헤더에 표시할 툴바
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        // 공휴일 데이터 추가
        eventSources: [{ // 구글 캘린더 API 키를 발급받은 경우 공휴일 데이터 추가
            googleCalendarId: "ko.south_korea#holiday@group.v.calendar.google.com",
            backgroundColor: "rgb(253, 112, 94)",
            borderColor: "rgb(253, 112, 94)",
            className: "ko-holiday",
            textColor: "white",
        }],
        titleFormat: function (date) { // title 설정 yyyy. mm. dd - mm. dd
            const start = new Date(date.date.year, date.date.month, date.date.day);
            const end = new Date(date.date.year, date.date.month, date.date.day + 6);
            return start.getFullYear() + '. ' + (start.getMonth() + 1) + '. ' + start.getDate() + ' ~ ' +
                (end.getMonth() + 1) + '. ' + end.getDate();
        },
        listDayFormat: function (date) {
            const dayOfWeek = new Date(date.date.year, date.date.month, date.date.day).getDay();
            const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

            return (date.date.month + 1) + ". " + (date.date.day) + ". " + weekdays[dayOfWeek];
        },
        listDaySideFormat: function () {
            return "";
        }


    })
    calendar.render();

    noReadChatCount();
    weatherView();
    misseMunjiView();
    updateTime(); // 현재시간
    setInterval(updateTime, 1000); // 시간 카운트
    noReadChatCount(); // 미확인 채팅 카운트
    selectStatus() // 출퇴근상태확인
})


// 일정 조회
function listCalendar(timeData, callback) {
    $.ajax({
        url: "clist.ca",
        data: {
            startTime: timeData.start,
            endTime: timeData.end,
        },
        success: function (calendar) {
            // console.log(calendar)
            // console.log(calendar.list.startTime)

            const data = []
            const list = calendar.list

            for (let i = 0; i < list.length; i++) {

                // 주어진 날짜를 JavaScript Date 객체로 파싱합니다.
                const dateStart = new Date(list[i].startTime);
                dateStart.toLocaleString("en-US", { timeZone: "Asia/Seoul" });
                const dateEnd = new Date(list[i].endTime);

                // Tue Dec 26 2023 18:00:00 GMT+0900 (한국 표준시) {}
                // 원하는 형식으로 날짜를 변환합니다. (YYYY-MM-DD 형식으로)
                const formattedStartDate = dateStart.toISOString().slice(0, 10);
                const formattedEndDate = dateEnd.toISOString().slice(0, 10);

                // 시간 변환
                const startHours = ('0' + dateStart.getHours()).slice(-2); // 시간을 가져옵니다.
                const startMinutes = ('0' + dateStart.getMinutes()).slice(-2); // 분을 가져옵니다.
                const formattedStartTime = startHours + ":" + startMinutes; // 시간과 분을 조합합니다.

                const endHours = ('0' + dateEnd.getHours()).slice(-2); // 종료 시간의 시간을 가져옵니다.
                const endMinutes = ('0' + dateEnd.getMinutes()).slice(-2); // 종료 시간의 분을 가져옵니다.
                const formattedEndTime = endHours + ":" + endMinutes; // 시간과 분을 조합하여 문자열을 만듭니다.

                // 기본값 설정
                let backgroundColor = "";
                let borderColor = "";
                let textColor = "";

                if (list[i].calendarCategory === 0) { // 내 일정
                    backgroundColor = "rgb(119, 187, 243)";
                    borderColor = "rgb(119, 187, 243)";
                    textColor = "white";
                } else if (list[i].calendarCategory === 1) { // 팀 일정
                    backgroundColor = "rgb(194, 124, 221)";
                    borderColor = "rgb(194, 124, 221)";
                    textColor = "white";
                } else if (list[i].calendarCategory === 2) { // 전체 일정
                    backgroundColor = "rgb(255, 200, 82)";
                    borderColor = "rgb(255, 200, 82)";
                    textColor = "white";
                } else if (list[i].calendarCategory === 3) { // 자산 예약
                    backgroundColor = "rgb(85, 175, 130)";
                    borderColor = "rgb(85, 175, 130)";
                    textColor = "white";
                }

                data2 = {
                    "title": list[i].calendarName,
                    "start": dateStart,
                    "end": dateEnd,
                    "content": list[i].calendarContent,
                    "allDay": false,
                    "calNo": list[i].calendarListNo,
                    "calendarCategory": list[i].calendarCategory,
                    "dateStart": formattedStartDate,
                    "dateEnd": formattedEndDate,
                    "timeStart": formattedStartTime,
                    "timeEnd": formattedEndTime,
                    "backgroundColor": backgroundColor,
                    "borderColor": borderColor,
                    "textColor": textColor
                }
                data.push(data2)
            }

            callback(data);
        },
        error: function () {
            console.log("clist.ca ajax 통신 실패")
        }
    })
}
// 날씨 보여주기
function weatherView() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let hour = String(today.getHours());
    let minute = String(today.getMinutes()).padStart(2, '0');

    if (parseInt(minute) > 30) {
        hour = parseInt(hour) + 1;
        minute = '00';
    } else {
        minute = '00';
    }

    let todayDate = year + month + day;
    let todayTime = hour + minute;
    $.ajax({
        url: "weatherView.we",
        data: {
            todayDate: todayDate,
        },
        success: function (data) {
            drawWeather(data);
        },
        error: function () {
            console.log("실패");
        }
    });
}

const drawWeather = function (data) {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let hour = String(today.getHours());
    let minute = String(today.getMinutes()).padStart(2, '0');
    let date = year + month + day;
    if (parseInt(minute) > 30) {
        hour = parseInt(hour) + 1;
        minute = '00';
    } else {
        minute = '00';
    }

    const itemArr = data.response.body.items;

    let str = "";
    let tmpstr = "";
    let item = itemArr.item;
    for (let j = 0; j < item.length; j++) {
        if (item[j].fcstDate == date && item[j].fcstTime == (hour + minute) && item[j].category == 'TMP') {
            tmpstr += '<div style="font-size: 50px; font-weight: 800;">' + item[j].fcstValue + '℃</div>'
        }

        if (item[j].fcstTime == (hour + minute) && item[j].category == 'SKY' && item[j].fcstValue == 1 && item[j].fcstDate == date) {
            str += '<div class="weather-C">'
                + '<div style="display:flex; align-items: center;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="orange" class="bi bi-sun-fill" viewBox="0 0 16 16">'
                + '<path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>'
                + '</svg>'
                + '</div>'
                + tmpstr
                + '</div>'
                + '<div style="display: flex; justify-content: center;">맑음</div>';;
        } else if (item[j].fcstTime == (hour + minute) && item[j].category == 'SKY' && item[j].fcstValue == 3 && item[j].fcstDate == date) {
            str += '<div class="weather-C">'
                + '<div style="display:flex; align-items: center;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="grey" class="bi bi-clouds-fill" viewBox="0 0 16 16">'
                + '<path d="M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5"/>'
                + '<path d="M14.544 9.772a3.506 3.506 0 0 0-2.225-1.676 5.502 5.502 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z"/>'
                + '</svg>'
                + '</div>'
                + tmpstr
                + '</div>'
                + '<div style="display: flex; justify-content: center;">구름많음</div>';
        } else if (item[j].fcstTime == (hour + minute) && item[j].category == 'SKY' && item[j].fcstValue == 4 && item[j].fcstDate == date) {
            str += '<div class="weather-C">'
                + '<div style="display:flex; align-items: center;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="grey" class="bi bi-cloud-fill" viewBox="0 0 16 16">'
                + '<path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>'
                + '</svg>'
                + '</div>'
                + tmpstr
                + '</div>'
                + '<div style="display: flex; justify-content: center;">흐림</div>';
        } else if (item[j].fcstTime == (hour + minute) && item[j].category == 'PTY' && item[j].fcstValue == 1 && item[j].fcstDate == date) {
            str += '<div class="weather-C">'
                + '<div style="display:flex; align-items: center;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="grey" class="bi bi-cloud-drizzle-fill" viewBox="0 0 16 16">'
                + '<path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z"/>'
                + '</svg>'
                + '</div>'
                + tmpstr
                + '</div>'
                + '<div style="display: flex; justify-content: center;">비</div>';
        } else if (item[j].fcstTime == (hour + minute) && item[j].category == 'PTY' && item[j].fcstValue == 2 && item[j].fcstDate == date) {
            str += '<div class="weather-C">'
                + '<div style="display:flex; align-items: center;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="gey" class="bi bi-cloud-sleet-fill" viewBox="0 0 16 16">'
                + '<path d="M2.375 13.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 0 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zM6.375 13.5a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 0 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zm2.151 2.447a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zm1.181-7.026a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973z"/>'
                + '</svg>'
                + '</div>'
                + tmpstr
                + '</div>'
                + '<div style="display: flex; justify-content: center;">비/눈</div>';
        } else if (item[j].fcstTime == (hour + minute) && item[j].category == 'PTY' && item[j].fcstValue == 3 && item[j].fcstDate == date) {
            str += '<div class="weather-C">'
                + '<div style="display:flex; align-items: center;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="grey" class="bi bi-cloud-snow-fill" viewBox="0 0 16 16">'
                + '<path d="M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm2.75 2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-2.75-2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-.22-7.223a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973"/>'
                + '</svg>'
                + '</div>'
                + tmpstr
                + '</div>'
                + '<div style="display: flex; justify-content: center;">눈</div>';
        } else if (item[j].fcstTime == (hour + minute) && item[j].category == 'PTY' && item[j].fcstValue == 4 && item[j].fcstDate == date) {
            str += '<div class="weather-C">'
                + '<div style="display:flex; align-items: center;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="grey" class="bi bi-cloud-drizzle-fill" viewBox="0 0 16 16">'
                + '<path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z"/>'
                + '</svg>'
                + '</div>'
                + tmpstr
                + '</div>'
                + '<div style="display: flex; justify-content: center;">소나기</div>';
        }


    }
    document.querySelector('.home-downArea-area1-weather-temperature').innerHTML = str;

}

const misseMunjiView = function () {
    $.ajax({
        url: "misseMunji.mi",
        success: function (data) {
            console.log(data);
            drawMisseMunji(data);
        },
        error: function () {
            console.log("실패");
        }
    });
}

const drawMisseMunji = function (data) {
    const itemArr = data.response.body.items;

    let str = "";
    let misseStr = "";
    for (let i in itemArr) {
        let item = itemArr[i];
        if (item.stationName == '중구') {
            console.log(item.pm10Value);
            console.log(item.pm25Value);
            if (item.pm10Value >= 0 && item.pm10Value <= 30) {
                str += '<div class="munji1" style="background-color: #ebf7ff; border: 1px solid #d8e9f5;">'
                    + '<div>미세먼지</div>'
                    + '<div style="font-weight: bold; color: #34a0ff;">좋음</div>'
                    + '</div>';
            } else if (item.pm10Value >= 31 && item.pm10Value <= 80) {
                console.log("보통")
                str += '<div class="munji1" style="background-color: #ebfae8; border: 1px solid #d6efd0;">'
                    + '<div>미세먼지</div>'
                    + '<div style="font-weight: bold; color: #00c73c;">보통</div>'
                    + '</div>';
            } else if (item.pm10Value >= 81 && item.pm10Value <= 150) {
                console.log("나쁨")
                str += '<div class="munji1" style="background-color: #fdfbef; border: 1px solid #f6f2dd;">'
                    + '<div>미세먼지</div>'
                    + '<div style="font-weight: bold; color: #00c73c;">나쁨</div>'
                    + '</div>';
            } else if (item.pm10Value >= 151) {
                console.log("매우나쁨")
                str += '<div class="munji1" style="background-color: #ebf7ff; border: 1px solid #d8e9f5;">'
                    + '<div>미세먼지</div>'
                    + '<div style="font-weight: bold; color: #34a0ff;">매우나쁨</div>'
                    + '</div>';
            }

            if (item.pm25Value >= 0 && item.pm25Value <= 15) {

                console.log("좋음")
                misseStr += '<div class="munji2" style="background-color: #ebf7ff; border: 1px solid #d8e9f5;">'
                    + '<div>초미세먼지</div>'
                    + '<div style="font-weight: bold; color: #34a0ff;">좋음</div>'
                    + '</div>'
            } else if (item.pm25Value >= 16 && item.pm25Value <= 35) {
                console.log("보통")
                misseStr += '<div class="munji2" style="background-color: #ebfae8; border: 1px solid #d6efd0;">'
                    + '<div>초미세먼지</div>'
                    + '<div style="font-weight: bold; color: #00c73c;">보통</div>'
                    + '</div>'
            } else if (item.pm25Value >= 36 && item.pm25Value <= 75) {
                console.log("나쁨")
                misseStr += '<div class="munji2" style="background-color: #fdfbef; border: 1px solid #f6f2dd;">'
                    + '<div>초미세먼지</div>'
                    + '<div style="font-weight: bold; color: #00c73c;">나쁨</div>'
                    + '</div>'
            } else if (item.pm25Value >= 76) {
                console.log("매우나쁨")
                misseStr += '<div class="munji2" style="background-color: #ebf7ff; border: 1px solid #d8e9f5;">'
                    + '<div>초미세먼지</div>'
                    + '<div style="font-weight: bold; color: #34a0ff;">좋음</div>'
                    + '</div>'
            }
        }
    }
    const misse1 = document.querySelector('.home-downArea-area1-weather-misseMunji');
    misse1.innerHTML = str;
    misse1.innerHTML += misseStr;
    console.log(misse1);
}


// 번역버튼 클릭
function papago() {
    let inputText = document.querySelector('#translate-input').value;

    // 공백이면 함수 종료
    if (inputText.replace(/\s/g, '') == "") {
        return;
    }


    const sourceLanguage = document.querySelector('.source-Language').textContent;

    if (sourceLanguage == 'English') {
        $.ajax({
            url: "papagoEn.ho",
            data: {
                inputText: inputText
            },
            success: function (res) {
                document.querySelector('#translate-value').value = res.message.result.translatedText;
            },
            error: function () {
                console.log("실패");
            }
        });

    } else {
        $.ajax({
            url: "papagoKo.ho",
            data: {
                inputText: inputText
            },
            success: function (res) {
                document.querySelector('#translate-value').value = res.message.result.translatedText;
            },
            error: function () {
                console.log("실패");
            }
        });
    }

}

// 언어변경
function changeLanguage() {
    const sourceLanguage = document.querySelector('.source-Language');
    const targetLanguage = document.querySelector('.target-Language');

    if (sourceLanguage.textContent == '한국어') {
        // 한국어에서 영어로 변경
        sourceLanguage.textContent = 'English';
        targetLanguage.textContent = '한국어';
    } else {
        // 영어에서 한국어로 변경
        sourceLanguage.textContent = '한국어';
        targetLanguage.textContent = 'English';
    }
}

// 내용 지우기
function deleteText() {
    document.querySelector('#translate-input').value = "";
    document.querySelector('#translate-value').value = "";


}

// 현재시간
function updateTime() {
    const currentTimeElement = document.querySelector('.current-time');
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    currentTimeElement.textContent = formattedTime;
}


// 출근
function statusWork(empNo) {
    $.ajax({
        url: "statusWork.ho",
        data: {
            empNo: empNo
        },
        success: function (res) {
            if (res == "success") {
                updateButtonState(1)
            } else {
                console.log("업데이트 실패")
            }
        },
        error: function () {
            console.log("실패");
        }
    });
}

// 퇴근
function statusLeave(empNo) {
    $.ajax({
        url: "statusLeave.ho",
        data: {
            empNo: empNo
        },
        success: function (res) {
            if (res == "success") {
                updateButtonState(0)
                console.log(0)
            } else {
                console.log("업데이트 실패")
            }
        },
        error: function () {
            console.log("실패");
        }
    });
}

// 버튼 상태 업데이트
function updateButtonState(Status) {
    const workButton = document.querySelector('.status-work');
    const leaveButton = document.querySelector('.status-leave');

    // 출근 상태인 경우
    if (Status == 1) {
        workButton.setAttribute('disabled', true);
        leaveButton.removeAttribute('disabled');
        workButton.style.cursor = 'default';
        leaveButton.style.cursor = 'pointer';
    }
    // 퇴근 상태인 경우
    else if (Status == 0) {
        leaveButton.setAttribute('disabled', true);
        workButton.removeAttribute('disabled');
        leaveButton.style.cursor = 'default';
        workButton.style.cursor = 'pointer';
    }

}

// 출퇴근상태 확인
function selectStatus() {
    $.ajax({
        url: "selectStatus.ho",
        success: function (res) {
            if (res == 1) {
                updateButtonState(1)
            } else {
                updateButtonState(0)
            }
        },
        error: function () {
            console.log("실패");
        }
    });
}

function chatGptTextCheck(event) {

    let content = $('#comment').val();
    $('#counter').html("(" + content.length + " / 1000)");    //글자수 실시간 카운팅
    if (content.length > 1000) {
        alert("최대 1000자까지 입력 가능합니다.");
        $(this).val(content.substring(0, 1000));
        $('#counter').html("(1000 / 1000)");
    }

    if ((event.keyCode == 13 || !event.keyCode) && document.getElementById('comment').value.trim() != "") {
        chatGPT();
    }
}

function chatGPT() {
    const api_key = "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"  // <- API KEY 입력
    const keywords = document.getElementById('comment').value;
    console.log(keywords)
    $('#loading').show();
    let messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: '모든 언어를 한국어로 번역하여 알려줘' },
        {
            role: 'user',
            content: `아래 keywords의 키워드를 이용해서 격식있는 이메일의 내용을 작성해줘 
                [keywords]:` },
        {
            role: "user",
            content: "'" + keywords + "'"
        },
    ]

    const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        max_tokens: 1_000,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }).then(function (response) {
        console.log(response);
        let result = document.getElementById('comment2')
        result.value = response.choices[0].message.content
    });
}

function chatGptTextDelete() {
    document.getElementById('comment').value = ''
}




//버스정류장 API
//1. 버스 정류장 검색
function busSearchBtn(event) {
    if (event.keyCode === 13 || !(event.keyCode)) {
        console.log("enter");
        seconds = 15;
        ajaxBusSearch(document.getElementById("bus-search-input").value, drawBusStationList);
    }
}

//2. 버스정류장 ajax로 Controller에서 검색
function ajaxBusSearch(busSearch, drawBusStationList) {
    $.ajax({
        url: "busSearch.bus",
        data: {
            busSearch: busSearch
        },
        success: function (res) {
            drawBusStationList(res)
        },
        error: function () {

        }
    })
}

//버스정류장 검색 정보 그리기
function drawBusStationList(res) {
    let bsbList = res.bsbList;
    let bsiList = res.bsiList;

    bsbList.forEach(function (b) {
        let matchResult1 = b.arrmsg1.match(/(\d+)분(\d+)초후\[(\d+)번째 전\]/);
        let matchResult2 = b.arrmsg2.match(/(\d+)분(\d+)초후\[(\d+)번째 전\]/);
        // matchResult가 존재하는 경우에만 처리
        if (matchResult1 && matchResult2) {
            // 추출된 정보를 이용하여 arrmsgTime 및 arrmsgBefore 생성
            let minutes1 = parseInt(matchResult1[1], 10);
            let seconds1 = parseInt(matchResult1[2], 10);
            let beforeCount1 = parseInt(matchResult1[3], 10);

            b.arrTime1 = matchResult1[1] + '분 ' + matchResult1[2] + '초 후';
            b.arrBefore1 = matchResult1[3] + '번째 전';

            let minutes2 = parseInt(matchResult2[1], 10);
            let seconds2 = parseInt(matchResult2[2], 10);
            let beforeCount2 = parseInt(matchResult2[3], 10);

            b.arrTime2 = matchResult2[1] + '분 ' + matchResult2[2] + '초 후';
            b.arrBefore2 = matchResult2[3] + '번째 전';

            // 시간을 분으로 변환하여 소수점 형태로 표현
            let arrmsgTime1 = minutes1 + seconds1 / 60;
            let arrmsgBefore1 = beforeCount1;

            let arrmsgTime2 = minutes2 + seconds2 / 60;
            let arrmsgBefore2 = beforeCount2;

            // 속성 추가
            b.arrmsgTime1 = arrmsgTime1;
            b.arrmsgBefore1 = arrmsgBefore1;
            b.arrmsgTime2 = arrmsgTime2;
            b.arrmsgBefore2 = arrmsgBefore2;
        }

    })

    // busInfo.arrmsgTime을 기준으로 오름차순 정렬
    bsiList.sort(function (a, b) {
        if (a.arsId !== b.arsId) {
            return a.arsId - b.arsId;
        }
    });

    bsbList.sort(function (a, b) {
        if (a.arsId !== b.arsId) {
            return a.arsId - b.arsId;
        } else {
            return a.arrmsgTime - b.arrmsgTime;
        }
    });

    console.log(bsbList);
    console.log(bsiList);
    let str = ""

    bsbList = bsbList.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    bsiList = bsiList.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    for (let i = 0; i < bsiList.length; i++) {
        str += '<div class="bus-output-item" onclick = "busAjaxLists(event, ' + "'" + bsiList[i].stNm + "'" + ', ' + "'" + bsiList[i].arsld + "', " + bsiList[i].stId + ')">'
            + '<div class="bus-output-item-title">'
            + '<h5 class="bus-output-item-title-text">'
            + bsiList[i].stNm
            + '</h5>'
            + '<div class="bus-output-item-title-div" id= "bus-output-item-title-text' + i + '">'
            + '</div>'
            + '<input type="hidden" value="' + bsiList[i].arsld + '">'
            + '</div>'
            + '<div class="bus-output-item-body" id= "bus-output-item-body' + i + '">'
            + '</div>'
            + '</div>'
    }


    document.querySelector("#bus-search-output").innerHTML = str

    for (let i = 0; i < bsiList.length; i++) {
        let blistStr = ""
        let num = 0;
        for (let j = 0; j < bsbList.length; j++) {
            if ((bsiList[i].stNm === bsbList[j].stNm) && bsiList[i].stId === bsbList[j].stId && num < 2) {
                if (bsbList[j].arrTime1 === undefined) {
                    blistStr += '<div class="bus-output-item-body-endtime">'
                        + '<div class="bus-seat-bus">' + bsbList[j].busRouteAbrv + '</div>'
                        + '<div class="bus-seat-time-box">'
                        + '<div class="bus-seat-time">'
                        + bsbList[j].arrmsg1
                        + '</div> '
                        + '<div class="bus-seat-location">' + bsbList[j].arrmsg1 + '</div>'
                        + '</div>'
                        + '</div>'
                    if (num == 1) {
                        break

                    }
                } else {
                    blistStr += '<div class="bus-output-item-body-endtime">'
                        + '<div class="bus-seat-bus">' + bsbList[j].busRouteAbrv + '</div>'
                        + '<div class="bus-seat-time-box">'
                        + '<div class="bus-seat-time">'
                        + bsbList[j].arrTime1
                        + '</div> '
                        + '<div class="bus-seat-location">' + bsbList[j].arrBefore1 + '</div>'
                        + '</div>'
                        + '</div>'
                    if (num == 1) {
                        break

                    }
                }


                document.getElementById('bus-output-item-title-text' + i).innerHTML += '(' + bsbList[j].adirection + ' 방면)'
                num += 1;

            }
        }
        document.querySelector("#bus-output-item-body" + i).innerHTML = blistStr
    }
}


let seconds = 15;
//15초 카운트 다운
function showCountdown() {
    // 초기 카운트 다운 표시
    console.log(`남은 시간: ${seconds}초`);
    seconds--;
    document.getElementById('bus-search-bar-title-sec').innerHTML = `남은 시간: ${seconds}`
    if (seconds == 0) {
        seconds = 15;
    }
}
    //15초마다 재 검색
   setInterval(intervalBusSearchBtn, 15000);

   setInterval(showCountdown, 1000);

function intervalBusSearchBtn() {
    console.log("enter");
    seconds = 15;
    ajaxBusSearch(document.getElementById("bus-search-input").value, drawBusStationList);

}

//버스 정류장 버스리스트
function busAjaxLists(ev, stNm, arsld, stId) {
    $.ajax({
        url: "busAjaxSearchList.bus",
        data: {
            stNm: stNm,
            arsld: arsld,
            stId: stId
        },
        success: function (res) {
            drowBusList(res)
        },
        error: function () {
            console.log("busAjaxLists 통신 실패")
        }
    })
}

function drowBusList(res) {
    console.log(res)
    let bsbList = res.bsbList;
    let bsiList = res.bsiList;

    bsbList.forEach(function (b) {
        let matchResult1 = b.arrmsg1.match(/(\d+)분(\d+)초후\[(\d+)번째 전\]/);
        let matchResult2 = b.arrmsg2.match(/(\d+)분(\d+)초후\[(\d+)번째 전\]/);
        // matchResult가 존재하는 경우에만 처리
        if (matchResult1 && matchResult2) {
            // 추출된 정보를 이용하여 arrmsgTime 및 arrmsgBefore 생성
            let minutes1 = parseInt(matchResult1[1], 10);
            let seconds1 = parseInt(matchResult1[2], 10);
            let beforeCount1 = parseInt(matchResult1[3], 10);

            b.arrTime1 = matchResult1[1] + '분 ' + matchResult1[2] + '초 후';
            b.arrBefore1 = matchResult1[3] + '번째 전';

            let minutes2 = parseInt(matchResult2[1], 10);
            let seconds2 = parseInt(matchResult2[2], 10);
            let beforeCount2 = parseInt(matchResult2[3], 10);

            b.arrTime2 = matchResult2[1] + '분 ' + matchResult2[2] + '초 후';
            b.arrBefore2 = matchResult2[3] + '번째 전';

            // 시간을 분으로 변환하여 소수점 형태로 표현
            let arrmsgTime1 = minutes1 + seconds1 / 60;
            let arrmsgBefore1 = beforeCount1;

            let arrmsgTime2 = minutes2 + seconds2 / 60;
            let arrmsgBefore2 = beforeCount2;

            // 속성 추가
            b.arrmsgTime1 = arrmsgTime1;
            b.arrmsgBefore1 = arrmsgBefore1;
            b.arrmsgTime2 = arrmsgTime2;
            b.arrmsgBefore2 = arrmsgBefore2;
        }

    })

    // busInfo.arrmsgTime을 기준으로 오름차순 정렬

    bsbList.sort(function (a, b) {
        if (a.arsId !== b.arsId) {
            return a.arsId - b.arsId;
        } else {
            return a.arrmsgTime - b.arrmsgTime;
        }
    });

    console.log(bsbList);
    console.log(bsiList);
    let str = ""

    if (bsiList !== null) {
        str += '<div class="bus-output-item">'
            + '<div class="bus-output-item-title">'
            + '<h5 class="bus-output-item-title-text">'
            + bsiList.stNm
            + '</h5>'
            + '<div class="bus-output-item-title-div" id= "bus-output-item-title-text' + 1 + '">'
            + '</div>'
            + '<input type="hidden" value="' + bsiList.arsld + '">'
            + '</div>'
            + '<div class="bus-output-item-body" id= "bus-output-item-body' + 1 + '">'
            + '</div>'
            + '</div>'
    }


    document.querySelector("#bus-search-output").innerHTML = str

    let blistStr = ""
    for (let j = 0; j < bsbList.length; j++) {

        if (bsbList[j].arrTime1 === undefined) {
            blistStr += '<div class="bus-output-item-body-endtime">'
                + '<div class="bus-seat-bus">' + bsbList[j].busRouteAbrv + '</div>'
                + '<div class="bus-seat-time-box">'
                + '<div class="bus-seat-time">'
                + bsbList[j].arrmsg1
                + '</div> '
                + '<div class="bus-seat-location">' + bsbList[j].arrmsg1 + '</div>'
                + '</div>'
                + '</div>'
        } else {
            blistStr += '<div class="bus-output-item-body-endtime">'
                + '<div class="bus-seat-bus">' + bsbList[j].busRouteAbrv + '</div>'
                + '<div class="bus-seat-time-box">'
                + '<div class="bus-seat-time">'
                + bsbList[j].arrTime1
                + '</div> '
                + '<div class="bus-seat-location">' + bsbList[j].arrBefore1 + '</div>'
                + '</div>'
                + '</div>'
        }


        document.querySelector("#bus-output-item-body" + 1).innerHTML = blistStr
    }

    document.getElementById('bus-output-item-title-text' + 1).innerHTML += '(' + bsiList.arsld + ')'

}
