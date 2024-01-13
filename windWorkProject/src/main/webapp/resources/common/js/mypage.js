function profileMemberInsertbox() {
  document.querySelector('#profileMemberInsert').click();
}

function readURL(input, url) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('profilePreview').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('profilePreview').src = url;
  }
}

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


let isPassword = false;
function passNewPassword() {
  // 1. 입력한 value 값을 가져옴
  let inputPassword = document.getElementById("newPassword").value;

  console.log(inputPassword.length)

  if (inputPassword.length > 8) {
    //2. 글자 특수문자 혼합
    let num = inputPassword.search(/[0-9]/g);
    let eng = inputPassword.search(/[a-z]/ig);
    let spe = inputPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (inputPassword.length < 8 || inputPassword.length > 20) {
      swal("", "8자리 ~ 20자리 이내로 입력해주세요.", "warning");
      isPassword = false;
    } else if (inputPassword.search(/\s/) != -1) {
      swal("", "비밀번호는 공백 없이 입력해주세요.", "warning");
      isPassword = false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      swal("", "영문,숫자, 특수문자를 혼합하여 입력해주세요.", "warning");
      isPassword = false;
    } else {
      isPassword = true;
    }
  }
}

function passwordChange(empNo, empEmail) {
  if (document.getElementById("newPassword").value.length > 8 && document.getElementById("newPassword").value.length < 20) {
    if (!document.getElementById("password").value || !document.getElementById("newPassword").value) {
      swal("", "값이 비었습니다.", "warning");
    } else if (document.getElementById("password").value === document.getElementById("newPassword").value) {
      swal("", "비밀번호가 같습니다", "warning");
    } else if (isPassword === false) {
      swal("", "변경하실 비밀번호룰 확인하세요.", "warning");
    } else {
      ajaxPasswordChange(document.getElementById("password").value, document.getElementById("newPassword").value, empNo, empEmail)
    }
  } else {
    swal("", "새 비밀번호를 8자리 ~ 20자리 이내로 입력해주세요.", "warning");
  }
}

