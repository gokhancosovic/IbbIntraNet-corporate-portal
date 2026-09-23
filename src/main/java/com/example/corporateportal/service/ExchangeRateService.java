package com.example.corporateportal.service;

import com.example.corporateportal.dto.CreateReservationRequest;
import com.example.corporateportal.dto.ExchangeRateDto;
import com.example.corporateportal.dto.MeetingReservationResponse;
import com.example.corporateportal.entity.MeetingReservation;
import com.example.corporateportal.exception.BusinessException;
import com.example.corporateportal.repository.MeetingReservationRepository;
import lombok.RequiredArgsConstructor;
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

    @Service
    @RequiredArgsConstructor
    public static class MeetingReservationService {

        private final MeetingReservationRepository reservationRepository;

        public MeetingReservationResponse createReservation(CreateReservationRequest request) {

            // 1. İş Kuralı: Bitiş saati başlangıçtan önce olamaz
            if (request.getEndTime().isBefore(request.getStartTime())) {
                throw new BusinessException("Toplantı bitiş saati başlangıç saatinden önce olamaz!");
            }

            // 2. İş Kuralı: Seçilen salonda o saat aralığında çakışma var mı?
            boolean isConflict = reservationRepository.existsConflict(
                    request.getRoomName(),
                    request.getReservationDate(),
                    request.getStartTime(),
                    request.getEndTime()
            );

            if (isConflict) {
                throw new BusinessException("Seçilen saat aralığında bu salon doludur. Lütfen başka bir saat seçiniz.");
            }

            // Entity'e dönüştür ve kaydet
            MeetingReservation reservation = mapToEntity(request);
            MeetingReservation savedReservation = reservationRepository.save(reservation);

            return mapToResponse(savedReservation);
        }

        // DTO -> Entity Dönüştürücü
        private MeetingReservation mapToEntity(CreateReservationRequest request) {
            return MeetingReservation.builder()
                    .roomName(request.getRoomName())
                    .reservationDate(request.getReservationDate())
                    .startTime(request.getStartTime())
                    .endTime(request.getEndTime())
                    .title(request.getTitle())
                    .build();
        }

        // Entity -> Response DTO Dönüştürücü
        private MeetingReservationResponse mapToResponse(MeetingReservation reservation) {
            return MeetingReservationResponse.builder()
                    .id(reservation.getId())
                    .roomName(reservation.getRoomName())
                    .reservationDate(reservation.getReservationDate())
                    .startTime(reservation.getStartTime())
                    .endTime(reservation.getEndTime())
                    .title(reservation.getTitle())
                    .build();
        }
    }
}