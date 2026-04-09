package com.eseict.fps.dto.visitor;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class VisitorPreviousResponse {
    private Integer day;
    private Integer week;
    private Integer month;
    private Integer year;
}
