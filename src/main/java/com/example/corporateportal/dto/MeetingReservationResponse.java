package com.example.corporateportal.dto;

import com.example.corporateportal.entity.MeetingReservation;
import com.example.corporateportal.entity.ReservationStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class MeetingReservationResponse {
    private Long id;
    private String title;
    private String roomName;
    private LocalDate reservationDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private int participantCount;
    private ReservationStatus status;
    private String adminNote;
    private String requesterName;

    public static MeetingReservationResponse fromEntity(MeetingReservation res) {
        return MeetingReservationResponse.builder()
                .id(res.getId())
                .title(res.getTitle())
                .roomName(res.getRoomName())
                .reservationDate(res.getReservationDate())
                .startTime(res.getStartTime())
                .endTime(res.getEndTime())
                .participantCount(res.getParticipantCount())
                .status(res.getStatus())
                .adminNote(res.getAdminNote())
                .requesterName(res.getRequester() != null ? res.getRequester().getUsername() : "Bilinmiyor")
                .build();
    }
}