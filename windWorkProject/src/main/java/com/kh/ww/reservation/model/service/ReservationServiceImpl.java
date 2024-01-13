package com.kh.ww.reservation.model.service;

import java.util.ArrayList;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.ww.common.model.vo.PageInfo;
import com.kh.ww.reservation.model.dao.ReservationDao;
import com.kh.ww.reservation.model.vo.Assets;
import com.kh.ww.reservation.model.vo.Reservation;

@Service
public class ReservationServiceImpl implements ReservationService{
	@Autowired
	private ReservationDao reservationDao;
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//재물리스트 조회
	@Override
	public ArrayList<Assets> selectAssetsList() {
		return reservationDao.selectAssetsList(sqlSession);
	}
	
	@Override
	public int selectReservationListCount(int empNo) {
		return reservationDao.selectReservationListCount(sqlSession, empNo);
	}
	
	//재물 예약
	@Override
	public int reservationAssets(Reservation r) {
		return reservationDao.reservationAssets(sqlSession, r);
	}
	
	//재물 반납
	@Override
	public int deleteReservation(int reserNo) {
		return reservationDao.deleteReservation(sqlSession, reserNo);
	}

	//예약된 재물 리스트 조회
	@Override
	public ArrayList<Reservation> selectReservationList(Reservation r) {
		return reservationDao.selectReservationList(sqlSession, r);
	}
	
	//예약된 자산 리스트 div
	@Override
	public ArrayList<Reservation> selectReservationListDiv(Reservation r) {
		return reservationDao.selectReservationListDiv(sqlSession, r);
	}
	
}
