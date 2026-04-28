/**
 * Vercel Serverless Function — Zalo OA send message proxy
 *
 * Env vars required (set in Vercel dashboard):
 *   ZALO_ACCESS_TOKEN   — OA access token từ Zalo Developer Console
 *   ZALO_RECIPIENT_ID   — Zalo User ID của staff/chủ nhận notify
 *
 * POST /api/send-zalo
 * Body: { name, phone, date, time, guests, seat, note }
 */

const ZALO_API = 'https://openapi.zalo.me/v2.0/oa/message'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { ZALO_ACCESS_TOKEN, ZALO_RECIPIENT_ID } = process.env

  if (!ZALO_ACCESS_TOKEN || !ZALO_RECIPIENT_ID) {
    console.error('[send-zalo] Missing env vars: ZALO_ACCESS_TOKEN or ZALO_RECIPIENT_ID')
    return res.status(500).json({ error: 'Server configuration missing' })
  }

  const { name, phone, date, time, guests, seat, note } = req.body ?? {}

  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Missing required booking fields' })
  }

  const formattedDate = date.split('-').reverse().join('/')

  const messageText = [
    '🏮 ĐẶT BÀN MỚI — Bắc Garden',
    '─────────────────────',
    `👤 Khách: ${name}`,
    `📞 SĐT: ${phone}`,
    `📅 Ngày: ${formattedDate}`,
    `🕐 Giờ: ${time}`,
    `👥 Số khách: ${guests}`,
    seat ? `🪑 Khu vực: ${seat}` : null,
    note ? `📝 Ghi chú: ${note}` : null,
    '─────────────────────',
    '⚡ Vui lòng liên hệ xác nhận trong 30 phút.',
  ]
    .filter(Boolean)
    .join('\n')

  const body = {
    recipient: { user_id: ZALO_RECIPIENT_ID },
    message: { text: messageText },
  }

  try {
    const zaloRes = await fetch(ZALO_API, {
      method: 'POST',
      headers: {
        'access_token': ZALO_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await zaloRes.json()

    if (data.error !== 0) {
      console.error('[send-zalo] Zalo API error:', data)
      return res.status(502).json({ error: 'Zalo API error', detail: data })
    }

    return res.status(200).json({ ok: true, message_id: data.data?.message_id })
  } catch (err) {
    console.error('[send-zalo] Fetch failed:', err)
    return res.status(500).json({ error: 'Failed to reach Zalo API' })
  }
}
