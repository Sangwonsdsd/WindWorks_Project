package com.kh.ww.chatting.model.service;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.ww.chatting.model.dao.ChattingDao;
import com.kh.ww.chatting.model.vo.ChattingGroup;
import com.kh.ww.chatting.model.vo.ChattingMessage;
import com.kh.ww.chatting.model.vo.ChattingMsgRead;
import com.kh.ww.chatting.model.vo.ChattingRoom;
import com.kh.ww.community.model.service.CommunityService;
import com.kh.ww.employee.model.vo.Department;
import com.kh.ww.employee.model.vo.Employee;

@Service
public class ChattingServiceImpl implements ChattingService{
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	@Autowired
	private ChattingDao chattingDao;

	

	@Override
	public ArrayList<Department> selectDeptList() {
		return chattingDao.selectDeptList(sqlSession);
	}

	@Override
	public ArrayList<Employee> selectEmpList() {
		return chattingDao.selectEmpList(sqlSession);
	}

	@Override
	public ArrayList<ChattingRoom> myChatRoomList(int empNo) {
		return chattingDao.myChatRoomList(sqlSession, empNo);
	}

	@Override
	public ArrayList<Employee> selectChatTarget(ChattingGroup cg) {
		return chattingDao.selectChatTarget(sqlSession, cg);
	}

	@Override
	public String selectLastMsg(int roomNo) {
		return chattingDao.selectLastMsg(sqlSession, roomNo);
	}
	
	@Override
	public int noReadCount(ChattingGroup cg) {
		return chattingDao.noReadCount(sqlSession, cg);
	}

	

	@Override
	public ArrayList<ChattingMessage> selectMsgList(int roomNo) {
		return chattingDao.selectMsgList(sqlSession, roomNo);
	}

	@Override
	public ArrayList<ChattingGroup> duplicateCheck(int empNo) {
		return chattingDao.duplicateCheck(sqlSession, empNo);
	}
	
	@Override
	public int createChatRoom(int chatLevel) {
		return chattingDao.createChatRoom(sqlSession, chatLevel);
	}

	@Override
	public int createChatGroup(int empNo) {
		return chattingDao.createChatGroup(sqlSession, empNo);
	}

	@Override
	public int insertMsg(ChattingMessage cm) {
		return chattingDao.insertMsg(sqlSession, cm);
	}

	@Override
	public int selectChatRoomLevel(int roomNo) {
		return chattingDao.selectChatRoomLevel(sqlSession, roomNo);
	}

	@Override
	public int insertMsgRead(ChattingMsgRead cmr) {
		return chattingDao.insertMsgRead(sqlSession, cmr);
	}

	@Override
	public int updateMsgIsRead(ChattingMsgRead cmr) {
		return chattingDao.updateMsgIsRead(sqlSession, cmr);
	}

	@Override
	public int selectnoReadChatCount(int empNo) {
		return chattingDao.selectnoReadChatCount(sqlSession, empNo);
	}





	
	

	

}
