package com.eseict.fps.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "")
public class ViewController {

    private static Logger logger = LoggerFactory.getLogger(ViewController.class);
    @RequestMapping(value = "/fps")
    public String fps(
            @RequestParam(required = false, defaultValue = "") String token,
            HttpSession session,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        String id = session.getId();
        session.setAttribute("token",token);
        session.setAttribute("__TOKEN__",token);

        Cookie cookie = new Cookie("token",token);

        response.addCookie(cookie);

        return "index";
    }

    @RequestMapping(value = "/ssl")
    public String ssl(
            @RequestParam(required = false, defaultValue = "") String token,
            HttpSession session,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        String id = session.getId();
        session.setAttribute("token",token);
        response.addCookie(new Cookie("token",token));

        return "index";
    }
}
