package com.uis.tallerSR.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreateDto {
    @NotBlank
    @Size(min = 1, max = 100)
    private String name;
    @NotBlank
    @Size(min = 1, max = 500)
    private String description;
    @NotNull
    @DecimalMin(value = "0.0")
    private BigDecimal price;
    @NotNull
    @Min(value = 0)
    private Integer stock;
}
