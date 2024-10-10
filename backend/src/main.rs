use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Info {
    name: String,
}

#[derive(Serialize)]
struct Response {
    message: String,
}

async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello, World!")
}

async fn echo(info: web::Json<Info>) -> impl Responder {
    HttpResponse::Ok().json(Response {
        message: format!("Hello, {}!", info.name),
    })
}

async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(Response {
        message: "Service is up and running".to_string(),
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server starting on http://127.0.0.1:8080");

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(hello))
            .route("/echo", web::post().to(echo))
            .route("/health", web::get().to(health_check))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}