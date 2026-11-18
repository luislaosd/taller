from sqlalchemy import Column, ForeignKey, Integer, String

from app.database import Base

SCHEMA = "taller"


class ServiceSlugAlias(Base):
    """Slug histórico de un servicio; resuelve a la URL actual del mismo registro."""

    __tablename__ = "service_slug_aliases"
    __table_args__ = {"schema": SCHEMA}

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(120), unique=True, nullable=False, index=True)
    service_id = Column(
        Integer,
        ForeignKey(f"{SCHEMA}.services.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )