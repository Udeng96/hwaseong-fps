package com.eseict.fps.controller.fps;

import com.eseict.fps.dto.CctvResult;
import com.eseict.fps.dto.fps.migration.MigrationInfo;
import com.eseict.fps.dto.fps.RegionResult;
import com.eseict.fps.dto.fps.StayTimeInfo;
import com.eseict.fps.dto.visitor.VisitorPredictCountResponse;
import com.eseict.fps.dto.visitor.VisitorTotalCountResponse;
import com.eseict.fps.service.fps.FpsService;
import com.eseict.fps.utill.CommonUtil;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.lang.reflect.Type;


@CrossOrigin(value = "*")
@RequestMapping(value = "/fps", produces = "application/json; charset=UTF-8;")
@RestController
@RequiredArgsConstructor
public class FpsController {

    private final FpsService fpsService;

    private static Logger logger = LoggerFactory.getLogger(FpsController.class);



    @GetMapping(value = "/region")
    public String getRegionList() {
        List<RegionResult> regionInfo = fpsService.getRegionList();
        return new Gson().toJson(regionInfo);
    }

    @GetMapping(value = "/stayTime")
    public StayTimeInfo getStayTimeData(
            @RequestParam("startDtm") String startDtm,
            @RequestParam("endDtm") String endDtm
    ) {
        StayTimeInfo stayTimeInfo = fpsService.getStayTimeInfo(startDtm, endDtm);


        return stayTimeInfo;
    }

    @GetMapping(value = "/visitor")
    public List<VisitorTotalCountResponse> getVisitorTotalCount(
            @RequestParam(required = false) String startDtm,
            @RequestParam(required = false) String endDtm,
            @RequestParam(required = false) String latest
    ){
        List<VisitorTotalCountResponse> visitResponse = fpsService.getVisitorTotalCount(startDtm, endDtm, latest);
        return visitResponse;
    }
    @GetMapping(value = "/migration" )
    public List<MigrationInfo> getMigrationInfo(
            @RequestParam("startDtm") String startDtm,
            @RequestParam("endDtm") String endDtm
    ){

        List<MigrationInfo> result =  fpsService.getMigrationInfoList(startDtm,endDtm);
        return result;

    }

    @GetMapping(value = "/visitor/predictions")
    public List<VisitorPredictCountResponse> getVisitorPredictData(
            @RequestParam String type
    ){
        List<VisitorPredictCountResponse> visitorPredictCountResponses = fpsService.getVisitorPredictData(type);
        return visitorPredictCountResponses;
    }

    @GetMapping(value = "/cctv")
    public List<CctvResult> getCctvList(){
        Gson gson = new Gson();
        CommonUtil commonUtil = new CommonUtil();
        String data = commonUtil.getSampleData("/cctvData/cctvInfo.json");



        Type type = new TypeToken<List<CctvResult>>(){}.getType();
        List<CctvResult> result = gson.fromJson(data,type);
        List<CctvResult> newResult = new ArrayList<>();
        for(CctvResult cctv : result){
            String newCctvMgrNo = fpsService.getCctvMgrNo(cctv.getFacNm());
            if(!newCctvMgrNo.isEmpty()){
                cctv.setMgrNo(newCctvMgrNo);
            }
            newResult.add(cctv);
        }

        return newResult;
    }

    @GetMapping(value = "/cctv/mgrNo")
    public String getCctvMgrNo(
            @RequestParam(defaultValue = "")String cctvNm
    ){
        return fpsService.getCctvMgrNo(cctvNm);
    }

    @PostMapping(value = "/excelDownload")
    public void excelDownload(HttpServletResponse response){
        Workbook workbook = fpsService.excelDownload();

        response.addHeader("Content-Disposition", "attachment;filename=" + ".xlsx");
        response.addHeader("Content-Type", "application/vnd.ms-excel");
        response.addHeader("Content-Transfer-Encoding", "binary");
        response.setCharacterEncoding("UTF-8");

        try {
            workbook.write(response.getOutputStream());
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
