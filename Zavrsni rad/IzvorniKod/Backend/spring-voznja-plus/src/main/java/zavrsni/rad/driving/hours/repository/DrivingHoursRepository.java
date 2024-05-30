package zavrsni.rad.driving.hours.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zavrsni.rad.driving.hours.entity.DrivingHours;

import java.util.List;

@Repository
public interface DrivingHoursRepository extends JpaRepository<DrivingHours, Long> {

    List<DrivingHours> findAllByUserId(Long user_id);

}
