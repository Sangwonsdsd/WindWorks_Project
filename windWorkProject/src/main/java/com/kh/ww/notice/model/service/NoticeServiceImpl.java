package com.kh.ww.notice.model.service;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.notice.model.dao.NoticeDao;
import com.kh.ww.notice.model.vo.Notice;
import com.kh.ww.notice.model.vo.NoticeAttachment;
import com.kh.ww.notice.model.vo.NoticeReply;

@Service
public class NoticeServiceImpl implements NoticeService{

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Autowired
	private NoticeDao noticeDao;

	// 공지사항 총 갯수 가져오기
	@Override
	public int selectListCount() {
		return noticeDao.selectListCount(sqlSession);
	}
	
	// 공지사항 리스트 조회
	@Override
	public ArrayList<Notice> selectList(PageInfo pi) {
		return noticeDao.selectList(sqlSession, pi);
	}
	
	// 공지사항 조회수 증가
	@Override
	public int increaseCount(int noticeNo) {
		return noticeDao.increaseCount(sqlSession, noticeNo);
	}
	
	// 공지사항 상세 조회
	@Override
	public Notice selectNotice(int noticeNo) {
		return noticeDao.selectNotice(sqlSession, noticeNo);
	}
	@Override
	public ArrayList<NoticeAttachment> selectNoticeAtt(int noticeNo) {
		return noticeDao.selectNoticeAtt(sqlSession, noticeNo);
	}
	
	// 공지사항 작성
	@Override
	public int insertNotice(Notice n) {
		return noticeDao.insertNotice(sqlSession, n);
	}
	@Override
	public int insertNoticeAttachment(NoticeAttachment na) {
		return noticeDao.insertNoticeAttachment(sqlSession, na);
	}

	// 공지사항 수정
	@Override
	public int updateNotice(Notice n) {
		return noticeDao.updateNotice(sqlSession, n);
	}
	@Override
	public int deleteNoticeAtt(int fn) {
		return noticeDao.deleteNoticeAtt(sqlSession, fn);
	}
	@Override
	public int updateNoticeAtt(NoticeAttachment na) {
		return noticeDao.updateNoticeAtt(sqlSession, na);
	}
	
	// 공지사항 삭제
	@Override
	public int deleteNotice(int noticeNo) {
		return noticeDao.deleteNotice(sqlSession, noticeNo);
	}

	// 공지사항 댓글 리스트 조회
	@Override
	public ArrayList<NoticeReply> selectReply(int nno) {
		return noticeDao.selectReply(sqlSession, nno);
	}

	// 공지사항 댓글 작성
	@Override
	public int insertReply(NoticeReply nr) {
		return noticeDao.insertReply(sqlSession, nr);
	}

	// 공지사항 댓글 수정
	@Override
	public int updateReply(NoticeReply nr) {
		return noticeDao.updateReply(sqlSession, nr);
	}

	// 공지사항 댓글 삭제
	@Override
	public int deleteReply(NoticeReply nr) {
		return noticeDao.deleteReply(sqlSession, nr);
	}

	// 공지사항 대댓글 작성
	@Override
	public int insertChildeReply(NoticeReply nr) {
		return noticeDao.insertChildeReply(sqlSession, nr);
	}

	// 공지사항 대댓글 수정
	@Override
	public int updateChildReply(NoticeReply nr) {
		return noticeDao.updateChildReply(sqlSession, nr);
	}

	// 공지사항 대댓글 삭제
	@Override
	public int deleteChildReply(NoticeReply nr) {
		return noticeDao.deleteChildReply(sqlSession, nr);
	}
	
}
