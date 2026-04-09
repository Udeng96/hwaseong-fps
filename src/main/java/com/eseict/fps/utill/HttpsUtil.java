package com.eseict.fps.utill;

import flexjson.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HttpsUtil {

    final private static Logger log = LoggerFactory.getLogger(HttpsUtil.class);

    public static String getDataFromHttps(String method, String requestUrl, Map<String,Object> headerMap, Map<String,Object> paramMap){
        method = method.toUpperCase();
        String result="";
        OutputStream os = null;
        BufferedReader reader = null;

        if (method.equals("GET")){
            List<String> keyList = new ArrayList(paramMap.keySet());
            for (int i = 0; i < keyList.size(); i++) {
                String key = keyList.get(i);
                if (i == 0){
                    requestUrl+="?";
                }
                requestUrl += key + "=" + paramMap.get(key);
                if (i != keyList.size()-1){
                    requestUrl +="&";
                }
            }
        }

        try{

            URL url = new URL(requestUrl);
            HttpsURLConnection httpsCon = (HttpsURLConnection) url.openConnection();
            httpsCon.setConnectTimeout(5000);
            httpsCon.setReadTimeout(5000);
            httpsCon.setHostnameVerifier(new HostnameVerifier() { @Override public boolean verify(String hostname, SSLSession session) {
                // Ignore host name verification. It always returns true.
                return true;
            } });

            // SSL setting
//            SSLContext context = SSLContext.getInstance("TLSv1.2");
            SSLContext context = SSLContext.getInstance("SSL");
            TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
                public X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
                public void checkClientTrusted(X509Certificate[] certs, String authType) {
                }
                public void checkServerTrusted(X509Certificate[] certs, String authType) {
                }
            }
            };
            context.init(null, trustAllCerts, null);
            // No validation for now
            httpsCon.setSSLSocketFactory(context.getSocketFactory());

            //GET 방식은 parameter를 url에 녹여서 보낸다.
            if (method.equals("GET")){ // do GET
                httpsCon.setRequestMethod(method);
                int resCode = httpsCon.getResponseCode();
                if (resCode != HttpsURLConnection.HTTP_OK){
                    log.error("HTTPS CONNECTION FAIL!!!!");
                    return result;
                }else {
                    log.info("HTTPS CONNECTION SUCCESS!!!!");
                }
            }else if (method.equals("POST")) { //do POST

                httpsCon.setRequestMethod(method);
                httpsCon.setDoOutput(true);
                httpsCon.setInstanceFollowRedirects(false);
                httpsCon.setRequestMethod("POST");
                httpsCon.setRequestProperty("Content-Type", "application/json");

                org.json.JSONObject json = new org.json.JSONObject();

                for (String key : paramMap.keySet()) {
                    try {
                        json.put(key, paramMap.get(key));
                    } catch (JSONException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }

                String body = json.toString();

                for (Map.Entry<String,Object> entry: headerMap.entrySet()){
                    httpsCon.setRequestProperty(entry.getKey(),(String)entry.getValue());
                }

                os = httpsCon.getOutputStream();
                os.write(body.getBytes());
                os.flush();

            }else {
                log.error("BAD REQUEST METHOD!!!");
                return result;
            }

            reader = new BufferedReader(new InputStreamReader(httpsCon.getInputStream()));

            String output;
            while ((output = reader.readLine()) != null) {
                result = result + output + "\n";
            }


        }catch (MalformedURLException e) {
            log.error(e.getMessage(), e);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        } catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
        } catch (KeyManagementException e) {
            e.printStackTrace();
        }

        return result;
    }
}
