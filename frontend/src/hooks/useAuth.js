import api from '../utils/api'

import { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {

    const { setFlashMessage } = useFlashMessage();

    let msgText = 'Cadastro realizado com sucesso'
    let msgType = 'success'

    async function register(user) {

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            console.log(data)
        } catch (error)  {

            msgText = error.rempose.data.message
            msgType = 'error'
            
        }

        setFlashMessage(msgText, msgType)

    }

    return { register }

}