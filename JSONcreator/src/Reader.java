import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Reader {
	private InputStream in;
	private int personnr = 0;
	
	public Reader(InputStream in){
		this.in = in;
	}//constructor
	
	public ArrayList<String> read(){
		ArrayList<String> objects = new ArrayList<String>();
		Scanner scanner = new Scanner(in);
		scanner.useDelimiter("\n");
		System.out.println("Number of splines/people: " + scanner.next()); //the first line, number of splines/persons
		
		while(scanner.hasNext()){
			int controlpoints = Integer.parseInt(scanner.next().replaceAll("\\p{C}", ""));	//apparently there are some unprintable hidden characters in the text causing errors, replace them with nothing
			for(int i = 0; i < controlpoints; i++){
				scanner.next();
			}
			personnr++;
		}
		return objects;
	}
	
}//class
