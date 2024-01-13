// 아이디 찾기 인증번호 전송 버튼 클릭
function sendSMSPhone(event){
    event.preventDefault();
    console.log("인증번호 전송 버튼 클릭됨");
 
    const empName = document.querySelector("#empNameId");
    const empPhone = document.querySelector("#empPhoneId");
    const regex = /^\d{11}$/;

    if (empName.value === "" || empPhone.value === ""){
        swal("", "성함과 번호를 모두 입력해주세요.", "warning");
    } else {
        if (regex.test(empPhone.value)){
            swal("", "인증번호가 전송되었습니다.", "info");

            $("#confirmNo4").attr("disabled", false); // 인증번호 입력창 활성화
            $("#confirmNo4").css("background-color", "white");

            $("#empNameId").attr("readonly", true);
            $("#empNameId").css("background-color", "rgb(239, 239, 239)");
            $("#empPhoneId").attr("readonly", true);
            $("#empPhoneId").css("background-color", "rgb(239, 239, 239)");

            $.ajax({
                url: "sendSMS.em",
                data: {
                    smsName: empName.value,
                    smsPhone : empPhone.value
                },
                success: function(res){
                    console.log(res)

                },
                error: function(){
                    console.log("sendSMS.em ajax 통신 실패")
                }
            })
        } else {
            swal("", "전화번호를 올바르게 입력해주세요.", "warning");
        }
    }

}

// 인증번호 확인 버튼 클릭
function confirmNumber(event){
    event.preventDefault();
    console.log("인증번호 확인 버튼 클릭됨")
    console.log($("#confirmNo4").val())

    $.ajax({
        url: "findId.em",
        data: {
            smsConfirmNo: document.querySelector("#confirmNo4").value,
            smsName: document.querySelector("#empNameId").value,
            smsPhone: document.querySelector("#empPhoneId").value
        },
        success: function(result){
            console.log(result)

            if (result === "fail"){ // 인증번호 불일치

                $(".confirmFail").css("display", "flex");
            } else { // 인증번호 일치
                $(".idFindForm-input-container").css("display", "none");
                $(".findIdResultDispaly").css("display", "flex");
                $("#goback").css("display", "none");
                $("#goLoginBtn").css("display", "flex");
                document.querySelector(".find-result-id").innerText = result;
            }

        },
        error: function(){
            console.log("findId.em ajax 통신 실패")
        }
    })
}

let empEmailValue;
// 비밀번호 찾기 아이디 존재여부 확인
function checkEmail(event){
    event.preventDefault();
    console.log("비밀번호 찾기 다음 버튼 클릭됨")

    empEmailValue = document.querySelector("#empcheckEmail").value;

    $.ajax({
        url: "checkEmail.em",
        data: {
            empEmail: empEmailValue
        },
        success: function(result){
            console.log(result)

            if (result === "success"){ // 일치하는 아이디가 있음

                $(".inputcheckId").css("display", "none");
                $(".checkIdOk").css("display", "flex"); 
            } else { // 일치하는 아이디가 없음

                $("#checkEmailFail").css("display", "flex"); 
            }
            
        },
        error: function(){
            console.log("checkEmail.em ajax 통신 실패")
        }

    })
}

// 비밀번호 찾기 인증번호 전송 버튼 클릭
function sendSMSPhone2(event){
    event.preventDefault();
    console.log("인증번호 전송 버튼 클릭됨");
    
    const empName = document.querySelector("#empNameId2");
    const empPhone = document.querySelector("#empPhoneId2");
    const regex = /^\d{11}$/;

    if (empName.value === "" || empPhone.value === ""){
        swal("", "성함과 번호를 모두 입력해주세요.", "warning");
    } else {
        if (regex.test(empPhone.value)){
            swal("", "인증번호가 전송되었습니다.", "info");

            $("#confirmNo2").attr("disabled", false); // 인증번호 입력창 활성화
            $("#confirmNo2").css("background-color", "white");

            $("#empNameId2").attr("readonly", true);
            $("#empNameId2").css("background-color", "rgb(239, 239, 239)");
            $("#empPhoneId2").attr("readonly", true);
            $("#empPhoneId2").css("background-color", "rgb(239, 239, 239)");

            $.ajax({
                url: "sendSMS.em",
                data: {
                    smsName: empName.value,
                    smsPhone : empPhone.value
                },
                success: function(res){
                    console.log(res)

                },
                error: function(){
                    console.log("sendSMS.em ajax 통신 실패")
                }
            })
        } else {
            swal("", "전화번호를 올바르게 입력해주세요.", "warning");
        }
    }

}

// 비밀번호 찾기 문자인증 완료시 새로운 비밀번호 입력
function confirmNumberPwd(event){
    event.preventDefault();
    console.log("비밀번호 찾기 다음 버튼 클릭됨")
    console.log($("#confirmNo2").val())

    $.ajax({
        url: "confirmNumberPwd.em",
        data: {
            smsConfirmNo: document.querySelector("#confirmNo2").value,
            smsName: document.querySelector("#empNameId2").value,
            smsPhone: document.querySelector("#empPhoneId2").value
        },
        success: function(result){
            console.log(result)
            if (result === "success"){ // 인증번호 일치             
                $(".inputNewPwd").css("display", "flex");
                $(".checkIdOk").css("display", "none");
            } else { // 인증번호 불일치
                $(".confirmFail2").css("display", "flex");
            }
            
        },
        error: function(){
            console.log("confirmNumberPwd.em ajax 통신 실패")
        }
    })
}

checkPwd = (event) => {

    if (chkPW(event.target.value)){
        document.querySelector("#password-invalid-test").style.color = "green";
    } else {
        document.querySelector("#password-invalid-test").style.color = "red";
    };
}


//비밀번호 유효성 여부 검사 함수
function chkPW(password) {
    // 1. 입력한 value 값을 가져옴
    let inputPassword = password;
    //2. 글자 특수문자 혼합
    let num = inputPassword.search(/[0-9]/g);
    let eng = inputPassword.search(/[a-z]/ig);
    let spe = inputPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (inputPassword.length < 8 || inputPassword.length > 20) {
        document.querySelector("#password-invalid-test").innerHTML = "8자리 ~ 20자리 이내로 입력해주세요.";
        return false;
    } else if (inputPassword.search(/\s/) != -1) {
        document.querySelector("#password-invalid-test").innerHTML = "비밀번호는 공백 없이 입력해주세요.";
        return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
        document.querySelector("#password-invalid-test").innerHTML = "영문,숫자, 특수문자를 혼합하여 입력해주세요.";
        return false;
    } else {
        document.querySelector("#password-invalid-test").innerHTML = "사용가능한 비밀번호 입니다.";
        return true;
    }

}

checkPwdConfirm = (event) => {

    const newPwd = document.querySelector("#newPwd").value;
    const newPwdConfirm = document.querySelector("#newPwdConfirm").value;

    if (newPwd === newPwdConfirm){
        document.querySelector("#password-invalid-test2").innerHTML = "비밀번호가 일치합니다.";
        document.querySelector("#password-invalid-test2").style.color = "green";
    } else {
        document.querySelector("#password-invalid-test2").innerHTML = "비밀번호가 일치하지 않습니다.";
        document.querySelector("#password-invalid-test2").style.color = "red";
    }

}

// 새로운 비밀번호 변경
function updateNewPwd(event){
    event.preventDefault();
    console.log("비밀번호 변경하기 클릭됨")

    $.ajax({
        url: "updateNewPwd.em",
        data: {
            empPwd: document.querySelector("#newPwd").value,
            empEmail: empEmailValue
        },
        success: function(result){
            console.log(result)
            swal("비밀번호가 변경되었습니다.", "새로운 비밀번호로 로그인 해주세요.", "success")
            .then(() => {
                location.href = "/ww";
            });
            
        },
        error: function(){
            console.log("newUpdatePwd.em ajax 통신 실패")
        }
    })
}


showFindId = () =>{
   document.querySelector(".idFindForm-input-container").style.display = 'flex'
   document.querySelector(".pwdFindForm-input-container").style.display = 'none'
}

showFindPwd =() =>{
    document.querySelector(".idFindForm-input-container").style.display = 'none'
    document.querySelector(".pwdFindForm-input-container").style.display = 'flex'
    $(".findIdResultDispaly").css("display", "none");
    $("#goback").css("display", "flex");
    $("#goLoginBtn").css("display", "none");
}
