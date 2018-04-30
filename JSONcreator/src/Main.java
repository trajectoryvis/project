import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class Main {
	private static String inputpath = "/Users/joele/Desktop/data_university_students/students001.vsp";

	public static void main(String[] args) throws IOException{
		InputStream in = new FileInputStream(inputpath);
		Reader reader = new Reader(in);
		ArrayList<String> objects = reader.read();
	}//main

}//class
