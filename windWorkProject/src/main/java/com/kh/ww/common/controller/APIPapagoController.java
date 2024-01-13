package com.kh.ww.common.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class APIPapagoController {
	
	
	public static final String CLIENTID = "9BxCMwgIpfVu__64ADKn";
	public static final String CLIENTSECRET = "AbFokHioBX";
	
    @ResponseBody
	@RequestMapping(value="papagoKo.ho", produces="application/json; charset=UTF-8")
	public String papagoKo(String inputText) throws IOException {
    	
    	String url = "https://openapi.naver.com/v1/papago/n2mt";
		
		
		URL requestUrl = new URL(url);
		HttpURLConnection urlConnection = (HttpURLConnection)requestUrl.openConnection();
		urlConnection.setRequestMethod("POST");
		urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		urlConnection.setRequestProperty("X-Naver-Client-Id", CLIENTID);
		urlConnection.setRequestProperty("X-Naver-Client-Secret", CLIENTSECRET);
		urlConnection.setDoOutput(true);

        try (DataOutputStream wr = new DataOutputStream(urlConnection.getOutputStream())) {
            String postParams = "source=ko&target=en&text=" + URLEncoder.encode(inputText, "UTF-8");
            wr.write(postParams.getBytes(StandardCharsets.UTF_8));
            wr.flush();
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        } finally {
            urlConnection.disconnect();
        }
    }
    
    
    @ResponseBody
	@RequestMapping(value="papagoEn.ho", produces="application/json; charset=UTF-8")
	public String papagoEn(String inputText) throws IOException {
    	
    	String url = "https://openapi.naver.com/v1/papago/n2mt";
		
		
		URL requestUrl = new URL(url);
		HttpURLConnection urlConnection = (HttpURLConnection)requestUrl.openConnection();
		urlConnection.setRequestMethod("POST");
		urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		urlConnection.setRequestProperty("X-Naver-Client-Id", CLIENTID);
		urlConnection.setRequestProperty("X-Naver-Client-Secret", CLIENTSECRET);
		urlConnection.setDoOutput(true);

        try (DataOutputStream wr = new DataOutputStream(urlConnection.getOutputStream())) {
            String postParams = "source=en&target=ko&text=" + URLEncoder.encode(inputText, "UTF-8");
            wr.write(postParams.getBytes(StandardCharsets.UTF_8));
            wr.flush();
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        } finally {
            urlConnection.disconnect();
        }
    }

    
}
