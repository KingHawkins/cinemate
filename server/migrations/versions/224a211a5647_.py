"""empty message

Revision ID: 224a211a5647
Revises: 
Create Date: 2023-06-13 00:58:12.568632

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '224a211a5647'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('movies',
    sa.Column('id', sa.String(length=60), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('title', sa.String(length=128), nullable=False),
    sa.Column('genre', sa.String(length=128), nullable=False),
    sa.Column('trailer_url', sa.String(length=128), nullable=False),
    sa.Column('poster_url', sa.String(length=128), nullable=False),
    sa.Column('duration', sa.String(length=10), nullable=False),
    sa.Column('overview', sa.String(length=1000), nullable=False),
    sa.Column('release_date', sa.Date(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.String(length=128), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('username', sa.String(length=128), nullable=False),
    sa.Column('email', sa.String(length=128), nullable=False),
    sa.Column('contact', sa.String(length=128), nullable=False),
    sa.Column('password', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('showtimes',
    sa.Column('id', sa.String(length=60), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('movie_id', sa.String(length=128), nullable=False),
    sa.Column('cinema', sa.String(length=60), nullable=False),
    sa.Column('seats_available', sa.Integer(), nullable=False),
    sa.Column('show_date', sa.DateTime(), nullable=False),
    sa.Column('show_time', sa.Time(), nullable=False),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.String(length=60), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.String(length=128), nullable=False),
    sa.Column('showtime_id', sa.String(length=128), nullable=False),
    sa.Column('total_amount', sa.Float(), nullable=False),
    sa.Column('num_tickets', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['showtime_id'], ['showtimes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tickets',
    sa.Column('id', sa.String(length=60), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('seat_number', sa.String(length=60), nullable=False),
    sa.Column('booking_id', sa.String(length=60), nullable=False),
    sa.Column('price', sa.Float(precision=2), nullable=False),
    sa.Column('cinema', sa.String(length=60), nullable=False),
    sa.Column('movie', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(length=60), nullable=False),
    sa.ForeignKeyConstraint(['booking_id'], ['bookings.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tickets')
    op.drop_table('bookings')
    op.drop_table('showtimes')
    op.drop_table('users')
    op.drop_table('movies')
    # ### end Alembic commands ###
