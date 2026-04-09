package com.eseict.fps.service.user;

import com.eseict.common.log.LoggerManager;
import com.eseict.common.net.http.HttpConnection;
import com.eseict.common.net.http.HttpConnectionException;
import com.eseict.common.net.http.responseHandler.JsonToMapHandler;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.expression.Strings;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private static final Logger logger = LoggerManager.getLogger(UserService.class);

    @Value(value = "${platform.oms.url.server}")
    private String OMS_URL;
//    @Value(value = "${platform.oms.api.token.alive}")
//    private String TOKEN_ALIVE_URL;
    @Value(value = "${platform.oms.system.key}")
    private String SYSTEM_KEY;
    @Value(value = "${platform.oms.system.secret}")
    private String SECRET_KEY;
    @Value("${platform.oms.api.sys.auth}")
    private String SYS_AUTH_URL;
    @Value("${platform.oms.api.sys.list}")
    private String SYS_LIST_URL;
    @Value("${platform.oms.api.user.info}")
    private String USER_INFO_URL;

    public Map<String, Object> getSysAuth(String token){
        Map<String, Object> sessionMapObj = new HashMap<>();
        String userId = null;
        String userName = null;
        String siteCd = null;
        String clientCd = null;
        String userGd = null;
        boolean adminYn = false;
        List<Map<String, Object>> roleIdArray = null;
        List<Map<String, Object>> clientList = null;
        List<Map<String,Object>> siteList = null;
        Map<String, Object> clientMap = new HashMap<>();
        Map<String, Object> siteMap = new HashMap<>();
        List<Map<String, Object>> systemList = new ArrayList<>();


        Map<String, Object> userInfo = userInfo(token);
        if(userInfo.get("result").equals("400")){
            Map<String, Object > userInfoData = (Map<String, Object>) userInfo.get("data");
            userId = (String) userInfoData.get("userId");
            userName = (String) userInfoData.get("userName");
            siteCd = (String) userInfoData.get("siteCd");
            clientCd = (String)userInfoData.get("clientCd");
            userGd = (String)userInfoData.get("userGd");
            clientList = (List<Map<String, Object>>) userInfoData.get("clientInfo");
            siteList = (List<Map<String, Object>>) userInfoData.get("siteList");
        }else{
//             sessionDestroy(sessionObj);
             logger.error("OMS - Fail to Get UserInfo") ;
        }

        Map<String,Object> sysList = sysList(token);
        if(sysList.get("result").equals("200")){
            systemList = (List<Map<String, Object>>) sysList.get("data");
        }else{
//            sessionDestroy(sessionObj);
            logger.error("OMS - Fail to Get SysList") ;

        }

        Map<String, Object> sysAuth = sysAuth(token);
        if(sysAuth.get("result").equals("400")) {
            Map<String, Object> sysAuthData = (Map<String, Object>) sysAuth.get("data");
            adminYn = (Boolean) sysAuthData.get("adminYn");
            roleIdArray = (List<Map<String, Object>>) sysAuthData.get("roleIdList");
        }

            sessionMapObj.put("token",token);
            sessionMapObj.put("userId",userId);
            sessionMapObj.put("userGd",userGd);
            sessionMapObj.put("adminYn",adminYn);
            sessionMapObj.put("roleIdArray",roleIdArray);
            sessionMapObj.put("systemList",systemList);
            sessionMapObj.put("adminYn",adminYn);
            sessionMapObj.put("roleIdArray",roleIdArray);
            sessionMapObj.put("siteCd",siteCd);
            sessionMapObj.put("clientCd",clientCd);

            if(clientList != null && clientList.size() > 0){
                for(int i = 0; i < clientList.size(); i++){
                    String cc = (String) clientList.get(i).get("clientCd");
                    String cn = (String) clientList.get(i).get("clientNm");
                    clientMap.put(cc, cn);
                }
            }

            if(siteList != null && siteList.size() >0){
                for(int i = 0; i < siteList.size(); i++){
                    String sc = (String) siteList.get(i).get("siteCd");
                    String sn = (String) siteList.get(i).get("siteNm");
                    siteMap.put(sc,sn);
                }
            }

        sessionMapObj.put("clientMap", clientMap);
        sessionMapObj.put("siteMap", siteMap);
        sessionMapObj.put("clientList", clientList);
        sessionMapObj.put("siteList", siteList);

        return sessionMapObj;
    }

    /**
     * OMS에 사용자 정보를 요청
     * @param token
     * @return
     */
    public Map<String, Object> userInfo(String token){
        Map<String, Object> result = null;
        JsonToMapHandler handler = new JsonToMapHandler();
        HttpConnection<Map<String, Object>> httpConnection = new HttpConnection<Map<String, Object>>(handler);

        StringBuilder loginUrl = new StringBuilder();
        loginUrl.append(OMS_URL).append(USER_INFO_URL);

        Map<String, Object> requestHeader = com.google.common.collect.Maps.newHashMap();
        Map<String, Object> requestBody = Maps.newHashMap();

        requestHeader.put("systemKey", SYSTEM_KEY);
        requestHeader.put("secret", SECRET_KEY);

        requestBody.put("token", token);

        logger.debug("userInfo loginUrl : {}",loginUrl.toString());
        logger.debug("userInfo requestHeader : {}",requestHeader.toString());
        logger.debug("userInfo requestBody : {}",requestBody.toString());

        try {
            result = httpConnection.doPost(loginUrl.toString(), requestHeader, requestBody);
        } catch (HttpConnectionException e) {
            logger.error("userInfo Get User Info Fail", e);
        }

        return result;
    }

    /**
     * 사용자가 가진 롤 목록을 조회
     * @param token
     * @return
     */
    public Map<String, Object> sysAuth(String token){

        Map<String, Object> result = null;
        JsonToMapHandler handler = new JsonToMapHandler();
        HttpConnection<Map<String, Object>> httpConnection = new HttpConnection<Map<String, Object>>(handler);

        StringBuilder authUrl = new StringBuilder();
        authUrl.append(OMS_URL).append(SYS_AUTH_URL);

        Map<String, Object> requestHeader = Maps.newHashMap();
        Map<String, Object> requestBody = Maps.newHashMap();

        requestHeader.put("systemKey", SYSTEM_KEY);
        requestHeader.put("secret", SECRET_KEY);

        requestBody.put("token", token);

        try {
            result = httpConnection.doPost(authUrl.toString(), requestHeader, requestBody);
        } catch (HttpConnectionException e) {
            logger.error("Get System Auth List Fail", e);
        }

        return result;
    }

    /**
     * 사용자가 접속 가능한 시스템 목록 조회
     */
    public Map<String, Object> sysList(String token){
        Map<String, Object> result = null;
        JsonToMapHandler handler = new JsonToMapHandler();
        HttpConnection<Map<String, Object>> httpConnection = new HttpConnection<Map<String, Object>>(handler);

        StringBuilder loginUrl = new StringBuilder();
        loginUrl.append(OMS_URL).append(SYS_LIST_URL);

        Map<String, Object> requestHeader = Maps.newHashMap();
        Map<String, Object> requestBody = Maps.newHashMap();

        requestHeader.put("systemKey", SYSTEM_KEY);
        requestHeader.put("secret", SECRET_KEY);

        requestBody.put("token", token);

        try {
            result = httpConnection.doPost(loginUrl.toString(), requestHeader, requestBody);
        } catch (HttpConnectionException e) {
            logger.error("Get System List Fail", e);
        }

        return result;
    }



}
