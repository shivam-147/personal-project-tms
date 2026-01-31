import Tiffine from "../models/tiffine.js";

const getAllTiffine = async (req, res) => {
    try {
        const clientId = req.params.clientId

        const tiffines = await Tiffine.find({ clientId })

        res.status(200).json({
            success: true,
            message: 'Tiffines fetched successfully',
            payload: { tiffines },
            status: 200
        })
    } catch (err) {
        console.log('[GET ALL TIFFINE ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}

const getTiffine = async (req, res) => {
    try {
        const tiffineId = req.params.tiffineId
        const tiffine = await Tiffine.findOne({ _id: tiffineId })

        if (!tiffine) {
            return res.status(404).json({
                success: false,
                message: 'Tiffine not found',
                payload: null,
                status: 404
            })
        }

        res.status(200).json({
            success: true,
            message: 'Tiffine fetched successfully',
            payload: { tiffine },
            status: 200
        })

    } catch (err) {
        console.log('[GET ALL TIFFINE ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}

const registerTiffine = async (req, res) => {
    try {
        const { clientId, date, morningTiffine, afternoonTiffine, nightTiffine } = req.body

        const tiffine = await Tiffine.create({
            clientId,
            date,
            morningTiffine,
            afternoonTiffine,
            nightTiffine
        })

        res.status(200).json({
            success: true,
            message: 'Tiffine registered successfully',
            payload: null,
            status: 200
        })

    } catch (err) {
        console.log('[REGISTER TIFFINE ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}

const updateTiffine = async (req, res) => {
    try {
        const tiffineId = req.params.tiffineId
        const { date, morningTiffine, afternoonTiffine, nightTiffine } = req.body

        const tiffine = await Tiffine.findOneAndUpdate(
            { _id: tiffineId },
            { date, morningTiffine, afternoonTiffine, nightTiffine },
            { new: true }
        )

        if (!tiffine) {
            return res.status(404).json({
                success: false,
                message: 'Tiffine not found',
                payload: null,
                status: 404
            })
        }

        res.status(200).json({
            success: true,
            message: 'Tiffine updated successfully',
            payload: { tiffine },
            status: 200
        })

    } catch (err) {
        console.log('[UPDATE TIFFINE ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}

const deleteTiffine = async (req, res) => {
    try {
        const tiffineId = req.params.tiffineId
        const tiffine = await Tiffine.findOneAndDelete({ _id: tiffineId })

        if (!tiffine) {
            return res.status(404).json({
                success: false,
                message: 'Tiffine not found',
                payload: null,
                status: 404
            })
        }

        res.status(200).json({
            success: true,
            message: 'Tiffine deleted successfully',
            payload: { tiffine },
            status: 200
        })

    } catch (err) {
        console.log('[DELETE TIFFINE ERROR]', err.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}

export { registerTiffine, updateTiffine, deleteTiffine, getAllTiffine, getTiffine }