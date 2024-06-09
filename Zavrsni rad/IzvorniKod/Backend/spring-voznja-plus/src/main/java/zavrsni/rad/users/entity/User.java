package zavrsni.rad.users.entity;

import jakarta.persistence.*;
import zavrsni.rad.calendar.events.entity.CalendarEvents;
import zavrsni.rad.driving.hours.entity.DrivingHours;
import zavrsni.rad.user.note.entity.Note;

import java.time.LocalDate;
import java.util.List;


//user can be student, instructor or administrator - DEFINED BY THE ROLE
@Entity
@Table(name="users")
public class User {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //kandidat
    //instruktor
    //administrator
    @Column(name="role", nullable = false)
    private String role;

    @Column(name="firstname", nullable = false)
    private String firstName;
    @Column(name="lastname", nullable = false)
    private String lastName;

    @Column(name="dateofbirth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name="email", nullable = false, unique = true)
    private String email;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name="phonenumber", nullable = false)
    private String phoneNumber;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DrivingHours> drivingHours;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private List<CalendarEvents> calendarEvents;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "instructor_id", referencedColumnName = "id")
    private List<CalendarEvents> instructorCalendarEvents;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }


    public List<DrivingHours> getDrivingHours() {
        return drivingHours;
    }

    public void setDrivingHours(List<DrivingHours> drivingHours) {
        this.drivingHours = drivingHours;
    }

    public List<CalendarEvents> getCalendarEvents() {
        return calendarEvents;
    }

    public void setCalendarEvents(List<CalendarEvents> calendarEvents) {
        this.calendarEvents = calendarEvents;
    }

    public List<CalendarEvents> getInstructorCalendarEvents() {
        return instructorCalendarEvents;
    }

    public void setInstructorCalendarEvents(List<CalendarEvents> instructorCalendarEvents) {
        this.instructorCalendarEvents = instructorCalendarEvents;
    }
}
