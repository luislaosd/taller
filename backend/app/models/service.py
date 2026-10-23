from sqlalchemy import Boolean, Column, Integer, String, Text

from app.database import Base


class Service(Base):
    __tablename__ = "services"
    __table_args__ = {"schema": "taller"}

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(120), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    excerpt = Column(Text, default="")
    body = Column(Text, default="")
    image = Column(String(512), default="")
    sort_order = Column(Integer, default=0, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
