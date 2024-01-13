const reservationValue = {}
function init(result, loginUser){
    reservationValue.loginUser = loginUser;
    drawAssetsList(result.assetsList);
    drawMyReservationsList(result.reservationList);
    drawReservationDiv(result.reservationListDiv)
    console.log(result.reservationListDiv)
}
function goToday(){
    let todayDate = new Date();
    
    let year = todayDate.getFullYear();
    let month = String(todayDate.getMonth() + 1).padStart(2, '0');
    let day = String(todayDate.getDate()).padStart(2, '0');
    let reserDate = year + '-' + month + '-' + day;

    location.href = "reservationPage.re?reserDate=" + reserDate;
}
//화면 상단 날짜 전날로 이동
function backCalendarDate(reserDate) {
    // let yesterday = new Date(currentDate); // 어제 날짜를 담을 변수 생성
    let reserDate1 = new Date(reserDate)
    reserDate1.setDate(reserDate1.getDate() - 1); // 어제 날짜 설정

    let year = reserDate1.getFullYear();
    let month = String(reserDate1.getMonth() + 1).padStart(2, '0');
    let day = String(reserDate1.getDate()).padStart(2, '0');
    let yesterdayDate = year + '-' + month + '-' + day;

    location.href="reservationPage.re?reserDate=" + yesterdayDate;
    
    
}
//화면 상단 날짜 다음날로 이동
function frontCalendarDate(reserDate) {
    let reserDate1 = new Date(reserDate)
    reserDate1.setDate(reserDate1.getDate() + 1);

    let year = reserDate1.getFullYear();
    let month = String(reserDate1.getMonth() + 1).padStart(2, '0');
    let day = String(reserDate1.getDate()).padStart(2, '0');
    let tomorrowDate = year + '-' + month + '-' + day;
    location.href="reservationPage.re?reserDate=" + tomorrowDate;
    
}

//취소버튼 누르면 모달창 끄기
function executeCloseButton2() {
    var closeButton = document.getElementById("close-btn2");
    closeButton.click();
    const reserdivs = document.getElementsByClassName('graph-body-confirm');
    while(reserdivs.length > 0) {
        reserdivs[0].parentNode.removeChild(reserdivs[0]);
    }
}

//재물예약판 그려주기
function drawAssetsList(assetsList){
    const assetsBody = document.querySelector(".reservation-graph > .graph-body > .graph-body-list");

    // console.log(assetsList)
    for(const asset of assetsList) {
        const assetZone = document.createElement('div');
        assetZone.className = 'graph-row';

        const titleZone = document.createElement('div');
        titleZone.className = 'graph-body-title';
        titleZone.innerHTML = asset.assName;
        assetZone.appendChild(titleZone);

        for(let i = 0; i < 24; i++) {
            const hour = (i < 10 ? ('0' + i) : i); 
            const timeUnit00 = document.createElement('div');
            timeUnit00.className = 'graph-body-hour';
            timeUnit00.value = hour + ":00";
            assetZone.appendChild(timeUnit00);
            timeUnitAddDragEvent(timeUnit00, asset, hour + ":00");

            const timeUnit30 = document.createElement('div');
            timeUnit30.className = 'graph-body-hour';
            timeUnit30.value = hour + ":30";
            assetZone.appendChild(timeUnit30);
            timeUnitAddDragEvent(timeUnit30, asset, hour + ":30");
        }
        assetsBody.appendChild(assetZone);
    }
}

//내 예약내역 그려주기

function drawMyReservationsList(reservationList){
    const reservationBody = document.querySelector(".reservation-status > .reservation-status-table tbody");
    
    for(const reservation of reservationList) {
        let tr = document.createElement('tr');
        let assetName = document.createElement('td');
        assetName.className = 'tableTd1';
        let startEndTime = document.createElement('td');
        startEndTime.className = 'tableTd2';
        let reservationName = document.createElement('td');
        reservationName.className = 'tableTd3';
        let cancelBtnTd = document.createElement('td');
        cancelBtnTd.className = 'tableTd4';
        let cancelBtn = document.createElement('button');

        assetName.innerHTML = reservation.assName;
        
        startEndTime.innerHTML = reservation.startDate + ' ' +reservation.startTime + ' ~ ' + reservation.endDate + ' '+ reservation.endTime;
        reservationName.innerHTML = reservation.reserName;
        cancelBtn.className = 'reservation-status-cancel';
        cancelBtn.id = 'cancelBtn' + reservation.reserNo;
        cancelBtn.innerText = '반납';
        cancelBtnTd.appendChild(cancelBtn);
        
        tr.appendChild(assetName);
        tr.appendChild(startEndTime);
        tr.appendChild(reservationName);
        tr.appendChild(cancelBtnTd);
        reservationBody.appendChild(tr);
        let deleteDate = document.getElementById('calendar-title').textContent;
        document.getElementById('cancelBtn' + reservation.reserNo).onclick = function() {
        
            cancelReservation(reservation.reserNo, deleteDate);
        }
    }
}
//예약취소 버튼 눌렀을때 이벤트
function cancelReservation(reserNo, deleteDate){
    location.href = "delete.re?reserNo="+ reserNo + "&deleteDate=" + deleteDate;
}
//예약시간 나타내는 div들 드래그 이벤트
function timeUnitAddDragEvent(timeUnit, asset, time){
    let confirmedAssets = document.createElement('div');
    confirmedAssets.className = 'graph-body-confirm';
    //한칸만 선택할땐 클릭이벤트임
    timeUnit.addEventListener("click", function () {
        reservationValue.clickUnit = {
            ...asset,
            time
        }
        const assetsNameTime = document.querySelectorAll(".graph-row");
        
        for(const assetNameTime of assetsNameTime) {
            for(let i = 1; i < assetNameTime.childNodes.length; i++){
                if(assetNameTime.childNodes[0].textContent == reservationValue.clickUnit.assName && assetNameTime.childNodes[i].value == reservationValue.clickUnit.time){
                    confirmedAssets.innerHTML = reservationValue.clickUnit.time + ' ~ ' + reservationValue.loginUser;
                    assetNameTime.childNodes[i].appendChild(confirmedAssets);
                }
            }
        }
        
        document.getElementById("reservation-btn").click();
        document.getElementById("assetName").value = reservationValue.clickUnit.assName;
        document.getElementById("assetNo").value = reservationValue.clickUnit.assNo;
        for(let i = 0; i < 48; i++){
            if(document.getElementById("reservation-time-start").options[i].value == reservationValue.clickUnit.time){
                document.getElementById("reservation-time-start").options[i].selected = true;
                document.getElementById("reservation-time-end").options[i+1].selected = true;
            }
        };
    });

    //두칸부터 드래그 이벤트
    timeUnit.addEventListener("mousedown", function () {
       //div하나만들어 클릭한곳에 그려주고 
       //div에는 시간을 좀 나타내줘야겠다.
       reservationValue.startUnit = {
            ...asset,
            time
        }

        const assetsNameTime = document.querySelectorAll(".graph-row");
        
        for(const assetNameTime of assetsNameTime) {
            for(let i = 1; i < assetNameTime.childNodes.length; i++){
                if(assetNameTime.childNodes[0].textContent == reservationValue.startUnit.assName && assetNameTime.childNodes[i].value == reservationValue.startUnit.time){
                    confirmedAssets.innerHTML = reservationValue.startUnit.time + ' ~ ' + reservationValue.loginUser;
                    assetNameTime.childNodes[i].appendChild(confirmedAssets);
                }
            }
        }
    });

    timeUnit.addEventListener("mouseenter", function () {
       //div에 표시된 시간을 변경해줘야겠다.
       const reserdivs = document.getElementsByClassName('graph-body-confirm');
        while(reserdivs.length > 0) {
            reserdivs[0].parentNode.removeChild(reserdivs[0]);
        }
       if (reservationValue.startUnit && reservationValue.startUnit.assNo === asset.assNo){
            reservationValue.endUnit = {
                ...asset,
                time
            }

            const assetsNameTime = document.querySelectorAll(".graph-row");

            for(const assetNameTime of assetsNameTime) {
                for(let i = 1; i < assetNameTime.childNodes.length; i++){
                    if(assetNameTime.childNodes[0].textContent == reservationValue.startUnit.assName && assetNameTime.childNodes[i].value == reservationValue.startUnit.time){
                        confirmedAssets.innerHTML = reservationValue.startUnit.time + ' ~ ' + reservationValue.endUnit.time + ' ' + reservationValue.loginUser;
                        assetNameTime.childNodes[i].appendChild(confirmedAssets);
                        
                        for(let j = 1; j < assetNameTime.childNodes.length; j++){
                            if(assetNameTime.childNodes[j].value == reservationValue.endUnit.time){
                                confirmedAssets.style.width = 25*(j-i) + 'px';
                            }
                        }
                    }
                }
            }
       }
    });

    timeUnit.addEventListener("mouseup", function () {
        //드래그했던 시간정보들을 가지고 모달에 넘겨주면 되겠다
        const assetsNameTime = document.querySelectorAll(".graph-row");

            for(const assetNameTime of assetsNameTime) {
                for(let i = 1; i < assetNameTime.childNodes.length; i++){
                    if(assetNameTime.childNodes[0].textContent == reservationValue.startUnit.assName && assetNameTime.childNodes[i].value == reservationValue.startUnit.time){
                        confirmedAssets.innerHTML = reservationValue.startUnit.time + ' ~ ' + reservationValue.endUnit.time + ' ' + reservationValue.loginUser;
                        assetNameTime.childNodes[i].appendChild(confirmedAssets);
                        
                        for(let j = 1; j < assetNameTime.childNodes.length; j++){
                            if(assetNameTime.childNodes[j].value == reservationValue.endUnit.time){
                                confirmedAssets.style.width = 25*(j-i) + 'px';
                            }
                        }
                    }
                }
            }
        //값을 사용
    
        clickModal(reservationValue)
        reservationValue.clickUnit = {};
        reservationValue.endUnit = {};
        reservationValue.startUnit = {};
    });
}

function clickModal(reservationValue){
    document.getElementById("reservation-btn").focus();
    document.getElementById("reservation-btn").click();
    document.getElementById("assetNo").value = reservationValue.endUnit.assNo;
    document.getElementById("assetName").value = reservationValue.endUnit.assName;
    for(let i = 0; i<48; i++){
        if(document.getElementById("reservation-time-start").options[i].value == reservationValue.startUnit.time){
            document.getElementById("reservation-time-start").options[i].selected = true;
        }
    }
    for(let i = 0; i<48; i++){
        if(document.getElementById("reservation-time-end").options[i].value == reservationValue.endUnit.time){
            document.getElementById("reservation-time-end").options[i].selected = true;
        }
    }
}

function drawReservationDiv(reservationList){
    console.log(reservationList)
    const assetsNameTime = document.querySelectorAll(".graph-row");
    const reserDate = document.getElementById('calendar-title').textContent;
    
    for(const reserList of reservationList) {
        const newReserDiv = document.createElement('div');
        newReserDiv.className = 'graph-body-confirm2';
        newReserDiv.innerHTML = reserList.empName + ' ' + reserList.startTime + ' ~ ' + reserList.endTime;
        if(reserDate == reserList.startDate){
            for(const assetNameTime of assetsNameTime){
                for(let i = 1; i < assetNameTime.childNodes.length; i++){
                    if(assetNameTime.childNodes[0].textContent == reserList.assName && assetNameTime.childNodes[i].value == reserList.startTime){
                        assetNameTime.childNodes[i].appendChild(newReserDiv); 
                        for(let j = 1; j < assetNameTime.childNodes.length; j++){
                            if(assetNameTime.childNodes[j].value == reserList.endTime){
                                newReserDiv.style.width = 25*(j-i) + 'px';
                            }
                        }
                    }
                }
            }
        }
    }
    

    //덮여씌어지는 div안에 추출한 값들 넣어주기
}