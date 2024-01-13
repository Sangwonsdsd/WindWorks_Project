package com.kh.ww.common.model.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

import com.kh.ww.common.model.vo.BusStationByUid;
import com.kh.ww.common.model.vo.BusStopInfo;

public interface BusService {

	ArrayList<BusStopInfo> busStopSearch(String busSearch) throws IOException, ParserConfigurationException, SAXException ;

	ArrayList<BusStationByUid> busStationByUid(ArrayList<BusStopInfo> bsiList)  throws IOException, ParserConfigurationException, SAXException;
	
	ArrayList<BusStationByUid> busStationByUidInfo(BusStopInfo bus) throws IOException, ParserConfigurationException, SAXException ;
}
