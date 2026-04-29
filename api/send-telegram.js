export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'Server configuration missing' })
  }

  const { name, phone, date, time, guests, seat, note } = req.body ?? {}

  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Missing required booking fields' })
  }

  const formattedDate = date.split('-').reverse().join('/')

  const lines = [
    '🏮 <b>ĐẶT BÀN MỚI — Bắc Garden</b>',
    '──────────────────────',
    `👤 <b>Khách:</b> ${name}`,
    `📞 <b>SĐT:</b> ${phone}`,
    `📅 <b>Ngày:</b> ${formattedDate}`,
    `🕐 <b>Giờ:</b> ${time}`,
    `👥 <b>Số khách:</b> ${guests}`,
    seat ? `🪑 <b>Khu vực:</b> ${seat}` : null,
    note ? `📝 <b>Ghi chú:</b> ${note}` : null,
    '──────────────────────',
    '⚡ Vui lòng liên hệ xác nhận trong <b>30 phút</b>.',
  ].filter(Boolean).join('\n')

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: lines,
          parse_mode: 'HTML',
        }),
      }
    )

    const data = await tgRes.json()

    if (!data.ok) {
      console.error('[send-telegram] Telegram API error:', data)
      return res.status(502).json({ error: 'Telegram API error', detail: data })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[send-telegram] Fetch failed:', err)
    return res.status(500).json({ error: 'Failed to reach Telegram API' })
  }
}
