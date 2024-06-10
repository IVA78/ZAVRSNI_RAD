package zavrsni.rad.driving.hours.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zavrsni.rad.driving.hours.controller.dto.DrivingHoursDTO;
import zavrsni.rad.driving.hours.controller.dto.DrivingHoursForm;
import zavrsni.rad.driving.hours.entity.DrivingHours;
import zavrsni.rad.driving.hours.repository.DrivingHoursRepository;
import zavrsni.rad.users.entity.User;
import zavrsni.rad.users.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class DrivingHoursService {

    @Autowired
    private DrivingHoursRepository drivingHoursRepository;

    @Autowired
    private UserRepository userRepository;


    public void add(DrivingHoursForm drivingHoursForm) {

        User user = userRepository.findUserByEmail(drivingHoursForm.getEmail());

        DrivingHours drivingHours = new DrivingHours();
        drivingHours.setField(drivingHoursForm.getField());
        drivingHours.setDate(drivingHoursForm.getDate());
        drivingHours.setNote(drivingHoursForm.getNote());
        drivingHours.setStatus(drivingHoursForm.getStatus());
        drivingHours.setUser_id(user.getId());

        drivingHoursRepository.save(drivingHours);
    }


    //student sees his notes
    public List<DrivingHoursDTO> getMyHourNotes(String studentEmail){

        User student = userRepository.findUserByEmail(studentEmail);
        Long userId = student.getId();

        List<DrivingHours> drivingHoursNotes = drivingHoursRepository.findAllByUserId(userId);
        List<DrivingHoursDTO> drivingHoursDTOList = new ArrayList<>();
        for(DrivingHours d : drivingHoursNotes){
            drivingHoursDTOList.add(new DrivingHoursDTO(d.getField(), d.getDate(), d.getStatus(), d.getNote()));
        }

        return drivingHoursDTOList;
    }

    public List<DrivingHoursDTO> getHourNotes(String instructorEmail, String studentEmail){

        //instructorEmail za provjeru uloge korisnika koji pristupa ovoj putanji?

        User student = userRepository.findUserByEmail(studentEmail);
        Long userId = student.getId();

        List<DrivingHours> drivingHoursNotes = drivingHoursRepository.findAllByUserId(userId);
        List<DrivingHoursDTO> drivingHoursDTOList = new ArrayList<>();
        for(DrivingHours d : drivingHoursNotes){
            drivingHoursDTOList.add(new DrivingHoursDTO(d.getField(), d.getDate(), d.getStatus(), d.getNote()));
        }

        return drivingHoursDTOList;
    }

}
