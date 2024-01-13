<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OrgChat</title>
<!-- jQuery 3.7.1 -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<!-- 부트스트랩 -->
<!-- Latest compiled and minified CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<link rel="stylesheet" href="resources/orgChart/css/style.css">
<link rel="stylesheet" href="resources/orgChart/css/jquery.orgchart.css">
<!-- 
 <link rel="icon" href="img/logo.png">
  <link rel="stylesheet" href="css/jquery.orgchart.css">
  <link rel="stylesheet" href="css/style.css"> -->
  <style type="text/css">
    #chart-container { height:  620px; }
    .orgchart { padding-bottom: 20px; }
    #chart-container{
      width: auto;
      height: auto;
      border: none;
    }
    .noContentDiv{
      height: 40px;
      border-radius: 4px;
    }
    .hierarchy{
      padding: 0 15px;
    }

  </style>

</head>
<body>
  <jsp:include page="../common/header.jsp" />
  <div id="chart-container"></div>

  <script type="text/javascript" src="resources/orgChart/js/jquery.orgchart.js"></script>
  <script type="text/javascript" src="resources/orgChart/js/jquery.orgchart.min.js"></script>
  <!-- <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery.orgchart.js"></script> -->

<script type="text/javascript">
  $(function() {   
    $.ajax({
      url: "orgChart.org",
      success: function (res) {
        let deptList = res.deptList;
        let jobList = res.jobList;

        let dataTest = {
          'name': '본사',
          'children': []
        }

        // 부서 넣기 
        for (let i = 0; i < deptList.length; i++) {
          let dList = deptList[i];
          let childNode = {
            'name': dList.deptName,
            'children': []
          };

          // 직원 넣기
          for (let j = 0; j < jobList[i].length; j++) {   // 11번 반복
            const eList = jobList[i];
            let childNode2 = {
              'name': eList[j].jobName,
              'title': eList[j].empName,
            }
            childNode.children.push(childNode2);
          
          }
            dataTest.children.push(childNode);
        }

        // orgChart 실행
        $('#chart-container').orgchart({
          'data' : dataTest,
          'nodeContent': 'title',
          'verticalLevel': 3,
          'visibleLevel': 4
        });


        onload()

      },
      error: function () {
          console.log("실패");
      }
    });




  });



  onload = function(){
    const contentDivs = document.querySelectorAll('.content');
    // 형제요소들을 담을 배열
    const titleNodes = [];
    
    contentDivs.forEach(div => {
      // div의 텍스트 내용을 가져옵니다.
      const textContent = div.textContent.trim();

      // 텍스트 내용이 없는 경우, 형제요소를 배열에 넣고 해당 div는 삭제
      if (textContent === '') {
        const titleNode = div.parentElement.firstElementChild;
        titleNodes.push(titleNode);
        div.remove();
      }
    })

    // 형제요소들에게 noContentDiv 라는 class명 부여하고 css 적용
    for (let i = 0; i < titleNodes.length; i++) {
      const titleNode = titleNodes[i];
      titleNode.classList.add('noContentDiv');
      titleNode.style.height = "40px";
      titleNode.style.borderRadius = "4px";
      
      titleNode.style.lineHeight = titleNode.clientHeight + "px";
      if (i === 0) {
        titleNode.style.backgroundColor = "rgb(9 59 33)";
      } else {
        titleNode.style.backgroundColor = "rgb(41 113 76)";
      }
      };

    console.log(titleNodes)
    orgOnload();
  }





  





  
</script>
</body>
</html>