package com.uis.tallerSR.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateDto {
    @Size(min = 1, max = 100)
    private String name;
    @Size(min = 1, max = 500)
    private String description;
    @DecimalMin(value = "0.0")
    private BigDecimal price;
    @Min(value = 0)
    private Integer stock;
}
