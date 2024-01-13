function mailWriteForm() {
    location.href = "send.mail";
}

function mailDetailform(emailNo) {
    console.log(emailNo);
    location.href = "detail.mail?emailNo=" + emailNo;
}

function sendMailDetailform(emailNo){
    location.href = "sendDetail.mail?emailNo=" + emailNo;
}

function maillocationHref(num) {
    if (num === 1) {
        location.href = "list.mail";
    } else if (num === 2) {
        location.href = "sendList.mail";
    } else {
        location.href = "sendDeleteList.mail";
    }
}
function replyMailForm(emailNo){
    location.href = "replyMailForm.mail?emailNo="+emailNo;
}

function getMailList() {
    ajaxMailList(0, drawGetMailList)
}

function sendMailList() {
    ajaxMailList(1, drawSendMailList)
}

function deleteMailList() {
    ajaxDeleteMail(drawDeleteMailList)
}

function downloadMail(filepath, emailChangeName) {
    let link = document.createElement('a');
    link.href = filepath;
    link.download = emailChangeName;
    link.click();
}

function mailGetDeleteBtn(cpage) {
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let blt = document.querySelector("#boardLimit").value;

    let checkBoxtrueList = new Array();
    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            checkBoxtrueList.push(checkBox.value)
        }
    }

    ajaxMailDelete(0, drawGetMailList, checkBoxtrueList, cpage, blt);

}

function mailsendDeleteBtn(cpage) {
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let blt = document.querySelector("#sendboardLimit").value;

    let checkBoxtrueList = new Array();
    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            checkBoxtrueList.push(checkBox.value)
        }
    }

    ajaxMailDelete(1, drawSendMailList, checkBoxtrueList, cpage, blt);

}


function mailDeleteDeleteBtn(cpage) {
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let blt = document.querySelector("#deleteboardLimit").value;

    let checkBoxtrueList = new Array();
    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            checkBoxtrueList.push(checkBox.value)
        }
    }

    ajaxDeleteMailDelete(drawDeleteMailList, checkBoxtrueList, cpage, blt);

}

function mailMagicBtn(cpage){
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let blt = document.querySelector("#deleteboardLimit").value;

    let checkBoxtrueList = new Array();
    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            checkBoxtrueList.push(checkBox.value)
        }
    }

    ajaxRestoreMail(drawDeleteMailList, checkBoxtrueList, cpage, blt);
}

function mailAllCheckBtn() {
    let checkboxesAll = document.querySelector("#all-mail-checkbox");
    let checkboxes = document.getElementsByClassName('mail-checkbox');

    if (checkboxesAll.checked === true) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }
}
function relaySendMail(){
    let relaycheckboxes = document.getElementsByClassName('mail-send-relay-checkbox');
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let relayCheckBoxtrueList = new Array();
    let mailCheckBoxtrueList = new Array();

    for (let checkBox of relaycheckboxes) {
        if (checkBox.checked == true) {
            relayCheckBoxtrueList.push(checkBox.value)
        }
    }

    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            mailCheckBoxtrueList.push(checkBox.value)
        }
    }
    ajaxMailrelay(relayCheckBoxtrueList, mailCheckBoxtrueList);
}

function relayOnlySendMail(emailNo){
    let relaycheckboxes = document.getElementsByClassName('mail-send-relay-checkbox');
    let relayCheckBoxtrueList = new Array();

    for (let checkBox of relaycheckboxes) {
        if (checkBox.checked == true) {
            relayCheckBoxtrueList.push(checkBox.value)
        }
    }

    ajaxRelayOnlySendMail(relayCheckBoxtrueList, emailNo);
}
function relayMail() {
    let relaycheckboxes = document.getElementsByClassName('mail-relay-checkbox');
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let relayCheckBoxtrueList = new Array();
    let mailCheckBoxtrueList = new Array();

    for (let checkBox of relaycheckboxes) {
        if (checkBox.checked == true) {
            relayCheckBoxtrueList.push(checkBox.value)
        }
    }

    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            mailCheckBoxtrueList.push(checkBox.value)
        }
    }

    ajaxMailrelay(relayCheckBoxtrueList, mailCheckBoxtrueList);
}

function relayDeleteMail(){
    let relaycheckboxes = document.getElementsByClassName('mail-delete-relay-checkbox');
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let relayCheckBoxtrueList = new Array();
    let mailCheckBoxtrueList = new Array();

    for (let checkBox of relaycheckboxes) {
        if (checkBox.checked == true) {
            relayCheckBoxtrueList.push(checkBox.value)
        }
    }

    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            mailCheckBoxtrueList.push(checkBox.value)
        }
    }

    ajaxDeleteMailrelay(relayCheckBoxtrueList, mailCheckBoxtrueList);
}

function relayAllCheck() {
    let checkboxesAll = document.querySelector("#relayAllCheckBox");
    let checkboxes = document.getElementsByClassName('mail-relay-checkbox');

    if (checkboxesAll.checked === true) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }
}

function relaySendAllCheck() {
    let checkboxesAll = document.querySelector("#relaySendAllCheckBox");
    let checkboxes = document.getElementsByClassName('mail-send-relay-checkbox');

    if (checkboxesAll.checked === true) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }
}

function relayDeleteAllCheck(){
    let checkboxesAll = document.querySelector("#relayDeleteAllCheckBox");
    let checkboxes = document.getElementsByClassName('mail-delete-relay-checkbox');

    if (checkboxesAll.checked === true) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }
}


function drawGetMailList(res) {
    const emailList = res.emailList;
    const mailListCount = res.mailListCount;
    const pi = res.pi;
    let readListCount = 0;
    if (res.readListCount > 0) {
        readListCount = res.readListCount;
    }

    let emailListStr = "";
    let piStr = "";


    document.querySelector("#putMailCount").innerText = readListCount;
    document.querySelector("#getMailCount").innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"'
        + 'class="bi bi-mailbox mail-btn-margin" viewBox="0 0 16 16">'
        + '<path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />'
        + '<path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />'
        + '</svg>'
        + mailListCount + '/140';
    if (emailList.length == 0) {
        emailListStr += ' <tr class="mail-right-tr">'
            + ' <td style="padding-left: 30px;" colspan="5"'
            + 'class="mail-table-ailgn mail-table-td">'
            + '메일이 없습니다.'
            + '</td>'
            + '</tr>'
    }
    for (let email of emailList) {
        emailListStr += '<tr class="mail-right-tr">'
            + '<td style="padding-left: 30px;">'
            + '<input type="checkbox" value="' + email.emailNo + '" class="mail-checkbox">'
            + '</td>'
            + ' <td class="mail-table-ailgn mail-table-td" onclick="mailDetailform(${item.emailNo}, ${item.emailLevel});">'
        if (email.emailReadStatus == 0) {
            emailListStr += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">'
            + '<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>'
          + '</svg>'
        } else {
            emailListStr += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16">'
            + '<path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"/>'
           + '</svg>'
        }
        emailListStr += '</td>'

        if (email.emailReadStatus == 0) {
            emailListStr += '<td class="mail-table-ailgn mail-table-td mailCategorySeleted" onclick="mailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailSenderEmail
                + '</td>'
        } else {
            emailListStr += '<td class="mail-table-ailgn mail-table-td" onclick="mailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailSenderEmail
                + '</td>'
        }
        if (email.emailReadStatus == 0) {
            emailListStr += '<td class="mail-table-ailgn mail-table-td mailCategorySeleted"  onclick="mailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailTitle
                + '</td>'
        } else {
            emailListStr += '<td class="mail-table-ailgn mail-table-td"  onclick="mailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailTitle
                + '</td>'
        }
        if (email.emailReadStatus == 0) {
            emailListStr += '<td class="mail-table-time-th mail-table-td mailCategorySeleted">'
                + email.emailTime
                + '</td>'
        } else {
            emailListStr += '<td class="mail-table-time-th mail-table-td">'
                + email.emailTime
                + '</td>'
        }
        emailListStr += '</tr>'
    }

    document.querySelector("#getEmailList").innerHTML = emailListStr;

    if (pi.currentPage === 1) {
        piStr += '<button disabled class="pazzing-btn"> &lt; </button>'
    } else {
        piStr += '<button class="pazzing-btn" onclick="' + "changeBoardLimit(" + (pi.currentPage - 1) + ")" + '"> &lt; </button>'
    }

    for (let i = pi.startPage; i <= pi.endPage; i++) {
        if (pi.currentPage == i) {
            piStr += '<button class="pazzing-btn pazzing-btn-click">' + i + '</button>'
        } else {
            piStr += '<button class="pazzing-btn" onclick="' + "changeBoardLimit(" + i + ")" + '"> ' + i + ' </button>'

        }
    }

    if (pi.maxPage !== 0) {
        if (pi.currentPage == pi.maxPage) {
            piStr += '<button disabled class="pazzing-btn"> &gt; </button>'
        } else {
            piStr += '<button class="pazzing-btn" onclick="' + "changeBoardLimit(" + (pi.currentPage + 1) + ")" + '"> &gt; </button>'
        }
    } else {
        piStr += '<button disabled class="pazzing-btn"> &gt; </button>'
    }

    document.querySelector("#getMailListPi").innerHTML = piStr;

}

function drawSendMailList(res) {
    const emailList = res.emailList;
    const mailListCount = res.mailListCount;
    const pi = res.pi;
    let readListCount = 0;
    if (res.readListCount > 0) {
        readListCount = res.readListCount;
    }
    let emailListStr = "";
    let piStr = "";

    document.querySelector("#sendputMailCount").innerText = readListCount;
    document.querySelector("#sendMailCount").innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"'
        + 'class="bi bi-mailbox mail-btn-margin" viewBox="0 0 16 16">'
        + '<path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />'
        + '<path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />'
        + '</svg>'
        + mailListCount + '/140';

    if (emailList.length == 0) {
        emailListStr += ' <tr class="mail-right-tr">'
            + ' <td style="padding-left: 30px;" colspan="5"'
            + 'class="mail-table-ailgn mail-table-td">'
            + '메일이 없습니다.'
            + '</td>'
            + '</tr>'
    }
    for (let email of emailList) {
        emailListStr += '<tr class="mail-right-tr">'
            + '<td style="padding-left: 30px;">'
            + '<input type="checkbox" value="' + email.emailNo + '" class="mail-checkbox">'
            + '</td>'
            + ' <td class="mail-table-ailgn mail-table-td" onclick="sendMailDetailform(${item.emailNo}, ${item.emailLevel});">'
        if (email.emailReadStatus == 0) {
            emailListStr += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">'
            + '<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>'
          + '</svg>'
        } else {
            emailListStr += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16">'
            + '<path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"/>'
           + '</svg>'
        }
        emailListStr += '</td>'

        if (email.emailReadStatus == 0) {
            emailListStr += '<td class="mail-table-ailgn mail-table-td mailCategorySeleted" onclick="sendMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailSenderEmail
                + '</td>'
        } else {
            emailListStr += '<td class="mail-table-ailgn mail-table-td" onclick="sendMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailSenderEmail
                + '</td>'
        }
        if (email.emailReadStatus == 0) {
            emailListStr += '<td class="mail-table-ailgn mail-table-td mailCategorySeleted"  onclick="sendMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailTitle
                + '</td>'
        } else {
            emailListStr += '<td class="mail-table-ailgn mail-table-td"  onclick="sendMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailTitle
                + '</td>'
        }
        if (email.emailReadStatus == 0) {
            emailListStr += '<td class="mail-table-time-th mail-table-td mailCategorySeleted">'
                + email.emailTime
                + '</td>'
        } else {
            emailListStr += '<td class="mail-table-time-th mail-table-td">'
                + email.emailTime
                + '</td>'
        }
        emailListStr += '</tr>'
    }

    document.querySelector("#sendEmailList").innerHTML = emailListStr;

    if (pi.currentPage === 1) {
        piStr += '<button disabled class="pazzing-btn"> &lt; </button>'
    } else {
        piStr += '<button class="pazzing-btn" onclick="' + "changeSendMailBoardLimit(" + (pi.currentPage - 1) + ")" + '"> &lt; </button>'
    }

    for (let i = pi.startPage; i <= pi.endPage; i++) {
        if (pi.currentPage == i) {
            piStr += '<button class="pazzing-btn pazzing-btn-click">' + i + '</button>'
        } else {
            piStr += '<button class="pazzing-btn " onclick="' + "changeSendMailBoardLimit(" + i + ")" + '"> ' + i + ' </button>'

        }
    }

    if (pi.maxPage !== 0) {
        if (pi.currentPage == pi.maxPage) {
            piStr += '<button disabled class="pazzing-btn"> &gt; </button>'
        } else {
            piStr += '<button class="pazzing-btn" onclick="' + "changeSendMailBoardLimit(" + (pi.currentPage + 1) + ")" + '"> &gt; </button>'
        }
    } else {
        piStr += '<button disabled class="pazzing-btn"> &gt; </button>'
    }

    document.querySelector("#sendMailListPi").innerHTML = piStr;
}

function drawDeleteMailList(res) {
    const emailList = res.emailList;
    const mailListCount = res.mailListCount;
    const pi = res.pi;
    let readListCount = 0;
    if (res.readListCount > 0) {
        readListCount = res.readListCount;
    }
    let emailListStr = "";
    let piStr = "";

    document.querySelector("#deleteputMailCount").innerText = readListCount;
    document.querySelector("#deleteMailCount").innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"'
        + 'class="bi bi-mailbox mail-btn-margin" viewBox="0 0 16 16">'
        + '<path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />'
        + '<path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />'
        + '</svg>'
        + mailListCount + '/140';

    if (emailList.length == 0) {
        emailListStr += ' <tr class="mail-right-tr">'
            + ' <td style="padding-left: 30px;" colspan="5"'
            + 'class="mail-table-ailgn mail-table-td">'
            + '메일이 없습니다.'
            + '</td>'
            + '</tr>'
    }
    for (let email of emailList) {
        console.log(email.emailLevel)
        emailListStr += '<tr class="mail-right-tr">'
            + '<td style="padding-left: 30px;">'
            + '<input type="checkbox" value="' + email.emailNo + '" class="mail-checkbox">'
            + '</td>'
            + ' <td class="mail-table-ailgn mail-table-td" onclick="deleteMailDetailform(${item.emailNo}, ${item.emailLevel});">'
        if (email.emailReadStatus == 0) {
            emailListStr += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">'
            + '<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>'
          + '</svg>'
        } else {
            emailListStr += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16">'
            + '<path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"/>'
           + '</svg>'
        }
        emailListStr += '</td>'

        if (email.emailReadStatus == 0) {
            if(email.emailLevel == 0){
                emailListStr += '<td class="mail-table-ailgn mail-table-td mailCategorySeleted" onclick="deleteMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailSenderEmail
                + '</td>'
            }else{
                emailListStr += '<td class="mail-table-ailgn mail-table-td mailCategorySeleted" onclick="deleteMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailSenderEmail
                + '</td>'
            }
        } else {
            if(email.emailLevel == 0){
                emailListStr += '<td class="mail-table-ailgn mail-table-td" onclick="deleteMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailSenderEmail
                + '</td>'
            }else{
                emailListStr += '<td class="mail-table-ailgn mail-table-td" onclick="deleteMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailSenderEmail
                + '</td>'
            }
        }
        if (email.emailReadStatus == 0) {
            if(email.emailLevel == 0){
                emailListStr += '<td class="mail-table-ailgn mail-table-td mailCategorySeleted"  onclick="deleteMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailTitle
                + '</td>'
            }else{
                emailListStr += '<td class="mail-table-ailgn mail-table-td mailCategorySeleted"  onclick="deleteMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailTitle
                + '</td>'
            }

        } else {
            if(email.emailLevel == 0){
                emailListStr += '<td class="mail-table-ailgn mail-table-td"  onclick="deleteMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailTitle
                + '</td>'
            }else{
                emailListStr += '<td class="mail-table-ailgn mail-table-td"  onclick="deleteMailDetailform(' + email.emailNo + ', ' + email.emailLevel + ');">'
                + email.emailTitle
                + '</td>'
            }
        }
        if (email.emailReadStatus == 0) {
            emailListStr += '<td class="mail-table-time-th mail-table-td mailCategorySeleted">'
                + email.emailTime
                + '</td>'
        } else {
            emailListStr += '<td class="mail-table-time-th mail-table-td">'
                + email.emailTime
                + '</td>'
        }
        emailListStr += '</tr>'
    }

    document.querySelector("#deleteEmailList").innerHTML = emailListStr;

    if (pi.currentPage === 1) {
        piStr += '<button disabled class="pazzing-btn"> &lt; </button>'
    } else {
        piStr += '<button class="pazzing-btn" onclick="' + "changeDeleteMailBoardLimit(" + (pi.currentPage - 1) + ")" + '"> &lt; </button>'
    }

    for (let i = pi.startPage; i <= pi.endPage; i++) {
        if (pi.currentPage == i) {
            piStr += '<button class="pazzing-btn pazzing-btn-click">' + i + '</button>'
        } else {
            piStr += '<button class="pazzing-btn" onclick="' + "changeDeleteMailBoardLimit(" + i + ")" + '"> ' + i + ' </button>'

        }
    }

    if (pi.maxPage !== 0) {
        if (pi.currentPage == pi.maxPage) {
            piStr += '<button disabled class="pazzing-btn"> &gt; </button>'
        } else {
            piStr += '<button class="pazzing-btn" onclick="' + "changeDeleteMailBoardLimit(" + (pi.currentPage + 1) + ")" + '"> &gt; </button>'
        }
    } else {
        piStr += '<button disabled class="pazzing-btn"> &gt; </button>'
    }

    document.querySelector("#deleteMailListPi").innerHTML = piStr;
}

function changeBoardLimit(cpage) {
    let blt = document.querySelector("#boardLimit").value;
    ajaxMailBoardLimitList(0, drawGetMailList, cpage, blt)
}


function changeSendMailBoardLimit(cpage) {
    console.log(cpage);
    let blt = document.querySelector("#sendboardLimit").value;
    ajaxMailBoardLimitList(1, drawSendMailList, cpage, blt)
}

function changeDeleteMailBoardLimit(cpage) {
    let blt = document.querySelector("#deleteboardLimit").value;
    ajaxDeleteMailboard(drawDeleteMailList, cpage, blt)
}

function notReadMail(num, cpage) {
    console.log(num)
    console.log(cpage)
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let blt = "";
    if (num == 0) {
        blt = document.querySelector("#boardLimit").value;
    } else {
        blt = document.querySelector("#sendboardLimit").value;
    }

    let checkBoxtrueList = new Array();
    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            checkBoxtrueList.push(checkBox.value)
        }
    }
    if (num === 0) {
        ajaxNotReadMail(drawGetMailList, checkBoxtrueList, cpage, blt, num);
    } else {
        ajaxNotReadMail(drawSendMailList, checkBoxtrueList, cpage, blt, num);
    }

}

function readMail(num, cpage) {
    let checkboxes = document.getElementsByClassName('mail-checkbox');
    let blt = "";
    if (num == 0) {
        blt = document.querySelector("#boardLimit").value;
    } else {
        blt = document.querySelector("#sendboardLimit").value;
    }

    let checkBoxtrueList = new Array();
    for (let checkBox of checkboxes) {
        if (checkBox.checked == true) {
            checkBoxtrueList.push(checkBox.value)
        }
    }

    if (num === 0) {
        ajaxReadMail(drawGetMailList, checkBoxtrueList, cpage, blt, num);
    } else {
        ajaxReadMail(drawSendMailList, checkBoxtrueList, cpage, blt, num);
    }


}


function mailSearch(event) {
    const mailSearchInput = document.querySelector("#mailSearchInput").value;
    const mailSearchSelect = document.querySelector("#mail-right-search-select").value;
    if (event.keyCode === 13 || (!event.keyCode)) {
        ajaxmailSearchInput(0, drawGetMailList, mailSearchInput, mailSearchSelect)
    }
}

function mailSendSearch(event){
    const mailSearchInput = document.querySelector("#mailSendSearchInput").value;
    const mailSearchSelect = document.querySelector("#mail-send-search-select").value;
    if (event.keyCode === 13 || (!event.keyCode)) {
        ajaxmailSearchInput(1, drawSendMailList, mailSearchInput, mailSearchSelect)
    }
}

function mailDeleteSearch(event){
    const mailSearchInput = document.querySelector("#mailDeleteSearchInput").value;
    const mailSearchSelect = document.querySelector("#mail-delete-search-select").value;
    if (event.keyCode === 13 || (!event.keyCode)) {
        ajaxmailSearchInput(2, drawDeleteMailList, mailSearchInput, mailSearchSelect)
    }
}

function detailDeleteMailForm(emailNo, num){
    location.href = "detailDeleteMailForm.mail?emailNo=" + emailNo + "&num=" + num;
}

function restoreMailOnly(emailNo){
    location.href = "restoreMailOnly.mail?emailNo=" + emailNo;
}

function deleteMailDetailform(emailNo, emailLevel){
    location.href = "deleteMailDetailform.mail?emailNo=" + emailNo + "&emailLevel=" + emailLevel;
}