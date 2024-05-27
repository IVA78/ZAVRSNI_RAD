package zavrsni.rad.note.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zavrsni.rad.note.entity.Note;
import zavrsni.rad.users.entity.User;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Note findByUserId(Long id);
}
