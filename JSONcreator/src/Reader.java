import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Reader {
	private InputStream in;
	private int personnr = 0;

	public Reader(InputStream in){
		this.in = in;
	}//constructor

	public ArrayList<String> read() throws IOException{
		ArrayList<String> objects = new ArrayList<String>();
		Scanner scanner = new Scanner(in);
		scanner.useDelimiter("\n");
		System.out.println("Number of splines/people: " + scanner.next()); //the first line, number of splines/persons

		FileWriter writer = new FileWriter("C:/Users/joele/Documents/Skola/kex/project/outputreal.txt");
		PrintWriter printer = new PrintWriter(writer);
		while(scanner.hasNext()){
			int controlpoints = Integer.parseInt(scanner.next().replaceAll("\\p{C}", ""));	//apparently there are some unprintable hidden characters in the text causing errors, replace them with nothing
			for(int i = 0; i < controlpoints; i++){
				String[] temp = scanner.next().replaceAll("\\p{C}", "").split("\\s");	//split the row on whitespace; gives: x,y,framenr,gazedirection
				Double x = Double.parseDouble(temp[0]);
				Double y = Double.parseDouble(temp[1]);
				int frame = Integer.parseInt(temp[2]);
				//will not use temp[3] = gaze direction
				printer.print("{ " + "\"person\":" + personnr + ", " + "\"x\":" + x + ", " + "\"y\":" + y + ", " + "\"frame\":" + frame + "}," + "\n");

			}
			personnr++;
		}
		printer.close();
		scanner.close();
		return objects;
	}

}//class
