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
public class ChattingMsgRead {
	
	private int msgReadNo;
	private int chatRoomNo;
	private int chatMsgNo;
	private int empNo;
	private int isread;
	

}
