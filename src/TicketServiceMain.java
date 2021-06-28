import controller.CommentController;
import controller.ManifestationController;
import controller.TicketController;
import controller.UserController;
import dao.CommentDao;
import dao.ManifestationDao;
import dao.TicketDao;
import dao.UserDao;
import model.Location;
import model.Manifestation;
import model.User;

import java.time.LocalDateTime;
import java.util.UUID;

import static spark.Spark.*;


public class TicketServiceMain {


    public static User currentUser = null;


    public static void main(String[] args) {

        port(8080);
        setUpManifestations();
        setUpUsers();
        setUpComments();
        setUpTickets();


        get("/hello", (req, res) -> "Hello World");
        get("/api/manifestations/all", ManifestationController.getAllManifestations);
        get("api/manifestations/:id", ManifestationController.getOneManifestation);
        post("/api/users/newClient", UserController.newClient);
        post("/api/users/logIn", UserController.logIn);
        get("/api/users/logout", UserController.logOut);
        before("/api/users/newClient",
                (request, response) ->
                {
                    if (currentUser != null) halt();
                });

        get("/api/users/currentUser", UserController.loggedInUser);
        post("/api/manifestations/newManifestation", ManifestationController.newManifestation);

        post("/api/tickets/addToCart", TicketController.addToCart);
        get("/api/tickets/removeFromCart/:id", TicketController.removeFromCart);
        get("/api/tickets/buyCart", TicketController.buyCart);
        get("/api/tickets/allClientTickets", TicketController.clientTickets);
        get("/api/tickets/getCart", TicketController.getCart);
        get("/api/tickets/cartPrice", TicketController.cartPrice);


        after((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET");
        });

    }

    private static void setUpUsers() {
        UserController.userDao = new UserDao();
        UserController.currentUser = currentUser;
    }

    private static void setUpComments() {
        CommentController.commentDao = new CommentDao();

    }

    private static void setUpTickets() {
        TicketController.ticketDao = new TicketDao();

    }

    public static void setUpManifestations() {
        Manifestation manifestation = new Manifestation(UUID.randomUUID(), "Within Temptation", "Koncert", 600, LocalDateTime.now(),
                600.34, true, new Location(25.579977, 47.040182, "Novi Sad"), "none", null);
        Manifestation manifestation1 = new Manifestation(UUID.randomUUID(), "Nightwish", "Koncert", 300, LocalDateTime.now(),
                600.34, true, new Location(9.419579, 51.179343, "Novi Sad"), "none", null);
        Manifestation manifestation2 = new Manifestation(UUID.randomUUID(), "Tarja", "Koncert", 640, LocalDateTime.now(),
                600.34, true, new Location(52.637814, 57.891497, "Novi Sad"), "none", null);
        ManifestationDao manifestationDao = new ManifestationDao();
        manifestationDao.addManifestation(manifestation);
        manifestationDao.addManifestation(manifestation1);
        manifestationDao.addManifestation(manifestation2);

        ManifestationController.manifestationDao = manifestationDao;
    }
}
