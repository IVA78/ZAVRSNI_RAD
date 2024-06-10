package zavrsni.rad.driving.hours.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import zavrsni.rad.driving.hours.entity.DrivingHours;

import java.util.List;

@Repository
public interface DrivingHoursRepository extends JpaRepository<DrivingHours, Long> {

    @Query("SELECT dh FROM DrivingHours dh WHERE dh.user_id = :userId")
    List<DrivingHours> findAllByUserId(@Param("userId") Long userId);


}
