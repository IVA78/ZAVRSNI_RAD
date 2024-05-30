package zavrsni.rad.user.note.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import zavrsni.rad.user.note.controller.dto.NoteForm;
import zavrsni.rad.user.note.service.NoteService;
import zavrsni.rad.security.configuration.JWTGenerator;

@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @GetMapping("/get")
    public ResponseEntity<NoteForm> getNote(@RequestHeader("Authorization") String token){
        NoteForm noteForm = noteService.getNote(jwtGenerator.getUsernameFromJWT(token));
        return ResponseEntity.ok(noteForm);

    }


    @PostMapping("/post")
    public ResponseEntity<Void> postNote(@RequestHeader("Authorization") String token, @RequestBody NoteForm noteForm) {
        boolean done = noteService.changeNote(jwtGenerator.getUsernameFromJWT(token), noteForm.getContent());

        if(done) {
            System.out.println("Note posted!");
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new UsernameNotFoundException("Pogreska!");
        }
    }
}
