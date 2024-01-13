function drawCalendar(start){
	let calendarEl = document.getElementById('calendar');
		let calendar = new FullCalendar.Calendar(calendarEl, {
			googleCalendarApiKey: "AIzaSyDms3oLpDbnfLhL9z6TFgFnBoh5Jk5T2Fc",
			height: 750, // 캘린더 높이 설정
			initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
			locale: 'ko', // 한국어 설정
			//selectable: true, // 달력 일자 드래그 설정가능
			droppable: true, //
			editable: true, // 수정여부
			initialDate: start, //달력시작일
			events: function(timezone, callback){
				console.log("서버로부터 가져와서 실행함")
				//여기서 서버로부터 데이터가져오기
				listCalendar(
					timezone
				, function(res){
					console.log(res)
					callback(res)
				})
			},
			headerToolbar: { // 헤더에 표시할 툴바
				left: 'prev',
				center: 'title today',
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
			// 날짜 클릭(일정 등록)
			dateClick: function(info) {
				$("#calendarModal").modal("show");

				// 모달 데이트 시작 값을 클릭한 날짜로
				let modalDate = document.getElementById("modal-start-date");
				modalDate.value = info.dateStr;

				document.getElementById("myCalendar").checked = true;

				// 입력 필드 초기화
				$("#calendarName").val("");
				$("#modal-end-date").val("");
				$("#calendarContent").val("");

				document.getElementById("addSchedule").onclick = function(){
					const categoryList= document.querySelectorAll("input[name='calendarCategory']")
					let category;

					for (let i = 0; i < categoryList.length; i++){
						if (categoryList[i].checked === true){
							category = categoryList[i].value
						}
					}

					let eventData = {
						title: $("#calendarName").val(),
						startDate: $("#modal-start-date").val(),
						endDate: $("#modal-end-date").val(),
						start: $("#start").val(),
						end: $("#end").val(),
						content: $("#calendarContent").val(),
						calendarCategory : category
					}
					if (
						eventData.title == "" ||
						eventData.endDate == "" ||
						eventData.content == ""
					) {
						swal("", "입력하지 않은 값이 있습니다.", "warning");
					} else if ($("#modal-start-date").val() > $("#modal-end-date").val()) {
						swal("", "종료일이 시작일보다 먼저입니다.", "warning");
					} else {
						saveCalendarEvent(eventData, function(){
							drawCalendar(info.dateStr)

							//ajax를 통해서 서버에 데이터전달
							//저장완료
							$("#calendarModal").modal("hide");

							// 입력 필드 초기화
							$("#calendarName").val("");
							$("#modal-start-date").val("");
							$("#modal-end-date").val("");
							$("#start").val("");
							$("#end").val("");
							$("#calendarContent").val("");
							})

					}
				}
			},
			// 일정 클릭(일정 수정/삭제)
			eventClick: function(info) {
				info.jsEvent.stopPropagation();
				info.jsEvent.preventDefault();

				$("#calendarUpdateModal").modal("show");
				
				$("#calendarName1").val(info.event.title);
				$("#modal-start-date1").val(info.event.extendedProps.dateStart);
				$("#modal-end-date1").val(info.event.extendedProps.dateEnd);
				$("#start1").val(info.event.extendedProps.timeStart);
				$("#end1").val(info.event.extendedProps.timeEnd);
				$("#calendarContent1").val(info.event.extendedProps.content);

				// 이전 이벤트의 disabled 속성 초기화
				document.getElementById("myCalendar1").disabled = false;
				document.getElementById("teamCalendar1").disabled = false;
				document.getElementById("allCalendar1").disabled = false;

				// 클릭한 이벤트의 카테고리 값을 가져옴
				let categoryValue = info.event.extendedProps.calendarCategory;
				console.log(categoryValue)

				// 해당하는 라디오 버튼을 선택하도록 처리
				if (categoryValue === 0) {
					document.getElementById("myCalendar1").checked = true;
				} else if (categoryValue === 1) {
					document.getElementById("teamCalendar1").checked = true;
				} else if (categoryValue === 2) {
					document.getElementById("allCalendar1").checked = true;
				} else if (categoryValue === 3) {
					document.getElementById("myCalendar1").disabled = true;
					document.getElementById("teamCalendar1").disabled = true;
					document.getElementById("allCalendar1").disabled = true;
				} else {
					document.getElementById("myCalendar1").disabled = false;
					document.getElementById("teamCalendar1").disabled = false;
					document.getElementById("allCalendar1").disabled = false;
				}

				// 일정 수정
				document.getElementById("updateSchedule").onclick = function(){

					const categoryList= document.querySelectorAll("input[name='calendarCategory']")
					let category;

					for (let i = 0; i < categoryList.length; i++){
						if (categoryList[i].checked === true){
							category = categoryList[i].value
						}
					}

					let eventData = {
						title: $("#calendarName1").val(),
						startDate: $("#modal-start-date1").val(),
						endDate: $("#modal-end-date1").val(),
						start: $("#start1").val(),
						end: $("#end1").val(),
						content: $("#calendarContent1").val(),
						calendarCategory: category,
						calendarListNo: info.event.extendedProps.calNo
					}
					if (
						eventData.title == "" ||
						eventData.endDate == "" ||
						eventData.content == ""
					) {
						swal("", "입력하지 않은 값이 있습니다.", "warning");
					} else if ($("#modal-start-date1").val() > $("#modal-end-date1").val()) {
						swal("", "종료일이 시작일보다 먼저입니다.", "warning");
					} else {
						// 일정 수정
						updateCalendarEvent(eventData, function(){
							drawCalendar(info.event.extendedProps.dateStart)

							//ajax를 통해서 서버에 데이터전달
							//저장완료
							$("#calendarUpdateModal").modal("hide");

							// 입력 필드 초기화
							$("#calendarName1").val("");
							$("#modal-start-date1").val("");
							$("#modal-end-date1").val("");
							$("#start1").val("");
							$("#end1").val("");
							$("#calendarContent1").val("");
							})

					}
				}
				// 일정 삭제
				document.getElementById("deleteSchedule").onclick = function(){

					let eventData = {
						title: $("#calendarName1").val(),
						startDate: $("#modal-start-date1").val(),
						endDate: $("#modal-end-date1").val(),
						start: $("#start1").val(),
						end: $("#end1").val(),
						content: $("#calendarContent1").val(),
						calendarListNo: info.event.extendedProps.calNo
					}

					deleteCalendarEvent(eventData, function(){
						drawCalendar(info.event.extendedProps.dateStart)
					})

					$("#calendarUpdateModal").modal("hide");

				}
			},
				
				titleFormat : function(date) { // title 설정 yyyy. mm
				return date.date.year +". "+(date.date.month +1); 
			},
				columnHeaderText : function(date) { 
				return weekList[date.getDay()]; // 헤더 var weekList = ['일','월','화','수','목','금','토']; 
			},
				
	  })

	  calendar.render();

}

// 모달 취소버튼
function executeCloseButton2() {
    let closeButton = document.getElementById("close-btn2");
    closeButton.click();
}

// 모달 취소버튼2
function executeCloseButton() {
    let closeButton = document.getElementById("close-btn");
    closeButton.click();
}

// 일정 등록
function saveCalendarEvent(eventData, callback){
	console.log(eventData)
	const startDate =  eventData.startDate + " " + eventData.start;
	const endDate = eventData.endDate + " " + eventData.end;

	console.log(startDate)
	console.log(endDate)
	setTimeout(function(){
		console.log("서버응답완료")
		callback();
	},1000)

	$.ajax({
		url: "insert.ca",
		data: {
			calendarCategory: eventData.calendarCategory,
			calendarName: eventData.title,
			start: startDate,
			end: endDate,
			calendarContent: eventData.content
		},
		success: function(result){
			callback();
		},
		error: function(){
			console.log("insert.ca ajax 통신 실패")
		}
	})
}

// 일정 조회
function listCalendar(timeData, callback){
	console.log(timeData)
	$.ajax({
		url: "clist.ca",
		data:{
			startTime : timeData.start,
			endTime : timeData.end,
		},
		success: function(calendar){
			console.log(calendar)
			console.log(calendar.list)

			const data =[]
			const list = calendar.list

			for (let i = 0; i < list.length; i++){

				// 주어진 날짜를 JavaScript Date 객체로 파싱합니다.
				const dateStart = new Date(list[i].startTime);
				dateStart.toLocaleString("en-US", {timeZone: "Asia/Seoul"});
				const dateEnd = new Date(list[i].endTime);

				// Tue Dec 26 2023 18:00:00 GMT+0900 (한국 표준시) {}
				// 원하는 형식으로 날짜를 변환합니다. (YYYY-MM-DD 형식으로)
				const formattedStartDate = dateStart.toISOString().slice(0, 10); // 이게 하루 빠름
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
					"title"   : list[i].calendarName,
					"start"   : dateStart,
					"end" 	  : dateEnd,
					"content" : list[i].calendarContent,
					"allDay"  : false,
					"calNo"   : list[i].calendarListNo,
					"calendarCategory" : list[i].calendarCategory,
					"reservationNo" : list[i].reservationNo,
					"dateStart": formattedStartDate,
					"dateEnd" : formattedEndDate,
					"timeStart" : formattedStartTime,
					"timeEnd" : formattedEndTime,
					"backgroundColor" : backgroundColor,
					"borderColor" : borderColor,
					"textColor" : textColor
				}
				data.push(data2)
			}
		
			callback(data);
		},
		error: function(){
			console.log("clist.ca ajax 통신 실패")
		}
	})
}


// 일정 수정
function updateCalendarEvent(eventData, callback){
	
	const startDate =  eventData.startDate + " " + eventData.start;
	const endDate = eventData.endDate + " " + eventData.end;

	setTimeout(function(){
		console.log("서버응답완료")
		callback();
	},1000)

	$.ajax({
		url: "cupdate.ca",
		data: {
			calendarListNo: eventData.calendarListNo,
			calendarCategory: eventData.calendarCategory,
			calendarName: eventData.title,
			start: startDate,
			end: endDate,
			calendarContent: eventData.content
		},
		success: function(result){
			swal("", "일정이 수정되었습니다.", "success");

			callback();
		},
		error: function(){
			console.log("cupdate.ca ajax 통신 실패")
		}
	})
}

// 일정 삭제
function deleteCalendarEvent(eventData, callback){

	setTimeout(function(){
		console.log("서버응답완료")
		callback();
	},1000)

	$.ajax({
		url: "cdelete.ca",
		data: {
			calendarListNo: eventData.calendarListNo
		},
		success: function(result){
			swal("", "일정이 삭제되었습니다.", "success");

			callback(); 
		},
		error: function(){
			console.log("cdelete.ca ajax 통신 실패")
		}
	})
}
