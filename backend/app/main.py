import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import admin, auth, public

app = FastAPI(title="DOSH motor API", version="0.1.0")


def _cors_origins() -> list[str]:
    origins = {
        settings.frontend_url.rstrip("/"),
        "https://dosh-motor.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    }
    for origin in (settings.cors_origins or "").split(","):
        origin = origin.strip().rstrip("/")
        if origin:
            origins.add(origin)
    return sorted(origins)


app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(public.router)
app.include_router(admin.router)


@app.get("/api/health")
def health():
    return {"status": "ok", "vercel": os.getenv("VERCEL") == "1"}
