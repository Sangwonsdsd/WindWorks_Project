function sendMailFormInit(){
    $('#summernote').summernote({
        placeholder: '메일 내용을 입력해주세요',
        tabsize: 2,
        height: 300,
        maxHeight : 600,
        minHeight : 200,
        width : 900,
        callbacks : { //렌더 정보에 해당부분 추가
          onImageUpload : f01
      },
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview', 'help']]
        ]
      });

  //썸머노트에 이미지 업로드가 발생하였을 때 동작하는 함수
    function f01(fileList){
        console.log(fileList);
        
      const fd = new FormData();

      for(let file of fileList){
        fd.append('fileList' , file);
      }
  
        $.ajax({
        url : 'uploadImageContent.mail' ,
        type : 'post' ,
        data : fd ,
        processData : false ,
        contentType : false ,
        dataType : 'json' ,
        success : function(changeNameList){
          console.log(changeNameList);

          for(let changeName of changeNameList){
            $("#summernote").summernote('insertImage' , '/app/resources/img/' + changeName);
          }

        } ,
        error : (error)=>{
          console.log(error);
        } ,
      });
    }
}
function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

function handleFiles(files) {

    for (i = 0; i < files.length; i++) {
        let fileName = files[i].name;
        let fileSize = files[i].size;

        // 리스트 아이템 생성
        let listItem = document.createElement('li');
        listItem.className = 'fileItem';
        listItem.innerHTML = ' <span class="closeButton">파일 이름: ' + fileName + '</span>'
            + '<span class="closeButton">파일 크기: ' + formatBytes(fileSize) + '</span>'
            + '<span class="closeButton" onclick="removeFile(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">'
            + '<path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"></path>'
            + '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>'
            + '</span>';

        // 파일 정보를 표시하는 ul에 추가
        document.querySelector('.mailWriteForm-file-upload-wrap').appendChild(listItem);
    }
}

// 파일 정보를 삭제하는 함수
function removeFile(element) {
    let listItem = element.parentNode;
    listItem.parentNode.removeChild(listItem);
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function referenceEmailOnKeyup1(event){

    let strRemove = '<div onclick="removeMail(this, event)">'
                        + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">'
                        + '<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>'
                        + '</svg>'
                    + '</div>';
    let mailEmail = document.querySelector("#mail-email-b1");
    let randomInt = Math.floor(Math.random() * 30) + 1;
    if(event.keyCode === 13){
        event.preventDefault();
        if(event.target.value){
            console.log(event.target.value);
            const btn = document.createElement("div");
            btn.classList.add("mail-email-btn")
            btn.id = 'mailEmailAddress' + randomInt;
            btn.innerHTML +=  '<input name = "referenceEmail" id = "emailBtnreadonly'+ randomInt +'" type="text" class ="strInput" onkeypress="redonlyEmailOnKeyup(event)" readonly value="'+ event.target.value +'">'
                             + '<svg onclick = "updateEmailAddress('+ randomInt +')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">'
                             + '<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>'
                             + '</svg>'
                             + strRemove;
            mailEmail.appendChild(btn);
            event.target.value = "";
        }
    }
}

function referenceEmailOnKeyup2(event){
    let strRemove = '<div onclick="removeMail(this, event)">'
                        + '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">'
                         + '<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>'
                        + '</svg>'
                    + '</div>';
    let mailEmail = document.querySelector("#mail-email-b2");
    let randomInt = Math.floor(Math.random() * 30) + 1;
    if(event.keyCode === 13){
        event.preventDefault();
        if(event.target.value){
            console.log(event.target.value);
            const btn = document.createElement("div");
            btn.classList.add("mail-email-btn")
            btn.id = 'mailEmailAddress' + randomInt;
            btn.innerHTML +=  '<input name = "referenceEmail" id = "emailBtnreadonly'+ randomInt +'" type="text" class ="strInput" onkeypress="redonlyEmailOnKeyup(event)" readonly value="'+ event.target.value +'">'
                             + '<svg onclick = "updateEmailAddress('+ randomInt +')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">'
                             + '<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>'
                             + '</svg>'
                             + strRemove;
            mailEmail.appendChild(btn);
            event.target.value = "";
        }
    }
}

function removeMail(removeBtn, event){
    event.preventDefault();

    let btn = removeBtn.parentNode;
    btn.parentNode.removeChild(btn)
}

function updateEmailAddress(num){
    document.querySelector("#emailBtnreadonly" + num).readOnly = false;
    document.querySelector("#emailBtnreadonly" + num).focus();
}

function redonlyEmailOnKeyup(event){
    if(event.keyCode === 13){
        event.preventDefault();
        event.target.readOnly = true;
    }
}