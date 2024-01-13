package com.kh.ww.common.controller;

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

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.kh.ww.common.model.vo.BusStopInfo;

public class ApiExplorer {
	
	 public static void main(String[] args) throws IOException {
		 	StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByRoute"); /*URL*/
	        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=nUSJtSSWc%2Bm8MKMWiTfH7PimGWv3JuPFqMf6KZeKXgWxa1CYoI56FjBI9ajSHeU54DBVDLxV93zyody2rqrA9g%3D%3D"); /*Service Key*/
	        urlBuilder.append("&" + URLEncoder.encode("stId","UTF-8") + "=" + URLEncoder.encode("112000001", "UTF-8")); /*정류소 고유 ID*/
	        urlBuilder.append("&" + URLEncoder.encode("busRouteId","UTF-8") + "=" + URLEncoder.encode("100100118", "UTF-8")); /*노선ID*/
	        urlBuilder.append("&" + URLEncoder.encode("ord","UTF-8") + "=" + URLEncoder.encode("22", "UTF-8")); /*정류소 순번*/
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
	    }
}
