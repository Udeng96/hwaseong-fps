package com.eseict.fps.dto.visitor;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class VisitorPredictCountData {
    private Integer region;
    private Integer count;
    private Integer previous;
    private Integer predictLower;
    private Integer predictUpper;
}
