package zavrsni.rad.driving.hours.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import zavrsni.rad.users.entity.User;

import java.time.LocalDate;

@Entity
public class DrivingHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="field", nullable = false)
    private String field; //V - vjezbaliste, C - cesta (indikatorska varijabla)

    @Column(name="date", nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable = false)
    private LessonStatus status;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    //slika!

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    public DrivingHours() {
    }

    public DrivingHours(String field, LocalDate date, LessonStatus status, String note, User user) {
        this.field = field;
        this.date = date;
        this.status = status;
        this.note = note;
        this.user = user;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LessonStatus getStatus() {
        return status;
    }

    public void setStatus(LessonStatus status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
