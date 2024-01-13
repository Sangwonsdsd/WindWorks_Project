<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>EnrollMember</title>
	<!--부트스트랩-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <!--css-->
    <link rel="stylesheet" href="./resources/common/css/memberInsertForm.css">
     <!--JS-->
  <script src="resources/common/js/memberInsert.js"></script>
</head>
<body onload="insertEmpFormOnload()">
	<form action="insert.em" method="post" enctype="multipart/form-data" class="row g-3 needs-validation" id="signupForm">
    <div class="memberInsertForm">
      <div class="memberInsertForm-inputs">
        <div class="memberInsertForm-input-title">
          <div class="memberInsertForm-titleSize">
            <div class="memberInsertForm-input-title-logo">
              <h1>회원 가입</h1>
            </div>
            <div class="memberInsertForm-title">
              <img src="./resources/common/logo/mainLogo.png" class="memberInsert-title-Logo" height="70" width="70" alt="">
            </div>
          </div>
        </div>

        <div class="memberInsertForm-input-content1">
          <div class="memberInsertForm-input-content1-container">
            <div class="memberInsertForm-input-content1-container1">
              <div class="memberInsertForm-input-content1-container1-name">
                <label for="nameInput" class="form-label insert-font">이름</label>
                <input class=" form-control form-control-sm" id="nameInput" type="text" placeholder="이름을 입력해주세요" name="empName">
              </div>
              <div class="memberInsertForm-input-content1-container1-name">
                <label for="genderInput" class="form-label insert-font">성별</label>
                <div class="memberInsert-genderInput">
                  <input type="radio" class="btn-check " name="empGender" value="남자" id="success-outlined"
                    autocomplete="off" checked>
                  <label class="btn btn-outline-secondary btn-sm" for="success-outlined">남자</label>
                  <input type="radio" class="btn-check" name="empGender" value="여자" id="danger-outlined"
                    autocomplete="off">
                  <label class="btn btn-outline-secondary btn-sm" for="danger-outlined">여자</label>
                </div>
              </div>
            </div>
            <div class="memberInsertForm-input-content1-container2">
              <label for="emailInput" class="form-label insert-font">이메일</label>
              <div class="input-group input-group-sm mb-3">
                <input type="text" class="form-control" id="emailInput" name="empEmail1" placeholder="이메일 주소">
                <span class="input-group-text" id="inputGroup-sizing-sm">@</span>
                <input class="form-control form-control-sm" id="emailDomain" name="empEmail2" list="datalistOptions" type="text"
                  placeholder="직접입력 or 선택">
                <datalist id="datalistOptions">
                  <option value="naver.com">
                  <option value="hanmail.com">
                  <option value="gmail.com">
                  <option value="daum.net">
                  <option value="kakao.com">
                  <option value="nate.com">
                </datalist>
              </div>
            </div>
          </div>
          <div class="memberInsertForm-input-content1-container">
            <div class="memberInsertForm-input-content1-container3">
              <label for="inputPassword" class="form-label insert-font">비밀번호</label>
              <input class="form-control form-control-sm" name="empPwd" id="inputPassword" type="password"
                placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8 ~ 20자)">
              <div class="invalid-feedback insert-invalid-fontsize1" id="password-invalid">
              </div>
              <div class="valid-feedback insert-invalid-fontsize1">
                사용가능한 비밀번호 입니다.
              </div>
            </div>
            <div class="memberInsertForm-input-content1-container2">
              <label for="inputPasswordCheck" class="form-label insert-font">비밀번호 확인</label>
              <input class="form-control form-control-sm" name="empPwd2" id="inputPasswordCheck" type="password"
                placeholder="비밀번호 재입력">
              <div class="invalid-feedback insert-invalid-fontsize2">
                비밀번호가 일치하지 않습니다.
              </div>
              <div class="valid-feedback insert-invalid-fontsize2">
                비밀번호가 일치합니다.
              </div>
            </div>
          </div>
        </div>
        <div class="memberInsertForm-input-content2">
          <div class="memberInsertForm-input-content1-container2">
            <label for="phoneInput" class="form-label insert-font">전화번호</label>
            <input class="form-control form-control-sm" name="empPhone" id="phoneInput" type="text"
              placeholder="휴대폰 번호 입력(문자,특수문자 입력불가)">
            <div class="invalid-feedback insert-invalid-fontsize2">
              9 ~ 11자리 입력해주세요.
            </div>
            <div class="valid-feedback insert-invalid-fontsize2">
              정확합니다.
            </div>
          </div>
          <div class="memberInsertForm-input-content1-container2">
            <label for="dateInput" class="form-label insert-font">생년월일</label>
            <input class="form-control form-control-sm" name="empAge" id="dateInput" type="date"
              placeholder=".form-control-sm" aria-label=".form-control-sm example">
          </div>
        </div>
        <div class="memberInsertForm-input-content2">
          <div class=" memberInsertForm-input-content1-container2">
            <label for="selectAddress" class="form-label insert-font">주소 
              <input type="button" name = "selectAddress" class="btn btn-outline-dark d_btn"  style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" onclick="sample4_execDaumPostcode();" value="검색">
            </label>
              <input class="form-control form-control-sm" type="text" name="empAddress" id="sample4_roadAddress" placeholder="도로명주소">
          </div>
          <div class="memberInsertForm-input-content1-container2">
            <label for="addressInput" class="form-label insert-font">프로필사진</label>
            <input class="form-control form-control-sm" name="upfile" id="profileInput" type="file"
              aria-label=".form-control-sm example">
          </div>
          </div>
        <div class="memberInsert-btns">
          <div class="memberInsert-btn">
            <button type="submit" class="btn btn-outline-success insert-btn-size">가입</button>
            <button type="button"  onclick="history.back()" class="btn btn-outline-danger insert-btn-size">돌아가기</button>
          </div>
        </div>
      </div>
    </div>
  </form>

   <!--카카오 주소-->
  <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  <script>
  function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample4_roadAddress").value = roadAddr;

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
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