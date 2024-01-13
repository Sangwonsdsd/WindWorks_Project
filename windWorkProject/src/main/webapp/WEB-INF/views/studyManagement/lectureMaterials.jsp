<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <!DOCTYPE html>
  <html>

  <head>
    <meta charset="UTF-8">
    <title>LectureMaterials</title>
    <!-- 부트스트랩 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <!--css-->
    <link rel="stylesheet" href="resources/studyManagement/css/lectureMaterials.css">
    <!--alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  </head>

  <body onload="lessonOnload()">
    <jsp:include page="../common/header.jsp" />
    <div class="menu">
      <jsp:include page="./studyManagement.jsp" />
      <div class="lectureMaterials">
        <div class="lectureMaterialsMenus">
          <div class="lectureMaterials-title-cotainer">
            <div class="lectureMaterials-title-cotainer2">
              <div>
                <h3 class="lectureMaterials-title-cotainer2-fontweight">강의자료실</h3>
              </div>
              <div class="lectureMaterials-hr">
                <hr>
              </div>
            </div>
          </div>
          <div class="lectureMaterials-Materials-cotainer">
            <div class="lectureMaterials-search-container">
              <div class="lectureMaterials-search-container2">
                <form class="d-flex">
                  <select class="form-select form-select-sm" style="width: 80px;" id="specificSizeSelect">
                    <option value="1">제목</option>
                    <option value="2">내용</option>
                  </select>
                  <input class="form-control form-control-sm" type="search">
                  <button class="btn btn-outline-danger" type="submit"
                    style="--bs-btn-padding-y: .5rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: 0.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-search" viewBox="0 0 16 16">
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div class="lectureMaterials-Materials-cotainer2">
              <table class="lectureMaterials-Materials-table">
                <tr style="background-color: rgb(182, 37, 71); color: #ffffff;">
                  <th class="lectureMaterials-Materials-table-th2">번호</th>
                  <th class="lectureMaterials-Materials-table-title">제목</th>
                  <th class="lectureMaterials-Materials-table-th">등록일</th>
                  <th class="lectureMaterials-Materials-table-th3">첨부파일</th>
                </tr>

              </table>
            </div>
          </div>
          <div class="lectureMaterials-pazzing-container">
            <div class="notice-pagenation">
              <ul class="pagination">
                <li class="page-item disabled"><a class="page-link" href="#">
                    << /a>
                </li>
                <li class="page-item"><a class="page-link page-color" href="#">1</a></li>
                <li class="page-item"><a class="page-link page-color" href="#">2</a></li>
                <li class="page-item"><a class="page-link page-color" href="#">3</a></li>
                <li class="page-item"><a class="page-link page-color" href="#">></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>

  </html>