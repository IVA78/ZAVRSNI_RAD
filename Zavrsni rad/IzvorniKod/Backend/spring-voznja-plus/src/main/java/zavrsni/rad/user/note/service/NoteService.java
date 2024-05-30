package zavrsni.rad.user.note.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import zavrsni.rad.user.note.controller.dto.NoteForm;
import zavrsni.rad.user.note.entity.Note;
import zavrsni.rad.user.note.repository.NoteRepository;
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

    @Transactional
    public boolean changeNote(String username, String content) {
        String email = username;
        User user = userRepository.findUserByEmail(email);
        Long userId = user.getId();

        if(user != null ){
            Note note = noteRepository.findByUserId(userId);
            note.setContent(content);
            noteRepository.save(note);

            return true;
        } else {
            return false;
        }

    }
}
