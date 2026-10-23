"""initial taller schema

Revision ID: a001
Revises:
Create Date: 2026-10-23

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "a001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

SCHEMA = "taller"


def upgrade() -> None:
    op.execute(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA}")
    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("username", sa.String(length=64), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        schema=SCHEMA,
    )
    op.create_index("ix_taller_admin_users_username", "admin_users", ["username"], unique=True, schema=SCHEMA)
    op.create_table(
        "site_content",
        sa.Column("key", sa.String(length=64), primary_key=True),
        sa.Column("data", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        schema=SCHEMA,
    )
    op.create_table(
        "services",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("slug", sa.String(length=120), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("excerpt", sa.Text(), server_default=""),
        sa.Column("body", sa.Text(), server_default=""),
        sa.Column("image", sa.String(length=512), server_default=""),
        sa.Column("sort_order", sa.Integer(), server_default="0", nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        schema=SCHEMA,
    )
    op.create_index("ix_taller_services_slug", "services", ["slug"], unique=True, schema=SCHEMA)


def downgrade() -> None:
    op.drop_index("ix_taller_services_slug", table_name="services", schema=SCHEMA)
    op.drop_table("services", schema=SCHEMA)
    op.drop_table("site_content", schema=SCHEMA)
    op.drop_index("ix_taller_admin_users_username", table_name="admin_users", schema=SCHEMA)
    op.drop_table("admin_users", schema=SCHEMA)
