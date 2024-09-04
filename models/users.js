import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "role_user"
    },
    bio: String,
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: String,
        default: Date.now
    }
});

// Se añade plugin de paginación
UserSchema.plugin(mongoosePaginate);
export default model("User", UserSchema, "users");

/* User, nombre del modelo. 
UserSchema, nombre del esquema
"users", nombre de la base de datos */
