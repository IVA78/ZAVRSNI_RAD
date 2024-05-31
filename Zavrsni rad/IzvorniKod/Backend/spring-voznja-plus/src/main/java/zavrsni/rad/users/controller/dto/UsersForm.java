package zavrsni.rad.users.controller.dto;

public class UsersForm {

    private String firstName;
    private String lastName;
    private String role;

    private String email;

    public UsersForm() {
    }

    public UsersForm(String firstName, String lastName, String role, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getRole() {
        return role;
    }
}
