package com.kh.ww.mail.model.service;

import java.util.ArrayList;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.mail.model.vo.Email;
import com.kh.ww.mail.model.vo.EmailAttachment;

public interface EmailService {
	//받은 메일함
	int mailListCount(int empNo);
	ArrayList<Email> mailgetSelectList(PageInfo pi, int empNo);
	
	//보낸 메일함
	int sendMailListCount(int empNo);
	ArrayList<Email> mailSendSelectList(PageInfo pi, int empNo);
	
	//휴지통
	int sendDeleteMailListCount(int empNo);
	ArrayList<Email> mailSendDeleteSelectList(PageInfo pi, int empNo);
	
	//안읽은 메일 개수
	int mailreadListCount(int empNo);
	
	//받는사람 or 보내는 사람 검색
	int selectSender(String empEmail);
	//메일 보내기
	int sendEmail(Email email);
	
	//메일 파일 저장하기
	String insertAttachmentEmail(EmailAttachment ea);
	
	//mail검색
	Email mailSelect(Email email);
	//mail 자료 가지고 오기
	ArrayList<EmailAttachment> getEmailFileList(ArrayList<String> strToStrArray);
	
	//참조 리스트 가지고 오기
	ArrayList<Email> emailReferenceList(String emailFileList);
	
	//email update read
	int upDateEmail(Email mail);
	
	//메일 삭제
	int maildeleteSelect(int eno);
	
	//휴지통 메일 삭지
	int maildeleteSelectdelete(int eno);
	//회사원 조회
	ArrayList<Employee> emailEmpList(int empNo);
	
	//전달할 이메일 조회
	Email ajaxMailList(int mailNo);
	
	//메일 안읽음
	int ajaxNotReadMail(int eno);
	//메일 읽음
	int ajaxReadMail(int eno);
	
	//받은메일 보낸메일 검색 기능
	int sendMailSearhListCount(Email mail);
	ArrayList<Email> mailSendSelectSearhList(PageInfo pi, Email mail);
	int mailListSearhCount(Email mail);
	ArrayList<Email> mailgetSelectSearhList(PageInfo pi, Email mail);
	//휴지통 검색
	int deleteListSearhCount(Email mail);
	ArrayList<Email> mailDeleteSelectSearhList(PageInfo pi, Email mail);
	
	
	//메일 복구
	int ajaxRestoreMaillist(int eno);


	
	
	



}
