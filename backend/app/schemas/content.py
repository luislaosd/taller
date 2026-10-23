from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class ContactUpdate(BaseModel):
    phone: str | None = None
    email: str | None = None
    hours: str | None = None
    address: str | None = None
    whatsappNumber: str | None = None
    whatsappMessage: str | None = None
    directionsUrl: str | None = None
    mapsEmbedSrc: str | None = None


class ServiceBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    slug: str
    title: str
    excerpt: str = ""
    body: str = ""
    image: str = ""
    sort_order: int = Field(default=0, alias="sortOrder")
    is_active: bool = Field(default=True, alias="isActive")


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    excerpt: str | None = None
    body: str | None = None
    image: str | None = None
    sortOrder: int | None = None
    isActive: bool | None = None


class SectionPatch(BaseModel):
    data: dict[str, Any]
