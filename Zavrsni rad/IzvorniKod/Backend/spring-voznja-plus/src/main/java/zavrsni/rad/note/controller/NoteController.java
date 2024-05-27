package zavrsni.rad.note.controller;

import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zavrsni.rad.note.controller.dto.NoteForm;
import zavrsni.rad.note.entity.Note;
import zavrsni.rad.note.service.NoteService;
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
}
