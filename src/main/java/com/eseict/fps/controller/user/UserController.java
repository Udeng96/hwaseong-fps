package com.eseict.fps.controller.user;


import com.eseict.fps.service.user.OmsService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*")
@RequestMapping(value = "/user", produces = "application/json; charset=UTF-8;")
@RestController
@RequiredArgsConstructor
public class UserController {

    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    OmsService omsService;

    @GetMapping(value = "")
    public ResponseEntity getUser(
            @RequestParam String token
    ){
        ResponseEntity response ;
        try{
            response = ResponseEntity.ok(omsService.getUserInfo(token));
        }catch(Exception e){
            logger.error(e.getMessage(), e);
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error");
        }

        return response;
    }
}
