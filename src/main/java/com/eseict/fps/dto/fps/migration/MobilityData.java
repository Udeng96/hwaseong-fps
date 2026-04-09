package com.eseict.fps.dto.fps.migration;

import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MobilityData {
    private List<Integer> pattern;
    private Integer count;
    private Integer unique_count;
    private Integer percentage;
    private Integer unique_percentage;
}
