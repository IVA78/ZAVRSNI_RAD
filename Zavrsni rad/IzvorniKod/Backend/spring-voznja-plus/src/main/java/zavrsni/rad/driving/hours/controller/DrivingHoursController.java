package zavrsni.rad.driving.hours.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zavrsni.rad.driving.hours.controller.dto.DrivingHoursDTO;
import zavrsni.rad.driving.hours.service.DrivingHoursService;
import zavrsni.rad.security.configuration.JWTGenerator;

import java.util.List;

@RestController
@RequestMapping("/driving_hours")
public class DrivingHoursController {

    @Autowired
    private DrivingHoursService drivingHoursService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @GetMapping("/get")
    public ResponseEntity<List<DrivingHoursDTO>> get(@RequestHeader("Authorization") String token, @RequestHeader("StudentEmail") String studentEmail){

        List<DrivingHoursDTO> drivingHoursDTOList = drivingHoursService.getHourNotes(jwtGenerator.getUsernameFromJWT(token), studentEmail );

        return ResponseEntity.ok(drivingHoursDTOList);
    }


    @GetMapping("/getMy")
    public ResponseEntity<List<DrivingHoursDTO>> getMy(@RequestHeader("Authorization") String token){

        List<DrivingHoursDTO> drivingHoursDTOList = drivingHoursService.getMyHourNotes(jwtGenerator.getUsernameFromJWT(token));

        return ResponseEntity.ok(drivingHoursDTOList);
    }



}
