package com.kh.ww.common.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.google.gson.Gson;
import com.kh.ww.common.model.service.BusService;
import com.kh.ww.common.model.vo.BusStationByUid;
import com.kh.ww.common.model.vo.BusStopInfo;

@Controller
public class BusSearchController {
	
	
	@Autowired
	private BusService busService;
	
	//버스 검색
	@ResponseBody
	@RequestMapping(value = "/busSearch.bus",  produces = "appalication/json; charset = UTF-8")
	public String busSearch(String busSearch) throws IOException, ParserConfigurationException, SAXException {
        ArrayList<BusStopInfo> bsiList = busService.busStopSearch(busSearch);
        ArrayList<BusStationByUid> bsbList = busService.busStationByUid(bsiList);
        JSONObject bus = new JSONObject();
        bus.put("bsiList", bsiList);
        bus.put("bsbList", bsbList);
		return new Gson().toJson(bus);
	}
	
	//버스 검색
	@ResponseBody
	@RequestMapping(value = "/busAjaxSearchList.bus",  produces = "appalication/json; charset = UTF-8")
	public String busAjaxSearchList(BusStopInfo bsiList) throws IOException, ParserConfigurationException, SAXException {
        ArrayList<BusStationByUid> bsbList = busService.busStationByUidInfo(bsiList);
        JSONObject bus = new JSONObject();
        bus.put("bsiList", bsiList);
        bus.put("bsbList", bsbList);
		return new Gson().toJson(bus);
	}

}
