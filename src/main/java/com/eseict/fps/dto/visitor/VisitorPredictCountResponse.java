package com.eseict.fps.dto.visitor;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class VisitorPredictCountResponse {
    private VisitorPredictCountData[] visitorPredictCountData;
}
