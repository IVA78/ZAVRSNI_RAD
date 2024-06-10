package zavrsni.rad.users.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import zavrsni.rad.image.controller.dto.ImageDTO;
import zavrsni.rad.image.entity.Image;
import zavrsni.rad.image.repository.ImageRepository;
import zavrsni.rad.user.note.repository.NoteRepository;
import zavrsni.rad.users.controller.dto.DataForm;
import zavrsni.rad.users.controller.dto.UserRegisterForm;
import zavrsni.rad.users.controller.dto.UsersForm;
import zavrsni.rad.users.entity.User;
import zavrsni.rad.users.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public Long register(UserRegisterForm userRegisterForm) {
        User newUser = new User();
        System.out.println("Role: " + "|" + userRegisterForm.getRole() + "|");
        newUser.setRole(userRegisterForm.getRole());
        newUser.setFirstName(userRegisterForm.getFirstName());
        newUser.setLastName(userRegisterForm.getLastName());
        newUser.setEmail(userRegisterForm.getEmail());
        newUser.setDateOfBirth(userRegisterForm.getDateOfBirth());
        newUser.setPassword(passwordEncoder.encode(userRegisterForm.getPassword()));
        newUser.setPhoneNumber(userRegisterForm.getPhoneNumber());

        userRepository.save(newUser);

        User savedUsed = userRepository.findUserByEmail(userRegisterForm.getEmail());

        return savedUsed.getId();
    }


    public User login(String email) {
        return userRepository.findUserByEmail(email);
    }

    public DataForm data(String username) {
        String email = username;
        User user = userRepository.findUserByEmail(email);

        if(user != null ){
            return new DataForm(user.getRole(), user.getFirstName(), user.getLastName(), user.getDateOfBirth(), user.getEmail(), user.getPhoneNumber());
        } else {
            throw new UsernameNotFoundException("Korisnik ne postoji!");
        }

    }

    public List<UsersForm> getUsersData(String email, String role) {

        System.out.println("role:" + role);

        User user = userRepository.findUserByEmail(email);

        String userRole = user.getRole();

        List<UsersForm> users = new ArrayList<>();

        if(!userRole.equals("kandidat")) {

            for(User selectedUser : userRepository.findAllByRole(role)) {
                System.out.println("User email: "+ selectedUser.getEmail());
                Image image = imageRepository.findByUserId(selectedUser.getId());
                ImageDTO imageDTO = new ImageDTO(image.getPath(), image.getType());
                users.add(new UsersForm(selectedUser.getFirstName(), selectedUser.getLastName(), selectedUser.getRole(), selectedUser.getEmail(), imageDTO));
            }

        }

        return users;
    }


}
