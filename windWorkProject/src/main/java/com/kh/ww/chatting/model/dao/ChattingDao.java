package com.kh.ww.chatting.model.dao;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.ww.chatting.model.vo.ChattingGroup;
import com.kh.ww.chatting.model.vo.ChattingMessage;
import com.kh.ww.chatting.model.vo.ChattingMsgRead;
import com.kh.ww.chatting.model.vo.ChattingRoom;
import com.kh.ww.employee.model.vo.Department;
import com.kh.ww.employee.model.vo.Employee;

@Repository
public class ChattingDao {
	
	public ArrayList<Department> selectDeptList(SqlSessionTemplate sqlSession){
		return (ArrayList)sqlSession.selectList("chattingMapper.selectDeptList");
	}
	
	public ArrayList<Employee> selectEmpList(SqlSessionTemplate sqlSession){
		return (ArrayList)sqlSession.selectList("chattingMapper.selectEmpList");
	}
	
	public ArrayList<ChattingRoom> myChatRoomList(SqlSessionTemplate sqlSession, int empNo){
		return (ArrayList)sqlSession.selectList("chattingMapper.myChatRoomList", empNo);
	}
	
	public ArrayList<Employee> selectChatTarget(SqlSessionTemplate sqlSession, ChattingGroup cg){
		return (ArrayList)sqlSession.selectList("chattingMapper.selectChatTarget", cg);
	}
	
	public String selectLastMsg(SqlSessionTemplate sqlSession, int roomNo){
		return sqlSession.selectOne("chattingMapper.selectLastMsg", roomNo);
	}
	
	public int noReadCount(SqlSessionTemplate sqlSession, ChattingGroup cg){
		return sqlSession.selectOne("chattingMapper.noReadCount", cg);
	}
	
	public ArrayList<ChattingMessage> selectMsgList(SqlSessionTemplate sqlSession, int roomNo){
		return (ArrayList)sqlSession.selectList("chattingMapper.selectMsgList", roomNo);
	}
	
	public ArrayList<ChattingGroup> duplicateCheck(SqlSessionTemplate sqlSession, int empNo){
		return (ArrayList)sqlSession.selectList("chattingMapper.duplicateCheck", empNo);
	}
	
	public int createChatRoom(SqlSessionTemplate sqlSession, int chatLevel){
		return sqlSession.insert("chattingMapper.createChatRoom", chatLevel);
	}
	
	public int createChatGroup(SqlSessionTemplate sqlSession, int empNo){
		return sqlSession.insert("chattingMapper.createChatGroup", empNo);
	}
	
	public int insertMsg(SqlSessionTemplate sqlSession, ChattingMessage cm){
		return sqlSession.insert("chattingMapper.insertMsg", cm);
	}
	
	public int selectChatRoomLevel(SqlSessionTemplate sqlSession, int roomNo){
		return sqlSession.selectOne("chattingMapper.selectChatRoomLevel", roomNo);
	}
	
	public int insertMsgRead(SqlSessionTemplate sqlSession, ChattingMsgRead cmr){
		return sqlSession.insert("chattingMapper.insertMsgRead", cmr);
	}
	
	public int updateMsgIsRead(SqlSessionTemplate sqlSession, ChattingMsgRead cmr){
		return sqlSession.update("chattingMapper.updateMsgIsRead", cmr);
	}
	
	public int selectnoReadChatCount(SqlSessionTemplate sqlSession, int empNo){
		return sqlSession.selectOne("chattingMapper.selectnoReadChatCount", empNo);
	}
	
}
