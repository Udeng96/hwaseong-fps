package com.eseict.fps.dto.visitor;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VisitorCountResponse {
    private String region;
    private Integer count;

}
