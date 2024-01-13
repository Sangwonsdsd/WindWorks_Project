package com.kh.ww.chatting.model.service;

import java.util.ArrayList;

import com.kh.ww.chatting.model.vo.ChattingGroup;
import com.kh.ww.chatting.model.vo.ChattingMessage;
import com.kh.ww.chatting.model.vo.ChattingMsgRead;
import com.kh.ww.chatting.model.vo.ChattingRoom;
import com.kh.ww.employee.model.vo.Department;
import com.kh.ww.employee.model.vo.Employee;

public interface ChattingService {
	
	// 전부서 리스트 조회
	ArrayList<Department> selectDeptList();
	// 전직원 리스트 조회
	ArrayList<Employee> selectEmpList();
	
	// 내 채팅방 리스트
	ArrayList<ChattingRoom> myChatRoomList(int empNo);
	// 채팅 상대 리스트
	ArrayList<Employee> selectChatTarget(ChattingGroup cg);
	// 마지막 메세지
	String selectLastMsg(int roomNo);
	// 안읽은 메세지 카운트
	int noReadCount(ChattingGroup cg);
	
	// 메세지 리스트 조회
	ArrayList<ChattingMessage> selectMsgList(int roomNo);

	// 중복방 체크
	ArrayList<ChattingGroup> duplicateCheck(int empNo);
	// 채팅방 만들기
	int createChatRoom(int chatLevel);
	// 채팅방그룹 만들기
	int createChatGroup(int empNo);
	// 메세지 저장
	int insertMsg(ChattingMessage cm);
	// 채팅방 레벨 조회
	int selectChatRoomLevel(int roomNo);
	// 읽음체크 추가
	int insertMsgRead(ChattingMsgRead cmr);
	// 읽음 처리하기
	int updateMsgIsRead(ChattingMsgRead cmr);
	
	// 안읽은 메세지 카운트 (총)
	int selectnoReadChatCount(int empNo);
	
}
