package com.kh.ww.notice.model.dao;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.notice.model.vo.Notice;
import com.kh.ww.notice.model.vo.NoticeAttachment;
import com.kh.ww.notice.model.vo.NoticeReply;

@Repository
public class NoticeDao {

	// 공지사항 총 갯수 가져오기
	public int selectListCount(SqlSessionTemplate sqlSession) {
		return sqlSession.selectOne("noticeMapper.selectListCount");
	}
	
	// 공지사항 리스트 조회
	public ArrayList<Notice> selectList(SqlSessionTemplate sqlSession, PageInfo pi) {
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("noticeMapper.selectList", null, rowBounds);
	}
	
	// 공지사항 조회수 증가
	public int increaseCount(SqlSessionTemplate sqlSession, int noticeNo) {
		return sqlSession.update("noticeMapper.increaseCount", noticeNo);
	}
	
	// 공지사항 상세 조회
	public Notice selectNotice(SqlSessionTemplate sqlSession, int noticeNo) {
		return sqlSession.selectOne("noticeMapper.selectNotice", noticeNo);
	}
	public ArrayList<NoticeAttachment> selectNoticeAtt(SqlSessionTemplate sqlSession, int noticeNo) {
		return (ArrayList)sqlSession.selectList("noticeMapper.selectNoticeAtt", noticeNo);
	}
	
	// 공지사항 작성
	public int insertNotice(SqlSessionTemplate sqlSession, Notice n) {
		return sqlSession.insert("noticeMapper.insertNotice", n);
	}
	public int insertNoticeAttachment(SqlSessionTemplate sqlSession, NoticeAttachment na) {
		return sqlSession.insert("noticeMapper.insertNoticeAttachment", na);
	}
	
	// 공지사항 수정
	public int updateNotice(SqlSessionTemplate sqlSession, Notice n) {
		return sqlSession.update("noticeMapper.updateNotice", n);
	}
	public int deleteNoticeAtt(SqlSessionTemplate sqlSession, int fn) {
		return sqlSession.delete("noticeMapper.deleteNoticeAtt", fn);
	}
	public int updateNoticeAtt(SqlSessionTemplate sqlSession, NoticeAttachment na) {
		return sqlSession.insert("noticeMapper.updateNoticeAtt", na);
	}
	
	// 공지사항 삭제
	public int deleteNotice(SqlSessionTemplate sqlSession, int noticeNo) {
		return sqlSession.update("noticeMapper.deleteNotice", noticeNo);
	}

	// 공지사항 댓글 리스트 조회
	public ArrayList<NoticeReply> selectReply(SqlSessionTemplate sqlSession, int nno) {
		return (ArrayList)sqlSession.selectList("noticeMapper.selectReply", nno);
	}

	// 공지사항 댓글 작성
	public int insertReply(SqlSessionTemplate sqlSession, NoticeReply nr) {
		return sqlSession.insert("noticeMapper.insertReply", nr);
	}

	// 공지사항 댓글 수정
	public int updateReply(SqlSessionTemplate sqlSession, NoticeReply nr) {
		return sqlSession.update("noticeMapper.updateReply", nr);
	}
	
	// 공지사항 댓글 삭제
	public int deleteReply(SqlSessionTemplate sqlSession, NoticeReply nr) {
		return sqlSession.update("noticeMapper.deleteReply", nr);
	}

	// 공지사항 대댓글 작성
	public int insertChildeReply(SqlSessionTemplate sqlSession, NoticeReply nr) {
		return sqlSession.insert("noticeMapper.insertChildeReply", nr);
	}

	// 공지사항 대댓글 수정
	public int updateChildReply(SqlSessionTemplate sqlSession, NoticeReply nr) {
		return sqlSession.update("noticeMapper.updateChildReply", nr);
	}

	// 공지사항 대댓글 삭제
	public int deleteChildReply(SqlSessionTemplate sqlSession, NoticeReply nr) {
		return sqlSession.update("noticeMapper.deleteChildReply", nr);
	}	

}
