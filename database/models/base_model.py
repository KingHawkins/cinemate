from datetime import datetime
from database.database import db
import bcrypt
import uuid

class BaseModel:
    """Defines all common attributes for the classes"""
    id = db.Column(db.String(60), nullable=False, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    def __init__(self, *args, **kwargs):
        if kwargs:
            for key, value in kwargs.items():
                if key == "created_at" or key == "updated_at":
                    value = datetime.strptime(value, "%Y-%m-%dT%H:%M:%S.%f")
                if key != "__class__" and key != '_sa_instance_state':
                    if key == 'password':
                        value = bcrypt.hashpw(value.encode("utf-8"), bcrypt.gensalt())
                    setattr(self, key, value)
            if "id" not in kwargs:
                self.id = str(uuid.uuid4())
            if "created_at" not in kwargs:
                self.created_at = datetime.now()
            if "updated_at" not in kwargs:
                self.updated_at = datetime.now()
        self.id = str(uuid.uuid4())
        self.created_at = self.updated_at = datetime.now()

    #def __repr__(self):
        """Returns the official string representation"""
        #return self.__str__()

    def save(self):
        """Timestamps `updated_at`"""
        self.updated_at = datetime.now()

    def to_dict(self):
        """returns a dictionary containing all keys/values\
                of __dict__ instance"""
        objec = {}
        for key in self.__dict__:
            if key == 'created_at' or key == 'updated_at':
                objec[key] = self.__dict__[key].isoformat()
            else:
                objec[key] = self.__dict__[key]
        objec['__class__'] = self.__class__.__name__
        if "_sa_instance_state" in objec:
            del objec["_sa_instance_state"]
        if "password" in objec:
            del objec["password"]
        return objec
