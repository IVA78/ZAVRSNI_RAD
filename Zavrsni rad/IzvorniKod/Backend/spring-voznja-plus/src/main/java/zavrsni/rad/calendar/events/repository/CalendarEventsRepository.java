package zavrsni.rad.calendar.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zavrsni.rad.calendar.events.controller.dto.CalendarEventsDTO;
import zavrsni.rad.calendar.events.entity.CalendarEvents;

import java.util.List;

public interface CalendarEventsRepository extends JpaRepository<CalendarEvents, Long> {

    @Query("SELECT ce FROM CalendarEvents ce WHERE ce.id = :eventId")
    CalendarEvents findByEventId(@Param("eventId") Long eventId);

    void deleteEventById(Long eventId);

    @Query("SELECT ce FROM CalendarEvents ce WHERE ce.student.id = :studentId")
    List<CalendarEvents> findAllByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT ce FROM CalendarEvents ce WHERE ce.instructor.id = :instructorId")
    List<CalendarEvents> findAllByInstructorId(@Param("instructorId") Long instructorId);



}
