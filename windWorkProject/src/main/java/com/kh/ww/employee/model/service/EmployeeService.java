package com.kh.ww.employee.model.service;

import java.util.ArrayList;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.employee.model.vo.SendSMS;

public interface EmployeeService {
	//가입승인서비스(update)
	int employeeApproval(Employee e);
	
	//회원가입서비스(insert)
	int insertEmployee(Employee e);
	
	//로그인서비스(login)
	Employee loginEmployee(Employee e);
	
	//온라인 상태로 변경
	int updateOnline(Employee e);
	
	//오프라인 상태로 변경
	int updateOffline(Employee e);
	
	//자리비움 상태로 변경
	int updateAway(Employee e);
	
	//총 사원수 가져오기
	int selectListCount();
	
	//사원 리스트 조회
	ArrayList<Employee> selectList(PageInfo pi, String condition, String sorting, String keyword);
	
	//재직중인 사원수 가져오기
	int empYCount();
	
	//미승인 사원수 가져오기
	int empJobCount();
	
	//인사관리 페이지에서 사원 정보 수정하기
	int employeeUpdate(Employee e);
	
	//마이페이지에서 사원 정보 수정
	int updateEmployee(Employee e);

	// 아이디찾기 문자인증
	void certifiedPhoneNumber(SendSMS sms, int randomNumber);

	// 문자인증 완료시 아이디 찾기
	Employee selectfindId(SendSMS sms);
	
	// 문자인증번호 확인
	int checkConfirmNo(SendSMS sms);

	// 비밀번호 찾기 아이디 존재여부 확인
	int checkEmail(String empEmail);

	// 새로운 비밀번호 변경
	int updateNewPwd(Employee e);

	//패스워드 수정
	int updatePassword(Employee e);
	
	// 출근상태로 변경
	int statusWork(int empNo);
	
	// 퇴근상태로 변경
	int statusLeave(int empNo);
	
	// 출퇴근상태 확인
	int selectStatus(int empNo);
	
}
