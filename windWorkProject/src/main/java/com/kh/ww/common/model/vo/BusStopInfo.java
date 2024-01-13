package com.kh.ww.common.model.vo;

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
public class BusStopInfo {
	private String arsld; //정류소 고유번호
	private String posX; //정류장 x좌표
	private String posY; //정류장 y좌표
	private String stId; //정류소아이디 고유ID
	private String stNm; //정류소 명
	private String tmX; //정류장 x좌표
	private String tmY; //정류장 y좌표
}
