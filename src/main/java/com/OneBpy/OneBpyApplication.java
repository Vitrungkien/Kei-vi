package com.OneBpy;

import com.OneBpy.models.Role;
import com.OneBpy.models.User;
import com.OneBpy.repositories.UserRepository;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Kei Vi App",
				version = "3.1.0",
				description = "Do an tot nghiep",
				termsOfService = "T&V",
				contact = @Contact(
						name = "Vi Kien",
						email = "vtkien2511@gamil.com"
				),
				license = @License(
						name = "license",
						url = "keivi"
				)
		)
)
public class OneBpyApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(OneBpyApplication.class, args);
	}

	@Override
	public void run(String... args) {
//		User adminAccount = userRepository.findByRole(Role.ROLE_ADMIN);
//		if (adminAccount == null) {
//			User user = new User();
//
//			user.setEmail("admin@gmail.com");
//			user.setFirstName("Vi");
//			user.setLastName("admin");
//			user.setRole(Role.ROLE_ADMIN);
//			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
//			userRepository.save(user);
//		}
	}
}



