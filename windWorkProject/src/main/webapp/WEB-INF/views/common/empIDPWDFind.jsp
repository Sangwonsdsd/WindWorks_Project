<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>FindId/Pwd</title>
<!--부트스트랩-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
crossorigin="anonymous"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- CSS -->
<link rel="stylesheet" href="./resources/common/css/empIDFind.css">

<!-- JS -->
<script src="resources/common/js/empIDFind.js"></script>

<!-- SweetAlert -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</head>
<body>
	<div class="insertContainer" >

        <div class="tab-menu">
            <input id="idFindForm" onclick="showFindId()" type="radio" name="tab_item" checked>
            <label class="tab_item" for="idFindForm">아이디 찾기</label>
            <input id="pwdFindForm" onclick="showFindPwd()" type="radio" name="tab_item">
            <label class="tab_item" for="pwdFindForm">비밀번호 찾기</label>
        </div>

        <div class="container" >

            <form action="" method="post" class="tab_content" id="idFindForm">
                
                <div class="idFindForm-input-container">
                    <div class="idFindForm-input-title-logo">
                        아이디 찾기
                    </div>
                    <div class="idFind-input-form">
                        <div class="inputName">
                            <input class="idFindForm-input-style"  placeholder="이름 입력" type="text" id="empNameId" required>
                        </div>
                        <div class="inputPhone">
                            <input class="idFindForm-input-style" placeholder="휴대폰 번호(-제외 입력)" type="text" id="empPhoneId" required>
                            <button class="idFindForm-sendSMS-button" id="sendSMS" onclick="sendSMSPhone(event)">인증번호 전송</button>
                        </div>
                        <div class="inputConfirmNo">
                            <input class="idFindForm-input-style"  placeholder="인증번호 4자리 숫자 입력" type="text" id="confirmNo4" disabled required>
                            <button class="idFindForm-confirmNo-button" id="confirmNo" onclick="confirmNumber(event)">인증번호 확인</button>
                        </div>
                        <div>
                            <input class="confirmFail" value="인증번호가 일치하지 않습니다.">
                        </div>
                    </div>
                </div>

                <div class="findIdResultDispaly">
                    <div class="find-id-ment-all">
                        <span id="find-id-ment">회원님의 아이디를 확인해주세요</span>
                        <span class="find-result-id"></span>
                    </div>
                </div>
                    
            </form>


            <!-- <form action="" method="post" class="tab_content" id="pwdFindForm"> -->
                <div class="pwdFindForm-input-container">
                
                    <div class="pwdFindForm-input-title-logo">
                        비밀번호 찾기
                    </div>

                    <div class="inputcheckId">
                        <input class="idCheckForm-input-style" placeholder="이메일(아이디) 입력"  type="text" id="empcheckEmail" required>
                        <input id="checkEmailFail" value="존재하는 아이디(이메일)가 없습니다.">
                        <button class="idFindForm-checkId-button" id="checkId" onclick="checkEmail(event)">다음</button>
                    </div>

                    <div class="checkIdOk">
                        <div class="inputName">
                            <input class="idFindForm-input-style"  placeholder="이름 입력" type="text" id="empNameId2" required>
                        </div>
                        <div class="inputPhone">
                            <input class="idFindForm-input-style" placeholder="휴대폰 번호(-제외 입력)" type="text" id="empPhoneId2" required>
                            <button class="idFindForm-sendSMS-button" id="sendSMS" onclick="sendSMSPhone2(event)">인증번호 전송</button>
                        </div>
                        <div class="inputConfirmNoPwd">
                            <input class="idFindForm-input-style"  placeholder="인증번호 4자리 숫자 입력" type="text" id="confirmNo2" disabled required>
                            <button class="idFindForm-confirmNo-button" id="confirmNoPwd" onclick="confirmNumberPwd(event)">인증번호 확인</button>
                        </div>
                        <div class="failText">
                            <input class="confirmFail2" value="인증번호가 일치하지 않습니다.">
                        </div>
                    </div>

                    <div class="findPwdResultDispaly">
                        <div class="inputNewPwd">
                            <input class="pwdFindForm-input-style" onkeyup="checkPwd(event)" placeholder="새 비밀번호 입력" type="password" id="newPwd" autocomplete="new-password" required>
                         
                            <div class="valid-feedback insert-invalid-fontsize1" id="password-invalid-test">
                            </div>

                            <input class="pwdFindForm-input-style"  onkeyup="checkPwdConfirm(event)" placeholder="새 비밀번호 확인" type="password" id="newPwdConfirm" autocomplete="new-password" required>
                            <div class="invalid-feedback insert-invalid-fontsize2"
                            id="password-invalid-test2">
                            </div>
                            
                            <button class="idFindForm-newPwd-button" id="updateNewPwd" onclick="updateNewPwd(event)">변경하기</button>
                        </div>
                        <!-- 자동입력 방지문자 -->
                    </div>
                        
                </div>
            <!-- </form> -->

        </div>


        <div class="backBtn">
            <div  class="backBtn-container">
                <button type="button" id="goback" onclick="history.back()">돌아가기</button>
                <button type="button" id="goLoginBtn" onclick="location.href='/ww'">로그인하기</button>
            </div>
        </div>

    </div>

    

</body>
</html>