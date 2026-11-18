from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Service, ServiceSlugAlias


def slug_taken(db: Session, slug: str, *, except_service_id: int | None = None) -> bool:
    q = db.query(Service).filter(Service.slug == slug)
    if except_service_id is not None:
        q = q.filter(Service.id != except_service_id)
    if q.first():
        return True
    alias = db.query(ServiceSlugAlias).filter(ServiceSlugAlias.slug == slug).first()
    if not alias:
        return False
    if except_service_id is not None and alias.service_id == except_service_id:
        return False
    return True


def apply_service_slug_change(db: Session, row: Service, new_slug: str) -> None:
    new_slug = (new_slug or "").strip()
    if not new_slug or new_slug == row.slug:
        return
    if slug_taken(db, new_slug, except_service_id=row.id):
        raise HTTPException(status_code=400, detail="Ese slug ya está en uso")

    old_slug = row.slug
    if not db.query(ServiceSlugAlias).filter(ServiceSlugAlias.slug == old_slug).first():
        db.add(ServiceSlugAlias(slug=old_slug, service_id=row.id))

    db.query(ServiceSlugAlias).filter(
        ServiceSlugAlias.slug == new_slug,
        ServiceSlugAlias.service_id == row.id,
    ).delete(synchronize_session=False)

    row.slug = new_slug


def build_service_slug_redirects(db: Session) -> dict[str, str]:
    """Mapa slug histórico → slug actual (solo servicios activos)."""
    out: dict[str, str] = {}
    for alias in db.query(ServiceSlugAlias).all():
        svc = db.get(Service, alias.service_id)
        if svc and svc.is_active:
            out[alias.slug] = svc.slug
    return out


def ensure_slug_available_for_create(db: Session, slug: str) -> None:
    if slug_taken(db, slug):
        raise HTTPException(status_code=400, detail="Slug ya existe")