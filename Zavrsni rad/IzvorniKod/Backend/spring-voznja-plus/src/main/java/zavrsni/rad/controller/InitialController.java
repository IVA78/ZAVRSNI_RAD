package zavrsni.rad.controller;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("initial")
public class InitialController {

    @GetMapping()
    public ResponseEntity<String> getInitialValue() {
        return ResponseEntity.ok("Hello from the backend again!");
    }

}
