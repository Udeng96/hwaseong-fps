package com.eseict.fps.dto.fps.migration;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MigrationInfo {

    String fromId;
    String toId;
    String forName;
    String toName;
    String count;

    Object fromCoordinates;
    Object toCoordinates;

}
