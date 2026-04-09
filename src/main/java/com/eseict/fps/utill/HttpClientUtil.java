package com.eseict.fps.utill;

import com.eseict.common.log.LoggerManager;
import flexjson.JSONException;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONObject;
import org.slf4j.Logger;

import javax.net.ssl.SSLContext;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Map;

public class HttpClientUtil {

    private static final Logger logger = LoggerManager.getLogger(HttpClientUtil.class);
    private static final int TIME_OUT = 10000;
    public static RequestConfig config = RequestConfig.custom()
            .setSocketTimeout(5000)
            .setConnectTimeout(5000)
            .setConnectionRequestTimeout(5000)
            .setCookieSpec(CookieSpecs.IGNORE_COOKIES)
            .build();

    public static String httpsGet(String url, Map<String, Object> headerMap, Map<String, Object> paramMap) {
        SSLContext sslcontext = null;
        try {
            sslcontext = SSLContexts.custom()
                    .setProtocol("SSL")
                    .loadTrustMaterial(null, new TrustStrategy() {
                        @Override
                        public boolean isTrusted(X509Certificate[] paramArrayOfX509Certificate, String paramString) throws CertificateException {
                            return true;
                        }
                    })
                    .build();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        } catch (KeyStoreException e) {
            e.printStackTrace();
        }

        HttpClientBuilder httpClientBuilder = HttpClients.custom().setSSLHostnameVerifier(new NoopHostnameVerifier()).setSSLContext(sslcontext);
        CloseableHttpClient httpClient = httpClientBuilder.build();

        StringBuffer reqUrl = new StringBuffer();
        reqUrl.append(url);
        if(!reqUrl.toString().contains("?")){
            reqUrl.append("?");
        }
        paramMap.forEach((s, o) -> {
            reqUrl.append(s).append("=").append(o.toString()).append("&");
        });

        logger.trace(reqUrl.toString());

        HttpGet httpGet = new HttpGet(reqUrl.toString());
        headerMap.forEach((s, o) -> httpGet.setHeader(s, o.toString()));

        CloseableHttpResponse response = null;
        String result = null;
        try {
            response = httpClient.execute(httpGet);
            try {
                HttpEntity entity = response.getEntity();
                result = EntityUtils.toString(entity);
                EntityUtils.consume(entity);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            try {
                response.close();
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }


    public static String httpGet(String apiUrl, Map<String,String> headerMap, Integer timeOut) {

        String result = "";

        if (timeOut==null){
            timeOut = TIME_OUT;
        }

        //http client,response 생성
        RequestConfig requestConfig = RequestConfig.copy(RequestConfig.DEFAULT).setConnectionRequestTimeout(timeOut).setSocketTimeout(timeOut).setConnectTimeout(timeOut).build();
        CloseableHttpClient httpClient = HttpClients.custom().setDefaultRequestConfig(requestConfig).build();
        HttpResponse httpResponse;
        InputStream is = null;

        try {
            // Get 메소드와 URL 설정
            HttpGet httpGet = new HttpGet(apiUrl);

            httpGet.addHeader("Accept", "application/json");
            httpGet.addHeader("Content-type", "application/json");

            if (headerMap!=null){
                headerMap.entrySet().stream().forEach(header->{
                    httpGet.addHeader(header.getKey(),header.getValue());
                });
            }

            // Get 요청
            httpResponse = httpClient.execute(httpGet);
            is = httpResponse.getEntity().getContent();
            result = IOUtils.toString(is);

            logger.info(" httpGetApi URI : " + httpGet.getURI());
            logger.info("GET Response Status : " + httpResponse.getStatusLine().getStatusCode());

            if (httpResponse.getStatusLine().getStatusCode() != 200) {
                if (httpResponse.getStatusLine().getStatusCode() == 400) {  //통신은 되었지만 문제가 생긴 경우
                    logger.info("httpGet httpResponse is not 400");
                } else if (httpResponse.getStatusLine().getStatusCode() == 500) {// 통신이 안된경우
                    logger.info("httpGet httpResponse is not 500");
                } else {
                    result = null;
                    logger.info("httpGet httpResponse is not 200");
                }
            }

        } catch (IOException e) {
            logger.error("httpGet Fail to Request IOException : " + e.getMessage(),e);

        } finally {
            try {
                if (httpClient != null) {
                    httpClient.close();
                }
            } catch (IOException e) {
                logger.error("httpGet Fail to close ERROR : " + e.getMessage());
            }

        }
        return result;
    }


    /**
     * HTTP Client - Put
     *
     * @param apiUrl
     * @return : String
     * @Method : httpPut
     * @author : Liverpool_CYK
     * @since : 2019. 5. 31.
     */
    public static String httpPut(String apiUrl, Map<String, Object> paramMap) {

        String result = "";
        //http client,response 생성
        RequestConfig requestConfig = RequestConfig.copy(RequestConfig.DEFAULT).setConnectionRequestTimeout(5000).build();
        CloseableHttpClient httpClient = HttpClients.custom().setDefaultRequestConfig(requestConfig).build();
        HttpResponse httpResponse;
        InputStream is = null;

        try {
            // Put 메소드와 URL 설정
            HttpPut httpPut = new HttpPut(apiUrl);

            // header 정보 설정
            httpPut.setHeader("Accept", "application/json");
            httpPut.addHeader("Content-type", "application/json");

            JSONObject json = new JSONObject();
            for (String key : paramMap.keySet()) {
                json.put(key, paramMap.get(key));
            }

            String body = json.toString();

            httpPut.setEntity(new StringEntity(body,"UTF-8"));
            // Put 요청
            httpResponse = httpClient.execute(httpPut);

            logger.info("httpPut URI : {}", httpPut.getURI());
            logger.info("Put Response Status : " + httpResponse.getStatusLine().getStatusCode());
            if (httpResponse.getStatusLine().getStatusCode() != 200) {
                result = null;
                logger.info("httpPut httpResponse is not 200");
            } else {
                is = httpResponse.getEntity().getContent();
                result = IOUtils.toString(is);
            }

        } catch (Exception e) {
            logger.error("httpPut Fail to Put : " + e.getMessage());
        } finally {
            try {
                if (httpClient != null) {
                    httpClient.close();
                }
            } catch (IOException e) {
                logger.error("httpPut Put Fail to close ERROR : " + e.getMessage());
            }

        }
        return result;
    }


    public static String httpDelete(String apiUrl) {

        String result = "";
        //http client,response 생성
        RequestConfig requestConfig = RequestConfig.copy(RequestConfig.DEFAULT).setConnectionRequestTimeout(5000).build();
        CloseableHttpClient httpClient = HttpClients.custom().setDefaultRequestConfig(requestConfig).build();
        HttpResponse httpResponse;
        InputStream is = null;

        try {
            // Put 메소드와 URL 설정
            HttpDelete httpDelete = new HttpDelete(apiUrl);

            // header 정보 설정
            httpDelete.setHeader("Accept", "application/json");
            httpDelete.addHeader("Content-type", "application/json");

            // Put 요청
            httpResponse = httpClient.execute(httpDelete);

            logger.info("httpDelete URI : {}", httpDelete.getURI());
            logger.info("Delete Response Status : " + httpResponse.getStatusLine().getStatusCode());
            if (httpResponse.getStatusLine().getStatusCode() != 200) {
                result = null;
                logger.info("httpDelete httpResponse is not 200");
            } else {
                is = httpResponse.getEntity().getContent();
                result = IOUtils.toString(is);
            }

        } catch (Exception e) {
            logger.error("httpDelete Fail to Put : " + e.getMessage());
        } finally {
            try {
                if (httpClient != null) {
                    httpClient.close();
                }
            } catch (IOException e) {
                logger.error("httpDelete Delete Fail to close ERROR : " + e.getMessage());
            }

        }
        return result;
    }



    public static String httpPost(String url,Map<String,String> headerMap,  Map<String, Object> paramMap) {
        String result = "";
        HttpURLConnection connection = null;
        BufferedReader br = null;
        OutputStream os = null;
        try {

            JSONObject json = new JSONObject();

            for (String key : paramMap.keySet()) {
                json.put(key, paramMap.get(key));
            }

            String body = json.toString();

            URL postUrl = new URL(url);
            connection = (HttpURLConnection) postUrl.openConnection();
            connection.setDoOutput(true);
            connection.setInstanceFollowRedirects(false);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");

            HttpURLConnection finalConnection = connection;
            headerMap.keySet().stream().forEach(key ->{
                finalConnection.setRequestProperty(key, headerMap.get(key));
            });


            connection.setConnectTimeout(5000);

            os = connection.getOutputStream();
            os.write(body.getBytes());
            os.flush();

            int responseCode = connection.getResponseCode();

            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader((connection.getInputStream())));

                String output;
                while ((output = br.readLine()) != null) {
                    result = result + output + "\n";
                }
            } else {
                logger.info("httpPost httpResponse is not 200  is {}",responseCode);
            }


        } catch (MalformedURLException e) {
            logger.error(e.getMessage(), e);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        } catch (JSONException e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (connection != null) {
                connection.disconnect();
            } else {
                return null;
            }
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                }
            }
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
        return result;
    }

    /**
     *
     * x-www-form-urlencoded content-type으로 요청 보내기
     *
     * @name : httpPostXWWWForm
     * @author : ese
     * @since : 2022-01-05 오후 2:54
     * @param url
     * @param headerMap
     * @return  java.lang.String
     * @throws
     */
    public static String httpPostXWWWForm(String url, Map<String,String> headerMap) {
        String result = "";
        HttpURLConnection connection = null;
        BufferedReader br = null;
        OutputStream os = null;
        try {

            byte[] params = url.split("[?]")[1].getBytes(StandardCharsets.UTF_8);

            URL postUrl = new URL(url);
            connection = (HttpURLConnection) postUrl.openConnection();
            connection.setDoOutput(true);
            connection.setInstanceFollowRedirects(false);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setRequestProperty("charset", "utf-8");
            connection.setRequestProperty("Content-Length",String.valueOf(params.length));
            connection.setUseCaches(false);

            HttpURLConnection finalConnection = connection;
            headerMap.keySet().stream().forEach(key ->{
                finalConnection.setRequestProperty(key, headerMap.get(key));
            });




            connection.setConnectTimeout(5000);

            os = connection.getOutputStream();
            os.write(params);
            os.flush();

            int responseCode = connection.getResponseCode();

            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader((connection.getInputStream())));

                String output;
                while ((output = br.readLine()) != null) {
                    result = result + output + "\n";
                }
            } else {
                logger.info("httpPost httpResponse is not 200  is {}",responseCode);
            }


        } catch (MalformedURLException e) {
            logger.error(e.getMessage(), e);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        } catch (JSONException e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (connection != null) {
                connection.disconnect();
            } else {
                return null;
            }
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                }
            }
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
        return result;
    }
}
