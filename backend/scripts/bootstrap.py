"""Crea schema (Alembic), admin y contenido base."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_ROOT))

from app.config import settings
from app.database import SessionLocal, create_schema
from app.models import AdminUser, Service, SiteContent
from app.seed_data import DEFAULT_CONTACT, DEFAULT_SECTIONS, DEFAULT_SERVICES
from app.utils.security import hash_password


def run_migrations() -> None:
    subprocess.check_call([sys.executable, "-m", "alembic", "upgrade", "head"], cwd=BACKEND_ROOT)


def seed() -> None:
    create_schema()
    db = SessionLocal()
    try:
        admin = db.query(AdminUser).filter(AdminUser.username == settings.admin_username).first()
        if not admin:
            db.add(
                AdminUser(
                    username=settings.admin_username,
                    password_hash=hash_password(settings.admin_password),
                    is_active=True,
                )
            )
            print(f"Admin creado: {settings.admin_username}")
        else:
            print("Admin ya existe — sin cambios")

        if not db.query(SiteContent).filter(SiteContent.key == "contact").first():
            db.add(SiteContent(key="contact", data=DEFAULT_CONTACT))
            print("Contacto base insertado")
        if not db.query(SiteContent).filter(SiteContent.key == "sections").first():
            db.add(SiteContent(key="sections", data=DEFAULT_SECTIONS))
            print("Secciones base insertadas")

        if db.query(Service).count() == 0:
            for item in DEFAULT_SERVICES:
                db.add(
                    Service(
                        slug=item["slug"],
                        title=item["title"],
                        excerpt=item["excerpt"],
                        body=item["body"],
                        image=item["image"],
                        sort_order=item["sort_order"],
                        is_active=item["is_active"],
                    )
                )
            print(f"Servicios insertados: {len(DEFAULT_SERVICES)}")
        else:
            print("Servicios ya existen — sin cambios")

        db.commit()
    finally:
        db.close()


def main() -> None:
    run_migrations()
    seed()
    print("Bootstrap completado.")


if __name__ == "__main__":
    main()
