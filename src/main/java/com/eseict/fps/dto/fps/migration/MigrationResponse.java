package com.eseict.fps.dto.fps.migration;

import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MigrationResponse {
    private List<MigrationData> data;

}
