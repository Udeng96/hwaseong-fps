package com.eseict.fps.service.fps;

import com.eseict.fps.dao.FacDao;
import com.eseict.fps.dto.fps.GisVo;
import com.eseict.fps.dto.fps.migration.MigrationData;
import com.eseict.fps.dto.fps.migration.MigrationInfo;
import com.eseict.fps.dto.fps.RegionResult;
import com.eseict.fps.dto.fps.StayTimeInfo;
import com.eseict.fps.dto.fps.migration.MigrationResponse;
import com.eseict.fps.dto.fps.migration.MobilityData;
import com.eseict.fps.dto.visitor.*;
import com.eseict.fps.utill.HttpClientUtil;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.eseict.fps.config.BjConstant.ExcelDataTypeMonth;
import static com.eseict.fps.config.BjConstant.ExcelDataTypeWeek;

@Service
public class FpsService {

    // 외부 API 요청시 IP, HOST
    @Value("${api.url.floating.population.ip_host}")
    private String POPULATION_AVERAGE_IP_HOST;

    // 평균 체류시간 (AverageDuration) URL
    @Value("${api.url.floating.population.averageDuration_path}")
    private String POPULATION_AVERAGE_DURATION_PATH;

    @Value("${api.url.floating.population.mobility_path}")
    private String POPULATION_PERCENT;

    @Value("${api.url.floating.population.resolution}")
    private String POPULATION_RESOLUTION;

    @Value("${api.url.floating.population.resolution_by_hours}")
    private String POPULATION_RESOLUTION_BY_HOURS;

    // 외부 API 사이트 ID, 토큰
    @Value("${api.url.floating.population.site_id}")
    private String POPULATION_SITE_ID;
    @Value("${api.url.floating.population.num_sequence}")
    private String NUM_SEQ;
    @Value("${api.url.floating.population.site_id_token}")
    private String POPULATION_SITE_TOKEN;

    //평균 방문객수 (VisitorCount)
    @Value("${api.url.floating.population.visitorCount_path}")
    private String POPULATION_AVERAGE_VISITOR_COUNT_PATH;

    private static Logger logger = LoggerFactory.getLogger(FpsService.class);

    // 유저 아이디
    @Value("${api.url.floating.population.user}")
    private String POPULATION_USER;

    // 유저 비밀번호
    @Value("${api.url.floating.population.pass}")
    private String POPULATION_PASS;

    // 지역 조회 URL
    @Value("${api.url.floating.population.region_url}")
    private String POPULATION_REGION_URL;

    // 방문객 예측 데이터 URL
    @Value("${api.url.floating.population.analytics_visitorCount_path}")
    private String POPULATION_VISITOR_PREDICT_PATH;


    @Autowired
    FacDao facDao;


    public StayTimeInfo getStayTimeInfo(String startDtm, String endDtm) {
        StayTimeInfo stayTimeInfo = new StayTimeInfo();
        JsonArray averageArr = getStayAverageData(startDtm, endDtm);
        JsonArray totalCountArr = getVisitorCount(startDtm, endDtm);

        int arrSize = averageArr.size();
        int durFrom1To5M = 0;
        int durFrom5To10M = 0;
        int durFrom10To20M = 0;
        int durFrom20To40M = 0;
        int durFrom40To60M = 0;
        int durOver1H = 0;
        int totalCount = 0;


        for (int arrIndex = 0; arrIndex < arrSize; arrIndex++) {
            JsonArray currentArr = averageArr.get(arrIndex).getAsJsonObject().get("region_data").getAsJsonArray();
            JsonArray currentCountArr = totalCountArr.get(arrIndex).getAsJsonObject().get("region_data").getAsJsonArray();

            int currentArrSize = currentArr.size();

            for (int currentArrIndex = 0; currentArrIndex < currentArrSize; currentArrIndex++) {
                JsonObject currentAvgObj = currentArr.get(currentArrIndex).getAsJsonObject();
                JsonObject currentCountObj = currentCountArr.get(currentArrIndex).getAsJsonObject();
                String regionId = currentAvgObj.get("region").getAsString();
                int duration = currentAvgObj.get("average_duration").getAsInt();
                int count = currentCountObj.get("count").getAsInt();

                if (duration >= 0 && duration < 300) {
                    durFrom1To5M += count;
                } else if (duration >= 300 && duration < 600) {
                    durFrom5To10M += count;
                } else if (duration >= 600 && duration < 1200) {
                    durFrom10To20M += count;
                } else if (duration >= 1200 && duration < 2400) {
                    durFrom20To40M += count;
                } else if (duration >= 2400 && duration < 3600) {
                    durFrom40To60M += count;
                } else if (duration >= 3600) {
                    durOver1H += count;
                }

                totalCount += count;
            }


        }

        Double perDurFrom1To5M = Double.valueOf(durFrom1To5M) / totalCount * 100;
        Double perDurFrom5To10M = Double.valueOf(durFrom5To10M) / totalCount * 100;
        Double perDurFrom10To20M = Double.valueOf(durFrom10To20M) / totalCount * 100;
        Double perDurFrom20To40M = Double.valueOf(durFrom20To40M) / totalCount * 100;
        Double perDurFrom40To60M = Double.valueOf(durFrom40To60M) / totalCount * 100;
        Double perDurOver1H = Double.valueOf(durOver1H) / totalCount * 100;


        stayTimeInfo.setDurFrom1To5M(perDurFrom1To5M);
        stayTimeInfo.setDurFrom5To10M(perDurFrom5To10M);
        stayTimeInfo.setDurFrom10To20M(perDurFrom10To20M);
        stayTimeInfo.setDurFrom20To40M(perDurFrom20To40M);
        stayTimeInfo.setDurFrom40To60M(perDurFrom40To60M);
        stayTimeInfo.setDurOver1H(perDurOver1H);


        return stayTimeInfo;
    }

    public JsonArray getVisitorCount(String startDtm, String endDtm) {

        Map<String, Object> headerParam = new HashMap<>();
        Map<String, Object> param = new HashMap<>();

        param.put("siteId", POPULATION_SITE_ID);
        param.put("resolution", POPULATION_RESOLUTION);
        param.put("start_time", startDtm + "T00:00:00");
        param.put("end_time", endDtm + "T23:59:59");

        headerParam.put("Authorization", POPULATION_SITE_TOKEN);

        String response = "";

        JsonArray dataArr = new JsonArray();
        try {
            response = HttpClientUtil.httpsGet(POPULATION_AVERAGE_IP_HOST +
                    POPULATION_AVERAGE_VISITOR_COUNT_PATH, headerParam, param);
            JsonParser parser = new JsonParser();
            JsonObject result = (JsonObject) parser.parse(response);
            dataArr = result.getAsJsonArray("data");

        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataArr;
    }

    private JsonArray getStayAverageData(String startDtm, String endDtm) {
        Map<String, Object> headerParam = new HashMap<>();
        Map<String, Object> param = new HashMap<>();

        param.put("siteId", POPULATION_SITE_ID);
        param.put("resolution", POPULATION_RESOLUTION);
        param.put("start_time", startDtm + "T00:00:00");
        param.put("end_time", endDtm + "T23:59:59");

        headerParam.put("Authorization", POPULATION_SITE_TOKEN);


        String response = "";

        JsonArray dataArr = new JsonArray();
        try {
            response = HttpClientUtil.httpsGet(POPULATION_AVERAGE_IP_HOST +
                    POPULATION_AVERAGE_DURATION_PATH, headerParam, param);
            JsonParser parser = new JsonParser();
            JsonObject result = (JsonObject) parser.parse(response);
            dataArr = result.getAsJsonArray("data");

        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataArr;
    }

    public List<VisitorTotalCountResponse> getVisitorTotalCount(String startDtm, String endDtm, String latest) {
        List<VisitorTotalCountResponse> responses = new ArrayList<>();
        Map<String, Object> headerParam = new HashMap<>();
        Map<String, Object> param = new HashMap<>();

        param.put("siteId", POPULATION_SITE_ID);
        if (Strings.isNullOrEmpty(latest)) {
            param.put("resolution", POPULATION_RESOLUTION);
            param.put("start_time", startDtm + "T00:00:00");
            param.put("end_time", endDtm + "T23:59:59");
        } else {
            param.put("resolution", POPULATION_RESOLUTION_BY_HOURS);
            param.put("user", POPULATION_USER);
            param.put("pass", POPULATION_PASS);
        }

        headerParam.put("Authorization", POPULATION_SITE_TOKEN);

        JsonArray dataArr = new JsonArray();

        try {
            String response = HttpClientUtil.httpsGet(POPULATION_AVERAGE_IP_HOST +
                    POPULATION_AVERAGE_VISITOR_COUNT_PATH, headerParam, param);
            JsonParser parser = new JsonParser();
            JsonObject result = (JsonObject) parser.parse(response);
            dataArr = result.getAsJsonArray("data");
            int arrSize = dataArr.size();
            for (int arrIndex = 0; arrIndex < arrSize; arrIndex++) {
                JsonArray currentArr = dataArr.get(arrIndex).getAsJsonObject().get("region_data").getAsJsonArray();
                int currentArrSize = currentArr.size();
                int totalCount = 0;
                List<VisitorCountResponse> visitorCountResponses = new ArrayList<>();

                for (int currentArrIndex = 0; currentArrIndex < currentArrSize; currentArrIndex++) {
                    JsonObject currentAvgObj = currentArr.get(currentArrIndex).getAsJsonObject();
                    String region = currentAvgObj.get("region").getAsString();

                    int count = currentAvgObj.get("count").getAsInt();
                    if (count > 0 && !region.equals("0")) {
                        totalCount += count;
                    }

                    VisitorCountResponse visitorCountResponse = new VisitorCountResponse(region, count);
                    visitorCountResponses.add(visitorCountResponse);
                }

                VisitorTotalCountResponse responseObj = new VisitorTotalCountResponse();
                responseObj.setVisitorCountResponse(visitorCountResponses.toArray(new VisitorCountResponse[0]));
                responseObj.setTotalCount(totalCount);
                responses.add(responseObj);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return responses;
    }

    public List<RegionResult> getRegionList() {
        Map<String, Object> param = new HashMap<>();
        Map<String, Object> headerParam = new HashMap<>();
        param.put("user", POPULATION_USER);
        param.put("pass", POPULATION_PASS);
        param.put("siteId", POPULATION_SITE_ID);
        String response = HttpClientUtil.httpsGet(POPULATION_AVERAGE_IP_HOST + POPULATION_REGION_URL, headerParam, param);

        List<RegionResult> regionInfos = new ArrayList<>();

        JsonArray result = JsonParser.parseString(response).getAsJsonArray();
        int regionSize = result.size();

        for (int regionIndex = 0; regionIndex < regionSize; regionIndex++) {
            JsonObject region = result.get(regionIndex).getAsJsonObject();
            String regionId = region.get("id").getAsString();
            String polygon = region.get("polygon").getAsString().replace("POINT (", "");

            polygon = polygon.replace(")", "");
            polygon = polygon.replace(" ", ",");

            String[] coordinates = polygon.split(",");
            String name = region.get("name").getAsString();

            RegionResult regionInfo = new RegionResult();

            regionInfo.setRegionId(regionId);
            regionInfo.setName(name);


            if (!"".equals(polygon)) {
                regionInfo.setGisY(coordinates[1]);
                regionInfo.setGisX(coordinates[0]);
            } else {
                regionInfo.setGisY("0.0");
                regionInfo.setGisX("0,0");
            }


            regionInfos.add(regionInfo);


        }

        return regionInfos;
    }

    public List<VisitorPredictCountResponse> getVisitorPredictData(String type) {
        Map<String, Object> param = new HashMap<>();
        Map<String, Object> headerParam = new HashMap<>();

        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime agoDate;

        if (type.isEmpty()) {
            agoDate = currentDate.minusDays(1);
        } else if (type.equals(ExcelDataTypeWeek)) {
            agoDate = currentDate.minusWeeks(1);
        } else {
            agoDate = currentDate.minusMonths(1);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        String formattedCurrentDate = currentDate.format(formatter);
        String formattedOneMonthAgoDate = agoDate.format(formatter);


        param.put("user", POPULATION_USER);
        param.put("pass", POPULATION_PASS);
        param.put("siteId", POPULATION_SITE_ID);
        param.put("resolution", POPULATION_RESOLUTION);
        param.put("predictions", true);
        param.put("start_time", formattedOneMonthAgoDate);
        param.put("end_time", formattedCurrentDate);
        String url = POPULATION_AVERAGE_IP_HOST + POPULATION_VISITOR_PREDICT_PATH + type;

        String response = HttpClientUtil.httpsGet(url, headerParam, param);

        List<VisitorPredictCountResponse> visitorPredictCountResponses = new ArrayList<>();
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = parser.parse(response).getAsJsonObject();
        JsonArray dataArray = jsonObject.getAsJsonArray("data");


        for (int i = 0; i < dataArray.size(); i++) {
            JsonObject dataObject = dataArray.get(i).getAsJsonObject();
            JsonArray regionDataArray = dataObject.getAsJsonArray("region_data");
            VisitorPredictCountData[] visitorPredictCountDataArray = new VisitorPredictCountData[regionDataArray.size()];

            for (int j = 0; j < regionDataArray.size(); j++) {
                JsonObject regionDataObject = regionDataArray.get(j).getAsJsonObject();
                int region = regionDataObject.get("region").getAsInt();
                int count = regionDataObject.get("count").getAsInt();

                if (i == 0) {
                    visitorPredictCountDataArray[j] = VisitorPredictCountData.builder()
                            .region(region)
                            .previous(count)
                            .build();
                } else {
                    int lowerPrediction = regionDataObject.getAsJsonObject("predictions").get("lower").getAsInt();
                    int upperPrediction = regionDataObject.getAsJsonObject("predictions").get("upper").getAsInt();
                    int previous = visitorPredictCountResponses.get(0).getVisitorPredictCountData()[j].getPrevious();

                    VisitorPredictCountData visitorPredictCountData = VisitorPredictCountData.builder()
                            .region(region)
                            .count(count)
                            .previous(previous)
                            .predictLower(lowerPrediction)
                            .predictUpper(upperPrediction)
                            .build();

                    visitorPredictCountDataArray[j] = visitorPredictCountData;
                }
            }
            VisitorPredictCountResponse visitorPredictCountResponse = new VisitorPredictCountResponse();
            visitorPredictCountResponse.setVisitorPredictCountData(visitorPredictCountDataArray);
            visitorPredictCountResponses.add(visitorPredictCountResponse);

        }
        // previous 값 뽑아내기용 데이터 삭제
        visitorPredictCountResponses.remove(0);
        return visitorPredictCountResponses;
    }

    public List<MigrationInfo> getMigrationInfoList(
            String startDtm, String endDtm
    ) {

        List<MigrationInfo> migrationInfos = Lists.newArrayList();

        try {
            List<MigrationData> dataArray = getMobilityAnalytics(startDtm, endDtm);
            Map<String, Map<String, List<MobilityData>>> dateMigrationMap = new HashMap<>();


            int dataArraySize = dataArray.size();


            for (int i = 0; i < dataArraySize; i++) {

                MigrationData migrationData = dataArray.get(i);
                String date = migrationData.getDate();
                List<MobilityData> mobilityDataList = migrationData.getMobility_data();
                int mobilityDataListSize = mobilityDataList.size();


                // 시작 지점이 key 인 map
                // 시작 지점이 같은 data 를 묶어놓기 위해
                Map<String, List<MobilityData>> fromMigrationMap = new HashMap<>();

                // 날짜가 key 인 map
                // 해당날짜에 특정 지역에서 이동한 data list
                for (int j = 0; j < mobilityDataListSize; j++) {

                    MobilityData mobilityData = mobilityDataList.get(j);
                    List<Integer> patternList = mobilityData.getPattern();
                    String fromRegion = patternList.get(0).toString();

                    boolean isContain = fromMigrationMap.containsKey(fromRegion);

                    // 시작 지점이 이미 존재한다면
                    if (isContain) {

                        // 시작지점이 fromRegion 의 dataList 가져오기
                        List<MobilityData> currentFromMobility = fromMigrationMap.get(fromRegion);
                        // 시작지점이 fromRegion 인 데이터 리스트에 현 데이터 추가
                        currentFromMobility.add(mobilityData);

                        // 이전 데이터리스트 그냥 제거해버리고
                        fromMigrationMap.remove(fromRegion);

                        // 새로운 데이터 리스트로 다시 넣는다.
                        fromMigrationMap.put(fromRegion, currentFromMobility);
                    } else {

                        // 없을 경우 새로운 리스트를 생성해서 넣어준다.

                        List<MobilityData> newFromMobilityList = Lists.newArrayList();

                        newFromMobilityList.add(mobilityData);

                        fromMigrationMap.put(fromRegion, newFromMobilityList);

                    }
                }

                // 데이터 추가
                dateMigrationMap.put(date, fromMigrationMap);
            }

            // 지역 리스트 구하기
            List<RegionResult> regionResultList = getRegionList();
            Map<String, RegionResult> regionMap = new HashMap<>();

            for (int i = 0; i < regionResultList.size(); i++) {

                regionMap.put(regionResultList.get(i).getRegionId(), regionResultList.get(i));
            }

            List<String> keyList = dateMigrationMap.keySet().stream().collect(Collectors.toList());

            for (String date : keyList) {
                Map<String, List<MobilityData>> mobilityDataMap = dateMigrationMap.get(date);

                List<String> mobilityKeyList = new ArrayList<>(mobilityDataMap.keySet());

                mobilityKeyList = mobilityKeyList.stream().sorted().collect(Collectors.toList());


                for (String region : mobilityKeyList) {
                    List<MobilityData> mobilityDataList = mobilityDataMap.get(region);

                    for (MobilityData mobilityData : mobilityDataList) {

                        MigrationInfo migrationInfo = new MigrationInfo();

                        String fromId = regionMap.get(region).getRegionId();
                        String toId = regionMap.get(mobilityData.getPattern().get(1).toString()).getRegionId();
                        String fromRegion = regionMap.get(region).getName();
                        String toRegion = regionMap.get(mobilityData.getPattern().get(1).toString()).getName();
                        String fromGisX = regionMap.get(region).getGisX();
                        String fromGisY = regionMap.get(region).getGisY();
                        String toGisX = regionMap.get(mobilityData.getPattern().get(1).toString()).getGisX();
                        String toGisY = regionMap.get(mobilityData.getPattern().get(1).toString()).getGisY();

                        migrationInfo.setFromId(fromId);
                        migrationInfo.setToId(toId);
                        migrationInfo.setForName(fromRegion);
                        migrationInfo.setToName(toRegion);
                        migrationInfo.setCount(mobilityData.getCount().toString());
                        migrationInfo.setToCoordinates(new GisVo(Double.parseDouble(fromGisX), Double.parseDouble(fromGisY)));
                        migrationInfo.setFromCoordinates(new GisVo(Double.parseDouble(toGisX), Double.parseDouble(toGisY)));


                        migrationInfos.add(migrationInfo);
                    }
                }
            }


        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return migrationInfos;
    }


    public List<MigrationData> getMobilityAnalytics(String startTime, String endTime) {
        String url = POPULATION_AVERAGE_IP_HOST + POPULATION_PERCENT;

        Map<String, Object> reqParam = new HashMap<>();
        reqParam.put("siteId", POPULATION_SITE_ID);
        reqParam.put("start_time", startTime);
        reqParam.put("end_time", endTime);
        reqParam.put("num_sequence", NUM_SEQ);


        Map<String, Object> reqHeader = new HashMap<>();
        reqHeader.put("Authorization", POPULATION_SITE_TOKEN);

        String response;

        response = HttpClientUtil.httpsGet(url, reqHeader, reqParam);
        Gson gson = new Gson();

        MigrationResponse data = gson.fromJson(response, new TypeToken<MigrationResponse>() {
        }.getType());
        List<MigrationData> dataArr = data.getData();
        return dataArr;
    }

    public JsonArray getTotalCount(String startTime, String endTime) {
        StringBuffer url = new StringBuffer();
        url.append(POPULATION_AVERAGE_IP_HOST);
        url.append(POPULATION_AVERAGE_VISITOR_COUNT_PATH);

        Map<String, Object> reqParma = new HashMap<>();

        reqParma.put("site_id", POPULATION_SITE_ID);
        reqParma.put("resolution", "days");
        reqParma.put("start_time", startTime + "T00:00:00");
        reqParma.put("end_time", endTime + "T23:59:59");

        Map<String, Object> reqHeader = new HashMap<>();
        reqHeader.put("Authorization", POPULATION_SITE_TOKEN);

        String response = "";
        JsonArray dataArr = new JsonArray();

        try {
            response = HttpClientUtil.httpsGet(url.toString(), reqHeader, reqParma);
            JsonParser parser = new JsonParser();
            JsonObject result = (JsonObject) parser.parse(response);
            dataArr = result.getAsJsonArray("data");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return dataArr;
    }

    public String getCctvMgrNo(String facNm){

        return facDao.getCctvMgrNo(facNm);
    }

    public Workbook excelDownload() {
        List<VisitorPredictCountResponse> visitorPreviousDay = getVisitorPredictData("");
        List<VisitorPredictCountResponse> visitorPreviousWeek = getVisitorPredictData(ExcelDataTypeWeek);
        List<VisitorPredictCountResponse> visitorPreviousMonth = getVisitorPredictData(ExcelDataTypeMonth);

        Workbook workbook = new XSSFWorkbook();

        Sheet sheetPreviousDay = workbook.createSheet("일별 통계");
        Sheet sheetPreviousWeek = workbook.createSheet("주별 통계");
        Sheet sheetPreviousMonth = workbook.createSheet("월별 통계");

        sheetPreviousDay.setColumnWidth(0, 512 * 15);
        sheetPreviousWeek.setColumnWidth(0, 512 * 15);
        sheetPreviousMonth.setColumnWidth(0, 512 * 15);

        for(int i = 1; i < 4; i++){
            sheetPreviousDay.setColumnWidth(i, 278 * 15);
            sheetPreviousWeek.setColumnWidth(i, 278 * 15);
            sheetPreviousMonth.setColumnWidth(i, 278 * 15);
        }

        CellStyle cellCenter = workbook.createCellStyle();
        cellCenter.setAlignment(HorizontalAlignment.CENTER);
        cellCenter.setVerticalAlignment(VerticalAlignment.CENTER);

        List<RegionResult> regionList = getRegionList();


        int row = 1;
        for (int i =0; i < regionList.size()-1; i++){
            Row sheetRow = sheetPreviousDay.createRow(row);
            sheetRow.createCell(0).setCellValue(regionList.get(i).getName());
            sheetRow.getCell(0).setCellStyle(cellCenter);

            sheetRow = sheetPreviousWeek.createRow(row);
            sheetRow.createCell(0).setCellValue(regionList.get(i).getName());
            sheetRow.getCell(0).setCellStyle(cellCenter);

            sheetRow = sheetPreviousMonth.createRow(row);
            sheetRow.createCell(0).setCellValue(regionList.get(i).getName());
            sheetRow.getCell(0).setCellStyle(cellCenter);

            row++;
        }

        Row headerRow = sheetPreviousDay.createRow(0);
        headerRow.createCell(0).setCellValue("지역");
        headerRow.getCell(0).setCellStyle(cellCenter);
        headerRow.createCell(1).setCellValue("금일");
        headerRow.getCell(1).setCellStyle(cellCenter);
        headerRow.createCell(2).setCellValue("전일");
        headerRow.getCell(2).setCellStyle(cellCenter);
        headerRow.createCell(3).setCellValue("익일");
        headerRow.getCell(3).setCellStyle(cellCenter);

        headerRow = sheetPreviousWeek.createRow(0);
        headerRow.createCell(0).setCellValue("지역");
        headerRow.getCell(0).setCellStyle(cellCenter);
        headerRow.createCell(1).setCellValue("금주");
        headerRow.getCell(1).setCellStyle(cellCenter);
        headerRow.createCell(2).setCellValue("전주");
        headerRow.getCell(2).setCellStyle(cellCenter);
        headerRow.createCell(3).setCellValue("차주");
        headerRow.getCell(3).setCellStyle(cellCenter);

        headerRow = sheetPreviousMonth.createRow(0);
        headerRow.createCell(0).setCellValue("지역");
        headerRow.getCell(0).setCellStyle(cellCenter);
        headerRow.createCell(1).setCellValue("금월");
        headerRow.getCell(1).setCellStyle(cellCenter);
        headerRow.createCell(2).setCellValue("전월");
        headerRow.getCell(2).setCellStyle(cellCenter);
        headerRow.createCell(3).setCellValue("익월");
        headerRow.getCell(3).setCellStyle(cellCenter);

        row = 1;
        for (int i = 0; i < visitorPreviousDay.size(); i++) {
            VisitorPredictCountResponse data = visitorPreviousDay.get(i);
            VisitorPredictCountData[] dataList = data.getVisitorPredictCountData();
            for (int j = 1; j < dataList.length; j++) {
                VisitorPredictCountData countData = dataList[j];

                Row sheetRow = sheetPreviousDay.getRow(row + j -1);
                if (sheetRow == null) {
                    sheetRow = sheetPreviousDay.createRow(row + j -1);
                }
                sheetRow.createCell(1).setCellValue(countData.getCount()+"(명)");
                sheetRow.getCell(1).setCellStyle(cellCenter);
                sheetRow.createCell(2).setCellValue(countData.getPrevious()+"(명)");
                sheetRow.getCell(2).setCellStyle(cellCenter);
                sheetRow.createCell(3).setCellValue(countData.getPredictUpper()+"(명)");
                sheetRow.getCell(3).setCellStyle(cellCenter);
            }
            row += dataList.length;
        }

//        row = 1;
//        for (VisitorPredictCountResponse data : visitorPreviousDay) {
//            VisitorPredictCountData[] dataList = data.getVisitorPredictCountData();
//            for (int i = 0; i < dataList.length; i++) {
//                VisitorPredictCountData countData = dataList[i];
//
//                Row sheetRow = sheetPreviousDay.getRow(row + i);
//                if (sheetRow == null) {
//                    sheetRow = sheetPreviousDay.createRow(row + i);
//                }
//                sheetRow.createCell(1).setCellValue(countData.getCount());
//                sheetRow.createCell(2).setCellValue(countData.getPrevious());
//                sheetRow.createCell(3).setCellValue(countData.getPredictUpper());
//            }
//            row += dataList.length;
//        }

        row = 1;
        for (int i = 0; i < visitorPreviousWeek.size(); i++) {
            VisitorPredictCountResponse data = visitorPreviousWeek.get(i);
            VisitorPredictCountData[] dataList = data.getVisitorPredictCountData();
            for (int j = 1; j < dataList.length; j++) {
                VisitorPredictCountData countData = dataList[j];

                Row sheetRow = sheetPreviousWeek.getRow(row + j -1);
                if (sheetRow == null) {
                    sheetRow = sheetPreviousWeek.createRow(row + j -1);
                }
                sheetRow.createCell(1).setCellValue(countData.getCount()+"(명)");
                sheetRow.getCell(1).setCellStyle(cellCenter);
                sheetRow.createCell(2).setCellValue(countData.getPrevious()+"(명)");
                sheetRow.getCell(2).setCellStyle(cellCenter);
                sheetRow.createCell(3).setCellValue(countData.getPredictUpper()+"(명)");
                sheetRow.getCell(3).setCellStyle(cellCenter);
            }
            row += dataList.length;
        }


//        row = 1;
//        for (VisitorPredictCountResponse data : visitorPreviousWeek) {
//            VisitorPredictCountData[] dataList = data.getVisitorPredictCountData();
//            for (int i = 0; i < dataList.length; i++) {
//                VisitorPredictCountData countData = dataList[i];
//
//                Row sheetRow = sheetPreviousWeek.getRow(row + i);
//                if (sheetRow == null) {
//                    sheetRow = sheetPreviousWeek.createRow(row + i);
//                }
//                sheetRow.createCell(1).setCellValue(countData.getCount());
//                sheetRow.createCell(2).setCellValue(countData.getPrevious());
//                sheetRow.createCell(3).setCellValue(countData.getPredictUpper());
//            }
//            row += dataList.length;
//        }


        row = 1;
        for (int i = 0; i < visitorPreviousMonth.size(); i++) {
            VisitorPredictCountResponse data = visitorPreviousMonth.get(i);
            VisitorPredictCountData[] dataList = data.getVisitorPredictCountData();
            for (int j = 1; j < dataList.length; j++) {
                VisitorPredictCountData countData = dataList[j];

                Row sheetRow = sheetPreviousMonth.getRow(row + j -1);
                if (sheetRow == null) {
                    sheetRow = sheetPreviousMonth.createRow(row + j -1);
                }
                sheetRow.createCell(1).setCellValue(countData.getCount()+"(명)");
                sheetRow.getCell(1).setCellStyle(cellCenter);
                sheetRow.createCell(2).setCellValue(countData.getPrevious()+"(명)");
                sheetRow.getCell(2).setCellStyle(cellCenter);
                sheetRow.createCell(3).setCellValue(countData.getPredictUpper()+"(명)");
                sheetRow.getCell(3).setCellStyle(cellCenter);
            }
            row += dataList.length;
        }

//        row = 1;
//        for (VisitorPredictCountResponse data : visitorPreviousMonth) {
//            VisitorPredictCountData[] dataList = data.getVisitorPredictCountData();
//            for (int i = 0; i < dataList.length; i++) {
//                VisitorPredictCountData countData = dataList[i];
//
//                Row sheetRow = sheetPreviousMonth.getRow(row + i);
//                if (sheetRow == null) {
//                    sheetRow = sheetPreviousMonth.createRow(row + i);
//                }
//                sheetRow.createCell(1).setCellValue(countData.getCount());
//                sheetRow.createCell(2).setCellValue(countData.getPrevious());
//                sheetRow.createCell(3).setCellValue(countData.getPredictUpper());
//            }
//            row += dataList.length;
//        }


        return workbook;
    }
}
