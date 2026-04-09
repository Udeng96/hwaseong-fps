package com.eseict.fps.service.ssl;

import com.eseict.fps.dto.ssl.DeviceResponse;
import com.eseict.fps.dto.ssl.RegionResponse;
import com.eseict.fps.utill.HttpClientUtil;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.swing.plaf.synth.Region;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SslService {
    @Value("${api.ssl.device.url}")
    private String DVC_URL;
    @Value("${api.ssl.device.path}")
    private String DVC_PATH;
    @Value("${api.ssl.device.user}")
    private String DVC_USER;
    @Value("${api.ssl.device.pass}")
    private String DVC_PASS;
    @Value("${api.ssl.device.site_id}")
    private String DVC_SITE_ID;
    @Value("${api.ssl.device.authorization}")
    private String DVC_AUTH;

    private static Logger logger = LoggerFactory.getLogger(SslService.class);


    public List<DeviceResponse> getDeviceList(){

        List<DeviceResponse> lists = new ArrayList<>();

        Map<String, Object> param = new HashMap<>();
        Map<String, Object> header = new HashMap<>();

        String getDeviceUrl = DVC_URL+DVC_PATH;

        param.put("siteId",DVC_SITE_ID);
        param.put("user",DVC_USER);
        param.put("pass",DVC_PASS);

        header.put("Authorization",DVC_AUTH);

        String regionResponse = "" ;

        try{
            regionResponse = HttpClientUtil.httpsGet(getDeviceUrl, header, param);
            
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        Gson gson = new Gson();

        JsonArray regionResult = JsonParser.parseString(regionResponse).getAsJsonArray();
        List<RegionResponse.RegionResult> results = gson.fromJson(regionResult, new TypeToken<List<RegionResponse.RegionResult>>(){}.getType());


        for (RegionResponse.RegionResult result : results){
             DeviceResponse response = new DeviceResponse();

            String polygon = result.getPolygon().replace("POINT (", "");


            polygon = polygon.replace(")", "");
            polygon = polygon.replace(" ", ",");
            String[] coordinates = polygon.split(",");



             response.setDvcId(result.getId());
             response.setDvcNm(result.getName().split("\\(")[0]);
             response.setLocation("화성시 "+result.getName());
             if(!"".equals(polygon)){
                 response.setLat(coordinates[1]);
                 response.setLng(coordinates[0]);
             }else{
                 response.setLng("0.0");
                 response.setLng("0.0");
             }


             lists.add(response);

        }

        return lists;

    }




}
