
import {RoleUser, StatusUser} from '../../interfaces/enums'

export class RegisterUserDto {

    constructor(
        public readonly name_user: string,
        public readonly email: string,
        public readonly id_enterprise: number,
        public readonly id_role: RoleUser = RoleUser.admin,
        public readonly status_user: StatusUser = StatusUser.active,
        public readonly register_date?: string
    ){}

    static create(object: {[key: string]: any}){
        const { name_user, email, status_user, id_enterprise, id_role} = object;
    }

}



