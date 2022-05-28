import {request} from '@/utils/http'

// interface LoginResponse {
//     token: string
//     name: string
// }

class UserApi {
    login(data: LoginRequest) {
        return request<LoginResponse>({
            method: 'post',
            url: '/item1/api/login',
            data
        })
    }
    Register(data:RegisterRequest){
        return request<RegisterResponse>({
            method:"post",
            url: '/item1/api/reg',
            data
        })
    }
    ChangeBaseUserInfo(data:any){
        return request<UserBaseInfoResponse>({
            method:"PUT",
            url: '/item1/my/userinfo',
            data
        })
    }

    UploadPicture(data:UploadPictureReq){
        return request<UploadPicture>({
            method:"PATCH",
            url: '/item1/my/update/avatar',
            data
        })
    }

    UpdateUserCipher(data:UpdateUserCipherReq){
        return request<UpdateUserCipherRes>({
            method:'PATCH',
            url: '/item1/my/updatepwd',
            data
        })
    }


}

export const userApi = new UserApi()
