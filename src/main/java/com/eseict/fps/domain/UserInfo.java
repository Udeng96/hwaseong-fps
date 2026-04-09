package com.eseict.fps.domain;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "omsUserInfo", schema = "your_schema")
public class UserInfo {

    @Id
    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "CP_NO")
    private String cpNo;

    @Column(name = "DPT_ID")
    private String dptId;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "ENCRYPT_KEY")
    private String encryptKey;

    @Column(name = "EVENT_ROLE_ID")
    private String eventRoleId;

    @Column(name = "FIST_REG_DTM")
    private String fistRegDtm;

    @Column(name = "LOGIN_BLOCK_FLAG")
    private String loginBlockFlag;

    @Column(name = "LOGIN_TRY_COUNT")
    private String loginTryCount;

    @Column(name = "LST_LOGIN_DTM")
    private String lstLoginDtm;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "ROLE_ID")
    private String roleId;

    @Column(name = "SEOUL_USER_TYPE")
    private String seoulUserType;

    @Column(name = "SEOUL_USER_ZN")
    private String seoulUserZn;

    @Column(name = "USE_YN")
    private String useYn;

    @Column(name = "USER_LOGIN_ID")
    private String userLoginId;

    @Column(name = "USER_LOGIN_PSWD")
    private String userLoginPswd;

    @Column(name = "USER_NM")
    private String userNm;

    public UserInfo() {
    }

    public UserInfo(String userId, String cpNo, String dptId, String email, String encryptKey, String eventRoleId, String fistRegDtm, String loginBlockFlag, String loginTryCount, String lstLoginDtm, String phone, String roleId, String seoulUserType, String seoulUserZn, String useYn, String userLoginId, String userLoginPswd, String userNm) {
        this.userId = userId;
        this.cpNo = cpNo;
        this.dptId = dptId;
        this.email = email;
        this.encryptKey = encryptKey;
        this.eventRoleId = eventRoleId;
        this.fistRegDtm = fistRegDtm;
        this.loginBlockFlag = loginBlockFlag;
        this.loginTryCount = loginTryCount;
        this.lstLoginDtm = lstLoginDtm;
        this.phone = phone;
        this.roleId = roleId;
        this.seoulUserType = seoulUserType;
        this.seoulUserZn = seoulUserZn;
        this.useYn = useYn;
        this.userLoginId = userLoginId;
        this.userLoginPswd = userLoginPswd;
        this.userNm = userNm;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "userId='" + userId + '\'' +
                ", cpNo='" + cpNo + '\'' +
                ", dptId='" + dptId + '\'' +
                ", email='" + email + '\'' +
                ", encryptKey='" + encryptKey + '\'' +
                ", eventRoleId='" + eventRoleId + '\'' +
                ", fistRegDtm='" + fistRegDtm + '\'' +
                ", loginBlockFlag='" + loginBlockFlag + '\'' +
                ", loginTryCount='" + loginTryCount + '\'' +
                ", lstLoginDtm='" + lstLoginDtm + '\'' +
                ", phone='" + phone + '\'' +
                ", roleId='" + roleId + '\'' +
                ", seoulUserType='" + seoulUserType + '\'' +
                ", seoulUserZn='" + seoulUserZn + '\'' +
                ", useYn='" + useYn + '\'' +
                ", userLoginId='" + userLoginId + '\'' +
                ", userLoginPswd='" + userLoginPswd + '\'' +
                ", userNm='" + userNm + '\'' +
                '}';
    }
}

