package com.eseict.fps.dto.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserResult {
    private String token;
    private String userName;
    private String loginId;
    private String userType;
    private String cpNo;
}
