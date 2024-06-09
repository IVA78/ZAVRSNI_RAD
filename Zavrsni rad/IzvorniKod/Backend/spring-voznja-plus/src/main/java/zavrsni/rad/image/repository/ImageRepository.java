package zavrsni.rad.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zavrsni.rad.image.entity.Image;

@Repository
public interface ImageRepository  extends JpaRepository<Image, Long> {

    Image findByUserId(Long userId);


}
