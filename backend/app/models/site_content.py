from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import JSONB

from app.database import Base


class SiteContent(Base):
    __tablename__ = "site_content"
    __table_args__ = {"schema": "taller"}

    key = Column(String(64), primary_key=True)
    data = Column(JSONB, nullable=False)
