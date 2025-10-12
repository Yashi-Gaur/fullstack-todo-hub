from fastapi import APIRouter, Depends
from database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session

router = APIRouter( 
    prefix = '/user',
    tags=['user'] )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]  

      




