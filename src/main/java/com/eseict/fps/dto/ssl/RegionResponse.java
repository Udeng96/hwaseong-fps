package com.eseict.fps.dto.ssl;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class RegionResponse {

    private List<RegionResult> data;

     public class RegionResult{
         private Integer id;
         private Integer siteId;
         private String name;
         private String description;
         private String polygon;
         private Integer minSignalStrength;
         private Double radius;
         private String associatedRegions;


         public RegionResult() {
         }

         public RegionResult(Integer id, Integer siteId, String name, String description, String polygon, Integer minSignalStrength, Double radius, String associatedRegions) {
             this.id = id;
             this.siteId = siteId;
             this.name = name;
             this.description = description;
             this.polygon = polygon;
             this.minSignalStrength = minSignalStrength;
             this.radius = radius;
             this.associatedRegions = associatedRegions;
         }

         public Integer getId() {
             return id;
         }

         public void setId(Integer id) {
             this.id = id;
         }

         public Integer getSiteId() {
             return siteId;
         }

         public void setSiteId(Integer siteId) {
             this.siteId = siteId;
         }

         public String getName() {
             return name;
         }

         public void setName(String name) {
             this.name = name;
         }

         public String getDescription() {
             return description;
         }

         public void setDescription(String description) {
             this.description = description;
         }

         public String getPolygon() {
             return polygon;
         }

         public void setPolygon(String polygon) {
             this.polygon = polygon;
         }

         public Integer getMinSignalStrength() {
             return minSignalStrength;
         }

         public void setMinSignalStrength(Integer minSignalStrength) {
             this.minSignalStrength = minSignalStrength;
         }

         public Double getRadius() {
             return radius;
         }

         public void setRadius(Double radius) {
             this.radius = radius;
         }

         public String getAssociatedRegions() {
             return associatedRegions;
         }

         public void setAssociatedRegions(String associatedRegions) {
             this.associatedRegions = associatedRegions;
         }

         @Override
         public String toString() {
             return "RegionResult{" +
                     "id=" + id +
                     ", siteId=" + siteId +
                     ", name='" + name + '\'' +
                     ", description='" + description + '\'' +
                     ", polygon='" + polygon + '\'' +
                     ", minSignalStrength=" + minSignalStrength +
                     ", radius=" + radius +
                     ", associatedRegions='" + associatedRegions + '\'' +
                     '}';
         }
     }



}
