<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html>

    <head>
      <meta charset="UTF-8">
      <title>Lecture Materials Detail</title>
      <!-- 부트스트랩 -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
      <!--제이쿼리-->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <!--css-->
      <link rel="stylesheet" href="resources/studyManagement/css/lectureMaterialsDetailView.css">
      <!--js-->
      <script src="./resources/studyManagement/js/lectureMaterialsDetailView.js"></script>
      <script src="./resources/studyManagement/js/lessonPlan.js"></script>
      <script src="./resources/studyManagement/ajax/ajax.js"></script>
      <!--alert-->
      <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    </head>

    <body onload="lectureMaterialsDetailOnload()">
      <jsp:include page="../common/header.jsp" />
      <div class="menu">
        <div class="studyManagementMenus">
          <div class="lectureMaterialsDetail-Materials-cotainer">
            <div class="lectureMaterialsDetail">
              <div class="lectureMaterialsDetail-title">
                <div class="lectureMaterialsDetail-title1">
                  <h3 class="lectureMaterialsDetail-title1-h3" style="margin: 0 0 0 30px;">
                    <c:choose>
                      <c:when test="${c.category == '자바'}">
                        Java
                      </c:when>
                      <c:when test="${c.category == '데이터베이스' }">
                        DB
                      </c:when>
                      <c:when test="${c.category == '파이썬' }">
                        Python
                      </c:when>
                      <c:otherwise>
                        JavaScript
                      </c:otherwise>
                    </c:choose>
                    <div id="ajaxlikediv">
                      <c:choose>
                        <c:when test="${!empty likeClassData}">
                          <svg xmlns="http://www.w3.org/2000/svg"
                            onclick="ajaxLikeDeleteSelect(${c.classDataNo}, ${loginUser.empNo})" style="color: #fbf4a8;"
                            width="16" height="16" fill="currentColor" id="lectureMaterialsDetail-title-favorites"
                            class="bi bi-star" viewBox="0 0 16 16">
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </c:when>
                        <c:otherwise>
                          <svg xmlns="http://www.w3.org/2000/svg"
                            onclick="ajaxLikeAddSelect(${c.classDataNo}, ${loginUser.empNo})"
                            style="color: rgba(0, 0, 0, 0.281);" width="16" height="16" fill="currentColor"
                            id="lectureMaterialsDetail-title-favorites" class="bi bi-star" viewBox="0 0 16 16">
                            <path
                              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </c:otherwise>
                      </c:choose>
                    </div>
                  </h3>
                </div>
              </div>
              <div class="lectureMaterialsDetail-btns">
                <div class="lectureMaterialsDetail-btns1">
                  <div class="lectureMaterialsDetail-btn1">
                    <c:choose>
                      <c:when test="${loginUser.empNo eq c.empNo}">
                        <button onclick="updateForm(${c.classDataNo})"
                          class="lectureMaterialsDetail-btn1-update lectureMaterialsDetail-btn1-mode"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-up lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                          </svg> 업데이트</button>
                      </c:when>
                      <c:otherwise>
                        <button onclick="alert('본인 게시글이 아니면 수정할 수 없습니다.')"
                          class="lectureMaterialsDetail-btn1-update lectureMaterialsDetail-btn1-mode"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-up lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                          </svg> 업데이트</button>
                      </c:otherwise>
                    </c:choose>

                    <button class="lectureMaterialsDetail-btn1-mode lectureMaterialsDetail-btn1-movement"
                      data-bs-toggle="modal" data-bs-target="#lectureMovement">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-back lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                        <path
                          d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
                      </svg> 이동</button>

                    <c:choose>
                      <c:when test="${loginUser.empNo eq c.empNo}">
                        <button onclick="deleteClassData(${c.classDataNo})"
                          class="lectureMaterialsDetail-btn1-mode lectureMaterialsDetail-btn1-delete">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-trash3 lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                            <path
                              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg> 삭제</button>
                      </c:when>
                      <c:otherwise>
                        <button onclick="alert('본인 게시글만 삭제할 수 있습니다.')"
                          class="lectureMaterialsDetail-btn1-mode lectureMaterialsDetail-btn1-delete">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-trash3 lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                            <path
                              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg> 삭제</button>
                      </c:otherwise>
                    </c:choose>
                  </div>
                </div>
                <div class="lectureMaterialsDetail-btns2">
                  <div class="lectureMaterialsDetail-btn2">
                    <c:if test="${dataSize  ne c.classDataNo}">
                      <button class="lectureMaterialsDetail-btn1-mode "
                        onclick="detailMaterialsView(${c.classDataNo + 1})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-arrow-up lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                        </svg>위</button>
                    </c:if>
                    <c:if test="${c.classDataNo > 1}">
                      <button class="lectureMaterialsDetail-btn1-mode "
                        onclick="detailMaterialsView(${c.classDataNo - 1})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-arrow-down lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                        </svg>아래</button>
                    </c:if>
                    <button onclick="copyURL()" class="lectureMaterialsDetail-btn1-mode "><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-share lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                        <path
                          d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                      </svg> URL 복사</button>
                    <button class="lectureMaterialsDetail-btn1-mode " onclick="history.back()"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-justify lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                      </svg>목록</button>
                    <button onclick="window.print()" class="lectureMaterialsDetail-btn1-mode "><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-printer lectureMaterialsDetail-btn-margin" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                        <path
                          d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                      </svg> 인쇄</button>
                  </div>
                </div>

              </div>
              <div class="lectureMaterialsDetail-hr">
              </div>
              <div class="lectureMaterialsDetail-contents">
                <div class="lectureMaterialsDetail-content">
                  <h4>${c.classDataTitle}</h4>
                  <br>
                  <div class="lectureMaterialsDetail-item-bar">
                    <div class="lectureMaterialsDetail-item-bar1">
                      <label id="lectureMaterialsDetail-item-bar1-checkbox-label1"
                        class="lectureMaterialsDetail-item-bar1-checkbox-label"
                        for="lectureMaterialsDetail-item-bar1-checkbox">자세히
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                          class="bi bi-chevron-up" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                        </svg>
                      </label>
                      <input type="checkbox" id="lectureMaterialsDetail-item-bar1-checkbox">
                      <div class="lectureMaterialsDetail-item-bar1-checkbox-hr-box">
                        <div class="lectureMaterialsDetail-item-bar1-checkbox-hr"></div>
                      </div>
                    </div>
                    <div class="lectureMaterialsDetail-item-bar1-content"
                      id="lectureMaterialsDetail-item-bar1-content1">
                      <div class="lectureMaterialsDetail-item-bar1-content-details1">
                        <div class="lectureMaterialsDetail-item-bar1-content-details1">
                          <span class="lectureMaterialsDetail-details-title">등록자 : </span>
                          <span class="lectureMaterialsDetail-details-content"> <img src="./${c.profileFilePath}"
                              class="lectureMaterialsDetail-details-prof" alt="">${c.empName } ${c.jobName} ${c.deptName
                            }
                          </span>
                        </div>
                        <div class="lectureMaterialsDetail-item-bar1-content-details1">
                          <span class="lectureMaterialsDetail-details-title">보존연한 : </span>
                          <span class="lectureMaterialsDetail-details-content">${c.classDataTimeName } 년</span>
                        </div>
                      </div>
                      <div class="lectureMaterialsDetail-item-bar1-content-details1">
                        <div class="lectureMaterialsDetail-item-bar1-content-details1">
                          <span class="lectureMaterialsDetail-details-title">등록일 : </span>
                          <span class="lectureMaterialsDetail-details-content">${c.classDataDate } </span>
                        </div>
                        <div class="lectureMaterialsDetail-item-bar1-content-details1">
                          <span class="lectureMaterialsDetail-details-title">삭제일 &nbsp &nbsp: </span>
                          <span class="lectureMaterialsDetail-details-content">${c.classDataEndDate } </span>
                        </div>
                      </div>
                    </div>

                    <div class="lectureMaterialsDetail-item-bar1">
                      <label id="lectureMaterialsDetail-item-bar1-checkbox-label2"
                        class="lectureMaterialsDetail-item-bar1-checkbox-label"
                        for="lectureMaterialsDetail-item-bar1-checkbox2">상세내용
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                          class="bi bi-chevron-up" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                        </svg>
                      </label>
                      <input type="checkbox" id="lectureMaterialsDetail-item-bar1-checkbox2">
                      <div class="lectureMaterialsDetail-item-bar1-checkbox-hr-box">
                        <div class="lectureMaterialsDetail-item-bar1-checkbox-hr"></div>
                      </div>
                    </div>
                    <div class="lectureMaterialsDetail-item-bar1-content2"
                      id="lectureMaterialsDetail-item-bar1-content2">
                      <span class="lectureMaterialsDetail-details-content2">${c.classDataContent }</span>
                    </div>

                    <div class="lectureMaterialsDetail-item-bar1">
                      <label id="lectureMaterialsDetail-item-bar1-checkbox-label3"
                        class="lectureMaterialsDetail-item-bar1-checkbox-label"
                        for="lectureMaterialsDetail-item-bar1-checkbox3">첨부파일
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                          class="bi bi-chevron-up" viewBox="0 0 16 16">
                          <path fill-rule="evenodd"
                            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                        </svg>
                      </label>
                      <input type="checkbox" id="lectureMaterialsDetail-item-bar1-checkbox3">
                      <div class="lectureMaterialsDetail-item-bar1-checkbox-hr-box">
                        <div class="lectureMaterialsDetail-item-bar1-checkbox-hr"></div>
                      </div>
                    </div>
                    <div class="lectureMaterialsDetail-item-bar1-content2"
                      id="lectureMaterialsDetail-item-bar1-content3">
                      <c:choose>
                        <c:when test="${empty calist}">
                          <p class="lectureMaterialsDetail-details-content3">자료가 없습니다.</p>
                        </c:when>
                        <c:otherwise>
                          <c:forEach var="c" items="${calist}">
                            <div class="lectureMaterialsDetail-item-bar1-content3-content">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-save2-fill" viewBox="0 0 16 16">
                                <path
                                  d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v6h-2a.5.5 0 0 0-.354.854l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5A.5.5 0 0 0 10.5 7.5h-2v-6z" />
                              </svg>
                              <a href="./${calist[i].classFilePath }"
                                class="lectureMaterialsDetail-details-content3">${c.classOriginName}</a>
                              <p class="lectureMaterialsDetail-details-content4">(${c.classFileSize} KB)</p>
                            </div>
                          </c:forEach>
                        </c:otherwise>
                      </c:choose>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <!-- Modal -->
      <div class="modal fade" id="lectureMovement" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">이동</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="hiddenclassDataNo" value="${c.classDataNo}">
              <select class="form-select" id="classDataCategorySelect" aria-label="Default select example">
                <option selected>어느 곳으로 이동할까요</option>
                <option value="1">자바</option>
                <option value="2">데이터베이스</option>
                <option value="3">자바스크립트</option>
                <option value="4">파이썬</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
              <button type="button" onclick="lectureMovement('${c.empName }', '${loginUser.empName }')"
                class="btn btn-primary">이동</button>
            </div>
          </div>
        </div>
      </div>
    </body>

    </html>