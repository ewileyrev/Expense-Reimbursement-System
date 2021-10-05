import com.revature.controller.AccountController;
import com.revature.controller.RequestController;

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;

public class Driver {

	public static void main(String[] args) {
		
		Javalin app = Javalin.create().start(7000);
		
		app.after(ctx -> {
			ctx.res.addHeader("Access-Control-Allow-Origin", "null");
		});
		
		app.config.addStaticFiles("/static", Location.CLASSPATH);
		
		AccountController accountController = new AccountController(app);
		RequestController requestController = new RequestController(app);
		
		
		
	}
}
