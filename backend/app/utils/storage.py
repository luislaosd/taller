"""Storage privado: subida con service_role y URLs firmadas para lectura."""
from __future__ import annotations

import uuid

import httpx

from app.config import settings

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}


def _ext(filename: str, content_type: str) -> str:
    if "." in filename:
        return filename.rsplit(".", 1)[-1].lower()
    mapping = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif"}
    return mapping.get(content_type, "jpg")


def is_storage_path(value: str | None) -> bool:
    if not value:
        return False
    return not value.startswith("/") and not value.startswith("http")


def resolve_media_url(storage_path: str | None) -> str | None:
    """Ruta en bucket → URL firmada; rutas /public o http se devuelven tal cual."""
    if not storage_path:
        return storage_path
    if storage_path.startswith("http") or storage_path.startswith("/"):
        return storage_path
    return create_signed_url(storage_path)


def create_signed_url(storage_path: str, expires_in: int | None = None) -> str:
    if not settings.supabase_url or not settings.supabase_service_role_key:
        return storage_path
    ttl = expires_in or settings.signed_url_ttl_seconds
    url = f"{settings.supabase_url}/storage/v1/object/sign/{settings.supabase_bucket}/{storage_path}"
    headers = {
        "Authorization": f"Bearer {settings.supabase_service_role_key}",
        "apikey": settings.supabase_service_role_key,
        "Content-Type": "application/json",
    }
    response = httpx.post(url, json={"expiresIn": ttl}, headers=headers, timeout=30.0)
    if response.status_code not in (200, 201):
        raise RuntimeError(f"No se pudo firmar URL: {response.text}")
    signed = response.json().get("signedURL") or response.json().get("signedUrl")
    if not signed:
        raise RuntimeError("Respuesta de firma sin URL")
    if signed.startswith("http"):
        return signed
    return f"{settings.supabase_url}/storage/v1{signed}"


def upload_image(file_bytes: bytes, filename: str, content_type: str, folder: str = "media") -> str:
    if content_type not in ALLOWED_IMAGE_TYPES:
        raise ValueError("Tipo de imagen no permitido")
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise RuntimeError("Storage no configurado")
    ext = _ext(filename, content_type)
    prefix = folder.strip("/")
    object_path = f"{prefix}/{uuid.uuid4().hex}.{ext}" if prefix else f"{uuid.uuid4().hex}.{ext}"
    url = f"{settings.supabase_url}/storage/v1/object/{settings.supabase_bucket}/{object_path}"
    headers = {
        "Authorization": f"Bearer {settings.supabase_service_role_key}",
        "apikey": settings.supabase_service_role_key,
        "Content-Type": content_type,
    }
    response = httpx.post(url, content=file_bytes, headers=headers, timeout=60.0)
    if response.status_code not in (200, 201):
        raise RuntimeError(f"Error subiendo imagen: {response.text}")
    return object_path
