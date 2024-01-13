function ajaxPasswordChange(empPwd, newPassword, empNo, empEmail) {
    $.ajax({
        url: "ajaxPasswordChange.emp",
        data: {
            empPwd: empPwd,
            newPassword: newPassword,
            empEmail: empEmail,
            empNo: empNo
        },
        success: function (res) {
            console.log(res);
            if (res === 'failPassword') {
                swal("", "현재 비밀번호가 틀립니다.", "error");
            } else {
                if (res === 'fail') {
                    swal("", "비밀번호 변경 실패.", "error");
                } else {
                    swal("", "비밀번호 변경 완료.", "success");
                }

            }

        },
        error: function () {
            console.log("ajaxPasswordChange ajax 통신 실패")
        },
    })
}