from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.content_service import get_site_content

router = APIRouter(prefix="/api", tags=["public"])


@router.get("/content")
def read_public_content(db: Session = Depends(get_db)):
    return get_site_content(db, resolve_images=True)
