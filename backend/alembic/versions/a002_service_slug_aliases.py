"""service slug aliases for redirects

Revision ID: a002
Revises: a001
Create Date: 2026-03-24
"""

from alembic import op
import sqlalchemy as sa

revision = "a002"
down_revision = "a001"
branch_labels = None
depends_on = None

SCHEMA = "taller"


def upgrade() -> None:
    op.create_table(
        "service_slug_aliases",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("slug", sa.String(length=120), nullable=False),
        sa.Column("service_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["service_id"],
            [f"{SCHEMA}.services.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
        schema=SCHEMA,
    )
    op.create_index(
        "ix_taller_service_slug_aliases_slug",
        "service_slug_aliases",
        ["slug"],
        unique=True,
        schema=SCHEMA,
    )
    op.create_index(
        "ix_taller_service_slug_aliases_service_id",
        "service_slug_aliases",
        ["service_id"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_taller_service_slug_aliases_service_id",
        table_name="service_slug_aliases",
        schema=SCHEMA,
    )
    op.drop_index(
        "ix_taller_service_slug_aliases_slug",
        table_name="service_slug_aliases",
        schema=SCHEMA,
    )
    op.drop_table("service_slug_aliases", schema=SCHEMA)