"use client";
import { Book } from "../../../../types/book";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/books/${id}`);
      if (response.ok) {
        const data = await response.json();
        const _book: Book = data["book"];
        setBook(_book);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {book && (
        <Card
          sx={{
            boxShadow: 4,
            borderRadius: 3,
            bgcolor: "#fffef9", // ครีมอ่อน
          }}
        >
          <CardContent>
            {/* หัวข้อ */}
            <Typography variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Author: {book.author}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* คำอธิบาย */}
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {book.description}
            </Typography>

            {/* กล่องรายละเอียด */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "#f9f4ef",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography><b>Genre:</b> {book.genre}</Typography>
              <Typography><b>Year:</b> {book.year}</Typography>
              <Typography><b>Price:</b> ${book.price}</Typography>
              <Typography>
                <b>Available:</b> {book.available ? "Yes" : "No"}
              </Typography>
              <Typography><b>Added By:</b> {book.addedBy.username}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Created At: {new Date(book.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Updated At: {new Date(book.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
