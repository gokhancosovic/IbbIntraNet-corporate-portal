package com.corporateportal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeRateResponse {
    private String date;
    private List<CurrencyItem> items;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CurrencyItem {
        private String code;         // USD, EUR
        private String name;         // ABD DOLARI, EURO
        private Double buyingRate;   // Alış
        private Double sellingRate;  // Satış
    }
}