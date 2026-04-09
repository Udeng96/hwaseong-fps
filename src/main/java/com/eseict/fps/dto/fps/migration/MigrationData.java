package com.eseict.fps.dto.fps.migration;


import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MigrationData {

    private String date;
    private List<MobilityData> mobility_data;
}
