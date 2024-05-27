package zavrsni.rad.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zavrsni.rad.security.configuration.JWTGenerator;
import zavrsni.rad.users.controller.dto.DataForm;
import zavrsni.rad.users.service.UserService;

@RestController
@RequestMapping("/data")
public class DataController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @GetMapping()
    public ResponseEntity<DataForm> data(@RequestHeader("Authorization") String token){
        System.out.println("I am in data!");
        DataForm dataForm = userService.data(jwtGenerator.getUsernameFromJWT(token));
        return ResponseEntity.ok(dataForm);
    }







}
