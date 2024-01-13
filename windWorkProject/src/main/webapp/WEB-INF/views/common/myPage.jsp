<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Mypage</title>
        <!-- 부트스트랩 -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        <!-- css -->
        <link rel="stylesheet" href="resources/common/css/mypage-menu.css">
        <!--카카오 주소-->
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
        <!--카카오 주소-->
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
        <!--script-->
        <script src="resources/common/js/mypage.js"></script>
        <script src="resources/common/js/ajax.js"></script>
        <!--alert-->
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    </head>

    <body>
        <jsp:include page="../common/header.jsp" />
        <div class="menu">
            <div class="menu-mypage">
                <div class="menu-mypage-form">
                    <div class="menu-mypage-imgcontainer">
                        <div class="menu-mypage-img-inline">
                            <img src="./${loginUser.profileFilePath}" id="profilePreview" class="menu-mypage-img"
                                alt="...">
                            <div onclick="profileMemberInsertbox()" class="menu-mypage-img-inline-edit-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                    class="bi bi-pencil-fill" style="color: rgb(255, 255, 255);" viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>

                            </div>
                        </div>
                    </div>
                    <div class="menu-mypage-textcontainer">
                        <form action="update.em" method="post" enctype="multipart/form-data">
                            <input type="file" class="profiledisplay"
                                onchange="readURL(this, './${loginUser.profileFilePath}');" name="reupfile"
                                id="profileMemberInsert">
                            <div class="menu-mypage-tableform">
                                <input type="hidden" name="empNo" value="${loginUser.empNo}">
                                <input type="hidden" name="profileFilePath" value="${loginUser.profileFilePath}">
                                <table class="menu-mypage-tableform-table">
                                    <tr>
                                        <th width="90">사원번호</th>
                                        <td class="tableform-td td-h6">
                                            ${loginUser.empNo}
                                        </td>
                                        <td width="90"></td>
                                    </tr>
                                    <tr>
                                        <th width="90">이름</th>
                                        <td class="tableform-td td-h6">
                                            ${loginUser.empName}
                                        </td>
                                        <td width="90"></td>
                                    </tr>
                                    <tr>
                                        <th width="90">부서 · 직위</th>
                                        <td class="tableform-td">${loginUser.deptName} ${loginUser.jobName}</td>
                                        <td width="90"></td>
                                    </tr>
                                    <tr>
                                        <th width="90"></th>
                                        <td class="tableform-td"><button type="button"
                                                class="btn btn-outline-success btn-color1"
                                                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: 3.7rem; --bs-btn-font-size: .75rem;"
                                                data-bs-toggle="modal" data-bs-target="#passwordChangeBtn">비밀번호
                                                변경</button>
                                        </td>
                                        <td width="90"></td>
                                    </tr>
                                    <tr>
                                        <th width="90">전화번호</th>
                                        <td class="tableform-td"><input type="text" placeholder="전화번호 입력"
                                                name="empPhone" value="${loginUser.empPhone}"
                                                class="menu-mypage-tableform-text1">
                                        </td>
                                        <td width="90"></td>
                                    </tr>
                                    <tr>
                                        <th width="90">이메일</th>
                                        <td class="tableform-td"><input type="text" name="empEmail" placeholder="이메일입력"
                                                value="${loginUser.empEmail}" class="menu-mypage-tableform-text2">
                                        </td>
                                        <td width="90"></td>
                                    </tr>
                                    <tr>
                                        <th width="90">주소</th>
                                        <td class="tableform-td"><input class="form-control form-control-sm" type="text"
                                                name="empAddress" id="sample4_roadAddress" placeholder="도로명주소">
                                        </td>
                                        <td align="end" width="90"><input type="button" name="selectAddress"
                                                class="btn btn-outline-dark d_btn"
                                                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
                                                onclick="sample4_execDaumPostcode();" value="검색"></td>
                                    </tr>
                                </table>
                                <div class="mypage-btn">
                                    <button type="submit" class="btn btn-success btn-color2"
                                        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: 2rem; --bs-btn-font-size: .75rem;">
                                        저장
                                    </button>
                                    <button type="button" class="btn btn-outline-dark"
                                        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: 2rem; --bs-btn-font-size: .75rem;">
                                        취소
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="passwordChangeBtn" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">비밀번호 변경</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mypage-password-change"><label for="password" class="change-passwordlabel">현재 비밀번호 :
                            </label><input type="password" id="password">
                        </div>
                        <br>
                        <div class="mypage-password-change"><label for="newPassword" class="change-passwordlabel">새 비밀번호
                                : </label><input type="password" onkeyup="passNewPassword()" id="newPassword">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                        <button type="button" onclick="passwordChange(${loginUser.empNo}, '${loginUser.empEmail}')"
                            class="btn btn-primary">변경</button>
                    </div>
                </div>
            </div>
        </div>
    </body>

    </html>