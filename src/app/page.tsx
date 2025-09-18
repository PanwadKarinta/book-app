"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  List,
  ListItem,
  Box,
  Button,
} from "@mui/material";
import type { BookResponse, Book } from "../../types/book";
import Link from "next/link";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  // ดึงข้อมูลหนังสือ
  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/books");
      if (response.ok) {
        const data = await response.json();
        const resData: BookResponse = data;
        setBooksData(resData.books);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ดึงข้อมูลผู้ใช้งานจาก localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    getData();
  }, []);

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" gutterBottom>
          Books Application
        </Typography>
        {user ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Welcome, {user.username}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ mt: 1 }}
              onClick={handleLogout}
      >
              Logout
            </Button>
          </Box>
        ) : (
          <Typography color="text.secondary">
            You are not logged in. Please{" "}
            <Link href="/login" style={{ textDecoration: "underline" }}>
              login
            </Link>
            .
          </Typography>
        )}
      </Box>

      {isLoading && <Typography>Loading...</Typography>}

      <List>
        {booksData &&
          booksData.map((book) => (
            <ListItem key={book._id} disablePadding sx={{ mb: 2 }}>
              <Link
                href={`/book/${book._id}`}
                passHref
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Card sx={{ width: "100%" }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6">{book.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Author: {book.author}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </ListItem>
          ))}
      </List>
    </Container>
  );
}
