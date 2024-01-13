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
public class ChattingRoomList {
	
	private int chatRoomNo;
	private int chatRoomLevel;
	
	private String targetProfilePath;
	private String targetList;
	
	private String lastMsg;
	private String lastMsgDate;
	
	private int noReadCount;
	
	

}
