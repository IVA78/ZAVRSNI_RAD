package zavrsni.rad.users.controller.dto;

public class UsersForm {

    private String firstName;
    private String lastName;
    private String role;

    public UsersForm() {
    }

    public UsersForm(String firstName, String lastName, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
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
