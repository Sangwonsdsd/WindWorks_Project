package com.kh.ww.common.template;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.kh.ww.chatting.model.service.ChattingService;
import com.kh.ww.chatting.model.vo.ChattingGroup;
import com.kh.ww.chatting.model.vo.ChattingMessage;
import com.kh.ww.chatting.model.vo.ChattingMsgRead;
import com.kh.ww.employee.model.vo.Employee;

import lombok.extern.slf4j.Slf4j;

//log 사용하게 하는 어노테이션
@Slf4j
@Component
public class ChatServer extends TextWebSocketHandler {
	
	@Autowired
	private ChattingService chattingService;
	
	
	private final Map<Integer, Map<Integer, WebSocketSession>> roomUserSession = new ConcurrentHashMap();

	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Employee e = (Employee)session.getAttributes().get("loginUser");
		int empNo = e.getEmpNo();
		int roomNo = (Integer)session.getAttributes().get("currRoomNo");
	
		// 로그인유저 세션을 맵에 추가
		Map<Integer, WebSocketSession> userSession = new ConcurrentHashMap();
		userSession.put(empNo, session);
			
       boolean found = false;
       // 1. roomNo 있는지 확인
       for (Map.Entry<Integer, Map<Integer, WebSocketSession>> entry : roomUserSession.entrySet()) {
    	   int currentRoomNo = entry.getKey();
           Map<Integer, WebSocketSession> userMap = entry.getValue();
            
            if (currentRoomNo == roomNo) {
                // 1-1 있을 경우
            	System.out.println(roomNo + "룸번호 있음");
                found = true;
                
                // 2. 내 empNo 있는지 확인
                boolean found2 = userMap.containsKey(empNo);
                // 2-2없을 경우
                if (!found2) {
                	userMap.put(empNo, session);
	                System.out.println(empNo + "내 emp 없음");
	                break;
                }
            }
        }
       // 1-2 없을 경우 새로운 엔트리를 만들어서 userSession을 추가
       if (!found) {
    	   System.out.println(roomNo + "룸번호 없음");
    	   Map<Integer, WebSocketSession> userMap = new ConcurrentHashMap();
    	   userMap.put(empNo, session);
           roomUserSession.put(roomNo, userMap);
       }
		
		log.info("{} 연결됨", empNo);
		System.out.println(roomUserSession);
	}

	// 메세지 보낼때
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		Employee e = (Employee)session.getAttributes().get("loginUser");
		int roomNo = (Integer)session.getAttributes().get("currRoomNo");
		
		// Gson방식 (Json보다 조금 복잡함)
		JsonObject obj = new JsonParser().parse(message.getPayload()).getAsJsonObject();
		
		// 채팅방 레벨 조회
		int chatRoomLevel = chattingService.selectChatRoomLevel(roomNo);
		
		ChattingMessage cm = new ChattingMessage();
		cm.setChatRoomNo(roomNo);
		cm.setEmpNo(e.getEmpNo());
		cm.setChatMsgContent(obj.get("message").getAsString());
		cm.setChatRoomLevel(chatRoomLevel);
		cm.setEmpName(obj.get("sendEmpName").getAsString());
		
		// DB에 메세지 저장
		int result = chattingService.insertMsg(cm);
		
		if (result > 0) {
			// 타겟들 가져와서 리스트에 담기
			ChattingGroup cg = new ChattingGroup();
			cg.setChatRoomNo(roomNo);
			cg.setEmpNo(e.getEmpNo());
			ArrayList<Employee> targetList = chattingService.selectChatTarget(cg);
			// 타켓들 돌면서 DB 읽음체크 추가하기
			int result2 = 0;
			for (Employee emp : targetList) {
				System.out.println(emp); 
				ChattingMsgRead cmr = new ChattingMsgRead();
				cmr.setEmpNo(emp.getEmpNo());
				cmr.setChatRoomNo(roomNo);
				result2 += chattingService.insertMsgRead(cmr);
			}
			
			if (result2 == targetList.size()) {
				sendMessageToUser(cm, roomNo, cm.getEmpNo());
			}
	
		}
		
	}
	
	
	private void sendMessageToUser(ChattingMessage cm, int roomNo, int myEmpNo) {
		Map<Integer, WebSocketSession> userMap = roomUserSession.get(roomNo);
		
		// 반복돌면서 나를 제외하고 보내기 (+DB 읽음처리)
		for (Map.Entry<Integer, WebSocketSession> entry : userMap.entrySet()) {
			if(entry.getKey() != myEmpNo) {
				Integer targetEmpNo = entry.getKey();
		        WebSocketSession targetSession = entry.getValue();
		    	if(targetSession != null && targetSession.isOpen()) {
		    		String str = new Gson().toJson(cm);
		    		TextMessage message = new TextMessage(str);
		    		try {
		    			// DB 읽음처리
		    			ChattingMsgRead cmr = new ChattingMsgRead();
						cmr.setEmpNo(entry.getKey());
						cmr.setChatRoomNo(roomNo);
		    			int result = chattingService.updateMsgIsRead(cmr);
		    			// 실시간 메세지 보내기
		    			if(result > 0) {
		    				targetSession.sendMessage(message);
		    			}
					} catch (IOException e) {
						e.printStackTrace();
					}
		    	}
		    }
		}
		
		
		for (Map.Entry<Integer, Map<Integer, WebSocketSession>> roomEntry : roomUserSession.entrySet()) {
		    int roomNo2 = roomEntry.getKey();

		    // roomNo가 다르면 계속 진행
		    if (roomNo2 != roomNo) {
		        Map<Integer, WebSocketSession> userMap2 = roomEntry.getValue();

		        for (Map.Entry<Integer, WebSocketSession> userEntry : userMap2.entrySet()) {
		            int empNo = userEntry.getKey();

		            // empNo가 다르고 WebSocketSession이 open 상태인 경우에만 메세지 전송
		            if (empNo != myEmpNo && userEntry.getValue().isOpen()) {
		                WebSocketSession session = userEntry.getValue();
		                cm.setIsSide(1);
		                String str = new Gson().toJson(cm);
			    		TextMessage message = new TextMessage(str);

		                try {
		                    session.sendMessage(message);
		                } catch (IOException e) {
		                    e.printStackTrace();
		                }
		            }
		        }
		    }
		}
		
		
	}


	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		try {
			Employee e = (Employee)session.getAttributes().get("loginUser");
			int empNo = e.getEmpNo();
			
			// 모든 맵을 돌면서 empNo를 키로 가지는 엔트리 제거
			for (Map<Integer, WebSocketSession> userMap : roomUserSession.values()) {
		        Iterator<Map.Entry<Integer, WebSocketSession>> iterator = userMap.entrySet().iterator();
		        while (iterator.hasNext()) {
		            Map.Entry<Integer, WebSocketSession> entry = iterator.next();
		            if (entry.getKey() == empNo) {
		        		log.info("{} 연결종료", empNo);
		                iterator.remove();
		            }
		        }
		    }
		} catch (Exception e) {
	        e.printStackTrace();
	    }
	}
	

}
