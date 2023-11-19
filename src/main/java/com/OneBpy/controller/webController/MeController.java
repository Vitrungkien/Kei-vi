package com.OneBpy.controller.webController;


import com.OneBpy.models.User;
import com.OneBpy.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/me")
@RequiredArgsConstructor
public class MeController {
    private final UserService userService;

    @PutMapping("/edit")
    public ResponseEntity<User> editProfile(@RequestBody User updateUser) {
        return ResponseEntity.ok(userService.editProfile(updateUser));
    }
}
