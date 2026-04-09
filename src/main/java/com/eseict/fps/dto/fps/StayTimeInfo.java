package com.eseict.fps.dto.fps;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StayTimeInfo {
    Double durFrom1To5M;
    Double durFrom5To10M;
    Double durFrom10To20M;
    Double durFrom20To40M;
    Double durFrom40To60M;
    Double durOver1H;
}
