package zavrsni.rad.student.entity;

import jakarta.persistence.*;

import java.time.LocalDate;


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

    @Column(name="phonenumber", nullable = false)
    private String phoneNumber;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;
}
