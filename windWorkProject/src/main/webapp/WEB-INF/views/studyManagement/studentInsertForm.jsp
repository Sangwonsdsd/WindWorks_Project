<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Insert title here</title>
        <!--css-->
        <link rel="stylesheet" href="resources/studyManagement/css/studentInsertForm.css">
        <!--js-->
        <script src="./resources/studyManagement/js/lectureMaterialsDetailView.js"></script>
    </head>

    <body onload="lessonOnload()">
        <jsp:include page="../common/header.jsp" />
        <div class="menu">
            <div class="studentInsertForm">
                <form action="insert.stm" method="post" enctype="multipart/form-data" class="student-insert">
                    <header class=" insert-h2">
                        <h2>연락처 추가</h2>
                    </header>
                    <table>
                        <tr>
                            <th class="student-img-th student-th ">사진</th>
                            <td class="student-img-td">
                                <div class="input-photo">
                                    <label for="profile-img-upload"><img id="profile-img-tag" class="student-profile-img" src="./resources/common/images/person.png"></label>
                                </div>
                                <input type="button" class="student-input" onclick="profileImageDelete();" value="삭제">
                                <input type="file" style="display: none;" name="studentProfilePath" onchange="profileImageChange(this);" id="profile-img-upload">
                            </td>
                        </tr>
                        <tr>
                            <th class="student-th ">이름 *</th>
                            <td><input class="student-input" name="studentName" type="text"></td>
                        </tr>
                        <tr>
                            <th class="student-th ">휴대폰 *</th>
                            <td><input class="student-input" name="studentPhone" type="text"></td>
                        </tr>
                        <tr>
                            <th class="student-th ">이메일 *</th>
                            <td><input class="student-input" name="studentEmail" type="text"></td>
                        </tr>
                        <tr>
                            <th class="student-th ">주소 </th>
                            <td><input class="student-input" name="studentAddress" id="sample4_roadAddress" type="text">
                                <input type="button" class="student-input" onclick="sample4_execDaumPostcode()"
                                    value="주소 검색">
                            </td>
                        </tr>
                        <tr>
                            <th class="student-th ">생년월일</th>
                            <td><input class="student-input" name="studentBirth" type="date"></td>
                        </tr>
                        <tr>
                            <th class="student-th ">성별</th>
                            <td><input type="radio" name="studentGender" id="male"><label for="male">남자</label>
                                <input type="radio" name="studentGender" id="female" value=""><label
                                    for="female">여자</label>
                            </td>
                        </tr>
                        <tr>
                            <th class="student-th student-th-textarea">메모</th>
                            <td><textarea class="student-textarea"></textarea></td>
                        </tr>
                        <tr>
                            <th class="student-th">그룹</th>
                            <td>
                                <select class="student-select">
                                    <option>강남건물조</option>
                                    <option>기만의정석</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
        <!--카카오 주소-->
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
        <script>
            function sample4_execDaumPostcode() {
                new daum.Postcode({
                    oncomplete: function (data) {
                        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                        var roadAddr = data.roadAddress; // 도로명 주소 변수
                        var extraRoadAddr = ''; // 참고 항목 변수

                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraRoadAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                        if (extraRoadAddr !== '') {
                            extraRoadAddr = ' (' + extraRoadAddr + ')';
                        }

                        // 우편번호와 주소 정보를 해당 필드에 넣는다.
                        document.getElementById("sample4_roadAddress").value = roadAddr;

                        var guideTextBox = document.getElementById("guide");
                        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                        if (data.autoRoadAddress) {
                            var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                            guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                            guideTextBox.style.display = 'block';

                        }
                    }
                }).open();
            }
        </script>
    </body>

    </html>