package com.kh.ww.chatting.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.kh.ww.chatting.model.service.ChattingService;
import com.kh.ww.chatting.model.vo.ChattingGroup;
import com.kh.ww.chatting.model.vo.ChattingMessage;
import com.kh.ww.chatting.model.vo.ChattingMsgRead;
import com.kh.ww.chatting.model.vo.ChattingRoom;
import com.kh.ww.chatting.model.vo.ChattingRoomList;
import com.kh.ww.employee.model.vo.Department;
import com.kh.ww.employee.model.vo.Employee;
import com.kh.ww.mail.model.service.EmailService;

@Controller
public class ChattingController {

	@Autowired
	private ChattingService chattingService;
	
	@Autowired
	private EmailService emailService;
	
	// 채팅 첫화면
	@RequestMapping("list.ch")
	public ModelAndView chattingList(ModelAndView mv, HttpSession session) {
		  mv.setViewName("chatting/chattingList");	
		return mv;	
	}
	
	// 조직도 조회
	@ResponseBody
	@RequestMapping(value="orgList.ch", produces="application/json; charset=UTF-8")
	public JSONObject selectOrgList() {
		// 전부서 리스트
		ArrayList<Department> deptList =  chattingService.selectDeptList();
		// 전직원 리스트
		ArrayList<Employee> empList = chattingService.selectEmpList();
		
		JSONObject jobj = new JSONObject();
		jobj.put("deptList", deptList);
		jobj.put("empList", empList);
		return jobj;
	}
	
	// 내 채팅방 리스트 조회
	@ResponseBody
	@RequestMapping(value="roomList.ch", produces="application/json; charset=UTF-8")
	public JSONObject chatRoomList(int empNo) {		
		// 최종 리스트
		ArrayList<ChattingRoomList> crlList = new ArrayList();
		// 1. 내 채팅방 리스트 조회
		ArrayList<ChattingRoom> myChatRoomList = chattingService.myChatRoomList(empNo);
		for (int i = 0; i < myChatRoomList.size(); i++) {
			// 2. 채팅방 별 참여자 리스트
			ChattingGroup cg = new ChattingGroup();
			cg.setChatRoomNo(myChatRoomList.get(i).getChatRoomNo());
			cg.setEmpNo(empNo);
			ArrayList<Employee> targetList = chattingService.selectChatTarget(cg);
			String targetName = "";
			String targetProfilePath = "";
			for (int y = 0; y < targetList.size(); y++) {
				// 이름리스트
				if(y != (targetList.size()) - 1) {
					targetName += targetList.get(y).getEmpName() + " " + targetList.get(y).getJobName() + ", ";
				} else {
					targetName += targetList.get(y).getEmpName() + " " + targetList.get(y).getJobName();
				}
				// 프로필 데이터
				if(myChatRoomList.get(i).getChatRoomLevel() == 0) {
					targetProfilePath = targetList.get(y).getProfileFilePath();
				} else {
					targetProfilePath = "resources/employeeprofile/group-profile1.png";
				}	
			}
			// 3 마지막 메세지
			String lastMsg = chattingService.selectLastMsg(myChatRoomList.get(i).getChatRoomNo());	
			// 4. 안읽은 메세지 카운트
			int noReadCount = chattingService.noReadCount(cg);
			
			// 데이터 정리
			ChattingRoomList crl = new ChattingRoomList();
			crl.setChatRoomNo(myChatRoomList.get(i).getChatRoomNo());
			crl.setChatRoomLevel(myChatRoomList.get(i).getChatRoomLevel());
			crl.setLastMsgDate(myChatRoomList.get(i).getChatRoomLastmsgDate());
			crl.setTargetList(targetName);
			crl.setLastMsg(lastMsg);
			crl.setTargetProfilePath(targetProfilePath);
			crl.setNoReadCount(noReadCount);
			crlList.add(crl);
		}

		JSONObject jobj = new JSONObject();
		jobj.put("crlList", crlList);
		
		return jobj;
	}
	
	// 채팅 디테일
	@ResponseBody
	@RequestMapping(value="roomDetail.ch", produces="application/json; charset=UTF-8")
	public JSONObject chatRoomDatail(int roomNo, int empNo, HttpSession session) {	
		
		// 선택된 방번호를 세션에 전달
		session.setAttribute("currRoomNo", roomNo);
		
		// 참여자 리스트
		ChattingGroup cg = new ChattingGroup();
		cg.setChatRoomNo(roomNo);
		cg.setEmpNo(empNo);
		ArrayList<Employee> targetList = chattingService.selectChatTarget(cg);
		String targetName = "";
		String targetProfilePath = "";
		int chatRoomLevel = 9;
		for (int y = 0; y < targetList.size(); y++) {
			// 이름리스트
			if(y != (targetList.size()) - 1) {
				targetName += targetList.get(y).getEmpName() + " " + targetList.get(y).getJobName() + ", ";
			} else {			
				targetName += targetList.get(y).getEmpName() + " " + targetList.get(y).getJobName();
			}
			// 프로필 데이터
			if(targetList.size() == 1) {
				targetProfilePath = targetList.get(y).getProfileFilePath();
				chatRoomLevel = 0;
			} else {
				chatRoomLevel = 1;
				targetProfilePath = "resources/employeeprofile/group-profile1.png";
			}	
		}
		ChattingRoomList crl = new ChattingRoomList();
		crl.setTargetList(targetName);
		crl.setTargetProfilePath(targetProfilePath);
		crl.setChatRoomLevel(chatRoomLevel);
		
		// 메세지 리스트 조회
		ArrayList<ChattingMessage> chatMsgList = chattingService.selectMsgList(roomNo);
		// 메세지 읽음 처리
		ChattingMsgRead cmr = new ChattingMsgRead();
		cmr.setEmpNo(empNo);
		cmr.setChatRoomNo(roomNo);
		int result = chattingService.updateMsgIsRead(cmr);

		JSONObject jobj = new JSONObject();
		jobj.put("chatMsgList", chatMsgList);
		jobj.put("roomNo", roomNo);
		jobj.put("targetList", crl);
		
		return jobj;
		
	}
	
	// 새로운 채팅
	@ResponseBody
	@RequestMapping(value="createChat.ch")
	public String createChat(@RequestBody Map<String, Object> requestBody, HttpSession session) {
		
		Employee e = (Employee)session.getAttribute("loginUser");
		List<String> empList1 = (List<String>) requestBody.get("empList");
		System.out.println(empList1);
		
		// 채팅방 레벨 설정
		int chatLevel = 9;
		if (empList1.size() == 2) {
			chatLevel = 0;
		} else if(empList1.size() > 2) {
			chatLevel = 1;
		}
		
		// 개인방 중복방 체크 (서브쿼리)
		String resultStr = "";
		if (chatLevel == 0) {
			// 나랑 갠챗하는 상대방 목록 조회 (회원번호, 방번호)
			ArrayList<ChattingGroup> checkList = chattingService.duplicateCheck(e.getEmpNo());
			for(int i=0; i<checkList.size(); i++) {
				for(int j=0; j<empList1.size(); j++) {
					if (checkList.get(i).getEmpNo() == Integer.parseInt(empList1.get(j))) {
						resultStr = "duplicateCheck";
						return Integer.toString(checkList.get(i).getChatRoomNo());
						
					}
				}
			}
		}
		// 채팅방 만들기
		int result1 = chattingService.createChatRoom(chatLevel);
		
		// 채팅방 그룹 만들기
		int result2 = 0;
		if (result1 > 0) {
			for (int i=0; i<empList1.size(); i++) {
				result2 += chattingService.createChatGroup(Integer.parseInt(empList1.get(i)));
			}
		}
		if (result2 == empList1.size()) {
			resultStr = "success";
		} else {
			resultStr = "error";
		}
				
		return resultStr;
	}
	
	
	// 안읽은 메세지 카운트 (총)
	@ResponseBody
	@RequestMapping(value = "/noReadChatCount.ch",  produces = "appalication/json; charset = UTF-8")
	public String selectnoReadChatCount(HttpSession session) {
		Employee e = (Employee)session.getAttribute("loginUser");
		int empNo = e.getEmpNo();
		int readListCount = emailService.mailreadListCount(empNo);
		JSONObject count = new JSONObject();
		count.put("readChatCount", chattingService.selectnoReadChatCount(empNo));
		count.put("readEmailCount", emailService.mailreadListCount(empNo));
		return new Gson().toJson(count);
	}

	
	
	

}
