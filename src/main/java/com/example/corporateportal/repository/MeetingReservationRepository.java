package com.example.corporateportal.repository;

import com.example.corporateportal.entity.MeetingReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface MeetingReservationRepository extends JpaRepository<MeetingReservation, Long> {

    List<MeetingReservation> findByRequesterUsernameOrderByReservationDateDesc(String username);

    List<MeetingReservation> findAllByOrderByReservationDateDesc();

    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM MeetingReservation m " +
            "WHERE m.roomName = :roomName " +
            "AND m.reservationDate = :reservationDate " +
            "AND (:startTime < m.endTime AND :endTime > m.startTime)")
    boolean existsConflict(
            @Param("roomName") String roomName,
            @Param("reservationDate") LocalDate reservationDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );
}