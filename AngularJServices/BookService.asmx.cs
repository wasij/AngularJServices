using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace AngularJServices
{
    /// <summary>
    /// Summary description for BookService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class BookService : System.Web.Services.WebService
    {
        static List<Book> BookList = null;

        [WebMethod]
        public void GetAllBooks()
        {
            if (ReferenceEquals(BookList, null))
            {
                BookList = new List<Book>();

                Book book = new Book();
                book.book_id = 1;
                book.title = "Book 1";
                book.author = "Author 1";
                book.year_published = "2000";
                BookList.Add(book);

                book = new Book();
                book.book_id = 2;
                book.title = "Book 2";
                book.author = "Author 2";
                book.year_published = "4000";
                BookList.Add(book);

                book = new Book();
                book.book_id = 3;
                book.title = "Book 3";
                book.author = "Author 3";
                book.year_published = "6000";
                BookList.Add(book);
            }
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            Context.Response.Write(javaScriptSerializer.Serialize(BookList));
        }

        [WebMethod]
        public void GetBookByID(int bookID)
        {
            Book book = BookList.Where(b => b.book_id == bookID).FirstOrDefault();

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            Context.Response.Write(javaScriptSerializer.Serialize(book));
        }

        [WebMethod]
        public void UpdateBookDetails(int book_id, Book bookDetails)
        {
            foreach (Book book in BookList)
            {
                if (book.book_id == book_id)
                {
                    book.title = bookDetails.title;
                    book.author = bookDetails.author;
                    book.year_published = bookDetails.year_published;
                }
            }            
        }

        [WebMethod]
        public void AddBook(Book newBook)
        {
            BookList.Add(newBook);
        }

        [WebMethod]
        public void DeleteBook(int bookID)
        {
            BookList.RemoveAll(x => x.book_id == bookID);
        }
    }
}
