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
public class ChattingRoom {
	
	private int chatRoomNo;
	private int chatRoomLevel;
	private String chatRoomLastmsgDate;
	private String chatRoomStatus;

}
