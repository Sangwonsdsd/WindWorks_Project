// 파일 업로드 관련
function allowDrop(event) {
    event.preventDefault();
}
function highlightDropArea() {
    document.getElementById('drop-area').classList.add('createLectureMaterials-file-upload-box2');
}
function unhighlightDropArea() {
    document.getElementById('drop-area').classList.remove('createLectureMaterials-file-upload-box2');
}
function handleDrop(event) {
    event.preventDefault();
    unhighlightDropArea();

    const files = event.dataTransfer.files;
    handleFiles(files);
}
function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

// 파일 정보를 삭제하는 함수
function removeFile(element) {
    let listItem = element.parentNode;
    listItem.parentNode.removeChild(listItem);
}

function handleFiles(files) {
    for (const file of files) {
        let fileName = file.name;
            let fileSize = file.size;

            // 리스트 아이템 생성
            let listItem = document.createElement('li');
            listItem.className = 'fileItem';
            listItem.innerHTML = ' <span class="closeButton">파일 이름: ' + fileName + '</span>'
                + '<span class="closeButton">파일 크기: ' + formatBytes(fileSize) + '</span>'
                + '<span class="closeButton" onclick="removeFile(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">'
                + '<path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"></path>'
                + '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>'
                + '</span>'    

            // 파일 정보를 표시하는 ul에 추가
            document.querySelector('.createLectureMaterials-file-upload-wrap').appendChild(listItem);
    }
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}