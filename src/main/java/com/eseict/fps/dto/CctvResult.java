package com.eseict.fps.dto;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class CctvResult {
    private String facId;
    private String facNm;
    private String addr;
    private Double lat;
    private Double lng;
    private String clfyCd;
    private String clfyNm;
    private Integer useYn;
    private String data;
    private String mgrNo;
}
