//fairly determines which student gets which book

import java.util.Scanner;
import java.io.File;
import java.io.PrintWriter;
import java.io.FileWriter;
import javax.swing.JOptionPane;
import java.util.ArrayList;
import java.util.Arrays;

public class BookAssortment
{
   private static int randomA;
   public static void main(String[] args)
   {
      JOptionPane.showMessageDialog(null, "Book Assortment: An easy to way to assign books!\n" + "First, some preliminary information is needed. Click OK to begin.");
      int numStud = Integer.parseInt(JOptionPane.showInputDialog(
                         "How many students?:  "));
      int numPref = Integer.parseInt(JOptionPane.showInputDialog(
                         "How many preferences do students list? (top 'x'):  "));
      int poss = Integer.parseInt(JOptionPane.showInputDialog(
                         "How many books possible?:  "));
      JOptionPane.showMessageDialog(null, "Ensure that the all the books/copies and students pref are typed into the books.txt and studentpref.txt respectively");
      Scanner infileb = null;
      infileb = intializeScanner(infileb, "books.txt");
      
      Book[] books = new Book[poss];
      for(int k = 0; k < poss; k++)
      {
         String name = infileb.nextLine().trim();
         int copi = Integer.parseInt(infileb.nextLine().trim());
         books[k] = new Book(name, copi);
      }

      Scanner infile = null;
      infile = intializeScanner(infile, "studentpref.txt");
      //process
      Student[] clas = new Student[numStud];
      for(int k = 0; k < clas.length; k++)
      {
         String name = "";
         String[] pref = new String[numPref];
         name = infile.nextLine().trim();
         for(int p = 0; p < numPref; p++)
         {
            pref[p] = infile.nextLine().trim();
         }
         clas[k] = new Student(name, pref, (int)(Math.random() * (numStud)));
      }
      
      infile.close();
      
      Arrays.sort(clas);
      for(int k = 0; k < clas.length; k++)
      {
         String[] pref = clas[k].getPref();
         for(int p = 0; p < pref.length; p++)
         {
           int index = findBookIndex(books, pref[p]);
           Book b = books[index];
           if(!(b.empty()))
           {
            b.used();
            clas[k].setBook(b.getName());
            break;
           }
         }
         if(clas[k].getBook() == null)
         {
            Book b = findEmptyBook(books);
            clas[k].setBook(b.getName());
            b.used();
            randomA++;
         }
      }
      //output
      try
      {
      PrintWriter output = new PrintWriter(new FileWriter("studentassign.txt"));
      for(Student s : clas)
      {
         output.println(s.toString());
      }
      output.close();
      }
      catch(Exception e)
      {
         System.out.println("Sorry. Could not be outputted.");
      }
      JOptionPane.showMessageDialog(null, "Disclaimer: " + randomA + " students had to be assigned a book out of their preferences");
      JOptionPane.showMessageDialog(null,"Thank for using BookAssortment. Please view 'studentassign.txt' for each student's book");
   } 
   private static Scanner intializeScanner(Scanner infile, String filename)
   {
      try
      {
         infile = new Scanner(new File(filename));
      }
      catch(Exception e)
      {
         System.out.println("Sorry. File could not be read in properly. Please try again.");
      }
      return infile;
   }
   private static int findBookIndex(Book[] book, String name)
   {
      for(int k = 0; k < book.length; k++)
      {
         if(book[k].getName().equalsIgnoreCase(name))
         {
            return k;
         }
      }
      return -1;
   }
   public static Book findEmptyBook(Book[] books)
   {
      for(Book b : books)
      {
         if(!(b.empty()))
         {
            return b;
         }
      }
      return null;
   }
}
class Book implements Comparable<Book>
{
   private String myName;
   private int myCopies;
   public Book(String name, int copy)
   {
      myName = name;
      myCopies = copy;
   }
   public String getName()
   {
      return myName;
   }
   public int getCopy()
   {
      return myCopies;
   }
   public void used()
   {
      myCopies--;
   }
   public boolean empty()
   {
      return myCopies == 0;
   }
   public int compareTo(Book other)
   {
      return myName.compareTo(other.getName());
   }
   public String toString()
   {
      return myName + "|" + myCopies;
   }
}
class Student implements Comparable<Student>
{
   private String myName;
   private String[] myPref;  //
   private String myBook;
   private int myOrder;
   public Student(String name, String[] pref, int order)      //
   {
      myName = name;
      myPref = pref;
      myOrder = order;
   }
   public String[] getPref()
   {
      return myPref;
   }
   public String getName()
   {
      return myName;
   }
   public void setBook(String b)
   {
      myBook = b;
   }
   public String getBook()
   {
      return myBook;
   }
   public int getOrder()
   {
      return myOrder;
   }
   public int compareTo(Student other)
   {
      return myOrder - other.getOrder();
   }
   public String toString()
   {
      return myName + ": " + myBook;
   }
}