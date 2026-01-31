import Client from '../models/client.js'

const registerClient = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            frequency,
            advanceAmount,
            ratePerTiffine,
            dateOfStart
        } = req.body

        const userId = req.user._id

        if (!name || !email || !frequency || !ratePerTiffine) {
            return res.status(400).json({
                success: false,
                message: 'Some field are missing',
                payload: null,
                status: 400
            })
        }

        const isExists = await Client.findOne({ email })

        if (isExists) {
            return res.status(400).json({
                success: false,
                message: 'Client already exists',
                payload: null,
                status: 400
            })
        }

        const client = await Client.create({
            userId,
            name,
            email,
            phone,
            frequency,
            advanceAmount,
            ratePerTiffine,
            dateOfStart
        })

        return res.status(200).json({
            success: true,
            message: 'Client created successfully',
            payload: null,
            status: 201
        })

    } catch (err) {
        console.log('[REGISTER CLIENT ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}


const getAllClient = async (req, res) => {
    try {
        const userId = req.user._id
        const clients = await Client.find({ userId })

        return res.status(200).json({
            success: true,
            message: 'Clients fetched successfully',
            payload: { clients },
            status: 200
        })

    } catch (err) {
        console.log('[GET ALL CLIENT ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}

const getClient = async (req, res) => {
    try {
        const clientId = req.params.clientId
        const userId = req.user._id
        const client = await Client.findOne({ _id: clientId, userId })

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found',
                payload: null,
                status: 404
            })
        }

        res.status(200).json({
            success: true,
            message: 'Client fetched successfully',
            payload: { client },
            status: 200
        })
    } catch (err) {
        console.log('[GET CLIENT ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error' + err.message,
            payload: null,
            status: 500
        })
    }
}

const updateClient = async (req, res) => {
    try {
        const { clientId } = req.params
        const { name, email, phone, frequency, advanceAmount, ratePerTiffine } = req.body
        const userId = req.user._id

        const updatedClient = await Client.findOneAndUpdate(
            { _id: clientId, userId },
            { name, email, phone, frequency, advanceAmount, ratePerTiffine },
            { new: true }
        )

        if (!updatedClient) {
            return res.status(404).json({
                success: false,
                message: 'Client not found',
                payload: null,
                status: 404
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Client updated successfully',
            payload: { client: updatedClient },
            status: 200
        })

    } catch (err) {
        console.log('[UPDATE CLIENT ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}

const deleteClient = async (req, res) => {
    try {
        const { clientId } = req.params
        const userId = req.user._id

        const deletedClient = await Client.findOneAndDelete({ _id: clientId, userId })

        if (!deletedClient) {
            return res.status(404).json({
                success: false,
                message: 'Client not found',
                payload: null,
                status: 500
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Client deleted successfully',
            payload: null,
            status: 200
        })

    } catch (err) {
        console.log('[DELETE CLIENT ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}


export { registerClient, getAllClient, getClient, updateClient, deleteClient }