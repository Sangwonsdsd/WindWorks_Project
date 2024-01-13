package com.kh.ww.weather.model;

import java.util.Date;

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
public class weatherVo {
	//발표시각
	private String fcstTime;
	//자료구분문자
	private String category;
	//예보값
	private String fcstValue;
}
