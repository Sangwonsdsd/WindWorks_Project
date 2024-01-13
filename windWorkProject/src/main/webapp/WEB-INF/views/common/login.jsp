<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html>

    <head>
      <meta charset="UTF-8">
      <title>Login</title>
      <!--부트스트랩-->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
      <!--login 스타일-->
      <link rel="stylesheet" href="./resources/common/css/login.css">
      <link rel="stylesheet" href="./resources/common/css/error.css">
      <!--js-->
      <script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.min.js"/></script>
      <script src="resources/common/js/login.js"></script>
    </head>

    <body>
      <form action="login.em" method="post">
        <div class='login'>
          <div class='login-logo-image'>
            <img src="./resources/common/logo/mainLogo.png" alt="" width="100" height="100">
          </div>
          <div class='login-logo-text'>
            <div class="text-body-success login-logo-text-wind">WIND</div>
            <div class="text-body-success login-logo-text-work">WORKS</div>
          </div>
          <div class="login-inputs">
            <div class="login-input">
              <div class="login-input-size">
                <input type="text" class="login-input-border" id="username" name="empEmail" placeholder="계정">
              </div>
            </div>
            <div class="login-input">
              <div class="login-input-size">
                <input type="password" class="login-input-border" id="" name="empPwd" placeholder="비밀번호">
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-success login-success-btn">로그인</button>
          <div class="login-tail">
            <div class="form-check"
              style="padding: 0px; display: flex; justify-content: space-between; align-items: center; width: 70px;">
              <input class="check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                계정저장
              </label>
            </div>
            <div class="login-insertMember-btn text-body-secondary" onclick= "idPwdFindForm()";>아이디 찾기 / 비밀번호 찾기</div>
            <div onclick="insertForm()" class="login-insertMember-btn text-body-secondary">회원가입</div>
          </div>
        </div>
      </form>
      <script>
        function insertForm() {
          location.href = "enrollForm.em";
        }
        function idPwdFindForm(){
          location.href = 'idPwdFindForm.em';
        }
      </script>
    </body>
    
    </html>