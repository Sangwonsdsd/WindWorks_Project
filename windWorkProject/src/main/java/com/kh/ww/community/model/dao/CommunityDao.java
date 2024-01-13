package com.kh.ww.community.model.dao;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.community.model.vo.Community;
import com.kh.ww.community.model.vo.CommunityAttachment;
import com.kh.ww.community.model.vo.CommunityBoard;
import com.kh.ww.community.model.vo.CommunityReply;
import com.kh.ww.employee.model.vo.Employee;

@Repository
public class CommunityDao {
	
	public ArrayList<Community> communityList(SqlSessionTemplate sqlSession, Employee e){
		return (ArrayList)sqlSession.selectList("communityMapper.communityList", e);
	}
	
	public ArrayList<Employee> memberList(SqlSessionTemplate sqlSession, int comNo){
		return (ArrayList)sqlSession.selectList("communityMapper.memberList", comNo);
	}
	
	public int boardListCount(SqlSessionTemplate sqlSession, int comNo) {
		return sqlSession.selectOne("communityMapper.boardListCount", comNo);
	}
	
	public ArrayList<CommunityBoard> boardList(SqlSessionTemplate sqlSession, PageInfo pi, int comNo){
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		int limit = pi.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, limit);
		return (ArrayList)sqlSession.selectList("communityMapper.boardList", comNo, rowBounds);
	}
	
	public CommunityBoard selectBoard(SqlSessionTemplate sqlSession, int bno) {
		return sqlSession.selectOne("communityMapper.selectBoard", bno);
	}
	
	public ArrayList<CommunityAttachment> boardFile(SqlSessionTemplate sqlSession, int bno){
		return (ArrayList)sqlSession.selectList("communityMapper.boardFile", bno);
	}
	
	public ArrayList<CommunityReply> replyList(SqlSessionTemplate sqlSession, int bno){
		return (ArrayList)sqlSession.selectList("communityMapper.replyList", bno);
	}
	
	public ArrayList<CommunityReply> reReplyList(SqlSessionTemplate sqlSession, int bno){
		return (ArrayList)sqlSession.selectList("communityMapper.reReplyList", bno);
	}
	
	public int communityReplyIn(SqlSessionTemplate sqlSession, CommunityReply cr){
		return sqlSession.insert("communityMapper.communityReplyIn", cr);
	}
	
	public int communityReplyDel(SqlSessionTemplate sqlSession, int rno) {
		return sqlSession.delete("communityMapper.communityReplyDel", rno);
	}
	
	public int communityReReplyIn(SqlSessionTemplate sqlSession, CommunityReply cr){
		return sqlSession.insert("communityMapper.communityReReplyIn", cr);
	}
	
	public int communityReplyUp(SqlSessionTemplate sqlSession, CommunityReply cr){
		return sqlSession.insert("communityMapper.communityReplyUp", cr);
	}
	
	public ArrayList<Community> communityListAll(SqlSessionTemplate sqlSession){
		return (ArrayList)sqlSession.selectList("communityMapper.communityListAll");
	}
	
	public int communityIn(SqlSessionTemplate sqlSession, Community c) {
		return sqlSession.insert("communityMapper.communityIn", c);
	}
	
	public int communityOut(SqlSessionTemplate sqlSession, Community c) {
		return sqlSession.delete("communityMapper.communityOut", c);
	}
	
	public int communityCreate(SqlSessionTemplate sqlSession, Community c) {
		return sqlSession.insert("communityMapper.communityCreate", c);
	}
	
	public int communityGroupCreate(SqlSessionTemplate sqlSession, Community c) {
		return sqlSession.insert("communityMapper.communityGroupCreate", c);
	}
	
	public int communityUpdate(SqlSessionTemplate sqlSession, Community c) {
		return sqlSession.update("communityMapper.communityUpdate", c);
	}
	
	public int communityDelete(SqlSessionTemplate sqlSession, Community c) {
		return sqlSession.update("communityMapper.communityDelete", c);
	}
	
	public int comBoardInsert(SqlSessionTemplate sqlSession, CommunityBoard cb) {
		return sqlSession.insert("communityMapper.comBoardInsert", cb);
	}
	
	public int comBoardAttInsert(SqlSessionTemplate sqlSession, CommunityAttachment ca) {
		return sqlSession.insert("communityMapper.comBoardAttInsert", ca);
	}
	
	public int comBoardDelete(SqlSessionTemplate sqlSession, int bno) {
		return sqlSession.update("communityMapper.comBoardDelete", bno);
	}

	public ArrayList<CommunityAttachment> selectBoardAttList(SqlSessionTemplate sqlSession, int bno){
		return (ArrayList)sqlSession.selectList("communityMapper.selectBoardAttList", bno);
	}
	
	public int deleteBoardAtt(SqlSessionTemplate sqlSession, int fno) {
		return sqlSession.delete("communityMapper.deleteBoardAtt", fno);
	}
	
	public int comBoardUpdate(SqlSessionTemplate sqlSession, CommunityBoard cb) {
		return sqlSession.update("communityMapper.comBoardUpdate", cb);
	}
	
	public int comBoardAttUpdate(SqlSessionTemplate sqlSession, CommunityAttachment ca) {
		return sqlSession.insert("communityMapper.comBoardAttUpdate", ca);
	}
	
	
	
}
