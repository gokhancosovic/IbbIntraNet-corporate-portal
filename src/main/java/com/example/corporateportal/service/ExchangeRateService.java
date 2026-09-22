package com.example.corporateportal.service;

import com.example.corporateportal.dto.ExchangeRateDto;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class ExchangeRateService {

    private static final String TCMB_URL = "https://www.tcmb.gov.tr/kurlar/today.xml";

    public ExchangeRateDto getExchangeRates() {
        try {
            URL url = new URL(TCMB_URL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Mozilla/5.0"); // TCMB bazen varsayılan Java User-Agent'ı bloklayabilir

            try (InputStream stream = connection.getInputStream()) {
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                Document doc = builder.parse(stream);
                doc.getDocumentElement().normalize();

                NodeList currencyList = doc.getElementsByTagName("Currency");
                String usdRate = "--";
                String eurRate = "--";

                for (int i = 0; i < currencyList.getLength(); i++) {
                    Element el = (Element) currencyList.item(i);
                    String currencyCode = el.getAttribute("CurrencyCode");

                    if ("USD".equals(currencyCode)) {
                        usdRate = el.getElementsByTagName("ForexSelling").item(0).getTextContent();
                    } else if ("EUR".equals(currencyCode)) {
                        eurRate = el.getElementsByTagName("ForexSelling").item(0).getTextContent();
                    }
                }

                return ExchangeRateDto.builder()
                        .usd(usdRate)
                        .eur(eurRate)
                        .build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ExchangeRateDto.builder()
                    .usd("--")
                    .eur("--")
                    .build();
        }
    }
}