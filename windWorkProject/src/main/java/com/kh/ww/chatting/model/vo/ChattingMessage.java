package com.kh.ww.chatting.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ChattingMessage {
	
	private int chatMsgNo;
	private int chatRoomNo;
	private int empNo;
	private String chatMsgContent;
	private String chatMsgDate;
	private int chatMsgType;
	
	private String empName;
	private int chatRoomLevel;
	private int isSide;
	private String jobName;

}
