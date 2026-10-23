from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import AdminUser, Service, SiteContent
from app.schemas.content import ContactUpdate, SectionPatch, ServiceCreate, ServiceUpdate
from app.services.content_service import get_site_content, service_to_dict
from app.utils.deps import get_current_admin
from app.utils.storage import upload_image

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get("/content")
def read_admin_content(db: Session = Depends(get_db), _admin: AdminUser = Depends(get_current_admin)):
    return get_site_content(db, resolve_images=False)


@router.put("/contact")
def update_contact(
    body: ContactUpdate,
    db: Session = Depends(get_db),
    _admin: AdminUser = Depends(get_current_admin),
):
    row = db.query(SiteContent).filter(SiteContent.key == "contact").first()
    if not row:
        raise HTTPException(status_code=404, detail="Contacto no inicializado")
    data = dict(row.data)
    for key, value in body.model_dump(exclude_unset=True).items():
        if value is not None:
            data[key] = value
    row.data = data
    db.commit()
    return data


@router.put("/sections/{section_key}")
def update_section(
    section_key: str,
    body: SectionPatch,
    db: Session = Depends(get_db),
    _admin: AdminUser = Depends(get_current_admin),
):
    allowed = {"home", "descripcion", "quienesSomos"}
    if section_key not in allowed:
        raise HTTPException(status_code=400, detail="Sección no válida")
    row = db.query(SiteContent).filter(SiteContent.key == "sections").first()
    if not row:
        raise HTTPException(status_code=404, detail="Secciones no inicializadas")
    sections = dict(row.data)
    sections[section_key] = body.data
    row.data = sections
    db.commit()
    return sections[section_key]


@router.post("/services", status_code=201)
def create_service(
    body: ServiceCreate,
    db: Session = Depends(get_db),
    _admin: AdminUser = Depends(get_current_admin),
):
    if db.query(Service).filter(Service.slug == body.slug).first():
        raise HTTPException(status_code=400, detail="Slug ya existe")
    row = Service(
        slug=body.slug,
        title=body.title,
        excerpt=body.excerpt,
        body=body.body,
        image=body.image,
        sort_order=body.sort_order,
        is_active=body.is_active,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return service_to_dict(row, resolve_images=False)


@router.put("/services/{service_id}")
def update_service(
    service_id: int,
    body: ServiceUpdate,
    db: Session = Depends(get_db),
    _admin: AdminUser = Depends(get_current_admin),
):
    row = db.query(Service).filter(Service.id == service_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    payload = body.model_dump(exclude_unset=True)
    field_map = {
        "sortOrder": "sort_order",
        "isActive": "is_active",
    }
    for key, value in payload.items():
        attr = field_map.get(key, key)
        setattr(row, attr, value)
    db.commit()
    db.refresh(row)
    return service_to_dict(row, resolve_images=False)


@router.delete("/services/{service_id}", status_code=204)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    _admin: AdminUser = Depends(get_current_admin),
):
    row = db.query(Service).filter(Service.id == service_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    db.delete(row)
    db.commit()


@router.post("/upload-image")
async def admin_upload_image(
    file: UploadFile = File(...),
    _admin: AdminUser = Depends(get_current_admin),
):
    content = await file.read()
    path = upload_image(content, file.filename or "image.jpg", file.content_type or "image/jpeg")
    return {"path": path, "url": path}
