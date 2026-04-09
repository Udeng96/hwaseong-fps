package com.eseict.fps.service.user;

import com.eseict.common.net.http.HttpConnection;
import com.eseict.fps.domain.UserInfo;
import com.eseict.fps.dto.user.UserResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OmsService {

    private final static Logger logger = LoggerFactory.getLogger(OmsService.class);


    @Value("${platform.oms.url.server}")
    private String omsUrl;

    @Value("${platform.oms.api.user.info}")
    private String getUserUrl;

    @Value("${platform.oms.system.secret}")
    private String secret;

    @Value("${platform.oms.system.key}")
    private String key;

    public UserResult getUserInfo(String token){
        UserInfo userInfo = null;

        Map<String, String> reqHeader = new HashMap<>();
        reqHeader.put("SystemKey",key);
        reqHeader.put("Secret",secret);

        UserResult userResult = new UserResult();
        Gson gson = new Gson();
        try{
            if(!token.isEmpty()){
                String response = (String) new HttpConnection().doPost(omsUrl.concat(getUserUrl), getHeader(), getUserParam(token));

                JsonParser parser = new JsonParser();
                JsonObject result = (JsonObject) parser.parse(response);
                JsonObject dataArr = result.getAsJsonObject("data");



                userResult.setUserName(dataArr.get("userName").getAsString());
                userResult.setToken(dataArr.get("token").getAsString());
                userResult.setLoginId(dataArr.get("loginId").getAsString());
                userResult.setUserType(dataArr.get("userType").getAsString());
                userResult.setCpNo(dataArr.get("mobile").getAsString());
            }

        }catch(Exception e){
            logger.error(e.getMessage(),e);
        }

        return userResult;
    }

    public Map<String, Object> getUserParam(String token) {
        HashMap hashMap = new HashMap<String, String>();
        hashMap.put("token", token);

        return hashMap;
    }

    public Map<String, String> getHeader() {
        HashMap hashMap = new HashMap<String, String>();
        hashMap.put("systemKey", key);
        hashMap.put("secret", secret);
        return hashMap;
    }
}
