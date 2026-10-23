from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://localhost/postgres"
    secret_key: str = "dev-secret-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 480
    frontend_url: str = "http://localhost:5173"
    cors_origins: str = ""
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    supabase_bucket: str = "dosh-motor-media"
    signed_url_ttl_seconds: int = 3600
    admin_username: str = "admin"
    admin_password: str = "DoshMotor2026"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
