package zavrsni.rad.calendar.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import zavrsni.rad.calendar.events.controller.dto.CalendarEventsDTO;
import zavrsni.rad.calendar.events.service.CalendarEventsService;
import zavrsni.rad.driving.hours.controller.dto.DrivingHoursDTO;
import zavrsni.rad.security.configuration.JWTGenerator;
import zavrsni.rad.user.note.controller.dto.NoteForm;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/calendar")
public class CalendarEventsController {

    @Autowired
    private CalendarEventsService calendarEventsService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @GetMapping("/getStudentEvents")
    public ResponseEntity<List<CalendarEventsDTO>> getStudentEvents(@RequestHeader("Authorization") String token, @RequestHeader("studentEmail") String studentEmail){

        List<CalendarEventsDTO> drivingHoursDTOList = new ArrayList<>();
        if(studentEmail.equals("")){
            drivingHoursDTOList = calendarEventsService.getEventsStudent(jwtGenerator.getUsernameFromJWT(token));
        } else {
            drivingHoursDTOList = calendarEventsService.getEventsStudent(studentEmail);
        }

        return ResponseEntity.ok(drivingHoursDTOList);
    }

    @GetMapping("/getInstructorEvents")
    public ResponseEntity<List<CalendarEventsDTO>> getInstructorEvents(@RequestHeader("Authorization") String token){

        List<CalendarEventsDTO> drivingHoursDTOList = calendarEventsService.getEventsInstructor(jwtGenerator.getUsernameFromJWT(token));

        return ResponseEntity.ok(drivingHoursDTOList);
    }

    @PostMapping("/putEvent")
    public ResponseEntity<Void> putEvent(@RequestHeader("Authorization") String token, @RequestHeader("studentEmail") String studentEmail, @RequestBody CalendarEventsDTO eventForm) {

        boolean done = calendarEventsService.addEvent(jwtGenerator.getUsernameFromJWT(token), studentEmail, eventForm.getTitle(), eventForm.getStartTime(), eventForm.getEndTime());

        if(done) {
            System.out.println("Event saved!");
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new UsernameNotFoundException("Pogreska!");
        }
    }

    @PostMapping("/changeEvent")
    public ResponseEntity<Void> changeEvent(@RequestHeader("Authorization") String token, @RequestBody CalendarEventsDTO calendarEvent) {

        boolean done = calendarEventsService.updateEvent(jwtGenerator.getUsernameFromJWT(token), calendarEvent);

        if(done) {
            System.out.println("Event updated!");
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new UsernameNotFoundException("Pogreska!");
        }
    }

}
