<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html>

    <head>
      <meta charset="UTF-8">
      <title>Lesson Plan</title>
      <!-- 부트스트랩 -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
      <!--css-->
      <link rel="stylesheet" href="resources/studyManagement/css/lessonPlan.css">
      <link rel="stylesheet" href="resources/studyManagement/css/lectureMaterials.css">
      <link rel="stylesheet" href="resources/studyManagement/css/studentManagement.css">
      <!--js-->
      <script src="resources/studyManagement/js/lessonPlan.js"></script>
      <script src="resources/studyManagement/js/studentManagement.js"></script>
      <!--alert-->
      <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    </head>

    <body onload="lessonOnload(), lessonPlanView(1, drowlessonPlanView)">
      <jsp:include page="../common/header.jsp" />
      <div class="menu">
        <jsp:include page="./studyManagement.jsp" />
        <div class="lessonPlan" id="studyManagemetMenu">
        </div>
        <!--수정하기 모달-->
        <form action="update.lp" method="post">
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header" id="modallptitle">
                  <h5 class="modal-title" id="staticBackdropLabel">강의계획표 수정</h5>
                  <input type="hidden" value="" name="classNo">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="input-group mb-3" id="modalUpdatePlanDateInput">

                  </div>
                  <div class="input-group mb-3" id="modalclassTitleInput">

                  </div>
                  <div class="input-group mb-3" id="modalclassroomInput">

                  </div>
                  <select class="form-select form-select-sm" id="modalclassWeekInput"
                    onchange="modalclassWeekInputOnchange(this)" name="classPlanNo"
                    aria-label=".form-select-sm example">

                  </select>
                  <div class="input-group" id="modalclassContentInput">

                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                  <button type="submit" class="btn btn-danger">변경하기</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

    </body>

    </html>