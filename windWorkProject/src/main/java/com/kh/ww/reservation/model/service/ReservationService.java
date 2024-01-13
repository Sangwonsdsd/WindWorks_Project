package com.kh.ww.reservation.model.service;

import java.util.ArrayList;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.reservation.model.vo.Assets;
import com.kh.ww.reservation.model.vo.Reservation;

public interface ReservationService {
	//재물 리스트 조회
	ArrayList<Assets> selectAssetsList();
	
	//예약된 재물 리스트 조회 페이지 상단
	ArrayList<Reservation> selectReservationList(Reservation r);
	
	//예약페이지 예약된 재물 리스트
	int selectReservationListCount(int empNo);
	
	//재물 예약
	int reservationAssets(Reservation r);
	
	//재물 반납
	int deleteReservation(int reserNo);
	
	//예약된 자산 리스트 div
	ArrayList<Reservation> selectReservationListDiv(Reservation r);
}
