package zavrsni.rad.users.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import zavrsni.rad.users.controller.dto.DataForm;
import zavrsni.rad.users.entity.User;
import zavrsni.rad.users.repository.UserRepository;

import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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


}
