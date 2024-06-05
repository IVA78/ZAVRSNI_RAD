package zavrsni.rad.calendar.events.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zavrsni.rad.calendar.events.controller.dto.CalendarEventsDTO;
import zavrsni.rad.calendar.events.entity.CalendarEvents;
import zavrsni.rad.calendar.events.repository.CalendarEventsRepository;
import zavrsni.rad.users.entity.User;
import zavrsni.rad.users.repository.UserRepository;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalendarEventsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CalendarEventsRepository calendarEventsRepository;

    public List<CalendarEventsDTO> getEventsStudent(String studentEmail){

        User student = userRepository.findUserByEmail(studentEmail);
        Long studentId = student.getId();

        List <CalendarEvents> calendarEvents = calendarEventsRepository.findAllByStudentId(studentId);
        List <CalendarEventsDTO> eventsList = new ArrayList<>();

        for(CalendarEvents event : calendarEvents) {
            eventsList.add(new CalendarEventsDTO(event.getId(), event.getTitle(), event.getStartTime(), event.getEndTime()));

        }

        return eventsList;
    }

    public List<CalendarEventsDTO> getEventsInstructor(String instructorEmail){

        User instructor = userRepository.findUserByEmail(instructorEmail);
        Long instructorId = instructor.getId();

        List <CalendarEvents> calendarEvents = calendarEventsRepository.findAllByInstructorId(instructorId);
        List <CalendarEventsDTO> eventsList = new ArrayList<>();

        for(CalendarEvents event : calendarEvents) {
            eventsList.add(new CalendarEventsDTO(event.getId(), event.getTitle(), event.getStartTime(), event.getEndTime()));

        }

        return eventsList;
    }


    public boolean addEvent(String userEmail, String studentEmail, String title, ZonedDateTime startTime, ZonedDateTime endTime) {

        User user = userRepository.findUserByEmail(userEmail);
        Long userId = user.getId();
        String userRole = user.getRole();

        CalendarEvents event = new CalendarEvents();
        event.setTitle(title);
        event.setStartTime(startTime);
        event.setEndTime(endTime);

        if(userRole.equals("kandidat")) {
            event.setStudent(user);
            event.setInstructor(null);

        } else if(userRole.equals("instruktor")){

            if(studentEmail != ""){
                User student = userRepository.findUserByEmail(studentEmail);
                event.setStudent(student);
            } else {
                event.setStudent(null);
            }

            event.setInstructor(user);

        } else {
            return false;
        }

        calendarEventsRepository.save(event);

        return true;
    }

    public boolean updateEvent(String userEmail, CalendarEventsDTO calendarEvent) {

        User user = userRepository.findUserByEmail(userEmail);
        Long userId = user.getId();

        CalendarEvents event = calendarEventsRepository.findByEventId(calendarEvent.getId());
        event.setTitle(calendarEvent.getTitle());

        calendarEventsRepository.save(event);

        return true;
    }


    @Transactional
    public boolean deleteEvent(String userEmail, CalendarEventsDTO calendarEvent) {

        User user = userRepository.findUserByEmail(userEmail);
        Long userId = user.getId();

        //provjera autorizacije?

        CalendarEvents event = calendarEventsRepository.findByEventId(calendarEvent.getId());
        calendarEventsRepository.deleteEventById(event.getId());

        return true;
    }

}
