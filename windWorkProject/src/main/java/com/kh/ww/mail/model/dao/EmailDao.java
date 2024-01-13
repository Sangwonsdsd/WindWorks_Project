package com.kh.ww.mail.model.dao;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.mail.model.vo.Email;
import com.kh.ww.mail.model.vo.EmailAttachment;

@Repository
public class EmailDao {
	
	//받은 메일함
	public int mailListCount(SqlSessionTemplate sqlSession, int empNo) {
		return sqlSession.selectOne("emailMapper.mailListCount", empNo);
	}
	
	public ArrayList<Email> mailgetSelectList(SqlSessionTemplate sqlSession, int empNo, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return  (ArrayList)sqlSession.selectList("emailMapper.mailgetSelectList", empNo, rowBounds);
	}
	
	//보낸 메일함
	public int sendMailListCount(SqlSessionTemplate sqlSession, int empNo) {
		return sqlSession.selectOne("emailMapper.sendMailListCount", empNo);
	}

	public ArrayList<Email> mailSendSelectList(SqlSessionTemplate sqlSession, int empNo, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("emailMapper.mailSendSelectList", empNo, rowBounds);
	}
	
	//휴지통
	public int sendDeleteMailListCount(SqlSessionTemplate sqlSession, int empNo) {
		return sqlSession.selectOne("emailMapper.sendDeleteMailListCount", empNo);
	}

	public ArrayList<Email> mailSendDeleteSelectList(SqlSessionTemplate sqlSession, int empNo, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("emailMapper.mailSendDeleteSelectList", empNo, rowBounds);
	}

	//사람 검색
	public int selectSender(SqlSessionTemplate sqlSession, String empEmail) {
		return sqlSession.selectOne("emailMapper.selectSender", empEmail);
	}
	
	//메일 보내기
	public int sendEmail(SqlSessionTemplate sqlSession, Email email) {
		return sqlSession.insert("emailMapper.sendEmail", email);
	}

	public String insertAttachmentEmail(SqlSessionTemplate sqlSession, EmailAttachment ea) {
		int result = sqlSession.insert("emailMapper.insertAttachmentEmail", ea);
		return ea.getEmailNo();
	}

	public int mailreadListCount(SqlSessionTemplate sqlSession, int empNo) {
		return sqlSession.selectOne("emailMapper.mailreadListCount", empNo);
	}

	public Email mailSelect(SqlSessionTemplate sqlSession, Email email) {
		return sqlSession.selectOne("emailMapper.mailSelect", email);
	}

	public ArrayList<EmailAttachment> getEmailFileList(SqlSessionTemplate sqlSession, ArrayList<String> strToStrArray) {
		return (ArrayList)sqlSession.selectList("emailMapper.getEmailFileList", strToStrArray);
	}

	public ArrayList<Email> emailReferenceList(SqlSessionTemplate sqlSession, String emailFileList) {
		return  (ArrayList)sqlSession.selectList("emailMapper.emailReferenceList", emailFileList);
	}

	public int upDateEmail(SqlSessionTemplate sqlSession, Email mail) {
		return sqlSession.update("emailMapper.upDateEmail", mail);
	}

	public int maildeleteSelect(SqlSessionTemplate sqlSession, int emailNo) {
		return sqlSession.update("emailMapper.maildeleteSelect", emailNo);
	}

	public int maildeleteSelectdelete(SqlSessionTemplate sqlSession, int emailNo) {
		return sqlSession.delete("emailMapper.maildeleteSelectdelete", emailNo);
	}

	public ArrayList<Employee> emailEmpList(SqlSessionTemplate sqlSession, int empNo) {
		return (ArrayList)sqlSession.selectList("employeeMapper.emailEmpList", empNo);
	}

	public Email ajaxMailList(SqlSessionTemplate sqlSession, int emailNo) {
		return sqlSession.selectOne("emailMapper.ajaxMailList", emailNo);
	}

	public int ajaxNotReadMail(SqlSessionTemplate sqlSession, int emailNo) {
		return sqlSession.update("emailMapper.ajaxNotReadMail", emailNo);
	}

	public int ajaxReadMail(SqlSessionTemplate sqlSession, int emailNo) {
		return sqlSession.update("emailMapper.ajaxReadMail", emailNo);
	}

	public int sendMailSearhListCount(SqlSessionTemplate sqlSession, Email mail) {
		return sqlSession.selectOne("emailMapper.sendMailSearhListCount", mail);
	}

	public ArrayList<Email> mailSendSelectSearhList(SqlSessionTemplate sqlSession, Email mail, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("emailMapper.mailSendSelectSearhList", mail, rowBounds);
	}

	public int mailListSearhCount(SqlSessionTemplate sqlSession, Email mail) {
		return sqlSession.selectOne("emailMapper.mailListSearhCount", mail);
	}

	public ArrayList<Email> mailgetSelectSearhList(SqlSessionTemplate sqlSession, Email mail, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("emailMapper.mailgetSelectSearhList", mail, rowBounds);
	}

	public int ajaxRestoreMaillist(SqlSessionTemplate sqlSession, int emailNo) {
		return sqlSession.update("emailMapper.ajaxRestoreMaillist", emailNo);
	}

	public int deleteListSearhCount(SqlSessionTemplate sqlSession, Email mail) {
		return sqlSession.selectOne("emailMapper.deleteListSearhCount", mail);
	}

	public ArrayList<Email> mailDeleteSelectSearhList(SqlSessionTemplate sqlSession, Email mail, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("emailMapper.mailDeleteSelectSearhList", mail, rowBounds);
	}


}
