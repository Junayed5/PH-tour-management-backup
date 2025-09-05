/* eslint-disable no-console */
import { envVars } from "../config/env"
import bcryptjs from 'bcryptjs'
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const  seedSuperAdmin = async() => {

    try {

        const isSuperAdminExist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL});

        if (isSuperAdminExist) {
            console.log("Super Admin Already exist");
            return
        }

        console.log("super admin creating...");

        const hashPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUNDS))

        const authProvider : IAuthProvider = {
            provider: "credential",
            proverId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload : IUser = {
            name: "Super Admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashPassword,
            role: Role.SUPER_ADMIN,
            auths: [authProvider],
            isVerified: true
        }

        const superAdmin = await User.create(payload);

        console.log("super admin created successfully")
        console.log(superAdmin)
    } catch (error) {
        console.log(error)
    }
}