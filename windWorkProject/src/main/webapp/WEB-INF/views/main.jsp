<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home</title>
</head>
<body onload="mainOnload()" >
	<c:if test="${ !empty alertMsg }">
                <script>
                    alert("${alertMsg}");
                </script>
                <c:remove var="alertMsg" scope="session" />
    </c:if>
	<c:choose>
		<c:when test="${!empty loginUser}">
			<jsp:include page="common/header.jsp" />
			<jsp:include page="home/home.jsp" />
		</c:when>
		<c:otherwise>
			<jsp:include page="common/login.jsp" />
			
		</c:otherwise>
	</c:choose>

</body>
</html>