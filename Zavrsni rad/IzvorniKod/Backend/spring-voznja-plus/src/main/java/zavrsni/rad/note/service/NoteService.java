package zavrsni.rad.note.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import zavrsni.rad.note.controller.dto.NoteForm;
import zavrsni.rad.note.entity.Note;
import zavrsni.rad.note.repository.NoteRepository;
import zavrsni.rad.users.controller.dto.DataForm;
import zavrsni.rad.users.entity.User;
import zavrsni.rad.users.repository.UserRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public NoteForm getNote(String username){

        String email = username;
        User user = userRepository.findUserByEmail(email);
        Long userId = user.getId();

        if(user != null ){
            Note note = noteRepository.findByUserId(userId);
            return new NoteForm(note.getContent());
        } else {
            throw new UsernameNotFoundException("Korisnik ne postoji!");
        }

    }
}
