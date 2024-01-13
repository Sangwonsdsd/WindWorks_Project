package com.kh.ww.weather.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class weatherController {
	public static final String SERVICE_KEY = "jLS77SV9j24p0UBPRNFQBXYUGk0OaCCTk6wb%2FDrIDsz6jSdLU8tRjsLNTwJIWf7qGfrBJJ72sCNTJCwXDiSKzQ%3D%3D";
	
	@ResponseBody  
	@RequestMapping(value="weatherView.we", produces="application/json; charset=UTF-8")
	public String weatherView(String todayDate) throws IOException  {
		System.out.println(todayDate);
		String url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
		url += "?serviceKey=" + SERVICE_KEY;
		url += "&pageNo=1&numOfRows=809&dataType=JSON";
		url += "&base_date=" + todayDate;
		url += "&base_time=0500";
		url += "&nx=61&ny=125";
		
		URL requestUrl = new URL(url);
		HttpURLConnection urlConnection = (HttpURLConnection)requestUrl.openConnection();
		urlConnection.setRequestMethod("GET");
		
		BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
		
		String responseText = "";
		String line;
		
		while((line = br.readLine()) != null) {
			responseText += line;
		}
		
		br.close();
		urlConnection.disconnect();
		
		return responseText;
	}
	 
	@ResponseBody  
	@RequestMapping(value="misseMunji.mi", produces="application/json; charset=UTF-8")
	public String misseMunjiView() throws IOException  {
		
		String url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
		url += "?serviceKey=" + SERVICE_KEY;
		url += "&sidoName=" + URLEncoder.encode("서울", "UTF-8"); // 요청값에 한글이 있다면 인코딩 해줘야한다.
		url += "&returnType=json";
		url += "&ver=1.0";
		
		URL requestUrl = new URL(url); 
		HttpURLConnection urlConnection = (HttpURLConnection)requestUrl.openConnection();
		urlConnection.setRequestMethod("GET");
		
		BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
		
		String responseText = "";
		String line;
		
		while((line = br.readLine()) != null) {
			responseText += line;
		}

		br.close();
		urlConnection.disconnect();
		
		return responseText;
	}
}
