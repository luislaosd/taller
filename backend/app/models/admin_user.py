from sqlalchemy import Boolean, Column, DateTime, Integer, String, func

from app.database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    __table_args__ = {"schema": "taller"}

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(64), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
