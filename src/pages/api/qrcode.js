// pages/api/qrcode.js
import QRCode from 'qrcode'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  // 요청에서 QR 코드로 변환할 텍스트를 받습니다.
  const { text } = req.query

  try {
    if (!text) {
      throw new Error('Text query parameter is required')
    }
    // QR 코드 생성
    const qrCodeDataUrl = await QRCode.toDataURL(text)

    // 생성된 QR 코드를 Data URL 형식으로 응답
    res.status(200).json({ qrCodeDataUrl })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
