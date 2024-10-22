use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use dotenv::dotenv;
use std::env;
use rand::Rng;
use actix_web::http::header;
use bellman::{Circuit, ConstraintSystem, SynthesisError};
use bls12_381::Bls12;
use rand::thread_rng;
use zokrates_bellman::Proof;
use zokrates_field::Bn128Field;

// Simplified ZKP circuit for demonstration
struct AuthCircuit {
    password_hash: Option<Bn128Field>,
}

impl Circuit<Bls12> for AuthCircuit {
    fn synthesize<CS: ConstraintSystem<Bls12>>(
        self,
        cs: &mut CS
    ) -> Result<(), SynthesisError> {
        // Simplified ZKP logic
        let password_hash_var = cs.alloc(|| "password_hash", || {
            self.password_hash.ok_or(SynthesisError::AssignmentMissing)
        })?;

        cs.enforce(
            || "password_hash constraint",
            |lc| lc + password_hash_var,
            |lc| lc + CS::one(),
            |lc| lc + password_hash_var,
        );

        Ok(())
    }
}

#[derive(Deserialize)]
struct AuthRequest {
    phone_number: String,
    proof: Vec<u8>, // Serialized ZKP
}

#[derive(Serialize)]
struct AuthResponse {
    token: String,
}

async fn authenticate(req: web::Json<AuthRequest>) -> impl Responder {
    // In a real implementation, you would:
    // 1. Deserialize the proof
    // 2. Verify the proof against the known public parameters
    // 3. If valid, generate a secure session token
    
    // For demonstration, we'll just return a dummy token
    let token = generate_secure_token();
    
    HttpResponse::Ok().json(AuthResponse { token })
}

fn generate_secure_token() -> String {
    // In a real implementation, use a cryptographically secure method
    let mut rng = rand::thread_rng();
    let token: String = (0..32)
        .map(|_| rng.sample(rand::distributions::Alphanumeric) as char)
        .collect();
    token
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    println!("Starting secure authentication server on http://127.0.0.1:8080");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:8081")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
            .allowed_header(header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .route("/authenticate", web::post().to(authenticate))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}