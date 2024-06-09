package zavrsni.rad.user.note.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zavrsni.rad.user.note.entity.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    Note findByUserId(Long id);

}
