import { restoreData } from "./storage"


class Api {

    public async Get(endpoint: string) {
        try {
            const token = await restoreData('x-access-token');
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
            if (response)
                return await response.json()

            return null
        } catch (err: any) {
            console.log('[ERROR GET API] ', err.message)
            return null
        }
    }

    public async Post(endpoint: string, data: any) {
        try {
            const token = await restoreData('x-access-token');
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(data)
            })

            console.log(response)
            if (response)
                return await response.json()

            return null
        } catch (err: any) {
            console.log('[ERROR POST API]', err.message)
            return null
        }
    }

    public async Put(endpoint: string, data: any) {
        try {
            const token = await restoreData('x-access-token');
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(data)
            })

            if (response)
                return await response.json()

            return null
        } catch (err: any) {
            console.log('[ERROR PUT API]', err.message)
            return null
        }
    }

    public async Delete(endpoint: string) {
        try {
            const token = await restoreData('x-access-token');
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })

            if (response)
                return await response.json()

            return null
        } catch (err: any) {
            console.log('[ERROR DELETE API]', err.message)
            return null
        }
    }
}

export default Api