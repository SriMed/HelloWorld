//Srilakshmi Medarametla
//9-25-2018
import java.util.Scanner;
import java.io.File;
import java.text.DecimalFormat;
import java.io.*;

public class ElementsQ
{
   public static String[][] elements;
   public static void main(String[] args)
   {
      addElements();
      System.out.println("Welcome to chem elements quizzer. Enter -1 to quit.");
      Scanner keyboard = null;
      keyboard = new Scanner(System.in);
      String input = "Let's start";
      String past = "";
      int count = 0; int tcount = 0; int fcount = 0;
      DecimalFormat d = new DecimalFormat("0.00 %");
      while(!(input.equals("-1")))
      {
         double h = (Math.random());
         int r;
         if(h >= 0.5)
         {
            r = 1;
         }
         else
         {
            r = 0;
         }
         if(count == 36)         //reset
         {
            System.out.println("Correct " + d.format((tcount/36.0) * 100));
            System.out.println("Incorrect " + d.format((fcount/36.0) * 100));
            count = 0;
            past = "";
         }
         int c = (int)(Math.random() * 36);
         while(past.startsWith("" + c) || past.contains((" " + c + " ")))
         {
            c = (int)(Math.random() * 36);
         }
         past += (c + " ");
         System.out.println(past + ":" + count);
         count++;
         if(r == 0)
         {
            System.out.println("What is the chemical name of " + elements[r][c] + "?");
         }
         else
         {
            System.out.println("What is the abreviation of " + elements[r][c] + "?");
         }
         input = keyboard.next();
         int or = Math.abs(r -1);
         if(input.equals(elements[or][c]))
         {
            System.out.println("True.");
            tcount++;
         }
         else if(!(input.equals("-1")))
         {
            System.out.print("False. ");
            System.out.println("The correct answer is " + elements[or][c]);
            fcount++;
         }
         
      }
      keyboard.close();
      System.exit(0);
   }
   public static void addElements()
   {
      elements = new String[2][36];
      Scanner infile = null;
      try
      {  
         infile = new Scanner(new File("abreviations.txt"));
         for(int k = 0; k < elements[0].length;k ++)
         {
            elements[0][k] = infile.next();
         }
         infile.close();
      }
      catch(IOException e)
      {
         System.out.println("Sorry. Abreviations cannot be entered.");
      }
      Scanner infile2 = null;
      try
      {  
         infile2 = new Scanner(new File("elements.txt"));
         for(int k = 0; k < elements[0].length;k ++)
         {
            elements[1][k] = infile2.next();
         }
         infile2.close();
      }
      catch(IOException e)
      {
         System.out.println("Sorry. Elements cannot be entered.");
      }
   }
}