/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { validateFileUpload } = require('../utils')
// const { uploadFileToS3 } = require('../modules/aws-sdk')

exports.uploadFiles = async (req, res) => {
	try {
		// const { folder, fileName } = req.query
		const files = await validateFileUpload(
			req,
			['images'],
			['jpeg', 'jpg', 'png'],
			true,
		)
		// console.log(files)
		if (files.images.length === 0) {
			return res.status(400).json({ message: 'file kosong' })
		}

		const data = files.images.map((row) => {
			let _row = row
			// eslint-disable-next-line prefer-destructuring
			_row = _row.split('/')[3]
			_row = `/menu/photo/${_row}`
			return _row
		})

		// const responseS3 = []
		// for (const pathImage of files.images) {
		// 	const sendImage = pathImage && pathImage.substring(1)

		// 	const res = await uploadFileToS3(sendImage, true, folder, fileName)
		// 	responseS3.push(res)
		// }

		return res.status(200).json({ message: 'success', data })
	}
	catch (err) {
		return res.status(400).json({ message: err.message })
	}
}
