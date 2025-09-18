"use client";
import AuthService from "../libs/AuthService";
import { RegisterForm } from "../../../types/RegisterForm";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
import type { RegistrationRes } from "../../../types/RegisterRes";

export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน!");
      return;
    }

    const data: RegisterForm = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    };

    const response = await AuthService.Register(data);
    if (response.status === 201) {
      const res: RegistrationRes = await response.json();
      console.log(res);

      // save token (optional)
      localStorage.setItem("token", res.token);

      // redirect to login
      window.location.href = "/login";
    } else {
      setError("การลงทะเบียนล้มเหลว");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2e7d32" }}
        >
          ลงทะเบียน
        </Typography>

        <Card elevation={0}>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                name="username"
                label="ชื่อผู้ใช้"
                value={registerForm.username}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="email"
                label="อีเมล"
                value={registerForm.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="password"
                label="รหัสผ่าน"
                type="password"
                value={registerForm.password}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="confirmPassword"
                label="ยืนยันรหัสผ่าน"
                type="password"
                value={registerForm.confirmPassword}
                onChange={handleChange}
                fullWidth
              />
              {error && (
                <Typography color="error" sx={{ fontSize: "14px" }}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleRegister}
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#4caf50",
                  "&:hover": { backgroundColor: "#388e3c" },
                  fontWeight: "bold",
                  fontSize: "16px",
                  py: 1.2,
                  borderRadius: 2,
                }}
              >
                สมัครสมาชิก
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}
