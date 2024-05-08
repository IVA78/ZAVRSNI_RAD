package zavrsni.rad.users.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zavrsni.rad.users.entity.User;
import zavrsni.rad.users.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User login(String email) {
        return userRepository.findUserByEmail(email);
    }


}
