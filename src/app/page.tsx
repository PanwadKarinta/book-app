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
} from "@mui/material";
import type { BookResponse, Book } from "../../types/book";
import Link from "next/link";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Books Application
      </Typography>

      {isLoading && <Typography>Loading...</Typography>}

      <List>
        {booksData &&
          booksData.map((book) => (
            <ListItem key={book._id} disablePadding sx={{ mb: 2 }}>
              <Link href={`/book/${book._id}`} passHref style={{ textDecoration: "none", width: "100%" }}>
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
