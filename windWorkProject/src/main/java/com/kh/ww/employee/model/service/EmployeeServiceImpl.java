package com.kh.ww.employee.model.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.json.simple.JSONObject;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.employee.model.dao.EmployeeDao;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.employee.model.vo.SendSMS;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	@Autowired
	private EmployeeDao employeeDao;
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//가입승인
	@Override
	public int employeeApproval(Employee e) {
		return 0;
	}

	//회원가입
	@Override
	public int insertEmployee(Employee e) {
		return employeeDao.insertEmployee(sqlSession, e);
	}

	//로그인
	@Override
	public Employee loginEmployee(Employee e) {
		return employeeDao.loginEmployee(sqlSession, e);
	}
	
	//온라인 상태 변경
	@Override
	public int updateOnline(Employee e) {
		return employeeDao.updateOnline(sqlSession, e);
	}
	
	//오프라인 상태 변경
	@Override
	public int updateOffline(Employee e) {
		return employeeDao.updateOffline(sqlSession, e);
	}
	
	//자리비움 상태 변경
	@Override
	public int updateAway(Employee e) {
		return employeeDao.updateAway(sqlSession, e);
	}

	
	//사원수 가져오기
	@Override
	public int selectListCount() {
		return employeeDao.selectListCount(sqlSession);
	}
	
	//사원 조회
	@Override
	public ArrayList<Employee> selectList(PageInfo pi, String condition, String sorting, String keyword) {
		return employeeDao.selectList(sqlSession, pi, condition, sorting, keyword);
	}
	
	//재직중인 사원 조회
	@Override
	public int empYCount() {
		return employeeDao.empYCount(sqlSession);
	}

	//미승인 사원수 가져오기
	@Override
	public int empJobCount() {
		return employeeDao.empJobCount(sqlSession);
	}
	
	//인사관리 페이지에서 사원 정보 수정하기
	@Override
	public int employeeUpdate(Employee e) {
		return employeeDao.employeeUpdate(sqlSession, e);
	}
	
	//회원정보수정
	@Override
	public int updateEmployee(Employee e) {
		return employeeDao.updateEmployee(sqlSession, e);
	}
	
	// 아이디찾기 문자인증
	@Override
	public void certifiedPhoneNumber(SendSMS sms, int randomNumber) {
		
		String api_key = "NCSEZITHDN92CHU0";
	    String api_secret = "SDIEAKCSXQYKQLNIPMMTXCLJWQRHAE6X";
	    Message coolsms = new Message(api_key, api_secret);
	    
	    // 4 params(to, from, type, text) are mandatory. must be filled
	    HashMap<String, String> params = new HashMap<String, String>();
	    params.put("to", sms.getSmsPhone());    // 수신전화번호
	    params.put("from", "01025509401");    // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
	    params.put("type", "SMS");
	    params.put("text", "[WINDWORKS] 인증번호는 " + "[" + randomNumber + "]" + " 입니다."); // 문자 내용 입력
	    params.put("app_version", "test app 1.2"); // application name and version

	    System.out.println(params);
	    
	    //여기서 아래 3가지 저장
	    //현재시간 , 받는사람번호, 난수
	    employeeDao.insertSendSMS(sqlSession, sms, randomNumber);
	    
	    try {
	        JSONObject obj = (JSONObject) coolsms.send(params);
	        System.out.println(obj.toString());
	      } catch (CoolsmsException e) {
	        System.out.println(e.getMessage());
	        System.out.println(e.getCode());
	      }
	}

	//비밀번호 변경
	@Override
	public int updatePassword(Employee e) {
		return employeeDao.updatePassword(sqlSession, e);
	}
	
	// 문자인증 완료시 아이디 찾기
	@Override
	public Employee selectfindId(SendSMS sms) {
		return employeeDao.selectfindId(sqlSession, sms);
	}

	// 문자인증번호 확인
	@Override
	public int checkConfirmNo(SendSMS sms) {
		return employeeDao.checkConfirmNo(sqlSession, sms);
	}

	// 비밀번호 찾기 아이디 존재여부 확인
	@Override
	public int checkEmail(String empEmail) {
		return employeeDao.checkEmail(sqlSession, empEmail);
	}

	// 새로운 비밀번호 변경
	@Override
	public int updateNewPwd(Employee e) {
		return employeeDao.updateNewPwd(sqlSession, e);
	}

	@Override
	public int statusWork(int empNo) {
		return employeeDao.statusWork(sqlSession, empNo);
	}

	@Override
	public int statusLeave(int empNo) {
		return employeeDao.statusLeave(sqlSession, empNo);
	}

	@Override
	public int selectStatus(int empNo) {
		return employeeDao.selectStatus(sqlSession, empNo);
	}

}
