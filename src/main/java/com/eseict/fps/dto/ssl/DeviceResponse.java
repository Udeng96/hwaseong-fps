package com.eseict.fps.dto.ssl;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class DeviceResponse {

    Integer dvcId;
    String dvcNm;
    String location;
    String lat;
    String lng;

}
