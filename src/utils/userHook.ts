import { useQuery } from "@apollo/client"
import { connectFactory, useAppContext } from "./contextFactory"
import { GET_USER } from "../graphql/user"
import { useLocation, useNavigate } from "react-router-dom"

const KEY = 'userInfo'
const DEFAULT_VALUE = {}
export const useUserContext = () => useAppContext(KEY)

export const connect = connectFactory(KEY, DEFAULT_VALUE)

export const useGetUserInfo = () => {
    const {store,setStore} = useUserContext()
    const location = useLocation();
    const navigate = useNavigate();
    const {loading} = useQuery<{getUserInfo:IUser}>(GET_USER, {
        onCompleted: (data) => {
            if (data.getUserInfo) {
                setStore(data.getUserInfo)
                    if (location.pathname.startsWith('/login')) {
                navigate('/')
            }
                return;
            }


            if ( location.pathname !== '/login') {
                  navigate(`/login?orgPath=${location.pathname}`)
            }
           
            console.log(data)
        },
        onError:() => {
            if ( location.pathname !== '/login') {
                navigate(`/login?orgPath=${location.pathname}`)
              }
        }
    })  

    return {loading}
}   