package zavrsni.rad.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zavrsni.rad.security.configuration.JWTGenerator;
import zavrsni.rad.users.entity.User;
import zavrsni.rad.users.service.UserService;
import zavrsni.rad.users.controller.dto.LoginForm;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTGenerator jwtGenerator;

    @PostMapping()
    public ResponseEntity<Map<String, String >> login(@RequestBody LoginForm loginform) {

        System.out.println("Podaci: "+ loginform.getEmail()+ " "+ loginform.getPassword());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginform.getEmail(), loginform.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        String username = jwtGenerator.getUsernameFromJWT(token);

        User user = userService.login(username);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }

}
