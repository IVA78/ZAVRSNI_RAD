package zavrsni.rad.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import zavrsni.rad.security.configuration.JWTGenerator;
import zavrsni.rad.users.controller.dto.DataForm;
import zavrsni.rad.users.controller.dto.RoleForm;
import zavrsni.rad.users.controller.dto.UserRegisterForm;
import zavrsni.rad.users.controller.dto.UsersForm;
import zavrsni.rad.users.service.UserService;

import java.util.List;

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

    @GetMapping("/getAll")
    public ResponseEntity<List<UsersForm>> getAllUsersBasedOnRole(@RequestHeader("Authorization") String token, @RequestHeader("Role") String role) {
        List<UsersForm> users = userService.getUsersData(jwtGenerator.getUsernameFromJWT(token), role);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public ResponseEntity<Long> register(@RequestHeader("Authorization") String token, @RequestBody UserRegisterForm userRegisterForm) {

        Long userId = userService.register(userRegisterForm);
        return ResponseEntity.ok(userId);

    }











}
