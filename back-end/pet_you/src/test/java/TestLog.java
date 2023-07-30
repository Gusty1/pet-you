import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.regex.Matcher;

@Slf4j
public class TestLog {

    @Test
    public void LogGo(){
        log.debug("DDDDD");
        System.out.println("DDDD");
    }

    @Test
    public void StringTrans(){
        String  a="[1,2]";
        System.out.println(new JsonParser().parse(a).getAsJsonArray().toString().replace("[","").replace("]",""));
    }
}
