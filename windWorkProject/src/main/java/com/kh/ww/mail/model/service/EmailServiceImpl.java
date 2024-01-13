package com.kh.ww.mail.model.service;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.mail.model.dao.EmailDao;
import com.kh.ww.mail.model.vo.Email;
import com.kh.ww.mail.model.vo.EmailAttachment;

@Service
public class EmailServiceImpl implements EmailService {
	
	@Autowired
	private EmailDao emailDao;
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//받은 메일함
	@Override
	public int mailListCount(int empNo) {
		return emailDao.mailListCount(sqlSession, empNo);
	}
	
	@Override
	public ArrayList<Email> mailgetSelectList(PageInfo pi, int empNo) {
		return  emailDao.mailgetSelectList(sqlSession, empNo, pi);
	}
	
	//보낸 메일함
	@Override
	public int sendMailListCount(int empNo) {
		return emailDao.sendMailListCount(sqlSession, empNo);
	}
	
	@Override
	public ArrayList<Email> mailSendSelectList(PageInfo pi, int empNo) {
		return emailDao.mailSendSelectList(sqlSession, empNo, pi);
	}
	
	//휴지통
	@Override
	public int sendDeleteMailListCount(int empNo) {
		return emailDao.sendDeleteMailListCount(sqlSession, empNo);
	}

	@Override
	public ArrayList<Email> mailSendDeleteSelectList(PageInfo pi, int empNo) {
		return emailDao.mailSendDeleteSelectList(sqlSession, empNo, pi);
	}
	
	//안읽은 메일 개수
	@Override
	public int mailreadListCount(int empNo) {
		return emailDao.mailreadListCount(sqlSession, empNo);
	}
	
	//사람 검색
	@Override
	public int selectSender(String empEmail) {
		return emailDao.selectSender(sqlSession, empEmail);
	}
	//메일 보내기
	@Override
	public int sendEmail(Email email) {
		return emailDao.sendEmail(sqlSession, email);
	}
	//메일 자료 저장
	@Override
	public String insertAttachmentEmail(EmailAttachment ea) {
		return emailDao.insertAttachmentEmail(sqlSession, ea);
	}

	//메일 자료 검색
	@Override
	public Email mailSelect(Email email) {
		return  emailDao.mailSelect(sqlSession, email);
	}
	//메일 자료 리스트 가지고 오기
	@Override
	public ArrayList<EmailAttachment> getEmailFileList(ArrayList<String> strToStrArray) {
		return emailDao.getEmailFileList(sqlSession, strToStrArray);
	}
	
	//참조리스트 불러오기
	@Override
	public ArrayList<Email> emailReferenceList(String emailFileList) {
		return emailDao.emailReferenceList(sqlSession, emailFileList);
	}

	//누르면 읽음
	@Override
	public int upDateEmail(Email mail) {
		return emailDao.upDateEmail(sqlSession, mail);
	}
	
	//메일 삭제
	@Override
	public int maildeleteSelect(int eno) {
		return emailDao.maildeleteSelect(sqlSession, eno);
	}
	
	//휴지통 삭제
	@Override
	public int maildeleteSelectdelete(int eno) {
		return emailDao.maildeleteSelectdelete(sqlSession, eno);
	}
	//회사원 조회
	@Override
	public ArrayList<Employee> emailEmpList(int empNo) {
		return emailDao.emailEmpList(sqlSession, empNo);
	}
	//메일 불러오기
	@Override
	public Email ajaxMailList(int mailNo) {
		return emailDao.ajaxMailList(sqlSession, mailNo);
	}
	
	//메일 안읽음
	@Override
	public int ajaxNotReadMail(int eno) {
		return emailDao.ajaxNotReadMail(sqlSession, eno);
	}
	// 메일 읽음 표시
	@Override
	public int ajaxReadMail(int eno) {
		return emailDao.ajaxReadMail(sqlSession, eno);
	}
	
	//메일 검색기능(받은 메일, 보낸 메일, 휴지통)
	@Override
	public int sendMailSearhListCount(Email mail) {
		return emailDao.sendMailSearhListCount(sqlSession, mail);
	}

	@Override
	public ArrayList<Email> mailSendSelectSearhList(PageInfo pi, Email mail) {
		return emailDao.mailSendSelectSearhList(sqlSession, mail, pi);
	}
	
	//휴지통 검색
	@Override
	public int deleteListSearhCount(Email mail) {
		return emailDao.deleteListSearhCount(sqlSession, mail);
	}

	@Override
	public ArrayList<Email> mailDeleteSelectSearhList(PageInfo pi, Email mail) {
		return emailDao.mailDeleteSelectSearhList(sqlSession, mail, pi);
	}
	

	@Override
	public int mailListSearhCount(Email mail) {
		return emailDao.mailListSearhCount(sqlSession, mail);
	}

	@Override
	public ArrayList<Email> mailgetSelectSearhList(PageInfo pi, Email mail) {
		return emailDao.mailgetSelectSearhList(sqlSession, mail, pi);
	}
	
	//메일 살리기
	@Override
	public int ajaxRestoreMaillist(int eno) {
		return emailDao.ajaxRestoreMaillist(sqlSession, eno);
	}



}
