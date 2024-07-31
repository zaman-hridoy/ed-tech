import axios from "@/lib/instance";
import { CourseDataType } from "@/lib/types";

type BookType = {
  id: number;
  name: string;
  image: string;
};

export const getCourseBooks = async (course: CourseDataType) => {
  let books: BookType[] = [];
  try {
    if (course && course.books_json) {
      if (typeof course.books_json === "object") {
        const updatedBooks = course.books_json.map((book: any) => ({
          id: book.id,
          image: book?.bookImage || "",
          name: book?.book_name || "",
        }));
        books = updatedBooks;
      }
      if (typeof course.books_json === "string") {
        const parsedBooks = JSON.parse(course.books_json);
        const updatedBooks = parsedBooks.map((book: any) => ({
          id: book.id,
          image: book?.bookImage || "",
          name: book?.book_name || "",
        }));
        books = updatedBooks;
      }
    } else if (course.book_id && course.book_name) {
      const res = await axios.get(`/content/getBookById/${course.book_id}`);
      const book = res.data?.data[0];
      if (book) {
        const bookData: BookType = {
          id: book?.id,
          name: book?.bookName,
          image: book?.coverImage,
        };

        books = [bookData];
      }

      // const updatedBook = {
      //   id: course.book_id,
      //   name: course.book_name,
      //   image: "",
      // };
    }
  } catch (error) {
    console.log("COURSE_BOOK_PARSED", error);
  } finally {
    return books;
  }
};
