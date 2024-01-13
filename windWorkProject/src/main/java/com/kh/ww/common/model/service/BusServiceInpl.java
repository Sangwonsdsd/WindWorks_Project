package com.kh.ww.common.model.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.kh.ww.common.model.vo.BusStationByUid;
import com.kh.ww.common.model.vo.BusStopInfo;

@Service
public class BusServiceInpl implements BusService {
	public static final String SERVICE_KEY = "nUSJtSSWc%2Bm8MKMWiTfH7PimGWv3JuPFqMf6KZeKXgWxa1CYoI56FjBI9ajSHeU54DBVDLxV93zyody2rqrA9g%3D%3D";

	@Override
	public ArrayList<BusStopInfo> busStopSearch(String busSearch) throws IOException, ParserConfigurationException, SAXException  {
		StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getStationByName"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + SERVICE_KEY); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("stSrch","UTF-8") + "=" + URLEncoder.encode(busSearch, "UTF-8")); /*정류소명 검색어*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());
        
        // Parse XML response
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document document = builder.parse(new InputSource(new StringReader(sb.toString())));
        ArrayList<BusStopInfo> bsiList = new ArrayList<BusStopInfo>();
        // Extract values
        NodeList itemList = document.getElementsByTagName("itemList");
        for (int i = 0; i < itemList.getLength(); i++) {
            Element element = (Element) itemList.item(i);
            String arsId = element.getElementsByTagName("arsId").item(0).getTextContent();
            String posX = element.getElementsByTagName("posX").item(0).getTextContent();
            String posY = element.getElementsByTagName("posY").item(0).getTextContent();
            String stId = element.getElementsByTagName("stId").item(0).getTextContent();
            String stNm = element.getElementsByTagName("stNm").item(0).getTextContent();
            String tmX = element.getElementsByTagName("tmX").item(0).getTextContent();
            String tmY = element.getElementsByTagName("tmY").item(0).getTextContent();
            
            
            if(!arsId.equals("0")) {
            	bsiList.add(new BusStopInfo(arsId, posX, posY, stId, stNm, tmX, tmY));
            }
        }
		return bsiList;
	}

	@Override
	public ArrayList<BusStationByUid> busStationByUid(ArrayList<BusStopInfo> bsiList) throws IOException, ParserConfigurationException, SAXException {
		ArrayList<BusStationByUid> bstationList = new ArrayList<BusStationByUid>();
		
		for(BusStopInfo b : bsiList) {
			StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getStationByUid"); /*URL*/
	        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + SERVICE_KEY); /*Service Key*/
	        urlBuilder.append("&" + URLEncoder.encode("arsId","UTF-8") + "=" + URLEncoder.encode(b.getArsld(), "UTF-8")); /*정류소 번호*/
	        URL url = new URL(urlBuilder.toString());
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        conn.setRequestProperty("Content-type", "application/json");
	        System.out.println("Response code: " + conn.getResponseCode());
	        BufferedReader rd;
	        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
	            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	        } else {
	            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	        }
	        StringBuilder sb = new StringBuilder();
	        String line;
	        while ((line = rd.readLine()) != null) {
	            sb.append(line);
	        }
	        rd.close();
	        conn.disconnect();
	        System.out.println(sb.toString());
	        
	        // Parse XML response
	        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	        DocumentBuilder builder = factory.newDocumentBuilder();
	        Document document = builder.parse(new InputSource(new StringReader(sb.toString())));
	        // Extract values
	        NodeList itemList = document.getElementsByTagName("itemList");
	        for (int i = 0; i < itemList.getLength(); i++) {
	            Element element = (Element) itemList.item(i);
	            String adirection = element.getElementsByTagName("adirection").item(0).getTextContent();
	            String arrmsg1 = element.getElementsByTagName("arrmsg1").item(0).getTextContent();
	            String arrmsg2 = element.getElementsByTagName("arrmsg2").item(0).getTextContent();
	            String arrmsgSec1 = element.getElementsByTagName("arrmsgSec1").item(0).getTextContent();
	            String arrmsgSec2 = element.getElementsByTagName("arrmsgSec2").item(0).getTextContent();
	            String arsId = element.getElementsByTagName("arsId").item(0).getTextContent();
	            String busRouteAbrv = element.getElementsByTagName("busRouteAbrv").item(0).getTextContent();
	            String busRouteId = element.getElementsByTagName("busRouteId").item(0).getTextContent();
	            String busType1 = element.getElementsByTagName("busType1").item(0).getTextContent();
	            String busType2 = element.getElementsByTagName("busType2").item(0).getTextContent();
	            String routeType = element.getElementsByTagName("routeType").item(0).getTextContent();
	            String staOrd = element.getElementsByTagName("staOrd").item(0).getTextContent();
	            String stNm = element.getElementsByTagName("stNm").item(0).getTextContent();
	            String stId = element.getElementsByTagName("stId").item(0).getTextContent();
	            BusStationByUid bSBU = new BusStationByUid(adirection, arrmsg1, arrmsg2, arrmsgSec1, arrmsgSec2,
	            		arsId, busRouteAbrv, busRouteId, busType1, busType2, routeType, staOrd, stNm, stId);
	            if(b.getArsld().equals(bSBU.getArsId()) && b.getStNm().equals(bSBU.getStNm()) && b.getStId().equals(bSBU.getStId()) && !b.getArsld().equals("0") && !bSBU.getArsId().equals("0")) {
	            	 bstationList.add(bSBU);
	            }
	           
	        }    
        }
		
		return bstationList;
	}

	@Override
	public ArrayList<BusStationByUid> busStationByUidInfo(BusStopInfo bus)
			throws IOException, ParserConfigurationException, SAXException {
		ArrayList<BusStationByUid> bstationList = new ArrayList<BusStationByUid>();
		StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getStationByUid"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + SERVICE_KEY); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("arsId","UTF-8") + "=" + URLEncoder.encode(bus.getArsld(), "UTF-8")); /*정류소 번호*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());
        
        // Parse XML response
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document document = builder.parse(new InputSource(new StringReader(sb.toString())));
        // Extract values
        NodeList itemList = document.getElementsByTagName("itemList");
        for (int i = 0; i < itemList.getLength(); i++) {
            Element element = (Element) itemList.item(i);
            String adirection = element.getElementsByTagName("adirection").item(0).getTextContent();
            String arrmsg1 = element.getElementsByTagName("arrmsg1").item(0).getTextContent();
            String arrmsg2 = element.getElementsByTagName("arrmsg2").item(0).getTextContent();
            String arrmsgSec1 = element.getElementsByTagName("arrmsgSec1").item(0).getTextContent();
            String arrmsgSec2 = element.getElementsByTagName("arrmsgSec2").item(0).getTextContent();
            String arsId = element.getElementsByTagName("arsId").item(0).getTextContent();
            String busRouteAbrv = element.getElementsByTagName("busRouteAbrv").item(0).getTextContent();
            String busRouteId = element.getElementsByTagName("busRouteId").item(0).getTextContent();
            String busType1 = element.getElementsByTagName("busType1").item(0).getTextContent();
            String busType2 = element.getElementsByTagName("busType2").item(0).getTextContent();
            String routeType = element.getElementsByTagName("routeType").item(0).getTextContent();
            String staOrd = element.getElementsByTagName("staOrd").item(0).getTextContent();
            String stNm = element.getElementsByTagName("stNm").item(0).getTextContent();
            String stId = element.getElementsByTagName("stId").item(0).getTextContent();
            BusStationByUid bSBU = new BusStationByUid(adirection, arrmsg1, arrmsg2, arrmsgSec1, arrmsgSec2,
            		arsId, busRouteAbrv, busRouteId, busType1, busType2, routeType, staOrd, stNm, stId);
            if(bus.getArsld().equals(bSBU.getArsId()) && bus.getStNm().equals(bSBU.getStNm()) && bus.getStId().equals(bSBU.getStId()) && !bus.getArsld().equals("0") && !bSBU.getArsId().equals("0")) {
            	 bstationList.add(bSBU);
            }
		
        }
        return bstationList;
	}
}
