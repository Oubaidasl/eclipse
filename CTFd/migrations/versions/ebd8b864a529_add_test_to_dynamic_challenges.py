"""add_test_to_dynamic_challenges

Revision ID: ebd8b864a529
Revises: 48d8250d19bd
Create Date: 2026-03-16

"""
from alembic import op
import sqlalchemy as sa

revision = 'ebd8b864a529'
down_revision = '48d8250d19bd'
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('dynamic_challenge', sa.Column('dynamic_test', sa.String(128), nullable=True, server_default=''))

def downgrade():
    op.drop_column('dynamic_challenge', 'dynamic_test')
