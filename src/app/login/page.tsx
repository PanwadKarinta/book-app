"use client";
import AuthService from "../libs/AuthService";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const response = await AuthService.Login(form.email, form.password);
    if (response.status === 200) {
      const res = await response.json();
      console.log(res);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      window.location.href = "/";
    } else {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
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
          เข้าสู่ระบบ
        </Typography>

        <Card elevation={0}>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                name="email"
                label="อีเมล"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="password"
                label="รหัสผ่าน"
                type="password"
                value={form.password}
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
                onClick={handleLogin}
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
                เข้าสู่ระบบ
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                ยังไม่มีบัญชี? <a href="/register">สมัครสมาชิก</a>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}
