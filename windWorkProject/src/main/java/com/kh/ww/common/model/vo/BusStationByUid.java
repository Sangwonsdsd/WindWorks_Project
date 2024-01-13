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
public class BusStationByUid {
	private String adirection; //방향
	private String arrmsg1; //첫번째 도착예정 버스
	private String arrmsg2; //두번째 도착예정 버스
	private String arrmsgSec1; //첫번째 도착예정 버스의 도착정보메세지
	private String arrmsgSec2; //두번째 도착예정버스의 도착정보 메세지
	private String arsId; //정류소 번호
	private String busRouteAbrv; //버스번호
	private String busRouteId; //노선ID
	private String busType1; //0: 일반버스 1: 저상
	private String busType2; //0: 일반버스 1: 저상
	private String routeType; //1:공항, 2:마을 3간선 4지선 5순환 6 광역 7인천 8경기 0 공용
	private String staOrd; //요청정류소 순번
	private String stNm; //정류소명
	private String stId; //정류소명
}
