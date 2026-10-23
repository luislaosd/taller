from sqlalchemy.orm import Session

from app.models import Service, SiteContent
from app.seed_data import DEFAULT_CONTACT, DEFAULT_SECTIONS
from app.utils.storage import resolve_media_url


def _resolve_section_images(sections: dict) -> dict:
    out = dict(sections)
    home = dict(out.get("home") or {})
    if home.get("heroImage"):
        home["heroImage"] = resolve_media_url(home["heroImage"])
    out["home"] = home
    desc = dict(out.get("descripcion") or {})
    if desc.get("image"):
        desc["image"] = resolve_media_url(desc["image"])
    out["descripcion"] = desc
    qs = dict(out.get("quienesSomos") or {})
    if qs.get("teamImage"):
        qs["teamImage"] = resolve_media_url(qs["teamImage"])
    out["quienesSomos"] = qs
    return out


def service_to_dict(row: Service, resolve_images: bool = True) -> dict:
    image = row.image or ""
    if resolve_images:
        image = resolve_media_url(image) or image
    return {
        "id": row.id,
        "slug": row.slug,
        "title": row.title,
        "excerpt": row.excerpt or "",
        "body": row.body or "",
        "image": image,
        "sortOrder": row.sort_order,
        "isActive": row.is_active,
    }


def get_site_content(db: Session, resolve_images: bool = True) -> dict:
    contact_row = db.query(SiteContent).filter(SiteContent.key == "contact").first()
    sections_row = db.query(SiteContent).filter(SiteContent.key == "sections").first()
    contact = contact_row.data if contact_row else DEFAULT_CONTACT
    sections = sections_row.data if sections_row else DEFAULT_SECTIONS
    if resolve_images:
        sections = _resolve_section_images(sections)
    services = (
        db.query(Service)
        .order_by(Service.sort_order.asc(), Service.id.asc())
        .all()
    )
    return {
        "contact": contact,
        "sections": sections,
        "services": [service_to_dict(s, resolve_images=resolve_images) for s in services],
    }
