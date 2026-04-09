package com.eseict.fps.controller.ssl;

import ch.qos.logback.core.boolex.EvaluationException;
import com.eseict.fps.dto.ssl.DeviceResponse;
import com.eseict.fps.service.ssl.SslService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(value = "*")
@RequestMapping(value = "/ssl", produces = "application/json; charset=UTF-8;")
@RestController
@RequiredArgsConstructor
public class SslController {

    @Autowired
    SslService sslService;

    @GetMapping(value = "/device")
    public List<DeviceResponse> getDeviceList(){
        List<DeviceResponse> response = sslService.getDeviceList();

        return response;
    }
}
